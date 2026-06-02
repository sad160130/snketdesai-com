/**
 * Inline, render-blocking script that sets the theme class on <html> BEFORE
 * first paint, so there's no flash of the wrong theme. Reads a persisted
 * choice from localStorage, otherwise falls back to prefers-color-scheme.
 */
export function ThemeScript() {
  const code = `(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(!s&&m);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
