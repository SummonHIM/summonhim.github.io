export type Theme = 'light' | 'dark';

export function initThemeToggle(): void {
  const btn = document.getElementById('theme-toggle');

  if (!btn) {
    throw new Error('Theme toggle button not found');
  }

  btn.addEventListener('click', () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  });
}
