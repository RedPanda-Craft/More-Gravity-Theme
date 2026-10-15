// ============================================================================
// app.js - More Gravity Theme Studio Frontend
// ============================================================================

(function () {
  let themesData = [];
  let currentTheme = null;
  let currentAccent = null;

  const themeListEl = document.getElementById('themeList');
  const accentRowEl = document.getElementById('accentRow');
  const accentNameEl = document.getElementById('accentName');
  const statusBadgeEl = document.getElementById('statusBadge');
  const btnResetEl = document.getElementById('btnReset');

  function updateStatus(text, color) {
    const dot = statusBadgeEl.querySelector('.status-dot');
    const txt = statusBadgeEl.querySelector('.status-text');
    txt.textContent = text;
    if (color) {
      dot.style.background = color;
      dot.style.boxShadow = `0 0 6px ${color}`;
    }
  }

  async function init() {
    try {
      const resp = await fetch('/api/themes');
      const data = await resp.json();
      themesData = data.themes || [];
      const saved = data.current || {};

      currentTheme = themesData.find(t => t.id === saved.themeId) || themesData[0];
      currentAccent = saved.accent || currentTheme.accents[0].hex;

      renderThemes();
      renderAccents();
      updateStatus('0ms Live', '#10b981');
    } catch (err) {
      console.error('[Theme Studio] Init failed:', err);
      updateStatus('Offline', '#ef4444');
    }
  }

  function renderThemes() {
    themeListEl.innerHTML = '';
    themesData.forEach(theme => {
      const card = document.createElement('div');
      card.className = `theme-card ${currentTheme.id === theme.id ? 'active' : ''}`;
      
      const sigAccent = theme.accents[0].hex;
      card.innerHTML = `
        <div class="theme-swatch-bar">
          <div class="swatch-pip" style="background:#555"></div>
          <div class="swatch-pip" style="background:#888"></div>
          <div class="swatch-pip accent" style="background:${sigAccent}; color:${sigAccent}"></div>
        </div>
        <div class="theme-info">
          <div class="theme-name">${theme.name}</div>
          <div class="theme-desc">${theme.desc}</div>
        </div>
        <div class="theme-check">✓</div>
      `;

      card.addEventListener('click', () => {
        selectTheme(theme);
      });

      themeListEl.appendChild(card);
    });

    document.documentElement.style.setProperty('--primary-accent', currentAccent || '#fab387');
  }

  function renderAccents() {
    accentRowEl.innerHTML = '';
    if (!currentTheme?.accents) return;

    currentTheme.accents.forEach(acc => {
      const btn = document.createElement('button');
      btn.className = `accent-btn ${currentAccent.toLowerCase() === acc.hex.toLowerCase() ? 'active' : ''}`;
      btn.style.backgroundColor = acc.hex;
      btn.style.color = acc.hex;
      btn.title = `${acc.name} (${acc.hex})`;

      btn.addEventListener('click', () => {
        selectAccent(acc);
      });

      accentRowEl.appendChild(btn);
    });

    const activeAccObj = currentTheme.accents.find(a => a.hex.toLowerCase() === currentAccent.toLowerCase()) || currentTheme.accents[0];
    accentNameEl.textContent = activeAccObj?.name || 'Selected';
  }

  async function selectTheme(theme) {
    currentTheme = theme;
    currentAccent = theme.accents[0].hex;

    renderThemes();
    renderAccents();
    await applyTheme(theme.id, currentAccent);
  }

  async function selectAccent(acc) {
    currentAccent = acc.hex;
    renderAccents();
    await applyTheme(currentTheme.id, currentAccent);
  }

  async function applyTheme(themeId, accentHex) {
    updateStatus('Applying...', '#f59e0b');
    try {
      const resp = await fetch('/api/set-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId, accentHex })
      });
      const res = await resp.json();
      if (res.applied) {
        updateStatus('0ms Applied', '#10b981');
      } else {
        updateStatus('Saved (Local)', '#38bdf8');
      }
    } catch (err) {
      updateStatus('Save Error', '#ef4444');
    }
  }

  btnResetEl.addEventListener('click', async () => {
    updateStatus('Resetting...', '#f59e0b');
    try {
      await fetch('/api/reset', { method: 'POST' });
      document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.accent-btn').forEach(b => b.classList.remove('active'));
      accentNameEl.textContent = 'Vanilla Default';
      updateStatus('Vanilla Reset', '#10b981');
    } catch (err) {
      updateStatus('Reset Error', '#ef4444');
    }
  });

  init();
})();
