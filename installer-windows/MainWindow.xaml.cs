using System;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;

namespace MoreGravityInstaller;

public partial class MainWindow : Window
{
    private readonly InstallerEngine _engine;

    public MainWindow()
    {
        InitializeComponent();
        _engine = new InstallerEngine();
        Loaded += MainWindow_Loaded;
    }

    private void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        RefreshUI();
    }

    private void RefreshUI()
    {
        TxtTargetPath.Text = _engine.AntigravityPath ?? "Not Detected (Please place in Antigravity directory)";
        TxtRuntimeEnv.Text = _engine.BetterGravityDetected 
            ? "BetterGravity / SuperGravity (High-Speed Hook)"
            : "Pure Antigravity 2.0 Native";

        var status = _engine.CheckStatus();
        switch (status)
        {
            case InstallStatus.Installed:
                TxtStatus.Text = "Active & Installed";
                DotStatus.Fill = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#10B981"));
                TxtBtnInstall.Text = "Reinstall / Update Themes";
                BtnInstall.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#2563EB"));
                TxtLog.Text = "More Gravity Theme is active. Press Ctrl+Alt+T or F8 in Antigravity.";
                break;

            case InstallStatus.NeedsReapply:
                TxtStatus.Text = "Update Detected (Needs Re-apply)";
                DotStatus.Fill = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#F59E0B"));
                TxtBtnInstall.Text = "⚡ Re-apply More Gravity (1-Click)";
                BtnInstall.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#16A34A"));
                TxtLog.Text = "Antigravity updated! Click 'Re-apply' to instantly restore your themes.";
                break;

            case InstallStatus.NotInstalled:
                TxtStatus.Text = "Ready to Install";
                DotStatus.Fill = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#38BDF8"));
                TxtBtnInstall.Text = "Install More Gravity Theme";
                BtnInstall.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#2563EB"));
                TxtLog.Text = "Ready to install. Click above to inject theme runtime.";
                break;

            case InstallStatus.AntigravityNotFound:
                TxtStatus.Text = "Antigravity Not Found";
                DotStatus.Fill = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#EF4444"));
                TxtBtnInstall.Text = "Install (Specify Path)";
                BtnInstall.Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString("#475569"));
                TxtLog.Text = "Could not locate Antigravity 2.0 installation folder.";
                break;
        }
    }

    private void TitleBar_MouseDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ChangedButton == MouseButton.Left)
        {
            DragMove();
        }
    }

    private void BtnMinimize_Click(object sender, RoutedEventArgs e)
    {
        WindowState = WindowState.Minimized;
    }

    private void BtnClose_Click(object sender, RoutedEventArgs e)
    {
        Close();
    }

    private void BtnInstall_Click(object sender, RoutedEventArgs e)
    {
        if (InstallerEngine.IsAntigravityRunning())
        {
            var res = MessageBox.Show(
                "Antigravity is currently running.\n\nWould you like the installer to close it automatically to apply theme changes?",
                "Close Antigravity?",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question
            );

            if (res == MessageBoxResult.Yes)
            {
                InstallerEngine.CloseAntigravity();
            }
        }

        TxtLog.Text = "Installing assets and hooking runtime...";
        bool success = _engine.Install(out string msg);

        if (success)
        {
            MessageBox.Show(
                $"{msg}\n\nPlease restart Antigravity 2.0 to enjoy your new aesthetic themes!\n\nShortcut: Ctrl+Alt+T or F8",
                "Installation Successful",
                MessageBoxButton.OK,
                MessageBoxImage.Information
            );
        }
        else
        {
            MessageBox.Show(msg, "Installation Note", MessageBoxButton.OK, MessageBoxImage.Warning);
        }

        RefreshUI();
    }

    private void BtnUninstall_Click(object sender, RoutedEventArgs e)
    {
        var res = MessageBox.Show(
            "Are you sure you want to remove More Gravity Theme and restore vanilla Antigravity?",
            "Confirm Uninstall",
            MessageBoxButton.YesNo,
            MessageBoxImage.Question
        );

        if (res == MessageBoxResult.Yes)
        {
            bool success = _engine.Uninstall(out string msg);
            MessageBox.Show(msg, "Uninstall Status", MessageBoxButton.OK, MessageBoxImage.Information);
            RefreshUI();
        }
    }

    private void BtnLaunch_Click(object sender, RoutedEventArgs e)
    {
        if (!string.IsNullOrEmpty(_engine.AntigravityPath))
        {
            InstallerEngine.LaunchAntigravity(_engine.AntigravityPath);
            TxtLog.Text = "Antigravity launched.";
        }
        else
        {
            MessageBox.Show("Antigravity installation directory not found.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }
}
