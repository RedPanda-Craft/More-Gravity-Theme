# More Gravity Theme - One-Click Uninstaller
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       More Gravity Theme - 1-Click Uninstaller" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

$targets = @(
    "$env:LOCALAPPDATA\BetterGravity\PatcherCache\runtime\preload.cjs"
)

$uninstalled = $false
foreach ($target in $targets) {
    if (Test-Path $target) {
        $content = Get-Content -Path $target -Raw -Encoding UTF8
        if ($content -match "More Gravity Theme Loader") {
            if (Test-Path "$target.bak") {
                Copy-Item -Path "$target.bak" -Destination $target -Force
                Write-Host "  [OK] Restored $target from backup (.bak)" -ForegroundColor Green
            } else {
                $cleaned = $content -replace "(?ms)\r?\n// \[More Gravity Theme Loader\].*?\r?\n", ""
                Set-Content -Path $target -Value $cleaned -Encoding UTF8
                Write-Host "  [OK] Removed loader line from $target" -ForegroundColor Green
            }
            $uninstalled = $true
        }
    }
}

Write-Host ""
if ($uninstalled) {
    Write-Host ">>> [SUCCESS] More Gravity Theme uninstalled successfully." -ForegroundColor Green
    Write-Host "    Restart Antigravity 2.0 to restore original defaults." -ForegroundColor White
} else {
    Write-Host ">>> [INFO] More Gravity Theme loader was not found in targets." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit..."
