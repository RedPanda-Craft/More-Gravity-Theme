# More Gravity Theme - One-Click Installer
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$palettePath = Join-Path $scriptDir "palette.js"
$palettePathEscaped = $palettePath -replace '\\', '/'

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "        More Gravity Theme - 1-Click Installer" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$targets = @(
    "$env:LOCALAPPDATA\BetterGravity\PatcherCache\runtime\preload.cjs"
)

$injected = $false
foreach ($target in $targets) {
    if (Test-Path $target) {
        $content = Get-Content -Path $target -Raw -Encoding UTF8
        if ($content -notmatch "More Gravity Theme Loader") {
            Copy-Item -Path $target -Destination "$target.bak" -Force
            $loader = "`n// [More Gravity Theme Loader]`ntry { require('$palettePathEscaped'); } catch(e) { console.error('[MoreGravity] Failed to load:', e); }`n"
            Add-Content -Path $target -Value $loader -Encoding UTF8
            Write-Host "  [OK] Successfully injected into $target" -ForegroundColor Green
            $injected = $true
        } else {
            Write-Host "  [SKIP] Already installed in $target" -ForegroundColor Yellow
            $injected = $true
        }
    }
}

Write-Host ""
if ($injected) {
    Write-Host ">>> [SUCCESS] More Gravity Theme installed successfully!" -ForegroundColor Green
    Write-Host "    Restart Antigravity 2.0 to activate." -ForegroundColor White
    Write-Host "    Press Ctrl+Alt+T or F8 in Antigravity to open the theme palette anytime." -ForegroundColor Cyan
} else {
    Write-Host ">>> [NOTE] Antigravity runtime target not detected automatically." -ForegroundColor Yellow
    Write-Host "    You can manually append this 1 line to your Electron preload script:" -ForegroundColor White
    Write-Host "    require('$palettePathEscaped');" -ForegroundColor Cyan
}

Write-Host ""
Read-Host "Press Enter to exit..."
