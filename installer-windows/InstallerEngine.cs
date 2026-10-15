using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Win32;

namespace MoreGravityInstaller;

public enum InstallStatus
{
    NotInstalled,
    Installed,
    NeedsReapply, // Detected that Antigravity or runtime updated and hook is missing
    AntigravityNotFound
}

public class InstallerEngine
{
    public static readonly string AppDataMoreGravity = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
        "MoreGravity"
    );

    public static readonly string ThemesDir = Path.Combine(AppDataMoreGravity, "themes");

    private static readonly string[] CandidateAntigravityDirs =
    {
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "antigravity"),
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Programs", "Antigravity"),
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "antigravity"),
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "Antigravity"),
        Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), "Antigravity"),
    };

    public string? AntigravityPath { get; set; }
    public bool BetterGravityDetected { get; private set; }

    public InstallerEngine()
    {
        AntigravityPath = FindAntigravityPath();
        DetectBetterGravity();
    }

    public static string? FindAntigravityPath()
    {
        foreach (var dir in CandidateAntigravityDirs)
        {
            if (Directory.Exists(dir) &&
                (File.Exists(Path.Combine(dir, "Antigravity.exe")) || File.Exists(Path.Combine(dir, "antigravity.exe"))))
            {
                return dir;
            }
        }

        try
        {
            string[] rootKeys = {
                @"Software\Microsoft\Windows\CurrentVersion\Uninstall",
                @"Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall"
            };

            foreach (var subKeyPath in rootKeys)
            {
                using var key = Registry.CurrentUser.OpenSubKey(subKeyPath);
                if (key == null) continue;

                foreach (var subName in key.GetSubKeyNames())
                {
                    using var appKey = key.OpenSubKey(subName);
                    if (appKey == null) continue;

                    var displayName = appKey.GetValue("DisplayName") as string;
                    if (displayName != null && displayName.Contains("Antigravity", StringComparison.OrdinalIgnoreCase) && !displayName.Contains("IDE", StringComparison.OrdinalIgnoreCase))
                    {
                        var loc = appKey.GetValue("InstallLocation") as string;
                        if (!string.IsNullOrEmpty(loc) && Directory.Exists(loc))
                        {
                            return loc.TrimEnd('\\', '/');
                        }
                    }
                }
            }
        }
        catch { }

        return null;
    }

    public void DetectBetterGravity()
    {
        var bgCache = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "BetterGravity",
            "PatcherCache",
            "runtime",
            "preload.cjs"
        );

        var bgInApp = AntigravityPath != null
            ? Path.Combine(AntigravityPath, "resources", ".bettergravity", "runtime", "preload.cjs")
            : null;

        BetterGravityDetected = File.Exists(bgCache) || (bgInApp != null && File.Exists(bgInApp));
    }

    public InstallStatus CheckStatus()
    {
        if (string.IsNullOrEmpty(AntigravityPath) || !Directory.Exists(AntigravityPath))
        {
            return InstallStatus.AntigravityNotFound;
        }

        var targets = GetTargetPreloadPaths();
        if (targets.Count == 0)
        {
            return InstallStatus.NotInstalled;
        }

        bool anyInstalled = false;
        bool anyMissing = false;

        foreach (var file in targets)
        {
            if (File.Exists(file))
            {
                var content = File.ReadAllText(file, Encoding.UTF8);
                if (content.Contains("More Gravity Theme Loader"))
                {
                    anyInstalled = true;
                }
                else
                {
                    anyMissing = true;
                }
            }
        }

        if (anyInstalled)
        {
            return InstallStatus.Installed;
        }

        // If MoreGravity files exist in AppData, but preloads don't have the hook -> Antigravity was updated!
        var deployedPalette = Path.Combine(AppDataMoreGravity, "palette.js");
        if (File.Exists(deployedPalette) && anyMissing)
        {
            return InstallStatus.NeedsReapply;
        }

        return InstallStatus.NotInstalled;
    }

    public List<string> GetTargetPreloadPaths()
    {
        var list = new List<string>();

        // BetterGravity Cache
        var bgCache = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
            "BetterGravity",
            "PatcherCache",
            "runtime",
            "preload.cjs"
        );
        if (File.Exists(bgCache)) list.Add(bgCache);

        // BetterGravity Injected Runtime
        if (!string.IsNullOrEmpty(AntigravityPath))
        {
            var bgInApp = Path.Combine(AntigravityPath, "resources", ".bettergravity", "runtime", "preload.cjs");
            if (File.Exists(bgInApp)) list.Add(bgInApp);
        }

        return list;
    }

    public void DeployAssets()
    {
        Directory.CreateDirectory(AppDataMoreGravity);
        Directory.CreateDirectory(ThemesDir);

        var assembly = Assembly.GetExecutingAssembly();

        // Extract palette.js
        ExtractResourceToFile(assembly, "Resources.palette.js", Path.Combine(AppDataMoreGravity, "palette.js"));

        // Also extract from filesystem fallback if running from dev repo
        var baseDir = AppDomain.CurrentDomain.BaseDirectory;
        var parentPalette = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "palette.js"));
        if (File.Exists(parentPalette))
        {
            File.Copy(parentPalette, Path.Combine(AppDataMoreGravity, "palette.js"), true);
        }

        // Copy themes
        var parentThemes = Path.GetFullPath(Path.Combine(baseDir, "..", "..", "..", "themes"));
        if (Directory.Exists(parentThemes))
        {
            foreach (var file in Directory.GetFiles(parentThemes, "*.css"))
            {
                var dest = Path.Combine(ThemesDir, Path.GetFileName(file));
                File.Copy(file, dest, true);
            }
        }
    }

    private static void ExtractResourceToFile(Assembly assembly, string resourceSubname, string targetPath)
    {
        foreach (var name in assembly.GetManifestResourceNames())
        {
            if (name.EndsWith(resourceSubname, StringComparison.OrdinalIgnoreCase))
            {
                using var stream = assembly.GetManifestResourceStream(name);
                if (stream != null)
                {
                    using var fileStream = File.Create(targetPath);
                    stream.CopyTo(fileStream);
                    return;
                }
            }
        }
    }

    public bool Install(out string message)
    {
        try
        {
            DeployAssets();

            var deployedPalette = Path.Combine(AppDataMoreGravity, "palette.js");
            var escapedPath = deployedPalette.Replace('\\', '/');
            var loaderCode = $"\n// [More Gravity Theme Loader]\ntry {{ require('{escapedPath}'); }} catch(e) {{ console.error('[MoreGravity] Loader error:', e); }}\n";

            var targets = GetTargetPreloadPaths();
            if (targets.Count == 0)
            {
                message = "No supported runtime targets found. Please install BetterGravity or select an active preload path.";
                return false;
            }

            int injectedCount = 0;
            foreach (var target in targets)
            {
                if (File.Exists(target))
                {
                    var content = File.ReadAllText(target, Encoding.UTF8);
                    if (!content.Contains("More Gravity Theme Loader"))
                    {
                        // Backup
                        File.Copy(target, target + ".bak", true);
                        File.AppendAllText(target, loaderCode, Encoding.UTF8);
                        injectedCount++;
                    }
                    else
                    {
                        injectedCount++;
                    }
                }
            }

            message = $"Successfully installed into {injectedCount} target runtime(s)!";
            return true;
        }
        catch (Exception ex)
        {
            message = $"Installation failed: {ex.Message}";
            return false;
        }
    }

    public bool Uninstall(out string message)
    {
        try
        {
            var targets = GetTargetPreloadPaths();
            int cleanedCount = 0;

            foreach (var target in targets)
            {
                if (File.Exists(target))
                {
                    var content = File.ReadAllText(target, Encoding.UTF8);
                    if (content.Contains("More Gravity Theme Loader"))
                    {
                        // Strip out loader block
                        var regex = new Regex(@"\r?\n?// \[More Gravity Theme Loader\][\s\S]*?catch\(e\) \{ console\.error\('\[MoreGravity\] Loader error:', e\); \}\r?\n?");
                        var newContent = regex.Replace(content, "");
                        File.WriteAllText(target, newContent, Encoding.UTF8);
                        cleanedCount++;
                    }
                }
            }

            message = $"Cleanly uninstalled from {cleanedCount} target(s). Antigravity restored to vanilla!";
            return true;
        }
        catch (Exception ex)
        {
            message = $"Uninstallation error: {ex.Message}";
            return false;
        }
    }

    public static bool IsAntigravityRunning()
    {
        var procs = Process.GetProcessesByName("Antigravity");
        if (procs.Length > 0) return true;
        var procsLower = Process.GetProcessesByName("antigravity");
        return procsLower.Length > 0;
    }

    public static void CloseAntigravity()
    {
        foreach (var p in Process.GetProcessesByName("Antigravity"))
        {
            try { p.Kill(); p.WaitForExit(3000); } catch { }
        }
        foreach (var p in Process.GetProcessesByName("antigravity"))
        {
            try { p.Kill(); p.WaitForExit(3000); } catch { }
        }
    }

    public static void LaunchAntigravity(string? dir)
    {
        if (string.IsNullOrEmpty(dir)) return;
        var exe = Path.Combine(dir, "Antigravity.exe");
        if (!File.Exists(exe)) exe = Path.Combine(dir, "antigravity.exe");
        if (File.Exists(exe))
        {
            Process.Start(new ProcessStartInfo { FileName = exe, UseShellExecute = true });
        }
    }
}
