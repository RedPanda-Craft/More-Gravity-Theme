#!/usr/bin/env bash
set -euo pipefail

echo -e "\033[36m=========================================================="
echo -e "      More Gravity Theme - Uninstaller (macOS/Linux)"
echo -e "==========================================================\033[0m"

CANDIDATES=(
  "$HOME/Library/Application Support/BetterGravity/PatcherCache/runtime/preload.cjs"
  "$HOME/.config/BetterGravity/PatcherCache/runtime/preload.cjs"
)

UNINSTALLED=false
for target in "${CANDIDATES[@]}"; do
  if [ -f "$target" ]; then
    if grep -q "More Gravity Theme Loader" "$target"; then
      if [ -f "$target.bak" ]; then
        mv "$target.bak" "$target"
        echo -e "\033[32m[OK] Restored $target from backup\033[0m"
      else
        grep -v "More Gravity Theme Loader" "$target" | grep -v "MoreGravity" > "${target}.tmp" && mv "${target}.tmp" "$target"
        echo -e "\033[32m[OK] Removed loader line from $target\033[0m"
      fi
      UNINSTALLED=true
    fi
  fi
done

if [ "$UNINSTALLED" = true ]; then
  echo -e "\n\033[32m>>> [SUCCESS] More Gravity Theme uninstalled successfully.\033[0m"
else
  echo -e "\n\033[33m>>> [INFO] More Gravity Theme was not found in targets.\033[0m"
fi
