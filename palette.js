/**
 * More Gravity Theme - Standalone Micro-Palette (Complete Two-Tier Edition)
 * Zero-framework, ultra-lightweight theme & accent switcher for Antigravity 2.0
 * 
 * Features:
 * - 1:1 original aesthetic theme palette modal
 * - Multi-accent color dots grid for all 5 themes
 * - Flavor switcher for Catppuccin (Mocha, Macchiato, Frappé, Latte)
 * - Seamless in-place stylesheet reconciliation (0ms layout recalc)
 * - Hotkeys: Ctrl+Alt+T / F8 to toggle anywhere
 * - Auto-persists theme and accent selections to localStorage
 */

(function () {
  'use strict';

  if (window.__MORE_GRAVITY_PALETTE_LOADED__) return;
  window.__MORE_GRAVITY_PALETTE_LOADED__ = true;

  const STORAGE_KEY = 'more-gravity-selected-theme';
  const ACCENT_STORAGE_PREFIX = 'more-gravity-accent-';
  const FLAVOR_STORAGE_KEY = 'more-gravity-catppuccin-flavor';
  const STYLE_ID = 'more-gravity-theme-stylesheet';
  const ACCENT_STYLE_ID = 'more-gravity-accent-override';

  const THEMES = [
  {
    "id": "everforest-dark",
    "name": "Everforest Dark",
    "desc": "Natural green-tinted, warm analog palette for comfortable viewing",
    "accent": "#a7c080",
    "swatches": [
      "#181e21",
      "#262e33",
      "#a7c080"
    ],
    "file": "everforest-dark.css"
  },
  {
    "id": "catppuccin-turbo",
    "name": "Catppuccin Mocha",
    "desc": "Soothing pastel color scheme with calibrated high contrast",
    "accent": "#fab387",
    "swatches": [
      "#11111b",
      "#181825",
      "#fab387"
    ],
    "file": "catppuccin-turbo.css"
  },
  {
    "id": "flexoki-dark",
    "name": "Flexoki Dark",
    "desc": "Inky paper tone designed by Steph Ango with zero blue-haze",
    "accent": "#da702c",
    "swatches": [
      "#100f0f",
      "#1c1b1a",
      "#da702c"
    ],
    "file": "flexoki-dark.css"
  },
  {
    "id": "kanagawa-dragon",
    "name": "Kanagawa Dragon",
    "desc": "Sumi-e ink dark peat with warm autumn accents by rebelot",
    "accent": "#b6927b",
    "swatches": [
      "#0d0c0c",
      "#181616",
      "#b6927b"
    ],
    "file": "kanagawa-dragon.css"
  },
  {
    "id": "melange-dark",
    "name": "Melange Dark",
    "desc": "Warm earth peat, stone, and oatmeal typography by miikanissi",
    "accent": "#d47766",
    "swatches": [
      "#161312",
      "#23201d",
      "#d47766"
    ],
    "file": "melange-dark.css"
  }
];
  const THEME_ACCENTS = {
  "everforest-dark": {
    "varName": "--everforest-accent",
    "defaultAccent": "green",
    "accents": [
      {
        "id": "green",
        "name": "Forest Moss",
        "hex": "#a7c080"
      },
      {
        "id": "aqua",
        "name": "Stream Mist",
        "hex": "#83c092"
      },
      {
        "id": "blue",
        "name": "Pine Needle",
        "hex": "#7fbbb3"
      },
      {
        "id": "orange",
        "name": "Autumn Leaf",
        "hex": "#e69875"
      },
      {
        "id": "yellow",
        "name": "Ginkgo Gold",
        "hex": "#dbbc7f"
      },
      {
        "id": "purple",
        "name": "Wild Heather",
        "hex": "#d699b6"
      },
      {
        "id": "red",
        "name": "Maple Berry",
        "hex": "#e67e80"
      }
    ]
  },
  "catppuccin-turbo": {
    "varName": "--catppuccin-accent",
    "defaultAccent": "peach",
    "defaultFlavor": "mocha",
    "flavors": [
      {
        "id": "mocha",
        "name": "Mocha",
        "bg": "#1e1e2e"
      },
      {
        "id": "macchiato",
        "name": "Macchiato",
        "bg": "#24273a"
      },
      {
        "id": "frappe",
        "name": "Frappé",
        "bg": "#303446"
      },
      {
        "id": "latte",
        "name": "Latte",
        "bg": "#eff1f5"
      }
    ],
    "accents": [
      {
        "id": "rosewater",
        "name": "Rosewater",
        "hex": "#f5e0dc"
      },
      {
        "id": "flamingo",
        "name": "Flamingo",
        "hex": "#f2cdcd"
      },
      {
        "id": "pink",
        "name": "Pink",
        "hex": "#f5c2e7"
      },
      {
        "id": "mauve",
        "name": "Mauve",
        "hex": "#cba6f7"
      },
      {
        "id": "red",
        "name": "Red",
        "hex": "#f38ba8"
      },
      {
        "id": "maroon",
        "name": "Maroon",
        "hex": "#eba0ac"
      },
      {
        "id": "peach",
        "name": "Peach",
        "hex": "#fab387"
      },
      {
        "id": "yellow",
        "name": "Yellow",
        "hex": "#f9e2af"
      },
      {
        "id": "green",
        "name": "Green",
        "hex": "#a6e3a1"
      },
      {
        "id": "teal",
        "name": "Teal",
        "hex": "#94e2d5"
      },
      {
        "id": "sky",
        "name": "Sky",
        "hex": "#89dceb"
      },
      {
        "id": "sapphire",
        "name": "Sapphire",
        "hex": "#74c7ec"
      },
      {
        "id": "blue",
        "name": "Blue",
        "hex": "#89b4fa"
      },
      {
        "id": "lavender",
        "name": "Lavender",
        "hex": "#b4befe"
      }
    ]
  },
  "flexoki-dark": {
    "varName": "--flexoki-accent",
    "defaultAccent": "orange",
    "accents": [
      {
        "id": "red",
        "name": "Cinnabar Red",
        "hex": "#D14D41"
      },
      {
        "id": "orange",
        "name": "Ochre Orange",
        "hex": "#DA702C"
      },
      {
        "id": "yellow",
        "name": "Orpiment Yellow",
        "hex": "#D0A215"
      },
      {
        "id": "green",
        "name": "Malachite Green",
        "hex": "#879A39"
      },
      {
        "id": "cyan",
        "name": "Turquoise Cyan",
        "hex": "#3AA99F"
      },
      {
        "id": "blue",
        "name": "Azurite Blue",
        "hex": "#4385BE"
      },
      {
        "id": "purple",
        "name": "Iolite Purple",
        "hex": "#8B7EC8"
      },
      {
        "id": "magenta",
        "name": "Fluorite Magenta",
        "hex": "#CE5D97"
      }
    ]
  },
  "kanagawa-dragon": {
    "varName": "--kanagawa-accent",
    "defaultAccent": "orange",
    "accents": [
      {
        "id": "orange",
        "name": "Autumn Ochre",
        "hex": "#b6927b"
      },
      {
        "id": "green",
        "name": "Moss Bamboo",
        "hex": "#87a987"
      },
      {
        "id": "blue",
        "name": "Deep Indigo",
        "hex": "#658594"
      },
      {
        "id": "yellow",
        "name": "Carp Gold",
        "hex": "#c4b28a"
      },
      {
        "id": "aqua",
        "name": "Stream Foam",
        "hex": "#8ba4b0"
      },
      {
        "id": "pink",
        "name": "Faded Plum",
        "hex": "#a292a3"
      },
      {
        "id": "red",
        "name": "Seal Vermilion",
        "hex": "#c4746e"
      },
      {
        "id": "violet",
        "name": "Iris Sumi",
        "hex": "#8992a7"
      }
    ]
  },
  "melange-dark": {
    "varName": "--melange-accent",
    "defaultAccent": "red",
    "accents": [
      {
        "id": "red",
        "name": "Peat Vermilion",
        "hex": "#d47766"
      },
      {
        "id": "orange",
        "name": "Warm Orange",
        "hex": "#eb9982"
      },
      {
        "id": "yellow",
        "name": "Sandstone Yellow",
        "hex": "#e49b5d"
      },
      {
        "id": "green",
        "name": "Moss Green",
        "hex": "#85b695"
      },
      {
        "id": "blue",
        "name": "Slate Blue",
        "hex": "#78997a"
      },
      {
        "id": "purple",
        "name": "Heather Purple",
        "hex": "#b380b0"
      }
    ]
  }
};
  const BUNDLED_CSS = {"everforest-dark":"/**\n * @name        Everforest Dark\n * @description A natural green-tinted, warm analog color scheme designed by sainnhe for comfortable, long-duration viewing.\n * @author      sainnhe (adapted for BetterGravity)\n * @version     1.0.0\n * @source      https://github.com/sainnhe/everforest\n */\n\n/* ==========================================================================\n   0. Everforest Dark Palette Definition (Default: Medium Variant)\n   ========================================================================== */\n:root {\n  /* --- Everforest Dark Base Scale (Medium Variant - Calibrated Deep Tone) --- */\n  --ef-bg-dim:    #181e21; /* Gutter, statusline, titlebar background (L ~11%) */\n  --ef-bg0:       #1e2529; /* Primary workspace canvas, editor background (L ~13.8%) */\n  --ef-bg1:       #262e33; /* Layer 1: Composer, message bubbles, elevated cards (L ~17.5%) */\n  --ef-bg2:       #2f383e; /* Layer 2: Popovers, active rows, dropdowns (L ~21.5%) */\n  --ef-bg3:       #38434a; /* Layer 3: Borders, dividers, subtle separators */\n  --ef-bg4:       #414e56; /* Layer 4: Inactive borders, secondary dividers */\n  --ef-bg5:       #4b5860; /* Layer 5: Row hover, inactive button borders */\n\n  /* --- Everforest Foreground & Typography Scale --- */\n  --ef-fg:        #d3c6aa; /* Primary body text (Warm parchment rice paper) */\n  --ef-grey2:     #9da9a0; /* Secondary text, metadata timestamps */\n  --ef-grey1:     #859289; /* Section labels, inactive triggers */\n  --ef-grey0:     #7a8478; /* Comments, placeholders, resting scrollbar */\n\n  /* --- 7 Natural Forest Accents (Dark Scale) --- */\n  --ef-green:     #a7c080; /* Forest Moss (Default Signature Accent) */\n  --ef-aqua:      #83c092; /* Stream Mist */\n  --ef-blue:      #7fbbb3; /* Pine Needle */\n  --ef-orange:    #e69875; /* Autumn Leaf */\n  --ef-yellow:    #dbbc7f; /* Ginkgo Gold */\n  --ef-purple:    #d699b6; /* Wild Heather */\n  --ef-red:       #e67e80; /* Maple Berry */\n\n  /* --- Primary Theme Accent & Breathing Auras --- */\n  --everforest-accent: var(--ef-green);\n  --everforest-accent-soft: rgba(167, 192, 128, 0.16);\n  --everforest-accent-glow: rgba(167, 192, 128, 0.28);\n  --bettergravity-accent: var(--everforest-accent);\n  --bettergravity-accent-soft: var(--everforest-accent-soft);\n\n  /* ==========================================================================\n     1. Host Native Design Tokens (Antigravity 2.0 / Willow)\n     ========================================================================== */\n  --background: var(--ef-bg0) !important;\n  --foreground: var(--ef-fg) !important;\n\n  --primary: var(--everforest-accent) !important;\n  --primary-foreground: var(--ef-bg-dim) !important;\n  --secondary: var(--ef-bg1) !important;\n  --secondary-foreground: var(--ef-fg) !important;\n\n  --muted: var(--ef-bg-dim) !important;\n  --muted-foreground: var(--ef-grey1) !important;\n\n  --border: var(--ef-bg3) !important;\n  --card: var(--ef-bg1) !important;\n  --card-border: var(--ef-bg3) !important;\n\n  --sidebar: var(--ef-bg-dim) !important;\n  --sidebar-secondary: var(--ef-bg1) !important;\n  --sidebar-muted: var(--ef-bg1) !important;\n\n  --placeholder: var(--ef-grey0) !important;\n  --link: var(--ef-blue) !important;\n  --focus-ring-color: var(--everforest-accent) !important;\n\n  --error: var(--ef-red) !important;\n  --warning: var(--ef-yellow) !important;\n  --success: var(--ef-green) !important;\n  --code-foreground: var(--everforest-accent) !important;\n\n  /* ==========================================================================\n     2. BetterGravity Shared Runtime Namespace\n     ========================================================================== */\n  --bettergravity-surface: var(--ef-bg1);\n  --bettergravity-border: var(--ef-bg3);\n  --bettergravity-text: var(--ef-fg);\n  --bettergravity-row-hover: rgba(211, 198, 170, 0.07);\n\n  /* ==========================================================================\n     3. Gemini App & Willow Shell Tokens\n     ========================================================================== */\n  --studio-surface: var(--ef-bg-dim) !important;\n  --gemini-page-bg: var(--ef-bg0) !important;\n  --gemini-surface: var(--ef-bg1) !important;\n  --gemini-surface-hover: var(--ef-bg2) !important;\n  --gemini-trigger-hover: var(--ef-bg2) !important;\n  --gemini-control-hover: var(--ef-bg2) !important;\n  --gemini-separator: var(--ef-bg3) !important;\n  --gemini-switch-track: var(--ef-bg-dim) !important;\n  --gemini-switch-slider: var(--ef-bg1) !important;\n  --gemini-body-text: var(--ef-fg) !important;\n  --gemini-text: var(--ef-fg) !important;\n  --gemini-text-trigger: var(--ef-grey1) !important;\n  --gemini-text-trigger-hover: var(--ef-fg) !important;\n  --gemini-text-dim: var(--ef-grey1) !important;\n  --gemini-bubble-bg: var(--ef-bg1) !important;\n  --gemini-composer-bg: var(--ef-bg1) !important;\n  --gemini-composer-placeholder: var(--ef-grey0) !important;\n  --gemini-inline-code-bg: var(--ef-bg-dim) !important;\n  --gemini-inline-code-text: var(--everforest-accent) !important;\n  --gemini-link: var(--ef-blue) !important;\n  --gemini-send-bg: var(--everforest-accent) !important;\n  --gemini-send-bg-hover: #96af70 !important;\n  --gemini-home-glow-accent: var(--everforest-accent-soft) !important;\n  --gemini-row-selected: var(--ef-bg2) !important;\n  --gemini-row-hover: rgba(211, 198, 170, 0.07) !important;\n}\n\n/* ==========================================================================\n   4. Turbo Engine & Paint Optimization\n   ========================================================================== */\n[data-testid=\"user-input-step\"],\n[data-testid=\"planner-response-text\"],\n[role=\"article\"][aria-label=\"Agent response\"],\n[role=\"article\"][aria-label=\"User message\"] {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 120px;\n}\n\nbody,\n#root,\n[data-testid=\"conversation-view\"] {\n  text-shadow: none !important;\n  color-scheme: dark !important;\n}\n\n/* ==========================================================================\n   5. Window Shell, TitleBar & Window Drag Boundaries\n   ========================================================================== */\n\n\n[data-testid=\"window-titlebar\"],\nheader,\n.titlebar {\n  background: var(--ef-bg-dim) !important;\n  border-bottom: 1px solid var(--ef-bg3) !important;\n  user-select: none;\n}\n\n[data-testid=\"sidebar-toggle\"],\n[data-bettergravity-button],\ndiv.go-back-btn,\nbutton[aria-label=\"Go Back\"] {\n  flex-shrink: 0 !important;\n  -webkit-app-region: no-drag !important;\n}\n\n/* ==========================================================================\n   6. Navigation & Sidebar Refinements\n   ========================================================================== */\n[role=\"navigation\"][aria-label=\"Sidebar\"],\n[role=\"navigation\"] {\n  background-color: var(--ef-bg-dim) !important;\n  border-right: 1px solid var(--ef-bg3) !important;\n}\n\nhtml body [role=\"navigation\"] .bg-sidebar,\nhtml body [role=\"navigation\"] div[class*=\"bg-sidebar\"]:not([data-testid=\"conversation-row-sidebar\"]) {\n  background-color: var(--ef-bg-dim) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] {\n  border-radius: 8px !important;\n  margin: 1px 6px !important;\n  transition: background-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\n  --row-bg: transparent !important;\n  background-color: transparent !important;\n  position: relative !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover {\n  --row-bg: var(--ef-bg1) !important;\n  background-color: var(--ef-bg1) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"],\nhtml body [role=\"navigation\"] div[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"] {\n  --row-bg: var(--ef-bg2) !important;\n  background-color: var(--ef-bg2) !important;\n  color: var(--ef-fg) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] div[class*=\"can-hover\"],\n[data-testid=\"conversation-row-sidebar\"] div[style*=\"linear-gradient\"] {\n  background: linear-gradient(to right, transparent 0%, var(--row-bg) 24%) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"] {\n  color: var(--ef-grey2) !important;\n  background-color: transparent !important;\n  opacity: 0.85 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"]:hover {\n  color: var(--ef-fg) !important;\n  background-color: rgba(255, 255, 255, 0.08) !important;\n  opacity: 1 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:not([data-selected=\"true\"])::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 7px;\n  bottom: 7px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--everforest-accent);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover:not([data-selected=\"true\"])::before {\n  opacity: 0.65;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 6px;\n  bottom: 6px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--everforest-accent);\n  opacity: 1;\n}\n\n[data-testid=\"conversation-row-sidebar\"] span.truncate {\n  color: var(--ef-fg) !important;\n}\n\n[role=\"navigation\"] [data-testid=\"section-header\"] {\n  color: var(--ef-grey1) !important;\n}\n\n/* ==========================================================================\n   7. Typography, Markdown & Digital Forest Flow\n   ========================================================================== */\n::selection {\n  background: var(--everforest-accent-soft) !important;\n  color: #ffffff !important;\n}\n\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 8px;\n  background-clip: content-box;\n  background-color: var(--ef-grey0);\n  transition: background-color 150ms ease;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: var(--everforest-accent);\n}\n\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* Headings in warm parchment rice paper tone */\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) :is(h1, h2, h3, h4, h5, h6) {\n  color: #ede2c8 !important;\n  font-weight: 650;\n  letter-spacing: -0.015em;\n}\n\n/* Markdown Blockquotes: Warm forest moss accent */\nblockquote {\n  position: relative !important;\n  border-left: 3px solid var(--everforest-accent) !important;\n  background: var(--everforest-accent-soft) !important;\n  border-radius: 0 8px 8px 0 !important;\n  padding: 8px 16px !important;\n  margin: 12px 0 !important;\n  color: var(--ef-grey2) !important;\n  font-style: italic !important;\n}\n\n/* Markdown Tables */\ntable {\n  width: 100%;\n  border-collapse: separate !important;\n  border-spacing: 0 !important;\n  margin: 14px 0 !important;\n  border: 1px solid var(--ef-bg3) !important;\n  border-radius: 8px !important;\n  overflow: hidden !important;\n}\n\nth {\n  background-color: var(--ef-bg-dim) !important;\n  color: var(--ef-fg) !important;\n  font-weight: 600 !important;\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--ef-bg3) !important;\n  border-right: 1px solid var(--ef-bg3) !important;\n}\n\nth:last-child {\n  border-right: none !important;\n}\n\ntd {\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--ef-bg3) !important;\n  border-right: 1px solid var(--ef-bg3) !important;\n  color: var(--ef-grey2) !important;\n}\n\ntd:last-child {\n  border-right: none !important;\n}\n\ntr:last-child td {\n  border-bottom: none !important;\n}\n\ntr:nth-child(even) td {\n  background-color: var(--ef-bg1) !important;\n}\n\ntr:hover td {\n  background-color: var(--bettergravity-row-hover) !important;\n}\n\n/* Inline Code Badges */\n:not(pre) > code,\ncode:not(pre code) {\n  background-color: var(--ef-bg-dim) !important;\n  color: var(--gemini-inline-code-text, var(--everforest-accent)) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  padding: 2px 6px !important;\n  border-radius: 6px !important;\n  font-size: 0.88em !important;\n  font-family: var(--gemini-code-font, ui-monospace, SFMono-Regular, Consolas, monospace) !important;\n}\n\n/* Code Blocks Container */\npre,\n.code-block,\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) div.relative.rounded-xl {\n  background-color: var(--ef-bg-dim) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  border-radius: 12px !important;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n}\n\npre code,\n.line-content {\n  color: var(--ef-fg) !important;\n}\n\n/* ==========================================================================\n   8. Prism & Tree-sitter Syntax Tokens (Everforest Dark Palette)\n   ========================================================================== */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: var(--ef-grey0) !important;\n  font-style: italic;\n}\n\n.token.keyword,\n.token.selector,\n.token.important {\n  color: var(--ef-purple) !important;\n  font-weight: 550;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.inserted {\n  color: var(--ef-green) !important;\n}\n\n.token.number,\n.token.boolean,\n.token.constant {\n  color: var(--ef-orange) !important;\n}\n\n.token.function,\n.token.class-name {\n  color: var(--ef-blue) !important;\n}\n\n.token.property,\n.token.builtin {\n  color: var(--ef-aqua) !important;\n}\n\n.token.tag,\n.token.deleted {\n  color: var(--ef-red) !important;\n}\n\n.token.operator,\n.token.punctuation {\n  color: var(--ef-yellow) !important;\n}\n\n/* ==========================================================================\n   9. Chat Composer (Prompt Box) & Forest Breathing Inset Aura\n   ========================================================================== */\n[data-testid=\"agent-input-box\"] {\n  background: transparent !important;\n}\n\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu]) {\n  background: var(--ef-bg1) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;\n}\n\n/* Inset breathing glow tailored for moss green */\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  content: \"\" !important;\n  position: absolute !important;\n  inset: 0 !important;\n  border-radius: inherit !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n  box-shadow: inset 0 0 4px 1px var(--everforest-accent),\n              inset 0 0 16px 2px var(--everforest-accent-soft) !important;\n  opacity: 0;\n  transition: opacity 160ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n[data-testid=\"agent-input-box\"]:focus-within > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  opacity: 0.35;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] {\n  color: var(--ef-fg) !important;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] ~ * {\n  color: var(--ef-grey0) !important;\n}\n\n/* Send button */\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]) {\n  background-color: var(--everforest-accent) !important;\n  color: var(--ef-bg-dim) !important;\n  border-radius: 8px !important;\n  cursor: pointer !important;\n  box-shadow: 0 2px 8px var(--everforest-accent-glow) !important;\n}\n\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):hover {\n  filter: brightness(1.1) !important;\n  transform: translateY(-1px) scale(1.02);\n}\n\n[data-testid=\"send-button\"]:disabled,\n[data-testid=\"send-button\"][disabled],\n[data-testid=\"send-button\"][aria-disabled=\"true\"] {\n  background-color: var(--ef-bg2) !important;\n  color: var(--ef-grey0) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  opacity: 0.6 !important;\n}\n\n/* New Conversation button */\n[data-testid=\"new-conversation-button\"] {\n  background: var(--ef-bg1) !important;\n  color: var(--ef-fg) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  border-radius: 8px !important;\n}\n\n[data-testid=\"new-conversation-button\"]:hover {\n  background: var(--ef-bg2) !important;\n  border-color: var(--everforest-accent) !important;\n  box-shadow: 0 2px 10px var(--everforest-accent-soft) !important;\n}\n\n/* ==========================================================================\n   10. Dialogs, Popovers & Context Menus\n   ========================================================================== */\n[role=\"dialog\"],\n[role=\"menu\"],\n[data-radix-popper-content-wrapper] > div,\n.bg-popover {\n  background-color: var(--ef-bg1) !important;\n  border: 1px solid var(--ef-bg3) !important;\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.04) !important;\n  border-radius: 12px !important;\n  color: var(--ef-fg) !important;\n}\n","catppuccin-turbo":"/**\r\n * @name        Catppuccin Turbo\r\n * @description Ultra-fast, host-aligned Catppuccin theme for Antigravity 2.0 / BetterGravity 3.0 with Mocha & Latte support.\r\n * @author      RedPanda-Craft\r\n * @version     2.0.1\r\n * @source      https://github.com/catppuccin/catppuccin\r\n */\r\n\r\n/* ==========================================================================\r\n   0. User Accent & Palette Presets (Obsidian-Style Hot-Reload Configuration)\r\n   ========================================================================== */\r\n:root {\r\n  /* Catppuccin 14 Official Accent Colors */\r\n  --ctp-rosewater: #f5e0dc;\r\n  --ctp-flamingo:  #f2cdcd;\r\n  --ctp-pink:      #f5c2e7;\r\n  --ctp-mauve:     #cba6f7;\r\n  --ctp-red:       #f38ba8;\r\n  --ctp-maroon:    #eba0ac;\r\n  --ctp-peach:     #fab387;\r\n  --ctp-yellow:    #f9e2af;\r\n  --ctp-green:     #a6e3a1;\r\n  --ctp-teal:      #94e2d5;\r\n  --ctp-sky:       #89dceb;\r\n  --ctp-sapphire:  #74c7ec;\r\n  --ctp-blue:      #89b4fa;\r\n  --ctp-lavender:  #b4befe;\r\n\r\n  /* Catppuccin Mocha Base Palette Scales */\r\n  --ctp-crust:     #11111b;\r\n  --ctp-mantle:    #181825;\r\n  --ctp-base:      #1e1e2e;\r\n  --ctp-surface0:  #313244;\r\n  --ctp-surface1:  #45475a;\r\n  --ctp-surface2:  #585b70;\r\n  --ctp-overlay0:  #6c7086;\r\n  --ctp-overlay1:  #7f849c;\r\n  --ctp-overlay2:  #9399b2;\r\n  --ctp-subtext0:  #a6adc8;\r\n  --ctp-subtext1:  #bac2de;\r\n  --ctp-text:      #cdd6f4;\r\n\r\n  /* User Accent Preset Switch: Edit variable below to switch global accent color */\r\n  --catppuccin-accent: var(--ctp-peach);\r\n  --catppuccin-button-accent: var(--catppuccin-accent);\r\n  --catppuccin-accent-glow: rgba(250, 179, 135, 0.22);\r\n}\r\n\r\n/* ==========================================================================\r\n   1. Design Tokens: Antigravity Host & BetterGravity Shared Namespace\r\n   ========================================================================== */\r\n:root {\r\n  /* --- 1.1 Antigravity Host Native Tokens --- */\r\n  --background: var(--ctp-crust) !important;\r\n  --foreground: var(--ctp-text) !important;\r\n\r\n  --primary: var(--catppuccin-accent) !important;\r\n  --primary-foreground: var(--ctp-crust) !important;\r\n  --secondary: var(--ctp-mantle) !important;\r\n  --secondary-foreground: var(--ctp-text) !important;\r\n\r\n  --muted: var(--ctp-crust) !important;\r\n  --muted-foreground: var(--ctp-subtext0) !important;\r\n\r\n  --border: var(--ctp-surface0) !important;\r\n  --card: var(--ctp-mantle) !important;\r\n  --card-border: var(--ctp-surface0) !important;\r\n\r\n  --sidebar: var(--ctp-crust) !important;\r\n  --sidebar-secondary: var(--ctp-mantle) !important;\r\n  --sidebar-muted: var(--ctp-mantle) !important;\r\n\r\n  --placeholder: var(--ctp-overlay0) !important;\r\n  --link: var(--ctp-blue) !important;\r\n  --focus-ring-color: var(--catppuccin-accent) !important;\r\n\r\n  --error: var(--ctp-red) !important;\r\n  --warning: var(--ctp-yellow) !important;\r\n  --success: var(--ctp-green) !important;\r\n\r\n  --code-foreground: var(--ctp-rosewater) !important;\r\n\r\n  /* --- 1.2 BetterGravity Shared Runtime Tokens --- */\r\n  --bettergravity-accent: var(--catppuccin-accent);\r\n  --bettergravity-accent-soft: var(--catppuccin-accent-glow);\r\n  --bettergravity-surface: var(--ctp-mantle);\r\n  --bettergravity-border: var(--ctp-surface0);\r\n  --bettergravity-text: var(--ctp-text);\r\n  --bettergravity-row-hover: rgba(205, 214, 244, 0.08);\r\n}\r\n\r\n/* ==========================================================================\r\n   2. Turbo Performance Engine (Containment, Paint & GPU Optimization)\r\n   ========================================================================== */\r\n\r\n/* 2.1 Render Containment - Suppress reflow & repaint overhead across long chat cascades */\r\n[data-testid=\"user-input-step\"],\r\n[data-testid=\"planner-response-text\"],\r\n[role=\"article\"][aria-label=\"Agent response\"],\r\n[role=\"article\"][aria-label=\"User message\"] {\r\n  content-visibility: auto;\r\n  contain-intrinsic-size: auto 120px;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"] {\r\n  content-visibility: auto;\r\n  contain-intrinsic-size: auto 38px;\r\n}\r\n\r\npre,\r\n.code-block {\r\n  content-visibility: auto;\r\n  contain-intrinsic-size: auto 160px;\r\n}\r\n\r\n/* 2.2 Strip expensive GPU raster filters (backdrop blur & text shadows) */\r\nbody,\r\n#root,\r\n[data-testid=\"conversation-view\"] {\r\n  text-shadow: none !important;\r\n}\r\n\r\n/* 2.3 Natural Micro-Transitions (120ms~150ms smooth physics, zero sluggish delays) */\r\nbutton:not([data-no-transition]),\r\n[role=\"button\"],\r\na,\r\n.bg-tree-toggle-btn,\r\n.bg-branch-btn,\r\n.bettergravity-pet__badge {\r\n  transition: background-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1),\r\n              color 140ms cubic-bezier(0.2, 0.8, 0.2, 1),\r\n              border-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\r\n}\r\n\r\n/* 2.4 Instant Keyframe Overrides (Antigravity native entrance animations) */\r\n@keyframes fade-in { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } }\r\n@keyframes blobEntrance { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } }\r\n@keyframes parentFade { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } }\r\n@keyframes logoEntrance { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } }\r\n@keyframes textEntrance { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } }\r\n@keyframes spin { to { transform: rotate(360deg); } }\r\n\r\n/* ==========================================================================\r\n   3. Host Native Layout & Immersive Window Shell (TitleBar & Sidebar)\r\n   ========================================================================== */\r\n\r\n\r\n\r\n/* Immersive titlebar layout and boundary preservation */\r\n[data-testid=\"window-titlebar\"],\r\nheader,\r\n.titlebar {\r\n  background: var(--ctp-crust) !important;\r\n  border-bottom: 1px solid var(--ctp-surface0) !important;\r\n  user-select: none;\r\n}\r\n\r\n/* Ensure titlebar buttons and plugin anchors never wrap or compress */\r\n[data-testid=\"sidebar-toggle\"],\r\n[data-bettergravity-button],\r\ndiv.go-back-btn, button[aria-label=\"Go Back\"] {\r\n  flex-shrink: 0 !important;\r\n  -webkit-app-region: no-drag !important;\r\n}\r\n\r\n/* Truncated header text protection */\r\n[data-testid=\"window-titlebar\"] span.truncate,\r\nheader .truncate {\r\n  min-width: 0 !important;\r\n  flex: 1 1 auto !important;\r\n}\r\n\r\n/* 3.2 Navigation & Sidebar Refinements */\r\n[role=\"navigation\"][aria-label=\"Sidebar\"] {\r\n  background-color: var(--ctp-crust) !important;\r\n  border-right: 1px solid var(--ctp-surface0) !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"] {\r\n  border-radius: 8px !important;\r\n  margin: 1px 6px !important;\r\n  transition: background-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\r\n  --row-bg: transparent !important;\r\n  background-color: transparent !important;\r\n  position: relative !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"]:hover {\r\n  --row-bg: var(--ctp-mantle) !important;\r\n  background-color: var(--ctp-mantle) !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"] {\r\n  --row-bg: var(--ctp-surface0) !important;\r\n  background-color: var(--ctp-surface0) !important;\r\n  color: var(--ctp-text) !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"] div[class*=\"can-hover\"],\r\n[data-testid=\"conversation-row-sidebar\"] div[style*=\"linear-gradient\"] {\r\n  background: linear-gradient(to right, transparent 0%, var(--row-bg) 24%) !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"] {\r\n  color: var(--ctp-overlay1) !important;\r\n  background-color: transparent !important;\r\n  opacity: 0.85 !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"]:hover {\r\n  color: var(--ctp-text) !important;\r\n  background-color: rgba(255, 255, 255, 0.08) !important;\r\n  opacity: 1 !important;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"]:not([data-selected=\"true\"])::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 7px;\r\n  bottom: 7px;\r\n  width: 3px;\r\n  border-radius: 2px;\r\n  background-color: var(--catppuccin-accent);\r\n  opacity: 0;\r\n  pointer-events: none;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"]:hover:not([data-selected=\"true\"])::before {\r\n  opacity: 0.65;\r\n}\r\n\r\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"]::before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 6px;\r\n  bottom: 6px;\r\n  width: 3px;\r\n  border-radius: 2px;\r\n  background-color: var(--catppuccin-accent);\r\n  opacity: 1;\r\n}\r\n\r\n/* 3.3 Dialogs, Menus & Radix Popovers */\r\n[role=\"dialog\"],\r\n[role=\"menu\"],\r\n[data-radix-popper-content-wrapper] > div,\r\n.bg-popover {\r\n  background-color: var(--ctp-mantle) !important;\r\n  border: 1px solid var(--ctp-surface1) !important;\r\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.55), 0 0 1px 1px rgba(255, 255, 255, 0.05) !important;\r\n  border-radius: 12px !important;\r\n}\r\n\r\n/* ==========================================================================\r\n   4. Typography, Markdown & Chat Aesthetics\r\n   ========================================================================== */\r\n\r\n/* 4.0 Color Schemes & Contrast Adaptive Overrides (Mocha / Latte) */\r\nbody.ctp-latte-mode {\r\n  color-scheme: light !important;\r\n}\r\nbody:not(.ctp-latte-mode) {\r\n  color-scheme: dark !important;\r\n}\r\n\r\n/* 4.1 Text Selection & Slim Smooth Scrollbars */\r\n::selection {\r\n  background: var(--catppuccin-accent-glow) !important;\r\n  color: var(--ctp-text) !important;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  width: 7px;\r\n  height: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  border: 2px solid transparent;\r\n  border-radius: 8px;\r\n  background-clip: content-box;\r\n  background-color: var(--ctp-surface2, rgba(205, 214, 244, 0.2));\r\n  transition: background-color 150ms ease;\r\n}\r\n\r\n::-webkit-scrollbar-thumb:hover {\r\n  background-color: var(--catppuccin-accent);\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n  background: transparent;\r\n}\r\n\r\n/* 4.2 Markdown Blockquotes & Callout Highlights */\r\nblockquote {\r\n  position: relative !important;\r\n  border-left: 3px solid var(--catppuccin-accent) !important;\r\n  background: var(--catppuccin-accent-glow) !important;\r\n  border-radius: 0 8px 8px 0 !important;\r\n  padding: 8px 16px !important;\r\n  margin: 12px 0 !important;\r\n  color: var(--ctp-subtext1) !important;\r\n  font-style: italic !important;\r\n}\r\n\r\n/* 4.3 Markdown Tables & Alternate Row Gradients */\r\ntable {\r\n  width: 100%;\r\n  border-collapse: separate !important;\r\n  border-spacing: 0 !important;\r\n  margin: 14px 0 !important;\r\n  border: 1px solid var(--ctp-surface0) !important;\r\n  border-radius: 8px !important;\r\n  overflow: hidden !important;\r\n}\r\n\r\nth {\r\n  background-color: var(--ctp-mantle) !important;\r\n  color: var(--ctp-text) !important;\r\n  font-weight: 600 !important;\r\n  padding: 8px 12px !important;\r\n  border-bottom: 1px solid var(--ctp-surface0) !important;\r\n  border-right: 1px solid var(--ctp-surface0) !important;\r\n}\r\n\r\nth:last-child {\r\n  border-right: none !important;\r\n}\r\n\r\ntd {\r\n  padding: 8px 12px !important;\r\n  border-bottom: 1px solid var(--ctp-surface0) !important;\r\n  border-right: 1px solid var(--ctp-surface0) !important;\r\n  color: var(--ctp-subtext1) !important;\r\n}\r\n\r\ntd:last-child {\r\n  border-right: none !important;\r\n}\r\n\r\ntr:last-child td {\r\n  border-bottom: none !important;\r\n}\r\n\r\ntr:nth-child(even) td {\r\n  background-color: var(--ctp-mantle) !important;\r\n}\r\n\r\ntr:hover td {\r\n  background-color: var(--bettergravity-row-hover) !important;\r\n}\r\n\r\n/* 4.4 Inline Code Badges */\r\n:not(pre) > code {\r\n  background-color: var(--ctp-mantle) !important;\r\n  color: var(--catppuccin-accent) !important;\r\n  border: 1px solid var(--ctp-surface0) !important;\r\n  padding: 2px 6px !important;\r\n  border-radius: 6px !important;\r\n  font-size: 0.88em !important;\r\n  font-family: var(--gemini-code-font, ui-monospace, SFMono-Regular, Consolas, monospace) !important;\r\n}\r\n\r\n/* 4.5 Code Blocks & Action Button Micro-Interactions */\r\npre {\r\n  background-color: var(--ctp-crust) !important;\r\n  border: 1px solid var(--ctp-surface0) !important;\r\n  border-radius: 12px !important;\r\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;\r\n}\r\n\r\n/* ==========================================================================\r\n   5. Precision Component Controls & Micro-Interactions\r\n   ========================================================================== */\r\n\r\n/* 5.1 Native Input Box Container (Pure transparent layout wrapper, eliminate double-box nesting) */\r\nbody:not(.gemini-app-loaded) [data-testid=\"agent-input-box\"],\r\n[data-testid=\"agent-input-box\"] {\r\n  background: transparent !important;\r\n  background-color: transparent !important;\r\n  border: none !important;\r\n  border-radius: 0 !important;\r\n  box-shadow: none !important;\r\n  transition: none !important;\r\n}\r\n\r\nbody:not(.gemini-app-loaded) [data-testid=\"agent-input-box\"]:focus-within,\r\n[data-testid=\"agent-input-box\"]:focus-within {\r\n  border: none !important;\r\n  box-shadow: none !important;\r\n  outline: none !important;\r\n}\r\n\r\n/* 5.2 Send Button Micro-Interactions (Active & Disabled) */\r\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]) {\r\n  background-color: var(--catppuccin-button-accent) !important;\r\n  color: var(--ctp-crust) !important;\r\n  border-radius: 8px !important;\r\n  cursor: pointer !important;\r\n  box-shadow: 0 2px 8px var(--catppuccin-accent-glow) !important;\r\n  transform: translateZ(0);\r\n}\r\n\r\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):hover {\r\n  filter: brightness(1.1) !important;\r\n  transform: translateY(-1px) scale(1.02);\r\n  box-shadow: 0 4px 12px var(--catppuccin-accent-glow) !important;\r\n}\r\n\r\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):active {\r\n  transform: translateY(0) scale(0.97);\r\n}\r\n\r\n[data-testid=\"send-button\"]:disabled,\r\n[data-testid=\"send-button\"][disabled],\r\n[data-testid=\"send-button\"][aria-disabled=\"true\"] {\r\n  background-color: var(--ctp-surface0) !important;\r\n  color: var(--ctp-overlay0) !important;\r\n  border: 1px solid var(--ctp-surface1) !important;\r\n  border-radius: 8px !important;\r\n  opacity: 0.65 !important;\r\n  cursor: not-allowed !important;\r\n}\r\n\r\n/* 5.3 New Conversation Button Micro-Interactions */\r\n[data-testid=\"new-conversation-button\"] {\r\n  background: var(--ctp-surface0) !important;\r\n  color: var(--ctp-text) !important;\r\n  border: 1px solid var(--ctp-surface1) !important;\r\n  border-radius: 8px !important;\r\n}\r\n\r\n[data-testid=\"new-conversation-button\"]:hover {\r\n  background: var(--ctp-surface1) !important;\r\n  border-color: var(--catppuccin-accent) !important;\r\n  box-shadow: 0 2px 10px var(--catppuccin-accent-glow) !important;\r\n}\r\n\r\n/* ==========================================================================\r\n   6. Multi-Plugin Ecosystem Compatibility & Collaboration\r\n   ========================================================================== */\r\n\r\n/* --------------------------------------------------------------------------\r\n   6.1 Gemini-app Interoperability & Navigation Flex Lock\r\n   -------------------------------------------------------------------------- */\r\n/* Lock topbar navigation arrows against compression or line wraps */\r\ndiv.go-back-btn, button[aria-label=\"Go Back\"],\r\n[data-testid=\"sidebar-toggle\"][aria-label*=\"Toggle Sidebar\"] + div {\r\n  flex-shrink: 0 !important;\r\n  display: inline-flex !important;\r\n  align-items: center !important;\r\n  z-index: 60 !important;\r\n  -webkit-app-region: no-drag !important;\r\n}\r\n\r\n/* Branch switcher pagination alignment beneath user message bubble */\r\n.gemini-branch-switcher,\r\n.bg-branch-switcher {\r\n  display: inline-flex !important;\r\n  align-items: center !important;\r\n  margin-top: 6px !important;\r\n  margin-bottom: 2px !important;\r\n  background: var(--ctp-mantle) !important;\r\n  border: 1px solid var(--ctp-surface0) !important;\r\n  border-radius: 9999px !important;\r\n  color: var(--ctp-subtext0) !important;\r\n  font-size: 11px !important;\r\n}\r\n\r\n.gemini-branch-nav-btn:hover,\r\n.bg-branch-switcher-nav:hover:not(:disabled) {\r\n  background-color: var(--catppuccin-accent-glow) !important;\r\n  color: var(--catppuccin-accent) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   6.2 Desktop Pets Companion Interoperability & Anchor Protection\r\n   -------------------------------------------------------------------------- */\r\n/* Protect topbar & sidebar paw buttons and accent palette triggers */\r\n[data-bettergravity-button=\"Pet\"],\r\n[data-bettergravity-button=\"Pets\"],\r\n[data-bettergravity-button=\"Cards\"],\r\n[data-bettergravity-button=\"Accent\"],\r\n[data-bettergravity-button=\"Voyager\"] {\r\n  display: inline-flex !important;\r\n  align-items: center !important;\r\n  justify-content: center !important;\r\n  flex-shrink: 0 !important;\r\n  color: var(--ctp-text) !important;\r\n  border-radius: 9999px !important;\r\n  background: transparent !important;\r\n  -webkit-app-region: no-drag !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Pet\"] > svg,\r\n[data-bettergravity-button=\"Accent\"] > svg {\r\n  width: 20px !important;\r\n  height: 20px !important;\r\n  flex-shrink: 0 !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Pets\"] > svg {\r\n  box-sizing: border-box !important;\r\n  width: 32px !important;\r\n  height: 32px !important;\r\n  padding: 6px !important;\r\n  flex-shrink: 0 !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Cards\"] > svg {\r\n  width: 16px !important;\r\n  height: 16px !important;\r\n  padding: 0 !important;\r\n  flex-shrink: 0 !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Voyager\"] > svg {\r\n  width: 21px !important;\r\n  height: 21px !important;\r\n  flex-shrink: 0 !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Pet\"]:hover,\r\n[data-bettergravity-button=\"Pets\"]:hover,\r\n[data-bettergravity-button=\"Cards\"]:hover,\r\n[data-bettergravity-button=\"Accent\"]:hover,\r\n[data-bettergravity-button=\"Voyager\"]:hover {\r\n  background-color: var(--bettergravity-row-hover) !important;\r\n  color: var(--catppuccin-accent) !important;\r\n}\r\n\r\n[data-bettergravity-button=\"Pet\"][aria-pressed=\"true\"],\r\n[data-bettergravity-button=\"Pets\"][aria-pressed=\"true\"],\r\n[data-bettergravity-button=\"Cards\"][aria-pressed=\"true\"],\r\n[data-bettergravity-button=\"Accent\"][aria-pressed=\"true\"],\r\n[data-bettergravity-button=\"Voyager\"][aria-pressed=\"true\"] {\r\n  background-color: var(--ctp-surface0) !important;\r\n  color: var(--catppuccin-accent) !important;\r\n}\r\n\r\n/* Desktop pet activity cards and floating HUD tokens */\r\n.bettergravity-pet-card {\r\n  --pet-material-background: rgba(24, 24, 37, 0.9) !important;\r\n  --pet-material-border: var(--ctp-surface0) !important;\r\n  --pet-text: var(--ctp-text) !important;\r\n  --pet-text-secondary: var(--ctp-subtext0) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   6.3 Voyager Branch Tree & Timeline HUD Interoperability\r\n   -------------------------------------------------------------------------- */\r\n/* HUD health pill indicator and vertical timeline rail */\r\n.bg-timeline-gauge {\r\n  background: rgba(24, 24, 37, 0.82) !important;\r\n  border: 1px solid var(--ctp-surface0) !important;\r\n  color: var(--ctp-text) !important;\r\n}\r\n\r\n.bg-timeline-rail {\r\n  background: transparent !important;\r\n  background-color: transparent !important;\r\n  border: 1px solid transparent !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: none !important;\r\n}\r\n\r\n.bg-timeline-rail:hover {\r\n  background: rgba(24, 24, 37, 0.96) !important;\r\n  border-color: var(--ctp-surface1) !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6) !important;\r\n  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1) 0.28s,\r\n              padding 200ms ease 0.28s,\r\n              background-color 180ms ease 0.28s,\r\n              border-color 180ms ease 0.28s,\r\n              box-shadow 200ms ease 0.28s,;\r\n}\r\n\r\n.bg-timeline-rail.bg-expanded {\r\n  background: rgba(24, 24, 37, 0.96) !important;\r\n  border-color: var(--ctp-surface1) !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6) !important;\r\n  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1) 0s,\r\n              padding 200ms ease 0s,\r\n              background-color 180ms ease 0s,\r\n              border-color 180ms ease 0s,\r\n              box-shadow 200ms ease 0s;\r\n}\r\n\r\n/* Timeline node health colors mapped to Catppuccin accents */\r\n.bg-dot-green  { background: var(--ctp-green) !important;  box-shadow: 0 0 6px var(--ctp-green) !important; }\r\n.bg-dot-yellow { background: var(--ctp-yellow) !important; box-shadow: 0 0 6px var(--ctp-yellow) !important; }\r\n.bg-dot-orange { background: var(--ctp-peach) !important;  box-shadow: 0 0 6px var(--ctp-peach) !important; }\r\n.bg-dot-red    { background: var(--ctp-red) !important;    box-shadow: 0 0 8px var(--ctp-red) !important; }\r\n\r\n/* Smooth step jump pulse animation with accent glow */\r\n.bg-step-jump-pulse {\r\n  animation: bg-ctp-jump-glow 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) !important;\r\n}\r\n\r\n@keyframes bg-ctp-jump-glow {\r\n  0% {\r\n    box-shadow: 0 0 0 0 var(--catppuccin-accent-glow);\r\n    outline: 2px solid var(--catppuccin-accent);\r\n  }\r\n  40% {\r\n    box-shadow: 0 0 24px 6px var(--catppuccin-accent-glow);\r\n    outline: 2px solid var(--catppuccin-accent);\r\n  }\r\n  100% {\r\n    box-shadow: 0 0 0 0 transparent;\r\n    outline: 2px solid transparent;\r\n  }\r\n}\r\n\r\n/* Branch breadcrumb bar and dropdown styling */\r\n.bg-branch-header-bar {\r\n  border-bottom: 1px solid var(--ctp-surface0) !important;\r\n  color: var(--ctp-subtext0) !important;\r\n}\r\n\r\n.bg-branch-dropdown {\r\n  background: var(--ctp-mantle) !important;\r\n  border: 1px solid var(--ctp-surface1) !important;\r\n}\r\n\r\n/* ==========================================================================\r\n   7. Gemini-app Theme Interoperability & Design Token Overrides\r\n   ========================================================================== */\r\n\r\n/* 7.1 Dynamic token bindings linking Gemini/Studio surfaces to Catppuccin Flavors */\r\n:root {\r\n  --gemini-page-bg: var(--ctp-crust) !important;\r\n  --gemini-body-text: var(--ctp-text) !important;\r\n  --gemini-link: var(--catppuccin-accent) !important;\r\n  --gemini-surface: var(--ctp-mantle) !important;\r\n  --gemini-surface-hover: var(--ctp-surface0) !important;\r\n  --gemini-text: var(--ctp-text) !important;\r\n  --gemini-switch-track: var(--ctp-crust) !important;\r\n  --gemini-switch-slider: var(--ctp-mantle) !important;\r\n  --gemini-inline-code-bg: var(--ctp-mantle) !important;\r\n  --gemini-inline-code-text: var(--catppuccin-accent) !important;\r\n  --studio-surface: var(--ctp-crust) !important;\r\n}\r\n\r\n/* 7.2 Dark flavors (Mocha / Macchiato / Frappé) message bubbles and composer */\r\nbody:not(.ctp-latte-mode) {\r\n  --gemini-bubble-bg: var(--ctp-mantle) !important;\r\n  --gemini-composer-bg: var(--ctp-mantle) !important;\r\n  --gemini-row-hover: rgba(205, 214, 244, 0.08) !important;\r\n  --studio-surface: var(--ctp-crust) !important;\r\n}\r\n\r\n/* 7.3 Latte Light Mode token inversions (Eliminates harsh black-and-white zebra glare) */\r\nbody.ctp-latte-mode {\r\n  --gemini-page-bg: var(--ctp-base, #eff1f5) !important;\r\n  --gemini-bubble-bg: var(--ctp-surface0, #ccd0da) !important; /* User prompt bubble -> Surface0 */\r\n  --gemini-body-text: var(--ctp-text, #4c4f69) !important;      /* Body text -> Deep Text */\r\n  --gemini-composer-bg: var(--ctp-surface0, #ccd0da) !important;/* Composer background -> Surface0 */\r\n  --gemini-row-hover: rgba(76, 79, 105, 0.08) !important;\r\n  --studio-surface: var(--ctp-base, #eff1f5) !important;\r\n  --gemini-surface: var(--ctp-surface0, #ccd0da) !important;\r\n  --gemini-switch-track: var(--ctp-mantle, #e6e9ef) !important;\r\n  --gemini-switch-slider: var(--ctp-surface0, #ccd0da) !important;\r\n}\r\n\r\n/* ==========================================================================\r\n   8. Latte Light Mode Ecosystem Contrast & Glare Elimination\r\n   ========================================================================== */\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.1 Window Dividers, Pane Splitters & Resize Sashes\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode :is(\r\n  [data-panel-resize-handle-id],\r\n  [data-resize-handle],\r\n  .sash,\r\n  .sash-vertical,\r\n  div[class*=\"resize-handle\"],\r\n  div[role=\"separator\"],\r\n  .border-r,\r\n  [data-separator=\"true\"]\r\n) {\r\n  background-color: var(--ctp-surface0, #ccd0da) !important;\r\n  border-color: var(--ctp-surface0, #ccd0da) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is([data-panel-resize-handle-id], .sash):hover,\r\n:root:root body.ctp-latte-mode :is([data-panel-resize-handle-id], .sash):active {\r\n  background-color: var(--catppuccin-accent, #fe640b) !important;\r\n  box-shadow: 0 0 6px var(--catppuccin-accent-glow, rgba(254, 100, 11, 0.25)) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.2 Sidebar Navigation & Workspace Folders (Desktop collapsible headers)\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] {\r\n  --color-sidebar: var(--ctp-crust, #dce0e8) !important;\r\n  --sidebar: var(--ctp-crust, #dce0e8) !important;\r\n  --sidebar-background: var(--ctp-crust, #dce0e8) !important;\r\n  --sidebar-muted: var(--ctp-surface0, #ccd0da) !important;\r\n  --sidebar-secondary: var(--ctp-surface1, #bcc0cc) !important;\r\n  background-color: var(--ctp-crust, #dce0e8) !important;\r\n  background: var(--ctp-crust, #dce0e8) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  .bg-sidebar,\r\n  div[class*=\"bg-sidebar\"],\r\n  button[class*=\"bg-sidebar\"],\r\n  .group\\/header,\r\n  div[class*=\"group/header\"],\r\n  .group\\/headerbtn,\r\n  button[class*=\"group/headerbtn\"],\r\n  [class*=\"group/header\"],\r\n  [data-testid*=\"workspace\"],\r\n  [data-testid*=\"project\"],\r\n  [data-testid*=\"folder\"],\r\n  .sidebar-section-header,\r\n  div[class*=\"section-header\"]\r\n) {\r\n  background-color: transparent !important;\r\n  background: transparent !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  .group\\/headerbtn,\r\n  button[class*=\"group/headerbtn\"]\r\n) span.truncate {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  .group\\/headerbtn,\r\n  button[class*=\"group/headerbtn\"]\r\n) div[class*=\"gap-0.5\"]::after {\r\n  color: var(--ctp-subtext0, #6c6f85) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] svg {\r\n  color: var(--ctp-subtext0, #6c6f85) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.3 Sidebar Action Buttons (New Chat, History, Skills, Schedules, Pets, Display Options)\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"],\r\n  [data-testid=\"history-button\"],\r\n  [data-testid=\"automations-button\"],\r\n) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"],\r\n  [data-testid=\"history-button\"],\r\n  [data-testid=\"automations-button\"],\r\n) span {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"],\r\n  [data-testid=\"history-button\"],\r\n  [data-testid=\"automations-button\"],\r\n) svg {\r\n  color: var(--ctp-subtext0, #6c6f85) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n/* Active navigation items (Overrides gemini-app dark states) */\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"].bg-sidebar-secondary,\r\n  [data-testid=\"history-button\"].bg-sidebar-secondary,\r\n  [data-testid=\"automations-button\"].bg-sidebar-secondary,\r\n  #gemini-skills-button.bg-sidebar-secondary,\r\n  #gemini-scheduled-tasks-button.bg-sidebar-secondary,\r\n  [data-bettergravity-button][aria-pressed=\"true\"],\r\n  [data-bettergravity-button][aria-selected=\"true\"],\r\n  [data-bettergravity-button][data-active=\"true\"],\r\n  [data-bettergravity-button][data-selected=\"true\"],\r\n  [data-bettergravity-button][data-bettergravity-active=\"true\"],\r\n  [data-bettergravity-button].bg-sidebar-secondary,\r\n  #gemini-scroll-nav > *[aria-pressed=\"true\"],\r\n  #gemini-scroll-nav > *[aria-selected=\"true\"],\r\n  #gemini-scroll-nav > *[data-active=\"true\"],\r\n  #gemini-scroll-nav > *[data-selected=\"true\"],\r\n  #gemini-scroll-nav > *[data-bettergravity-active=\"true\"],\r\n  #gemini-scroll-nav > *.bg-sidebar-secondary,\r\n  div.flex-col > a.bg-sidebar-secondary\r\n) {\r\n  background-color: var(--ctp-surface0, #ccd0da) !important;\r\n  background: var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"].bg-sidebar-secondary,\r\n  [data-testid=\"history-button\"].bg-sidebar-secondary,\r\n  [data-testid=\"automations-button\"].bg-sidebar-secondary,\r\n  #gemini-skills-button.bg-sidebar-secondary,\r\n  #gemini-scheduled-tasks-button.bg-sidebar-secondary,\r\n  [data-bettergravity-button][aria-pressed=\"true\"],\r\n  [data-bettergravity-button][aria-selected=\"true\"],\r\n  [data-bettergravity-button][data-active=\"true\"],\r\n  [data-bettergravity-button][data-selected=\"true\"],\r\n  [data-bettergravity-button][data-bettergravity-active=\"true\"],\r\n  [data-bettergravity-button].bg-sidebar-secondary,\r\n) :is(span, svg) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n/* Navigation item hover state */\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] :is(\r\n  [data-testid=\"new-conversation-button\"],\r\n  [data-testid=\"history-button\"],\r\n  [data-testid=\"automations-button\"],\r\n):hover:not(.bg-sidebar-secondary):not([aria-pressed=\"true\"]):not([data-selected=\"true\"]) {\r\n  background-color: rgba(76, 79, 105, 0.08) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n/* New conversation button inactive light pill state */\r\n:root:root body.ctp-latte-mode [role=\"navigation\"] [data-testid=\"new-conversation-button\"]:not(.bg-sidebar-secondary) {\r\n  background-color: var(--ctp-mantle, #e6e9ef) !important;\r\n  border: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n/* Popover menus (Display options, conversation context menus) */\r\n:root:root body.ctp-latte-mode :is(\r\n  [role=\"menu\"],\r\n  div[role=\"menu\"],\r\n  [data-radix-popper-content-wrapper] [role=\"menu\"],\r\n  .menu-content\r\n) {\r\n  background-color: var(--ctp-mantle, #e6e9ef) !important;\r\n  background: var(--ctp-mantle, #e6e9ef) !important;\r\n  border: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"menu\"] :is([role=\"menuitem\"], button) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode [role=\"menu\"] :is([role=\"menuitem\"], button):hover {\r\n  background-color: var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--catppuccin-accent, #fe640b) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.4 In-Chat File Changes Header & Diff Review Pill\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode :is(\r\n  .files-changed-header,\r\n  [data-testid*=\"file-change\"],\r\n  [data-testid*=\"file-diff\"],\r\n  [data-testid=\"trajectory-file-changes\"],\r\n  .file-changes-badge\r\n) {\r\n  background: var(--ctp-mantle, #e6e9ef) !important;\r\n  background-color: var(--ctp-mantle, #e6e9ef) !important;\r\n  border: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .files-changed-header:hover,\r\n:root:root body.ctp-latte-mode .files-changed-header:active {\r\n  background: var(--ctp-surface0, #ccd0da) !important;\r\n  background-color: var(--ctp-surface0, #ccd0da) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .files-changed-header > .overflow-hidden :is(span, div) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .spark-file-card-subtitle {\r\n  color: var(--ctp-subtext0, #6c6f85) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .files-changed-header .review-button {\r\n  background-color: var(--catppuccin-accent, #1e66f5) !important;\r\n  color: #ffffff !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.5 Voyager Branch Tree HUD (Maintains authentic dark semi-transparent space HUD across all flavors)\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode .bg-timeline-rail {\r\n  background: transparent !important;\r\n  background-color: transparent !important;\r\n  border: 1px solid transparent !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: none !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .bg-timeline-rail:hover {\r\n  background: rgba(24, 24, 37, 0.96) !important;\r\n  border-color: var(--ctp-surface1) !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6) !important;\r\n  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1) 0.28s,\r\n              padding 200ms ease 0.28s,\r\n              background-color 180ms ease 0.28s,\r\n              border-color 180ms ease 0.28s,\r\n              box-shadow 200ms ease 0.28s,;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .bg-timeline-rail.bg-expanded {\r\n  background: rgba(24, 24, 37, 0.96) !important;\r\n  border-color: var(--ctp-surface1) !important;\r\n  backdrop-filter: none !important;\r\n  -webkit-backdrop-filter: none !important;\r\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6) !important;\r\n  transition: width 200ms cubic-bezier(0.16, 1, 0.3, 1) 0s,\r\n              padding 200ms ease 0s,\r\n              background-color 180ms ease 0s,\r\n              border-color 180ms ease 0s,\r\n              box-shadow 200ms ease 0s;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(.bg-timeline-card, .bg-turn-details) {\r\n  background: transparent !important;\r\n  background-color: transparent !important;\r\n  border: none !important;\r\n  box-shadow: none !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .bg-timeline-step-label {\r\n  color: rgba(255, 255, 255, 0.9) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode .bg-timeline-snippet {\r\n  color: rgba(255, 255, 255, 0.55) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.6 BetterGravity Pets Page Light Mode\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode :is(.bettergravity-pets-page, .bettergravity-pet-library, [data-pet-page-host]) {\r\n  background: var(--ctp-base, #eff1f5) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(.bettergravity-pet-library__header h1, .bettergravity-pet-library__header p, .bettergravity-pet-library__state-name) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n/* --------------------------------------------------------------------------\r\n   8.8 TitleBar Toolbar, Window Controls & Floating Dictation Pill\r\n   -------------------------------------------------------------------------- */\r\n:root:root body.ctp-latte-mode :is(\r\n  header,\r\n  [data-testid=\"window-titlebar\"],\r\n  .titlebar\r\n) {\r\n  background-color: var(--ctp-mantle, #e6e9ef) !important;\r\n  background: var(--ctp-mantle, #e6e9ef) !important;\r\n  border-bottom: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(\r\n  .titlebar-actions,\r\n  [data-testid=\"window-controls\"],\r\n  .window-controls,\r\n  header > div:last-child,\r\n  header button:not([data-bettergravity-button=\"Accent\"])\r\n) {\r\n  background-color: transparent !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(\r\n  [data-testid=\"title-menu-bar\"] button,\r\n  header svg,\r\n  [data-testid=\"window-controls\"] svg\r\n) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n/* Bottom-right floating voice dictation pill */\r\n:root:root body.ctp-latte-mode :is(\r\n  \r\n  [data-testid*=\"voice\"],\r\n  [data-testid*=\"dictat\"],\r\n  [data-testid*=\"speech\"]\r\n) {\r\n  background-color: var(--ctp-mantle, #e6e9ef) !important;\r\n  background: var(--ctp-mantle, #e6e9ef) !important;\r\n  border: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(\r\n  \r\n) :is(button, svg, span) {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n/* Sidebar footer dock area (Settings, Profile triggers) */\r\n:root:root body.ctp-latte-mode :is(\r\n  [data-testid=\"sidebar-footer\"],\r\n  [data-testid*=\"settings\"],\r\n  [data-testid*=\"profile\"],\r\n  [role=\"navigation\"] footer,\r\n  [role=\"navigation\"] > div:last-child\r\n) {\r\n  background-color: var(--ctp-crust, #dce0e8) !important;\r\n  background: var(--ctp-crust, #dce0e8) !important;\r\n  border-top: 1px solid var(--ctp-surface0, #ccd0da) !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(\r\n  [data-testid=\"sidebar-footer\"] button,\r\n  [data-testid*=\"settings-button\"],\r\n  [data-testid*=\"profile-button\"]\r\n) {\r\n  background-color: transparent !important;\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n}\r\n\r\n:root:root body.ctp-latte-mode :is(\r\n  [data-testid=\"sidebar-footer\"],\r\n  [data-testid*=\"settings\"]\r\n) svg {\r\n  color: var(--ctp-text, #4c4f69) !important;\r\n  fill: currentColor !important;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n/* ==========================================================================\r\n   Turbocharge: Layout & Paint Containment (Zero-Reflow Engine)\r\n   ========================================================================== */\r\n[role=\"article\"],\r\n[data-testid=\"conversation-item\"],\r\n[data-testid=\"history-item\"] {\r\n  contain: layout style;\r\n  content-visibility: auto;\r\n  contain-intrinsic-size: auto 120px;\r\n}\r\n\r\n[data-testid=\"planner-response-text\"] {\r\n  contain: layout style;\r\n}\r\n","flexoki-dark":"/**\n * @name        Flexoki Dark\n * @description An inky, analog-inspired color scheme designed by Steph Ango for deep reading and long-session coding.\n * @author      Steph Ango (adapted for BetterGravity)\n * @version     1.0.0\n * @source      https://stephango.com/flexoki\n */\n\n/* ==========================================================================\n   0. Flexoki Palette Definition (Steph Ango Official Specifications)\n   ========================================================================== */\n:root {\n  /* --- Flexoki Inky Base Scale --- */\n  --fx-black:     #100F0F; /* Deepest inky canvas (L 6.1%, zero blue-haze) */\n  --fx-950:       #1C1B1A; /* Layer 1: Composer, message bubbles, panels */\n  --fx-900:       #282726; /* Layer 2: Elevated cards, code blocks, popovers */\n  --fx-850:       #343331; /* Layer 3: Borders, divider lines, row hover */\n  --fx-800:       #403E3C; /* Layer 4: Active pills, selected tab backgrounds */\n  --fx-700:       #575653; /* Subtle muted borders, resting scrollbar */\n  --fx-600:       #6F6E69; /* Comments, placeholders, inactive icons */\n  --fx-500:       #878580; /* Metadata text, timestamps, section tags */\n  --fx-300:       #B7B5AC; /* Secondary text, bullet markers */\n  --fx-200:       #CECDC3; /* Primary body text (Matte warm paper gray) */\n  --fx-100:       #E6E4D9; /* Headings, strong emphasis */\n  --fx-paper:     #FFFCF0; /* Pure analog paper white */\n\n  /* --- Flexoki Natural Mineral Accent Colors (400 Dark Scale) --- */\n  --fx-red:       #D14D41; /* Cinnabar Red */\n  --fx-orange:    #DA702C; /* Ochre Orange (Default Accent) */\n  --fx-yellow:    #D0A215; /* Orpiment Yellow */\n  --fx-green:     #879A39; /* Malachite Green */\n  --fx-cyan:      #3AA99F; /* Turquoise Cyan */\n  --fx-blue:      #4385BE; /* Azurite Blue */\n  --fx-purple:    #8B7EC8; /* Iolite Purple */\n  --fx-magenta:   #CE5D97; /* Fluorite Magenta */\n\n  /* --- Primary Theme Accent & Breathing Auras --- */\n  --flexoki-accent: var(--fx-orange);\n  --flexoki-accent-soft: rgba(218, 112, 44, 0.16);\n  --flexoki-accent-glow: rgba(218, 112, 44, 0.28);\n  --bettergravity-accent: var(--flexoki-accent);\n  --bettergravity-accent-soft: var(--flexoki-accent-soft);\n\n  /* ==========================================================================\n     1. Host Native Design Tokens (Antigravity 2.0 / Willow)\n     ========================================================================== */\n  --background: var(--fx-black) !important;\n  --foreground: var(--fx-200) !important;\n\n  --primary: var(--flexoki-accent) !important;\n  --primary-foreground: var(--fx-black) !important;\n  --secondary: var(--fx-950) !important;\n  --secondary-foreground: var(--fx-200) !important;\n\n  --muted: var(--fx-black) !important;\n  --muted-foreground: var(--fx-500) !important;\n\n  --border: var(--fx-850) !important;\n  --card: var(--fx-950) !important;\n  --card-border: var(--fx-850) !important;\n\n  --sidebar: var(--fx-black) !important;\n  --sidebar-secondary: var(--fx-950) !important;\n  --sidebar-muted: var(--fx-950) !important;\n\n  --placeholder: var(--fx-600) !important;\n  --link: var(--fx-blue) !important;\n  --focus-ring-color: var(--flexoki-accent) !important;\n\n  --error: var(--fx-red) !important;\n  --warning: var(--fx-yellow) !important;\n  --success: var(--fx-green) !important;\n  --code-foreground: var(--flexoki-accent) !important;\n\n  /* ==========================================================================\n     2. BetterGravity Shared Runtime Namespace\n     ========================================================================== */\n  --bettergravity-surface: var(--fx-950);\n  --bettergravity-border: var(--fx-850);\n  --bettergravity-text: var(--fx-200);\n  --bettergravity-row-hover: rgba(206, 205, 195, 0.05);\n\n  /* ==========================================================================\n     3. Gemini App & Willow Shell Tokens\n     ========================================================================== */\n  --studio-surface: var(--fx-black) !important;\n  --gemini-page-bg: var(--fx-black) !important;\n  --gemini-surface: var(--fx-950) !important;\n  --gemini-surface-hover: var(--fx-900) !important;\n  --gemini-trigger-hover: var(--fx-900) !important;\n  --gemini-control-hover: var(--fx-900) !important;\n  --gemini-separator: var(--fx-850) !important;\n  --gemini-switch-track: var(--fx-black) !important;\n  --gemini-switch-slider: var(--fx-950) !important;\n  --gemini-body-text: var(--fx-200) !important;\n  --gemini-text: var(--fx-200) !important;\n  --gemini-text-trigger: var(--fx-500) !important;\n  --gemini-text-trigger-hover: var(--fx-100) !important;\n  --gemini-text-dim: var(--fx-500) !important;\n  --gemini-bubble-bg: var(--fx-950) !important;\n  --gemini-composer-bg: var(--fx-950) !important;\n  --gemini-composer-placeholder: var(--fx-600) !important;\n  --gemini-inline-code-bg: var(--fx-900) !important;\n  --gemini-inline-code-text: var(--flexoki-accent) !important;\n  --gemini-link: var(--fx-blue) !important;\n  --gemini-send-bg: var(--flexoki-accent) !important;\n  --gemini-send-bg-hover: #c45f22 !important;\n  --gemini-home-glow-accent: var(--flexoki-accent-soft) !important;\n  --gemini-row-selected: var(--fx-900) !important;\n  --gemini-row-hover: rgba(206, 205, 195, 0.05) !important;\n}\n\n/* ==========================================================================\n   4. Turbo Engine & Paint Optimization\n   ========================================================================== */\n[data-testid=\"user-input-step\"],\n[data-testid=\"planner-response-text\"],\n[role=\"article\"][aria-label=\"Agent response\"],\n[role=\"article\"][aria-label=\"User message\"] {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 120px;\n}\n\nbody,\n#root,\n[data-testid=\"conversation-view\"] {\n  text-shadow: none !important;\n  color-scheme: dark !important;\n}\n\n/* ==========================================================================\n   5. Window Shell, TitleBar & Window Drag Boundaries\n   ========================================================================== */\n\n\n[data-testid=\"window-titlebar\"],\nheader,\n.titlebar {\n  background: var(--fx-black) !important;\n  border-bottom: 1px solid var(--fx-850) !important;\n  user-select: none;\n}\n\n[data-testid=\"sidebar-toggle\"],\n[data-bettergravity-button],\ndiv.go-back-btn,\nbutton[aria-label=\"Go Back\"] {\n  flex-shrink: 0 !important;\n  -webkit-app-region: no-drag !important;\n}\n\n/* ==========================================================================\n   6. Navigation & Sidebar Refinements\n   ========================================================================== */\n[role=\"navigation\"][aria-label=\"Sidebar\"],\n[role=\"navigation\"] {\n  background-color: var(--fx-black) !important;\n  border-right: 1px solid var(--fx-850) !important;\n}\n\nhtml body [role=\"navigation\"] .bg-sidebar,\nhtml body [role=\"navigation\"] div[class*=\"bg-sidebar\"]:not([data-testid=\"conversation-row-sidebar\"]) {\n  background-color: var(--fx-black) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] {\n  border-radius: 8px !important;\n  margin: 1px 6px !important;\n  transition: background-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\n  --row-bg: transparent !important;\n  background-color: transparent !important;\n  position: relative !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover {\n  --row-bg: var(--fx-950) !important;\n  background-color: var(--fx-950) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"],\nhtml body [role=\"navigation\"] div[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"] {\n  --row-bg: var(--fx-800) !important;\n  background-color: var(--fx-800) !important;\n  color: var(--fx-100) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] div[class*=\"can-hover\"],\n[data-testid=\"conversation-row-sidebar\"] div[style*=\"linear-gradient\"] {\n  background: linear-gradient(to right, transparent 0%, var(--row-bg) 24%) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"] {\n  color: var(--fx-500) !important;\n  background-color: transparent !important;\n  opacity: 0.85 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"]:hover {\n  color: var(--fx-100) !important;\n  background-color: rgba(255, 255, 255, 0.08) !important;\n  opacity: 1 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:not([data-selected=\"true\"])::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 7px;\n  bottom: 7px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--flexoki-accent);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover:not([data-selected=\"true\"])::before {\n  opacity: 0.65;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 6px;\n  bottom: 6px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--flexoki-accent);\n  opacity: 1;\n}\n\n[data-testid=\"conversation-row-sidebar\"] span.truncate {\n  color: var(--fx-200) !important;\n}\n\n[role=\"navigation\"] [data-testid=\"section-header\"] {\n  color: var(--fx-500) !important;\n}\n\n/* ==========================================================================\n   7. Typography, Markdown & Digital Ink Flow\n   ========================================================================== */\n::selection {\n  background: var(--flexoki-accent-soft) !important;\n  color: var(--fx-paper) !important;\n}\n\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 8px;\n  background-clip: content-box;\n  background-color: var(--fx-700);\n  transition: background-color 150ms ease;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: var(--flexoki-accent);\n}\n\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* Headings in warm matte paper tone */\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) :is(h1, h2, h3, h4, h5, h6) {\n  color: var(--fx-100) !important;\n  font-weight: 650;\n  letter-spacing: -0.015em;\n}\n\n/* Markdown Blockquotes: warm mineral ink accent */\nblockquote {\n  position: relative !important;\n  border-left: 3px solid var(--flexoki-accent) !important;\n  background: var(--flexoki-accent-soft) !important;\n  border-radius: 0 8px 8px 0 !important;\n  padding: 8px 16px !important;\n  margin: 12px 0 !important;\n  color: var(--fx-300) !important;\n  font-style: italic !important;\n}\n\n/* Markdown Tables */\ntable {\n  width: 100%;\n  border-collapse: separate !important;\n  border-spacing: 0 !important;\n  margin: 14px 0 !important;\n  border: 1px solid var(--fx-850) !important;\n  border-radius: 8px !important;\n  overflow: hidden !important;\n}\n\nth {\n  background-color: var(--fx-900) !important;\n  color: var(--fx-100) !important;\n  font-weight: 600 !important;\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--fx-850) !important;\n  border-right: 1px solid var(--fx-850) !important;\n}\n\nth:last-child {\n  border-right: none !important;\n}\n\ntd {\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--fx-850) !important;\n  border-right: 1px solid var(--fx-850) !important;\n  color: var(--fx-300) !important;\n}\n\ntd:last-child {\n  border-right: none !important;\n}\n\ntr:last-child td {\n  border-bottom: none !important;\n}\n\ntr:nth-child(even) td {\n  background-color: var(--fx-950) !important;\n}\n\ntr:hover td {\n  background-color: var(--bettergravity-row-hover) !important;\n}\n\n/* Inline Code Badges */\n:not(pre) > code,\ncode:not(pre code) {\n  background-color: var(--fx-900) !important;\n  color: var(--gemini-inline-code-text, var(--flexoki-accent)) !important;\n  border: 1px solid var(--fx-850) !important;\n  padding: 2px 6px !important;\n  border-radius: 6px !important;\n  font-size: 0.88em !important;\n  font-family: var(--gemini-code-font, ui-monospace, SFMono-Regular, Consolas, monospace) !important;\n}\n\n/* Code Blocks Container */\npre,\n.code-block,\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) div.relative.rounded-xl {\n  background-color: var(--fx-950) !important;\n  border: 1px solid var(--fx-850) !important;\n  border-radius: 12px !important;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n}\n\npre code,\n.line-content {\n  color: var(--fx-200) !important;\n}\n\n/* ==========================================================================\n   8. Prism & Tree-sitter Syntax Tokens (Flexoki Mineral Palette)\n   ========================================================================== */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: var(--fx-600) !important;\n  font-style: italic;\n}\n\n.token.keyword,\n.token.selector,\n.token.important {\n  color: var(--fx-purple) !important;\n  font-weight: 550;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.inserted {\n  color: var(--fx-green) !important;\n}\n\n.token.number,\n.token.boolean,\n.token.constant {\n  color: var(--fx-orange) !important;\n}\n\n.token.function,\n.token.class-name {\n  color: var(--fx-blue) !important;\n}\n\n.token.property,\n.token.builtin {\n  color: var(--fx-cyan) !important;\n}\n\n.token.tag,\n.token.deleted {\n  color: var(--fx-red) !important;\n}\n\n.token.operator,\n.token.punctuation {\n  color: var(--fx-500) !important;\n}\n\n/* ==========================================================================\n   9. Chat Composer (Prompt Box) & Mineral Breathing Inset Aura\n   ========================================================================== */\n[data-testid=\"agent-input-box\"] {\n  background: transparent !important;\n}\n\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu]) {\n  background: var(--fx-950) !important;\n  border: 1px solid var(--fx-850) !important;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;\n}\n\n/* Inset breathing glow tailored for warm terracotta */\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  content: \"\" !important;\n  position: absolute !important;\n  inset: 0 !important;\n  border-radius: inherit !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n  box-shadow: inset 0 0 4px 1px var(--flexoki-accent),\n              inset 0 0 16px 2px var(--flexoki-accent-soft) !important;\n  opacity: 0;\n  transition: opacity 160ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n[data-testid=\"agent-input-box\"]:focus-within > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  opacity: 0.35;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] {\n  color: var(--fx-200) !important;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] ~ * {\n  color: var(--fx-600) !important;\n}\n\n/* Send button */\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]) {\n  background-color: var(--flexoki-accent) !important;\n  color: var(--fx-black) !important;\n  border-radius: 8px !important;\n  cursor: pointer !important;\n  box-shadow: 0 2px 8px var(--flexoki-accent-glow) !important;\n}\n\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):hover {\n  filter: brightness(1.1) !important;\n  transform: translateY(-1px) scale(1.02);\n}\n\n[data-testid=\"send-button\"]:disabled,\n[data-testid=\"send-button\"][disabled],\n[data-testid=\"send-button\"][aria-disabled=\"true\"] {\n  background-color: var(--fx-900) !important;\n  color: var(--fx-600) !important;\n  border: 1px solid var(--fx-850) !important;\n  opacity: 0.6 !important;\n}\n\n/* New Conversation button */\n[data-testid=\"new-conversation-button\"] {\n  background: var(--fx-950) !important;\n  color: var(--fx-200) !important;\n  border: 1px solid var(--fx-850) !important;\n  border-radius: 8px !important;\n}\n\n[data-testid=\"new-conversation-button\"]:hover {\n  background: var(--fx-900) !important;\n  border-color: var(--flexoki-accent) !important;\n  box-shadow: 0 2px 10px var(--flexoki-accent-soft) !important;\n}\n\n/* ==========================================================================\n   10. Dialogs, Popovers & Context Menus\n   ========================================================================== */\n[role=\"dialog\"],\n[role=\"menu\"],\n[data-radix-popper-content-wrapper] > div,\n.bg-popover {\n  background-color: var(--fx-950) !important;\n  border: 1px solid var(--fx-850) !important;\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.04) !important;\n  border-radius: 12px !important;\n  color: var(--fx-200) !important;\n}\n","kanagawa-dragon":"/**\n * @name        Kanagawa Dragon\n * @description Traditional Japanese Ukiyo-e woodblock & Sumi-e ink wash aesthetic with deep sumi ink canvas and low-contrast warm highlights.\n * @author      rebelot (adapted for BetterGravity)\n * @version     1.0.0\n * @source      https://github.com/rebelot/kanagawa.nvim\n */\n\n/* ==========================================================================\n   0. Kanagawa Dragon Palette Definition (Official rebelot/kanagawa.nvim)\n   ========================================================================== */\n:root {\n  /* --- Sumi Ink Dark Canvas Scale (Dragon Variant) --- */\n  --dragon-black-0:   #0d0c0c; /* Deepest sumi void / gutter (L 4.8%) */\n  --dragon-black-1:   #12120f; /* Shell base: Titlebar, window header, sidebar canvas */\n  --dragon-black-2:   #1D1C19; /* Elevated surfaces: Message bubbles, composer, popovers */\n  --dragon-black-3:   #181616; /* Primary conversation canvas & editor background */\n  --dragon-black-4:   #282727; /* Borders, dividers, subtle separators */\n  --dragon-black-5:   #393836; /* Inactive button borders, row hover */\n  --dragon-black-6:   #625e5a; /* Resting scrollbar thumb, comments, placeholders */\n\n  /* --- Ukiyo-e Foreground & Typography Scale --- */\n  --dragon-white:     #c5c9c5; /* Primary body text (Warm sumi-e paper gray) */\n  --dragon-green-2:   #8a9a7b; /* Strings, subtext accents */\n  --dragon-gray:      #a6a69c; /* Secondary text, metadata timestamps */\n  --dragon-gray-2:    #7a8382; /* Muted subtext, section headers */\n  --dragon-gray-3:    #8a8980; /* Subtle borders, secondary comments */\n\n  /* --- 8 Traditional Ukiyo-e Ink Accents (Dragon Variant) --- */\n  --dragon-orange:    #b6927b; /* Autumn Ochre (Default Accent) */\n  --dragon-green:     #87a987; /* Moss Bamboo (Success) */\n  --dragon-blue:      #658594; /* Deep Indigo (Links, Functions) */\n  --dragon-yellow:    #c4b28a; /* Carp Gold (Warnings, Numbers) */\n  --dragon-aqua:      #8ba4b0; /* Stream Foam (Types, Identifiers) */\n  --dragon-pink:      #a292a3; /* Faded Plum (Special Operators) */\n  --dragon-red:       #c4746e; /* Seal Vermilion (Errors, Danger) */\n  --dragon-violet:    #8992a7; /* Iris Sumi (Keywords, Statements) */\n\n  /* --- Primary Theme Accent & Breathing Auras --- */\n  --kanagawa-accent: var(--dragon-orange);\n  --kanagawa-accent-soft: rgba(182, 146, 123, 0.16);\n  --kanagawa-accent-glow: rgba(182, 146, 123, 0.28);\n  --bettergravity-accent: var(--kanagawa-accent);\n  --bettergravity-accent-soft: var(--kanagawa-accent-soft);\n\n  /* ==========================================================================\n     1. Host Native Design Tokens (Antigravity 2.0 / Willow)\n     ========================================================================= */\n  --background: var(--dragon-black-3) !important;\n  --foreground: var(--dragon-white) !important;\n\n  --primary: var(--kanagawa-accent) !important;\n  --primary-foreground: var(--dragon-black-1) !important;\n  --secondary: var(--dragon-black-2) !important;\n  --secondary-foreground: var(--dragon-white) !important;\n\n  --muted: var(--dragon-black-1) !important;\n  --muted-foreground: var(--dragon-gray) !important;\n\n  --border: var(--dragon-black-4) !important;\n  --card: var(--dragon-black-2) !important;\n  --card-border: var(--dragon-black-4) !important;\n\n  --sidebar: var(--dragon-black-1) !important;\n  --sidebar-secondary: var(--dragon-black-2) !important;\n  --sidebar-muted: var(--dragon-black-2) !important;\n\n  --placeholder: var(--dragon-black-6) !important;\n  --link: var(--dragon-blue) !important;\n  --focus-ring-color: var(--kanagawa-accent) !important;\n\n  --error: var(--dragon-red) !important;\n  --warning: var(--dragon-yellow) !important;\n  --success: var(--dragon-green) !important;\n  --code-foreground: var(--kanagawa-accent) !important;\n\n  /* ==========================================================================\n     2. BetterGravity Shared Runtime Namespace\n     ========================================================================= */\n  --bettergravity-surface: var(--dragon-black-2);\n  --bettergravity-border: var(--dragon-black-4);\n  --bettergravity-text: var(--dragon-white);\n  --bettergravity-row-hover: rgba(197, 201, 197, 0.06);\n\n  /* ==========================================================================\n     3. Gemini App & Willow Shell Tokens\n     ========================================================================= */\n  --studio-surface: var(--dragon-black-1) !important;\n  --gemini-page-bg: var(--dragon-black-3) !important;\n  --gemini-surface: var(--dragon-black-2) !important;\n  --gemini-surface-hover: var(--dragon-black-5) !important;\n  --gemini-trigger-hover: var(--dragon-black-5) !important;\n  --gemini-control-hover: var(--dragon-black-5) !important;\n  --gemini-separator: var(--dragon-black-4) !important;\n  --gemini-switch-track: var(--dragon-black-0) !important;\n  --gemini-switch-slider: var(--dragon-black-2) !important;\n  --gemini-body-text: var(--dragon-white) !important;\n  --gemini-text: var(--dragon-white) !important;\n  --gemini-text-trigger: var(--dragon-gray) !important;\n  --gemini-text-trigger-hover: var(--dragon-white) !important;\n  --gemini-text-dim: var(--dragon-gray) !important;\n  --gemini-bubble-bg: var(--dragon-black-2) !important;\n  --gemini-composer-bg: var(--dragon-black-2) !important;\n  --gemini-composer-placeholder: var(--dragon-black-6) !important;\n  --gemini-inline-code-bg: var(--dragon-black-1) !important;\n  --gemini-inline-code-text: var(--kanagawa-accent) !important;\n  --gemini-link: var(--dragon-blue) !important;\n  --gemini-send-bg: var(--kanagawa-accent) !important;\n  --gemini-send-bg-hover: #9f7b64 !important;\n  --gemini-home-glow-accent: var(--kanagawa-accent-soft) !important;\n  --gemini-row-selected: var(--dragon-black-5) !important;\n  --gemini-row-hover: rgba(197, 201, 197, 0.06) !important;\n}\n\n/* ==========================================================================\n   4. Turbo Engine & Paint Optimization\n   ========================================================================== */\n[data-testid=\"user-input-step\"],\n[data-testid=\"planner-response-text\"],\n[role=\"article\"][aria-label=\"Agent response\"],\n[role=\"article\"][aria-label=\"User message\"] {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 120px;\n}\n\nbody,\n#root,\n[data-testid=\"conversation-view\"] {\n  text-shadow: none !important;\n  color-scheme: dark !important;\n}\n\n/* ==========================================================================\n   5. Window Shell, TitleBar & Window Drag Boundaries\n   ========================================================================== */\n\n\n[data-testid=\"window-titlebar\"],\nheader,\n.titlebar {\n  background: var(--dragon-black-1) !important;\n  border-bottom: 1px solid var(--dragon-black-4) !important;\n  user-select: none;\n}\n\n[data-testid=\"sidebar-toggle\"],\n[data-bettergravity-button],\ndiv.go-back-btn,\nbutton[aria-label=\"Go Back\"] {\n  flex-shrink: 0 !important;\n  -webkit-app-region: no-drag !important;\n}\n\n/* ==========================================================================\n   6. Navigation & Sidebar Refinements\n   ========================================================================== */\n[role=\"navigation\"][aria-label=\"Sidebar\"],\n[role=\"navigation\"] {\n  background-color: var(--dragon-black-1) !important;\n  border-right: 1px solid var(--dragon-black-4) !important;\n}\n\nhtml body [role=\"navigation\"] .bg-sidebar,\nhtml body [role=\"navigation\"] div[class*=\"bg-sidebar\"]:not([data-testid=\"conversation-row-sidebar\"]) {\n  background-color: var(--dragon-black-1) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] {\n  border-radius: 8px !important;\n  margin: 1px 6px !important;\n  transition: background-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\n  --row-bg: transparent !important;\n  background-color: transparent !important;\n  position: relative !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover {\n  --row-bg: var(--dragon-black-2) !important;\n  background-color: var(--dragon-black-2) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"],\nhtml body [role=\"navigation\"] div[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"] {\n  --row-bg: var(--dragon-black-5) !important;\n  background-color: var(--dragon-black-5) !important;\n  color: var(--dragon-white) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] div[class*=\"can-hover\"],\n[data-testid=\"conversation-row-sidebar\"] div[style*=\"linear-gradient\"] {\n  background: linear-gradient(to right, transparent 0%, var(--row-bg) 24%) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"] {\n  color: var(--dragon-gray) !important;\n  background-color: transparent !important;\n  opacity: 0.85 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"]:hover {\n  color: var(--dragon-white) !important;\n  background-color: rgba(255, 255, 255, 0.08) !important;\n  opacity: 1 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:not([data-selected=\"true\"])::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 7px;\n  bottom: 7px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--kanagawa-accent);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover:not([data-selected=\"true\"])::before {\n  opacity: 0.65;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 6px;\n  bottom: 6px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--kanagawa-accent);\n  opacity: 1;\n}\n\n[data-testid=\"conversation-row-sidebar\"] span.truncate {\n  color: var(--dragon-white) !important;\n}\n\n[role=\"navigation\"] [data-testid=\"section-header\"] {\n  color: var(--dragon-gray) !important;\n}\n\n/* ==========================================================================\n   7. Typography, Markdown & Digital Ink Flow\n   ========================================================================== */\n::selection {\n  background: var(--kanagawa-accent-soft) !important;\n  color: #ffffff !important;\n}\n\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 8px;\n  background-clip: content-box;\n  background-color: var(--dragon-black-6);\n  transition: background-color 150ms ease;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: var(--kanagawa-accent);\n}\n\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* Headings in warm sumi ink gray */\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) :is(h1, h2, h3, h4, h5, h6) {\n  color: #e0e4e0 !important;\n  font-weight: 650;\n  letter-spacing: -0.015em;\n}\n\n/* Markdown Blockquotes: Sumi ink stroke */\nblockquote {\n  position: relative !important;\n  border-left: 3px solid var(--kanagawa-accent) !important;\n  background: var(--kanagawa-accent-soft) !important;\n  border-radius: 0 8px 8px 0 !important;\n  padding: 8px 16px !important;\n  margin: 12px 0 !important;\n  color: var(--dragon-gray) !important;\n  font-style: italic !important;\n}\n\n/* Markdown Tables */\ntable {\n  width: 100%;\n  border-collapse: separate !important;\n  border-spacing: 0 !important;\n  margin: 14px 0 !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  border-radius: 8px !important;\n  overflow: hidden !important;\n}\n\nth {\n  background-color: var(--dragon-black-1) !important;\n  color: var(--dragon-white) !important;\n  font-weight: 600 !important;\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--dragon-black-4) !important;\n  border-right: 1px solid var(--dragon-black-4) !important;\n}\n\nth:last-child {\n  border-right: none !important;\n}\n\ntd {\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--dragon-black-4) !important;\n  border-right: 1px solid var(--dragon-black-4) !important;\n  color: var(--dragon-gray) !important;\n}\n\ntd:last-child {\n  border-right: none !important;\n}\n\ntr:last-child td {\n  border-bottom: none !important;\n}\n\ntr:nth-child(even) td {\n  background-color: var(--dragon-black-2) !important;\n}\n\ntr:hover td {\n  background-color: var(--bettergravity-row-hover) !important;\n}\n\n/* Inline Code Badges */\n:not(pre) > code,\ncode:not(pre code) {\n  background-color: var(--dragon-black-1) !important;\n  color: var(--gemini-inline-code-text, var(--kanagawa-accent)) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  padding: 2px 6px !important;\n  border-radius: 6px !important;\n  font-size: 0.88em !important;\n  font-family: var(--gemini-code-font, ui-monospace, SFMono-Regular, Consolas, monospace) !important;\n}\n\n/* Code Blocks Container */\npre,\n.code-block,\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) div.relative.rounded-xl {\n  background-color: var(--dragon-black-1) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  border-radius: 12px !important;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n}\n\npre code,\n.line-content {\n  color: var(--dragon-white) !important;\n}\n\n/* ==========================================================================\n   8. Prism & Tree-sitter Syntax Tokens (Kanagawa Dragon Palette)\n   ========================================================================== */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: var(--dragon-black-6) !important;\n  font-style: italic;\n}\n\n.token.keyword,\n.token.selector,\n.token.important {\n  color: var(--dragon-violet) !important;\n  font-weight: 550;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.inserted {\n  color: var(--dragon-green) !important;\n}\n\n.token.number,\n.token.boolean,\n.token.constant {\n  color: var(--dragon-orange) !important;\n}\n\n.token.function,\n.token.class-name {\n  color: var(--dragon-blue) !important;\n}\n\n.token.property,\n.token.builtin {\n  color: var(--dragon-aqua) !important;\n}\n\n.token.tag,\n.token.deleted {\n  color: var(--dragon-red) !important;\n}\n\n.token.operator,\n.token.punctuation {\n  color: var(--dragon-gray-2) !important;\n}\n\n/* ==========================================================================\n   9. Chat Composer (Prompt Box) & Sumi-e Breathing Inset Aura\n   ========================================================================== */\n[data-testid=\"agent-input-box\"] {\n  background: transparent !important;\n}\n\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu]) {\n  background: var(--dragon-black-2) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;\n}\n\n/* Inset breathing glow tailored for autumn ochre ink */\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  content: \"\" !important;\n  position: absolute !important;\n  inset: 0 !important;\n  border-radius: inherit !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n  box-shadow: inset 0 0 4px 1px var(--kanagawa-accent),\n              inset 0 0 16px 2px var(--kanagawa-accent-soft) !important;\n  opacity: 0;\n  transition: opacity 160ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n[data-testid=\"agent-input-box\"]:focus-within > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  opacity: 0.35;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] {\n  color: var(--dragon-white) !important;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] ~ * {\n  color: var(--dragon-black-6) !important;\n}\n\n/* Send button */\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]) {\n  background-color: var(--kanagawa-accent) !important;\n  color: var(--dragon-black-1) !important;\n  border-radius: 8px !important;\n  cursor: pointer !important;\n  box-shadow: 0 2px 8px var(--kanagawa-accent-glow) !important;\n}\n\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):hover {\n  filter: brightness(1.1) !important;\n  transform: translateY(-1px) scale(1.02);\n}\n\n[data-testid=\"send-button\"]:disabled,\n[data-testid=\"send-button\"][disabled],\n[data-testid=\"send-button\"][aria-disabled=\"true\"] {\n  background-color: var(--dragon-black-5) !important;\n  color: var(--dragon-black-6) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  opacity: 0.6 !important;\n}\n\n/* New Conversation button */\n[data-testid=\"new-conversation-button\"] {\n  background: var(--dragon-black-2) !important;\n  color: var(--dragon-white) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  border-radius: 8px !important;\n}\n\n[data-testid=\"new-conversation-button\"]:hover {\n  background: var(--dragon-black-5) !important;\n  border-color: var(--kanagawa-accent) !important;\n  box-shadow: 0 2px 10px var(--kanagawa-accent-soft) !important;\n}\n\n/* ==========================================================================\n   10. Dialogs, Popovers & Context Menus\n   ========================================================================== */\n[role=\"dialog\"],\n[role=\"menu\"],\n[data-radix-popper-content-wrapper] > div,\n.bg-popover {\n  background-color: var(--dragon-black-2) !important;\n  border: 1px solid var(--dragon-black-4) !important;\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.04) !important;\n  border-radius: 12px !important;\n  color: var(--dragon-white) !important;\n}\n","melange-dark":"/**\n * @name        Melange Dark\n * @description Warm stone, peat wood, and sun-dried earth mineral color scheme designed by savq.\n * @author      savq (adapted for BetterGravity)\n * @version     1.0.0\n * @source      https://github.com/savq/melange-nvim\n */\n\n/* ==========================================================================\n   0. Melange Dark Palette Definition (Calibrated Earth Peat & Warm Stone)\n   ========================================================================== */\n:root {\n  /* --- Melange Warm Earth Base Scale (Moderate Peat Sink) --- */\n  --melange-bg-dim:    #161312; /* Gutter, statusline, titlebar background (L ~8.0%) */\n  --melange-bg0:       #1c1917; /* Primary workspace canvas, editor background (L ~10.2%) */\n  --melange-bg1:       #23201d; /* Layer 1: Composer, message bubbles, elevated cards (L ~13.0%) */\n  --melange-bg2:       #2c2825; /* Layer 2: Popovers, active rows, dropdowns (L ~16.5%) */\n  --melange-bg3:       #393430; /* Layer 3: Borders, dividers, subtle separators (L ~21.0%) */\n  --melange-bg4:       #47413c; /* Layer 4: Inactive borders, secondary dividers */\n  --melange-bg5:       #534c46; /* Layer 5: Row hover, inactive button borders */\n\n  /* --- Melange Foreground & Oatmeal Typography Scale --- */\n  --melange-fg:        #ece1d7; /* Primary body text (Oatmeal Cream White) */\n  --melange-grey2:     #c1b8ae; /* Secondary text, metadata timestamps */\n  --melange-grey1:     #988e84; /* Section labels, inactive triggers */\n  --melange-grey0:     #7e746a; /* Comments, placeholders, resting scrollbar */\n\n  /* --- 8 Natural Mineral & Earth Accents --- */\n  --melange-orange:    #d4956a; /* Amber Ochre (Default Signature Accent) */\n  --melange-red:       #cf6856; /* Terracotta Clay */\n  --melange-yellow:    #d7a36c; /* Sandstone Gold */\n  --melange-green:     #78997a; /* Warm Moss */\n  --melange-aqua:      #7b9695; /* Weathered Slate */\n  --melange-blue:      #788ca6; /* Mineral Indigo */\n  --melange-purple:    #b38096; /* Dried Fig */\n  --melange-brown:     #a47c65; /* Peat Bark */\n\n  /* --- Primary Theme Accent & Breathing Auras --- */\n  --melange-accent: var(--melange-orange);\n  --melange-accent-soft: rgba(212, 149, 106, 0.16);\n  --melange-accent-glow: rgba(212, 149, 106, 0.28);\n  --bettergravity-accent: var(--melange-accent);\n  --bettergravity-accent-soft: var(--melange-accent-soft);\n\n  /* ==========================================================================\n     1. Host Native Design Tokens (Antigravity 2.0 / Willow)\n     ========================================================================== */\n  --background: var(--melange-bg0) !important;\n  --foreground: var(--melange-fg) !important;\n\n  --primary: var(--melange-accent) !important;\n  --primary-foreground: var(--melange-bg-dim) !important;\n  --secondary: var(--melange-bg1) !important;\n  --secondary-foreground: var(--melange-fg) !important;\n\n  --muted: var(--melange-bg-dim) !important;\n  --muted-foreground: var(--melange-grey1) !important;\n\n  --border: var(--melange-bg3) !important;\n  --card: var(--melange-bg1) !important;\n  --card-border: var(--melange-bg3) !important;\n\n  --sidebar: var(--melange-bg-dim) !important;\n  --sidebar-secondary: var(--melange-bg1) !important;\n  --sidebar-muted: var(--melange-bg1) !important;\n\n  --placeholder: var(--melange-grey0) !important;\n  --link: var(--melange-blue) !important;\n  --focus-ring-color: var(--melange-accent) !important;\n\n  --error: var(--melange-red) !important;\n  --warning: var(--melange-yellow) !important;\n  --success: var(--melange-green) !important;\n  --code-foreground: var(--melange-accent) !important;\n\n  /* ==========================================================================\n     2. BetterGravity Shared Runtime Namespace\n     ========================================================================== */\n  --bettergravity-surface: var(--melange-bg1);\n  --bettergravity-border: var(--melange-bg3);\n  --bettergravity-text: var(--melange-fg);\n  --bettergravity-row-hover: rgba(236, 225, 215, 0.07);\n\n  /* ==========================================================================\n     3. Gemini App & Willow Shell Tokens\n     ========================================================================== */\n  --studio-surface: var(--melange-bg-dim) !important;\n  --gemini-page-bg: var(--melange-bg0) !important;\n  --gemini-surface: var(--melange-bg1) !important;\n  --gemini-surface-hover: var(--melange-bg2) !important;\n  --gemini-trigger-hover: var(--melange-bg2) !important;\n  --gemini-control-hover: var(--melange-bg2) !important;\n  --gemini-separator: var(--melange-bg3) !important;\n  --gemini-switch-track: var(--melange-bg-dim) !important;\n  --gemini-switch-slider: var(--melange-bg1) !important;\n  --gemini-body-text: var(--melange-fg) !important;\n  --gemini-text: var(--melange-fg) !important;\n  --gemini-text-trigger: var(--melange-grey1) !important;\n  --gemini-text-trigger-hover: var(--melange-fg) !important;\n  --gemini-text-dim: var(--melange-grey1) !important;\n  --gemini-bubble-bg: var(--melange-bg1) !important;\n  --gemini-composer-bg: var(--melange-bg1) !important;\n  --gemini-composer-placeholder: var(--melange-grey0) !important;\n  --gemini-inline-code-bg: var(--melange-bg-dim) !important;\n  --gemini-inline-code-text: var(--melange-accent) !important;\n  --gemini-link: var(--melange-blue) !important;\n  --gemini-send-bg: var(--melange-accent) !important;\n  --gemini-send-bg-hover: #be8259 !important;\n  --gemini-home-glow-accent: var(--melange-accent-soft) !important;\n  --gemini-row-selected: var(--melange-bg2) !important;\n  --gemini-row-hover: rgba(236, 225, 215, 0.07) !important;\n}\n\n/* ==========================================================================\n   4. Turbo Engine & Paint Optimization\n   ========================================================================== */\n[data-testid=\"user-input-step\"],\n[data-testid=\"planner-response-text\"],\n[role=\"article\"][aria-label=\"Agent response\"],\n[role=\"article\"][aria-label=\"User message\"] {\n  content-visibility: auto;\n  contain-intrinsic-size: auto 120px;\n}\n\nbody,\n#root,\n[data-testid=\"conversation-view\"] {\n  text-shadow: none !important;\n  color-scheme: dark !important;\n}\n\n/* ==========================================================================\n   5. Window Shell, TitleBar & Window Drag Boundaries\n   ========================================================================== */\n\n\n[data-testid=\"window-titlebar\"],\nheader,\n.titlebar {\n  background: var(--melange-bg-dim) !important;\n  border-bottom: 1px solid var(--melange-bg3) !important;\n  user-select: none;\n}\n\n[data-testid=\"sidebar-toggle\"],\n[data-bettergravity-button],\ndiv.go-back-btn,\nbutton[aria-label=\"Go Back\"] {\n  flex-shrink: 0 !important;\n  -webkit-app-region: no-drag !important;\n}\n\n/* ==========================================================================\n   6. Navigation & Sidebar Refinements\n   ========================================================================== */\n[role=\"navigation\"][aria-label=\"Sidebar\"],\n[role=\"navigation\"] {\n  background-color: var(--melange-bg-dim) !important;\n  border-right: 1px solid var(--melange-bg3) !important;\n}\n\nhtml body [role=\"navigation\"] .bg-sidebar,\nhtml body [role=\"navigation\"] div[class*=\"bg-sidebar\"]:not([data-testid=\"conversation-row-sidebar\"]) {\n  background-color: var(--melange-bg-dim) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] {\n  border-radius: 8px !important;\n  margin: 1px 6px !important;\n  transition: background-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1) !important;\n  --row-bg: transparent !important;\n  background-color: transparent !important;\n  position: relative !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover {\n  --row-bg: var(--melange-bg1) !important;\n  background-color: var(--melange-bg1) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"],\nhtml body [role=\"navigation\"] div[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"] {\n  --row-bg: var(--melange-bg2) !important;\n  background-color: var(--melange-bg2) !important;\n  color: var(--melange-fg) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] div[class*=\"can-hover\"],\n[data-testid=\"conversation-row-sidebar\"] div[style*=\"linear-gradient\"] {\n  background: linear-gradient(to right, transparent 0%, var(--row-bg) 24%) !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"] {\n  color: var(--melange-grey1) !important;\n  background-color: transparent !important;\n  opacity: 0.85 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"] button[data-testid^=\"conversation-\"]:hover {\n  color: var(--melange-fg) !important;\n  background-color: rgba(255, 255, 255, 0.08) !important;\n  opacity: 1 !important;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:not([data-selected=\"true\"])::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 7px;\n  bottom: 7px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--melange-accent);\n  opacity: 0;\n  pointer-events: none;\n}\n\n[data-testid=\"conversation-row-sidebar\"]:hover:not([data-selected=\"true\"])::before {\n  opacity: 0.65;\n}\n\n[data-testid=\"conversation-row-sidebar\"][data-selected=\"true\"]::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 6px;\n  bottom: 6px;\n  width: 3px;\n  border-radius: 2px;\n  background-color: var(--melange-accent);\n  opacity: 1;\n}\n\n[data-testid=\"conversation-row-sidebar\"] span.truncate {\n  color: var(--melange-fg) !important;\n}\n\n[role=\"navigation\"] [data-testid=\"section-header\"] {\n  color: var(--melange-grey1) !important;\n}\n\n/* ==========================================================================\n   7. Typography, Markdown & Digital Mineral Flow\n   ========================================================================== */\n::selection {\n  background: var(--melange-accent-soft) !important;\n  color: #ffffff !important;\n}\n\n::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n}\n\n::-webkit-scrollbar-thumb {\n  border: 2px solid transparent;\n  border-radius: 8px;\n  background-clip: content-box;\n  background-color: var(--melange-grey0);\n  transition: background-color 150ms ease;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background-color: var(--melange-accent);\n}\n\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* Headings in oatmeal cream white */\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) :is(h1, h2, h3, h4, h5, h6) {\n  color: #f7eee4 !important;\n  font-weight: 650;\n  letter-spacing: -0.015em;\n}\n\n/* Markdown Blockquotes: Warm terracotta stone stroke */\nblockquote {\n  position: relative !important;\n  border-left: 3px solid var(--melange-accent) !important;\n  background: var(--melange-accent-soft) !important;\n  border-radius: 0 8px 8px 0 !important;\n  padding: 8px 16px !important;\n  margin: 12px 0 !important;\n  color: var(--melange-grey2) !important;\n  font-style: italic !important;\n}\n\n/* Markdown Tables */\ntable {\n  width: 100%;\n  border-collapse: separate !important;\n  border-spacing: 0 !important;\n  margin: 14px 0 !important;\n  border: 1px solid var(--melange-bg3) !important;\n  border-radius: 8px !important;\n  overflow: hidden !important;\n}\n\nth {\n  background-color: var(--melange-bg-dim) !important;\n  color: var(--melange-fg) !important;\n  font-weight: 600 !important;\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--melange-bg3) !important;\n  border-right: 1px solid var(--melange-bg3) !important;\n}\n\nth:last-child {\n  border-right: none !important;\n}\n\ntd {\n  padding: 8px 12px !important;\n  border-bottom: 1px solid var(--melange-bg3) !important;\n  border-right: 1px solid var(--melange-bg3) !important;\n  color: var(--melange-grey2) !important;\n}\n\ntd:last-child {\n  border-right: none !important;\n}\n\ntr:last-child td {\n  border-bottom: none !important;\n}\n\ntr:nth-child(even) td {\n  background-color: var(--melange-bg1) !important;\n}\n\ntr:hover td {\n  background-color: var(--bettergravity-row-hover) !important;\n}\n\n/* Inline Code Badges */\n:not(pre) > code,\ncode:not(pre code) {\n  background-color: var(--melange-bg-dim) !important;\n  color: var(--gemini-inline-code-text, var(--melange-accent)) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  padding: 2px 6px !important;\n  border-radius: 6px !important;\n  font-size: 0.88em !important;\n  font-family: var(--gemini-code-font, ui-monospace, SFMono-Regular, Consolas, monospace) !important;\n}\n\n/* Code Blocks Container */\npre,\n.code-block,\n:is([data-testid=\"planner-response-text\"], [role=\"article\"][aria-label=\"Agent response\"]) div.relative.rounded-xl {\n  background-color: var(--melange-bg-dim) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  border-radius: 12px !important;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n}\n\npre code,\n.line-content {\n  color: var(--melange-fg) !important;\n}\n\n/* ==========================================================================\n   8. Prism & Tree-sitter Syntax Tokens (Melange Mineral Palette)\n   ========================================================================== */\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: var(--melange-grey0) !important;\n  font-style: italic;\n}\n\n.token.keyword,\n.token.selector,\n.token.important {\n  color: var(--melange-purple) !important;\n  font-weight: 550;\n}\n\n.token.string,\n.token.char,\n.token.attr-value,\n.token.inserted {\n  color: var(--melange-green) !important;\n}\n\n.token.number,\n.token.boolean,\n.token.constant {\n  color: var(--melange-orange) !important;\n}\n\n.token.function,\n.token.class-name {\n  color: var(--melange-yellow) !important;\n}\n\n.token.property,\n.token.builtin {\n  color: var(--melange-aqua) !important;\n}\n\n.token.tag,\n.token.deleted {\n  color: var(--melange-red) !important;\n}\n\n.token.operator,\n.token.punctuation {\n  color: var(--melange-grey1) !important;\n}\n\n/* ==========================================================================\n   9. Chat Composer (Prompt Box) & Peat Breathing Inset Aura\n   ========================================================================== */\n[data-testid=\"agent-input-box\"] {\n  background: transparent !important;\n}\n\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu]) {\n  background: var(--melange-bg1) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;\n}\n\n/* Inset breathing glow tailored for amber ochre */\n[data-testid=\"agent-input-box\"] > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  content: \"\" !important;\n  position: absolute !important;\n  inset: 0 !important;\n  border-radius: inherit !important;\n  pointer-events: none !important;\n  z-index: 5 !important;\n  box-shadow: inset 0 0 4px 1px var(--melange-accent),\n              inset 0 0 16px 2px var(--melange-accent-soft) !important;\n  opacity: 0;\n  transition: opacity 160ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n\n[data-testid=\"agent-input-box\"]:focus-within > .rounded-2xl.bg-card-border > .bg-card:not([data-mention-menu])::after {\n  opacity: 0.35;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] {\n  color: var(--melange-fg) !important;\n}\n\n[data-testid=\"agent-input-box\"] [role=\"combobox\"][contenteditable] ~ * {\n  color: var(--melange-grey0) !important;\n}\n\n/* Send button */\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]) {\n  background-color: var(--melange-accent) !important;\n  color: var(--melange-bg-dim) !important;\n  border-radius: 8px !important;\n  cursor: pointer !important;\n  box-shadow: 0 2px 8px var(--melange-accent-glow) !important;\n}\n\n[data-testid=\"send-button\"]:not(:disabled):not([disabled]):not([aria-disabled=\"true\"]):hover {\n  filter: brightness(1.1) !important;\n  transform: translateY(-1px) scale(1.02);\n}\n\n[data-testid=\"send-button\"]:disabled,\n[data-testid=\"send-button\"][disabled],\n[data-testid=\"send-button\"][aria-disabled=\"true\"] {\n  background-color: var(--melange-bg2) !important;\n  color: var(--melange-grey0) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  opacity: 0.6 !important;\n}\n\n/* New Conversation button */\n[data-testid=\"new-conversation-button\"] {\n  background: var(--melange-bg1) !important;\n  color: var(--melange-fg) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  border-radius: 8px !important;\n}\n\n[data-testid=\"new-conversation-button\"]:hover {\n  background: var(--melange-bg2) !important;\n  border-color: var(--melange-accent) !important;\n  box-shadow: 0 2px 10px var(--melange-accent-soft) !important;\n}\n\n/* ==========================================================================\n   10. Dialogs, Popovers & Context Menus\n   ========================================================================== */\n[role=\"dialog\"],\n[role=\"menu\"],\n[data-radix-popper-content-wrapper] > div,\n.bg-popover {\n  background-color: var(--melange-bg1) !important;\n  border: 1px solid var(--melange-bg3) !important;\n  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.04) !important;\n  border-radius: 12px !important;\n  color: var(--melange-fg) !important;\n}\n"};

  // 1. Resolve Theme CSS (Filesystem live reload with bundled fallback)
  function getThemeCss(themeId) {
    if (typeof require !== 'undefined') {
      try {
        const fs = require('fs');
        const path = require('path');
        const theme = THEMES.find(t => t.id === themeId);
        if (theme) {
          const candidatePaths = [
            path.join(__dirname, 'themes', theme.file),
            path.join('c:/Users/Lenin/Desktop/More Gravity Theme/themes', theme.file),
            path.join(process.env.APPDATA || '', 'BetterGravity/themes', theme.file)
          ];
          for (const cp of candidatePaths) {
            if (fs.existsSync(cp)) {
              return fs.readFileSync(cp, 'utf8');
            }
          }
        }
      } catch (e) {}
    }
    return BUNDLED_CSS[themeId] || '';
  }

  // 2. Apply Theme & Accent
  function applyTheme(themeId) {
    let styleEl = document.getElementById(STYLE_ID);
    let accentStyleEl = document.getElementById(ACCENT_STYLE_ID);

    if (!themeId) {
      if (styleEl) styleEl.remove();
      if (accentStyleEl) accentStyleEl.remove();
      localStorage.removeItem(STORAGE_KEY);
      updateModalUi();
      return;
    }

    const css = getThemeCss(themeId);
    if (!css) return;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(styleEl);
    }
    styleEl.textContent = css;
    localStorage.setItem(STORAGE_KEY, themeId);

    // Apply saved accent for this theme
    const savedAccent = getActiveAccentId(themeId);
    applyAccent(themeId, savedAccent);

    updateModalUi();
  }

  function applyAccent(themeId, accentId) {
    const config = THEME_ACCENTS[themeId];
    if (!config) return;

    const acc = config.accents.find(a => a.id === accentId) || config.accents[0];
    const hex = acc.hex;
    const soft = hex + '26';
    const glow = hex + '44';

    let accentStyle = document.getElementById(ACCENT_STYLE_ID);
    if (!accentStyle) {
      accentStyle = document.createElement('style');
      accentStyle.id = ACCENT_STYLE_ID;
      (document.head || document.documentElement).appendChild(accentStyle);
    }

    accentStyle.textContent = [
      ':root {',
      '  ' + config.varName + ': ' + hex + ' !important;',
      '  ' + config.varName + '-soft: ' + soft + ' !important;',
      '  ' + config.varName + '-glow: ' + glow + ' !important;',
      '  --primary: ' + hex + ' !important;',
      '  --focus-ring-color: ' + hex + ' !important;',
      '  --bettergravity-accent: ' + hex + ' !important;',
      '  --bettergravity-accent-soft: ' + soft + ' !important;',
      '}'
    ].join('\n');

    localStorage.setItem(ACCENT_STORAGE_PREFIX + themeId, acc.id);
    updateAccentUi();
  }

  function getActiveThemeId() {
    return localStorage.getItem(STORAGE_KEY) || 'everforest-dark';
  }

  function getActiveAccentId(themeId) {
    const config = THEME_ACCENTS[themeId];
    if (!config) return '';
    return localStorage.getItem(ACCENT_STORAGE_PREFIX + themeId) || config.defaultAccent;
  }

  // 3. Modal UI Construction (Two-Tier Design)
  let modalOverlay = null;

  function createModal() {
    if (modalOverlay) return modalOverlay;

    modalOverlay = document.createElement('div');
    modalOverlay.id = 'more-gravity-palette-modal-root';
    modalOverlay.style.cssText = [
      'position: fixed',
      'inset: 0',
      'z-index: 999999',
      'background: rgba(0, 0, 0, 0.65)',
      'display: flex',
      'align-items: center',
      'justify-content: center',
      'opacity: 0',
      'pointer-events: none',
      'transition: opacity 120ms ease',
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    ].join(';') + ';';

    const container = document.createElement('div');
    container.style.cssText = [
      'background: #14171a',
      'border: 1px solid rgba(255, 255, 255, 0.12)',
      'border-radius: 12px',
      'width: 480px',
      'max-width: 92vw',
      'box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6)',
      'padding: 20px 22px 18px 22px',
      'display: flex',
      'flex-direction: column',
      'gap: 14px',
      'user-select: none',
      'color: #e6e6e6'
    ].join(';') + ';';

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 12px;';

    const titleGroup = document.createElement('div');
    titleGroup.style.cssText = 'display: flex; align-items: center; gap: 8px;';
    titleGroup.innerHTML = [
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a7c080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>',
      '  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
      '</svg>',
      '<div>',
      '  <div style="font-size: 14px; font-weight: 600; color: #fff;">More Gravity Studio Themes</div>',
      '  <div style="font-size: 11px; color: #888;">Select an aesthetic theme and custom accent</div>',
      '</div>'
    ].join('');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'background: transparent; border: none; color: #888; font-size: 14px; cursor: pointer; padding: 4px 8px; border-radius: 4px;';
    closeBtn.onmouseenter = function () { closeBtn.style.color = '#fff'; };
    closeBtn.onmouseleave = function () { closeBtn.style.color = '#888'; };
    closeBtn.onclick = function () { hideModal(); };

    header.appendChild(titleGroup);
    header.appendChild(closeBtn);
    container.appendChild(header);

    // Tier 1: List of themes
    const list = document.createElement('div');
    list.id = 'more-gravity-themes-list';
    list.style.cssText = 'display: flex; flex-direction: column; gap: 7px;';

    THEMES.forEach(function (t) {
      const card = document.createElement('div');
      card.className = 'mg-theme-card';
      card.dataset.id = t.id;
      card.style.cssText = [
        'display: flex',
        'align-items: center',
        'justify-content: space-between',
        'padding: 8px 12px',
        'border-radius: 8px',
        'background: rgba(255, 255, 255, 0.03)',
        'border: 1px solid rgba(255, 255, 255, 0.07)',
        'cursor: pointer',
        'transition: background 100ms ease, border-color 100ms ease'
      ].join(';') + ';';

      const left = document.createElement('div');
      left.style.cssText = 'display: flex; align-items: center; gap: 12px; pointer-events: none;';

      const swatchCapsule = document.createElement('div');
      swatchCapsule.style.cssText = 'display: flex; align-items: center; gap: 3px; background: #0d0f11; padding: 3px 5px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);';
      t.swatches.forEach(function (c) {
        const dot = document.createElement('div');
        dot.style.cssText = 'width: 9px; height: 9px; border-radius: 50%; background: ' + c + ';';
        swatchCapsule.appendChild(dot);
      });

      const textGroup = document.createElement('div');
      textGroup.style.cssText = 'display: flex; flex-direction: column;';
      textGroup.innerHTML = [
        '<span style="font-size: 13px; font-weight: 500; color: #f0f0f0;">' + t.name + '</span>',
        '<span style="font-size: 11px; color: #777;">' + t.desc + '</span>'
      ].join('');

      left.appendChild(swatchCapsule);
      left.appendChild(textGroup);

      const right = document.createElement('div');
      right.className = 'mg-card-check';
      right.style.cssText = 'font-size: 14px; font-weight: bold; color: ' + t.accent + '; opacity: 0; pointer-events: none;';
      right.textContent = '✓';

      card.appendChild(left);
      card.appendChild(right);

      card.onmouseenter = function () {
        card.style.background = 'rgba(255, 255, 255, 0.08)';
      };
      card.onmouseleave = function () {
        const isActive = card.dataset.active === 'true';
        card.style.background = isActive ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)';
      };

      card.onclick = function () {
        applyTheme(t.id);
      };

      list.appendChild(card);
    });

    container.appendChild(list);

    // Tier 2: Dedicated Accent & Flavor Switcher Section
    const accentSection = document.createElement('div');
    accentSection.id = 'more-gravity-accent-section';
    accentSection.style.cssText = [
      'background: rgba(0, 0, 0, 0.25)',
      'border: 1px solid rgba(255, 255, 255, 0.08)',
      'border-radius: 8px',
      'padding: 10px 14px',
      'display: flex',
      'flex-direction: column',
      'gap: 8px'
    ].join(';') + ';';

    const accentHeader = document.createElement('div');
    accentHeader.style.cssText = 'display: flex; align-items: center; justify-content: space-between;';
    accentHeader.innerHTML = [
      '<span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #888;">ACCENT COLOR</span>',
      '<span id="mg-active-accent-label" style="font-size: 11px; color: #aaa;"></span>'
    ].join('');
    accentSection.appendChild(accentHeader);

    const accentDotsRow = document.createElement('div');
    accentDotsRow.id = 'mg-accent-dots-row';
    accentDotsRow.style.cssText = 'display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 2px 0;';
    accentSection.appendChild(accentDotsRow);

    container.appendChild(accentSection);

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = 'display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 10px; font-size: 11px; color: #666;';
    footer.innerHTML = '<span>Shortcut: <kbd style="background: #222; padding: 2px 5px; border-radius: 4px; color: #aaa;">Ctrl+Alt+T</kbd> / <kbd style="background: #222; padding: 2px 5px; border-radius: 4px; color: #aaa;">F8</kbd></span>';

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Default';
    resetBtn.style.cssText = 'background: transparent; border: 1px solid rgba(255, 255, 255, 0.1); color: #888; padding: 3px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;';
    resetBtn.onmouseenter = function () { resetBtn.style.color = '#fff'; };
    resetBtn.onmouseleave = function () { resetBtn.style.color = '#888'; };
    resetBtn.onclick = function () {
      applyTheme(null);
      hideModal();
    };
    footer.appendChild(resetBtn);
    container.appendChild(footer);

    modalOverlay.appendChild(container);
    modalOverlay.onclick = function (e) {
      if (e.target === modalOverlay) hideModal();
    };

    document.body.appendChild(modalOverlay);
    updateModalUi();
    return modalOverlay;
  }

  function updateModalUi() {
    if (!modalOverlay) return;
    const activeId = getActiveThemeId();
    const cards = modalOverlay.querySelectorAll('.mg-theme-card');

    cards.forEach(function (card) {
      const id = card.dataset.id;
      const check = card.querySelector('.mg-card-check');
      const theme = THEMES.find(function (t) { return t.id === id; });
      if (id === activeId) {
        card.dataset.active = 'true';
        card.style.background = 'rgba(255, 255, 255, 0.06)';
        card.style.borderColor = theme ? theme.accent : '#a7c080';
        if (check) check.style.opacity = '1';
      } else {
        card.dataset.active = 'false';
        card.style.background = 'rgba(255, 255, 255, 0.03)';
        card.style.borderColor = 'rgba(255, 255, 255, 0.07)';
        if (check) check.style.opacity = '0';
      }
    });

    updateAccentUi();
  }

  function updateAccentUi() {
    if (!modalOverlay) return;
    const activeThemeId = getActiveThemeId();
    const config = THEME_ACCENTS[activeThemeId];
    const row = modalOverlay.querySelector('#mg-accent-dots-row');
    const label = modalOverlay.querySelector('#mg-active-accent-label');
    if (!config || !row) return;

    const currentAccentId = getActiveAccentId(activeThemeId);
    const activeAccent = config.accents.find(a => a.id === currentAccentId) || config.accents[0];
    if (label) {
      label.textContent = activeAccent.name;
      label.style.color = activeAccent.hex;
    }

    row.innerHTML = '';
    config.accents.forEach(function (acc) {
      const isSelected = acc.id === activeAccent.id;
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.title = acc.name;
      dot.style.cssText = [
        'width: 20px',
        'height: 20px',
        'border-radius: 50%',
        'background-color: ' + acc.hex,
        'border: ' + (isSelected ? '2px solid #ffffff' : '2px solid transparent'),
        'box-shadow: ' + (isSelected ? '0 0 10px ' + acc.hex + '99' : 'none'),
        'cursor: pointer',
        'outline: none',
        'transition: transform 100ms ease, box-shadow 100ms ease',
        'transform: ' + (isSelected ? 'scale(1.15)' : 'scale(1)')
      ].join(';') + ';';

      dot.onmouseenter = function () {
        dot.style.transform = 'scale(1.25)';
      };
      dot.onmouseleave = function () {
        dot.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)';
      };

      dot.onclick = function (e) {
        e.stopPropagation();
        applyAccent(activeThemeId, acc.id);
      };

      row.appendChild(dot);
    });
  }

  function showModal() {
    createModal();
    updateModalUi();
    modalOverlay.style.opacity = '1';
    modalOverlay.style.pointerEvents = 'auto';
  }

  function hideModal() {
    if (!modalOverlay) return;
    modalOverlay.style.opacity = '0';
    modalOverlay.style.pointerEvents = 'none';
  }

  function toggleModal() {
    if (modalOverlay && modalOverlay.style.opacity === '1') {
      hideModal();
    } else {
      showModal();
    }
  }

  // 4. Global Keyboard Shortcuts (Ctrl+Alt+T or F8)
  window.addEventListener('keydown', function (e) {
    if ((e.ctrlKey && e.altKey && (e.key === 't' || e.key === 'T')) || e.key === 'F8') {
      e.preventDefault();
      toggleModal();
    } else if (e.key === 'Escape' && modalOverlay && modalOverlay.style.opacity === '1') {
      e.preventDefault();
      hideModal();
    }
  }, true);

  // 5. Header Button Injection (Titlebar Palette Icon)
  function injectTitlebarButton() {
    if (document.getElementById('more-gravity-palette-btn')) return;

    const header = document.querySelector('[data-testid="title-menu-bar"], [data-testid="window-titlebar"], header, .titlebar, div[class*="titlebar"]');
    if (!header) return;

    const btn = document.createElement('button');
    btn.id = 'more-gravity-palette-btn';
    btn.title = 'More Gravity Themes & Accents (Ctrl+Alt+T / F8)';
    btn.setAttribute('data-no-drag', '');
    btn.style.cssText = [
      '-webkit-app-region: no-drag !important',
      'background: transparent',
      'border: none',
      'color: rgba(255, 255, 255, 0.65)',
      'cursor: pointer',
      'display: inline-flex',
      'align-items: center',
      'justify-content: center',
      'width: 24px',
      'height: 24px',
      'border-radius: 4px',
      'margin: 0 4px',
      'transition: color 100ms ease, background 100ms ease'
    ].join(';') + ';';
    btn.innerHTML = [
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>',
      '  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>',
      '  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
      '</svg>'
    ].join('');

    btn.onmouseenter = function () {
      btn.style.color = '#fff';
      btn.style.background = 'rgba(255, 255, 255, 0.08)';
    };
    btn.onmouseleave = function () {
      btn.style.color = 'rgba(255, 255, 255, 0.65)';
      btn.style.background = 'transparent';
    };
    btn.onclick = function () { toggleModal(); };

    header.appendChild(btn);
  }

  // 6. Initialization & Convergence
  function init() {
    applyTheme(getActiveThemeId());

    let retries = 0;
    const interval = setInterval(function () {
      injectTitlebarButton();
      retries++;
      if (document.getElementById('more-gravity-palette-btn') || retries > 30) {
        clearInterval(interval);
      }
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MoreGravity = {
    show: showModal,
    hide: hideModal,
    toggle: toggleModal,
    apply: applyTheme,
    applyAccent: applyAccent,
    themes: THEMES,
    accents: THEME_ACCENTS
  };
})();
