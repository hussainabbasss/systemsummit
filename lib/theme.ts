export type Theme = "light" | "dark";

export const THEME_KEY = "ss-theme";
export const THEME_ATTR = "data-theme";

/**
 * Inline, pre-paint boot script. Injected into <head> as a raw string so it
 * runs before first paint and sets the theme with no flash of wrong colors.
 * Resolution order: stored choice -> prefers-color-scheme -> light (default).
 */
export const themeBootScript = `(function(){try{var k="${THEME_KEY}";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(m?"dark":"light");document.documentElement.setAttribute("${THEME_ATTR}",t);}catch(e){document.documentElement.setAttribute("${THEME_ATTR}","light");}})();`;
