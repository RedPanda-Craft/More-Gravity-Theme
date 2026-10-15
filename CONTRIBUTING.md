# Contributing to More Gravity Theme

We welcome community contributions, especially new studio-grade themes ported to Google Antigravity 2.0!

---

## 🎨 Adding a New Theme

1. **Create the Theme File**:
   - Add your CSS file in `themes/<theme-name>.css`.
   - Ensure you declare `:root` with Antigravity host tokens (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--border`, `--sidebar`, `--sidebar-muted`).
   - Follow the 0ms indicator standard:
     ```css
     [data-testid="conversation-row-sidebar"]:not([data-selected="true"])::before {
       content: "";
       position: absolute;
       left: 0;
       top: 7px;
       bottom: 7px;
       width: 3px;
       border-radius: 2px;
       background-color: var(--your-accent);
       opacity: 0;
       pointer-events: none;
     }

     [data-testid="conversation-row-sidebar"]:hover:not([data-selected="true"])::before {
       opacity: 0.65;
     }
     ```

2. **Register in `build_palette.js`**:
   - Add your theme metadata and accent color options to `themes` and `themeAccents` in `build_palette.js`.
   - Run `node build_palette.js` to rebuild `palette.js`.

3. **Submit a Pull Request**:
   - Title: `feat(theme): add <theme-name> theme`
   - Include a screenshot or preview GIF in your PR description.

---

## 📜 Code of Conduct

Please maintain clean, natural English comments and documentation. Keep CSS selectors minimally scoped to protect against host layout regressions.
