#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PALETTE_PATH="$SCRIPT_DIR/palette.js"

echo -e "\033[36m=========================================================="
echo -e "       More Gravity Theme - Installer (macOS/Linux)"
echo -e "==========================================================\033[0m"

# Potential Antigravity preload locations on macOS and Linux
CANDIDATES=(
  "$HOME/Library/Application Support/BetterGravity/PatcherCache/runtime/preload.cjs"
  "$HOME/.config/BetterGravity/PatcherCache/runtime/preload.cjs"
)

INSTALLED=false
for target in "${CANDIDATES[@]}"; do
  if [ -f "$target" ]; then
    if ! grep -q "More Gravity Theme Loader" "$target"; then
      cp "$target" "$target.bak"
      echo "" >> "$target"
      echo "// [More Gravity Theme Loader]" >> "$target"
      echo "try { require('$PALETTE_PATH'); } catch(e) { console.error('[MoreGravity] Failed:', e); }" >> "$target"
      echo -e "\033[32m[OK] Successfully injected into $target\033[0m"
      INSTALLED=true
    else
      echo -e "\033[33m[SKIP] Already installed in $target\033[0m"
      INSTALLED=true
    fi
  fi
done

if [ "$INSTALLED" = true ]; then
  echo -e "\n\033[32m>>> [SUCCESS] More Gravity Theme installed! Restart Antigravity to activate.\033[0m"
  echo -e "    Press Ctrl+Alt+T or F8 in Antigravity to toggle theme palette anytime."
else
  echo -e "\n\033[33m>>> [NOTE] Antigravity runtime target not detected automatically.\033[0m"
  echo "    Manually add this single line to your Electron preload script:"
  echo "    require('$PALETTE_PATH');"
fi
