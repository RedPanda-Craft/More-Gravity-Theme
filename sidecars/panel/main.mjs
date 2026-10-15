// ============================================================================
// main.mjs - More Gravity Theme Studio Sidecar Backend
// Antigravity 2.0 Official UI Extension Backend (Auxiliary Side Pane)
// ============================================================================

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Response, SidecarApp } from 'sidecar_sdk';

const HERE = dirname(fileURLToPath(import.meta.url));
const readLocal = (name) => readFileSync(join(HERE, name), 'utf8');

const THEMES_CONFIG = [
  {
    id: 'everforest',
    name: 'Everforest Dark',
    desc: 'Natural green-tinted, warm analog palette for comfortable viewing',
    file: 'everforest-dark.css',
    accents: [
      { name: 'Forest Green', hex: '#a7c080' },
      { name: 'Aqua', hex: '#83c092' },
      { name: 'Blue', hex: '#7fbbb3' },
      { name: 'Orange', hex: '#e69875' },
      { name: 'Yellow', hex: '#dbbc7f' },
      { name: 'Red', hex: '#e67e80' },
      { name: 'Purple', hex: '#d699b6' }
    ]
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin Mocha',
    desc: 'Soothing pastel color scheme with calibrated high contrast',
    file: 'catppuccin-turbo.css',
    accents: [
      { name: 'Peach', hex: '#fab387' },
      { name: 'Mauve', hex: '#cba6f7' },
      { name: 'Pink', hex: '#f5c2e7' },
      { name: 'Blue', hex: '#89b4fa' },
      { name: 'Teal', hex: '#94e2d5' },
      { name: 'Green', hex: '#a6e3a1' },
      { name: 'Yellow', hex: '#f9e2af' },
      { name: 'Red', hex: '#f38ba8' },
      { name: 'Lavender', hex: '#b4befe' }
    ]
  },
  {
    id: 'flexoki',
    name: 'Flexoki Dark',
    desc: 'Inky paper tone designed by Steph Ango with zero blue-haze',
    file: 'flexoki-dark.css',
    accents: [
      { name: 'Ochre Orange', hex: '#da702c' },
      { name: 'Red', hex: '#af3029' },
      { name: 'Yellow', hex: '#d0a215' },
      { name: 'Green', hex: '#879a39' },
      { name: 'Cyan', hex: '#24837b' },
      { name: 'Blue', hex: '#205ea6' },
      { name: 'Purple', hex: '#5e409d' },
      { name: 'Magenta', hex: '#a02f6f' }
    ]
  },
  {
    id: 'kanagawa',
    name: 'Kanagawa Dragon',
    desc: 'Sumi-e ink dark peat with warm autumn accents by rebelot',
    file: 'kanagawa-dragon.css',
    accents: [
      { name: 'Autumn Ochre', hex: '#b6927b' },
      { name: 'Carp Yellow', hex: '#c8c093' },
      { name: 'Wave Blue', hex: '#7e9cd8' },
      { name: 'Spring Green', hex: '#98bb6c' },
      { name: 'Boat Red', hex: '#c34043' },
      { name: 'Oni Violet', hex: '#957fb8' }
    ]
  },
  {
    id: 'melange',
    name: 'Melange Dark',
    desc: 'Warm earth peat, stone, and oatmeal typography by miikanissi',
    file: 'melange-dark.css',
    accents: [
      { name: 'Peat Vermilion', hex: '#d47766' },
      { name: 'Oatmeal', hex: '#ebd8c8' },
      { name: 'Sand Amber', hex: '#e49b5d' },
      { name: 'Moss Mint', hex: '#85b695' },
      { name: 'Pebble Slate', hex: '#78997a' },
      { name: 'Heather Mauve', hex: '#b380b0' }
    ]
  }
];

const STORAGE_PATH = join(
  process.env.APPDATA || '',
  'MoreGravity',
  'current_theme.json'
);

function getSavedTheme() {
  try {
    if (existsSync(STORAGE_PATH)) {
      return JSON.parse(readFileSync(STORAGE_PATH, 'utf8'));
    }
  } catch (_) {}
  return { themeId: 'everforest', accent: '#a7c080' };
}

function saveTheme(data) {
  try {
    const dir = dirname(STORAGE_PATH);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('[MoreGravity Sidecar] Failed to save theme:', err);
  }
}

// Live CDP injection directly into the Antigravity main window
async function applyThemeViaCDP(themeCss, accentHex) {
  const portFile = join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
  if (!existsSync(portFile)) throw new Error('DevToolsActivePort not found');
  const port = readFileSync(portFile, 'utf8').split('\n')[0].trim();
  const resp = await fetch(`http://127.0.0.1:${port}/json`);
  const targets = await resp.json();
  const mainTarget = targets.find(t => t.type === 'page' && t.title.includes('Antigravity'));
  if (!mainTarget?.webSocketDebuggerUrl) throw new Error('Antigravity window target not found');

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(mainTarget.webSocketDebuggerUrl);
    ws.onopen = () => {
      const code = `
        (function() {
          let style = document.getElementById('user-theme') || document.getElementById('more-gravity-theme-style');
          if (!style) {
            style = document.createElement('style');
            style.id = 'more-gravity-theme-style';
            document.head.appendChild(style);
          }
          style.textContent = ${JSON.stringify(themeCss)};
          if (${JSON.stringify(accentHex)}) {
            document.documentElement.style.setProperty('--primary', ${JSON.stringify(accentHex)});
            document.documentElement.style.setProperty('--focus-ring', ${JSON.stringify(accentHex)});
          }
          return true;
        })()
      `;
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: code } }));
    };
    ws.onmessage = (msg) => {
      try {
        const res = JSON.parse(msg.data);
        ws.close();
        resolve(res.result?.result?.value);
      } catch (err) {
        ws.close();
        resolve(true);
      }
    };
    ws.onerror = (err) => {
      ws.close();
      reject(err);
    };
  });
}

const app = new SidecarApp();

// Static routes
app.page('/', () => new Response(readLocal('index.html'), {
  contentType: 'text/html',
  headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
}));

app.api('/styles.css', () => new Response(readLocal('styles.css'), {
  contentType: 'text/css',
  headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
}), 'GET');

app.api('/app.js', () => new Response(readLocal('app.js'), {
  contentType: 'application/javascript',
  headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
}), 'GET');

// API routes
app.api('/api/themes', () => ({
  themes: THEMES_CONFIG,
  current: getSavedTheme()
}), 'GET');

app.api('/api/set-theme', async (data) => {
  const themeId = String(data?.themeId || 'everforest');
  const accentHex = String(data?.accentHex || '');

  const themeObj = THEMES_CONFIG.find(t => t.id === themeId) || THEMES_CONFIG[0];
  const themeCssPath = join(HERE, 'themes', themeObj.file);

  let themeCss = '';
  if (existsSync(themeCssPath)) {
    themeCss = readFileSync(themeCssPath, 'utf8');
  }

  saveTheme({ themeId: themeObj.id, accent: accentHex || themeObj.accents[0].hex });

  try {
    await applyThemeViaCDP(themeCss, accentHex || themeObj.accents[0].hex);
    return { success: true, themeId: themeObj.id, applied: true };
  } catch (err) {
    console.error('[MoreGravity Sidecar] CDP injection note:', err.message);
    return { success: true, themeId: themeObj.id, applied: false, note: err.message };
  }
}, 'POST');

app.api('/api/reset', async () => {
  saveTheme({ themeId: 'vanilla', accent: '' });
  try {
    await applyThemeViaCDP('', '');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}, 'POST');
