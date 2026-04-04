export type AppPalette = 'globoox' | 'default';
export type AppMode = 'light' | 'dark' | 'system';
export type ThemeId = 'light' | 'dark' | 'forest-light' | 'forest-dark';
export type AppThemeClass = ThemeId;
export type ReaderThemeId = ThemeId;
export type ReaderFontWeight = 'light' | 'regular' | 'medium' | 'semibold';

export interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
}

export interface ReaderTypography {
  h1Weight: ReaderFontWeight;
  h2Weight: ReaderFontWeight;
  h3Weight: ReaderFontWeight;
  h4Weight: ReaderFontWeight;
  bodyWeight: ReaderFontWeight;
  lineHeightScale: number;
}

export interface ThemeDefinition {
  id: ThemeId;
  palette: AppPalette;
  mode: Exclude<AppMode, 'system'>;
  rootClass: AppThemeClass;
  colors: ThemeColors;
  typography: ReaderTypography;
}

export type ThemeCssVariables = Record<`--${string}`, string>;

export const THEME_CLASSES: AppThemeClass[] = ['light', 'dark', 'forest-light', 'forest-dark'];

export const THEME_DEFINITIONS: Record<ThemeId, ThemeDefinition> = {
  light: {
    id: 'light',
    palette: 'default',
    mode: 'light',
    rootClass: 'light',
    colors: { bg: '#F6F6FA', text: '#000000', accent: '#007AFF' },
    typography: {
      h1Weight: 'semibold',
      h2Weight: 'semibold',
      h3Weight: 'semibold',
      h4Weight: 'medium',
      bodyWeight: 'medium',
      lineHeightScale: 1,
    },
  },
  dark: {
    id: 'dark',
    palette: 'default',
    mode: 'dark',
    rootClass: 'dark',
    colors: { bg: '#09090B', text: '#FFFFFF', accent: '#0A84FF' },
    typography: {
      h1Weight: 'medium',
      h2Weight: 'medium',
      h3Weight: 'medium',
      h4Weight: 'regular',
      bodyWeight: 'regular',
      lineHeightScale: 1,
    },
  },
  'forest-light': {
    id: 'forest-light',
    palette: 'globoox',
    mode: 'light',
    rootClass: 'forest-light',
    colors: { bg: '#F4F0E8', text: '#2C3B2D', accent: '#C05A3A' },
    typography: {
      h1Weight: 'semibold',
      h2Weight: 'medium',
      h3Weight: 'medium',
      h4Weight: 'regular',
      bodyWeight: 'medium',
      lineHeightScale: 1,
    },
  },
  'forest-dark': {
    id: 'forest-dark',
    palette: 'globoox',
    mode: 'dark',
    rootClass: 'forest-dark',
    colors: { bg: '#1A2419', text: '#F4F0E8', accent: '#E8B89A' },
    typography: {
      h1Weight: 'medium',
      h2Weight: 'medium',
      h3Weight: 'medium',
      h4Weight: 'regular',
      bodyWeight: 'regular',
      lineHeightScale: 1,
    },
  },
};

export function isAppMode(value: unknown): value is AppMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function isAppPalette(value: unknown): value is AppPalette {
  return value === 'globoox' || value === 'default';
}

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && value in THEME_DEFINITIONS;
}

export function resolveThemeId(mode: AppMode, palette: AppPalette, prefersDark: boolean): ThemeId {
  const dark = mode === 'dark' || (mode === 'system' && prefersDark);
  return palette === 'globoox' ? (dark ? 'forest-dark' : 'forest-light') : (dark ? 'dark' : 'light');
}

export function getThemeDefinition(themeId: ThemeId | string | null | undefined): ThemeDefinition {
  if (isThemeId(themeId)) {
    return THEME_DEFINITIONS[themeId];
  }
  return THEME_DEFINITIONS.light;
}

export const THEME_CSS_VARIABLES: Record<ThemeId, ThemeCssVariables> = {
  light: {
    '--system-blue': '#007AFF',
    '--system-green': '#34C759',
    '--system-orange': '#FF9500',
    '--system-red': '#FF3B30',
    '--system-yellow': '#FFCC00',
    '--danger-fg': '#FF3B30',
    '--system-gray': '#8E8E93',
    '--system-gray2': '#AEAEB2',
    '--system-gray3': '#C7C7CC',
    '--system-gray4': '#D1D1D6',
    '--system-gray5': '#E5E5EA',
    '--system-gray6': '#F2F2F7',
    '--label-primary': '#000000',
    '--label-secondary': 'rgba(60, 60, 67, 0.6)',
    '--label-tertiary': 'rgba(60, 60, 67, 0.3)',
    '--label-quaternary': 'rgba(60, 60, 67, 0.18)',
    '--bg-primary': '#F6F6FA',
    '--bg-secondary': '#EEEFF5',
    '--bg-tertiary': '#FFFFFF',
    '--bg-grouped': '#F6F6FA',
    '--bg-grouped-secondary': '#FFFFFF',
    '--separator': 'rgba(60, 60, 67, 0.29)',
    '--separator-opaque': '#C6C6C8',
    '--fill-primary': 'rgba(120, 120, 128, 0.2)',
    '--fill-secondary': 'rgba(120, 120, 128, 0.16)',
    '--fill-tertiary': 'rgba(118, 118, 128, 0.12)',
    '--book-reflex-opacity': '0.42',
    '--book-card-shadow': '0 1px 2px rgba(0, 0, 0, 0.10), 0 10px 22px rgba(0, 0, 0, 0.12)',
    '--primary-foreground': '#FFFFFF',
    '--muted': '#E8E8EE',
    '--accent': '#E8E8EE',
    '--chart-1': 'oklch(0.646 0.222 41.116)',
    '--chart-2': 'oklch(0.6 0.118 184.704)',
    '--chart-3': 'oklch(0.398 0.07 227.392)',
    '--chart-4': 'oklch(0.828 0.189 84.429)',
    '--chart-5': 'oklch(0.769 0.188 70.08)',
    '--sidebar-primary-foreground': '#FFFFFF',
  },
  dark: {
    '--system-blue': '#0A84FF',
    '--system-green': '#30D158',
    '--system-orange': '#FF9F0A',
    '--system-red': '#FF453A',
    '--system-yellow': '#FFD60A',
    '--danger-fg': '#FF453A',
    '--system-gray': '#8E8E93',
    '--system-gray2': '#636366',
    '--system-gray3': '#48484A',
    '--system-gray4': '#3A3A3C',
    '--system-gray5': '#2C2C2E',
    '--system-gray6': '#1C1C1E',
    '--label-primary': '#FFFFFF',
    '--label-secondary': 'rgba(235, 235, 245, 0.6)',
    '--label-tertiary': 'rgba(235, 235, 245, 0.3)',
    '--label-quaternary': 'rgba(235, 235, 245, 0.18)',
    '--bg-primary': '#09090B',
    '--bg-secondary': '#151518',
    '--bg-tertiary': '#1F1F23',
    '--bg-grouped': '#09090B',
    '--bg-grouped-secondary': '#1C1C1E',
    '--separator': 'rgba(84, 84, 88, 0.65)',
    '--separator-opaque': '#38383A',
    '--fill-primary': 'rgba(120, 120, 128, 0.36)',
    '--fill-secondary': 'rgba(120, 120, 128, 0.32)',
    '--fill-tertiary': 'rgba(118, 118, 128, 0.24)',
    '--book-reflex-opacity': '0.30',
    '--book-card-shadow': '0 1px 2px rgba(0, 0, 0, 0.45), 0 12px 28px rgba(0, 0, 0, 0.55)',
    '--primary-foreground': '#FFFFFF',
    '--muted': '#1C1C1E',
    '--accent': '#1C1C1E',
    '--chart-1': 'oklch(0.488 0.243 264.376)',
    '--chart-2': 'oklch(0.696 0.17 162.48)',
    '--chart-3': 'oklch(0.769 0.188 70.08)',
    '--chart-4': 'oklch(0.627 0.265 303.9)',
    '--chart-5': 'oklch(0.645 0.246 16.439)',
    '--sidebar-primary-foreground': '#FFFFFF',
  },
  'forest-light': {
    '--system-blue': '#C05A3A',
    '--system-green': '#7A8C7B',
    '--system-orange': '#E8B89A',
    '--system-red': '#C05A3A',
    '--system-yellow': '#E8B89A',
    '--danger-fg': '#c8241b',
    '--system-gray': '#7A8C7B',
    '--system-gray2': '#B8C4B9',
    '--system-gray3': '#B8C4B9',
    '--system-gray4': '#E6E0D6',
    '--system-gray5': '#EDE8DF',
    '--system-gray6': '#F4F0E8',
    '--label-primary': '#2C3B2D',
    '--label-secondary': 'rgba(44, 59, 45, 0.6)',
    '--label-tertiary': 'rgba(44, 59, 45, 0.3)',
    '--label-quaternary': 'rgba(44, 59, 45, 0.18)',
    '--bg-primary': '#F4F0E8',
    '--bg-secondary': '#EDE8DF',
    '--bg-tertiary': '#FFFFFF',
    '--bg-grouped': '#F4F0E8',
    '--bg-grouped-secondary': '#FFFFFF',
    '--separator': 'rgba(44, 59, 45, 0.18)',
    '--separator-opaque': '#D4CFC6',
    '--fill-primary': 'rgba(44, 59, 45, 0.12)',
    '--fill-secondary': 'rgba(44, 59, 45, 0.08)',
    '--fill-tertiary': 'rgba(44, 59, 45, 0.06)',
    '--book-reflex-opacity': '0.40',
    '--book-card-shadow': '0 1px 2px rgba(22, 31, 23, 0.12), 0 10px 24px rgba(22, 31, 23, 0.18)',
    '--primary-foreground': '#FFFFFF',
    '--muted': '#E8E1D6',
    '--accent': '#E8E1D6',
    '--chart-1': 'oklch(0.646 0.222 41.116)',
    '--chart-2': 'oklch(0.6 0.118 184.704)',
    '--chart-3': 'oklch(0.398 0.07 227.392)',
    '--chart-4': 'oklch(0.828 0.189 84.429)',
    '--chart-5': 'oklch(0.769 0.188 70.08)',
    '--sidebar-primary-foreground': '#FFFFFF',
  },
  'forest-dark': {
    '--system-blue': '#E8B89A',
    '--system-green': '#7A8C7B',
    '--system-orange': '#E8B89A',
    '--system-red': '#E8B89A',
    '--system-yellow': '#E8B89A',
    '--danger-fg': '#FF6B5E',
    '--system-gray': '#7A8C7B',
    '--system-gray2': '#4D5E4E',
    '--system-gray3': '#3D5040',
    '--system-gray4': '#2C3B2D',
    '--system-gray5': '#1E2B1F',
    '--system-gray6': '#141E14',
    '--label-primary': '#F4F0E8',
    '--label-secondary': 'rgba(244, 240, 232, 0.7)',
    '--label-tertiary': 'rgba(244, 240, 232, 0.35)',
    '--label-quaternary': 'rgba(244, 240, 232, 0.18)',
    '--bg-primary': '#1A2419',
    '--bg-secondary': '#1E2B1F',
    '--bg-tertiary': '#253328',
    '--bg-grouped': '#1A2419',
    '--bg-grouped-secondary': '#253328',
    '--separator': 'rgba(244, 240, 232, 0.12)',
    '--separator-opaque': '#3D5040',
    '--fill-primary': 'rgba(244, 240, 232, 0.14)',
    '--fill-secondary': 'rgba(244, 240, 232, 0.10)',
    '--fill-tertiary': 'rgba(244, 240, 232, 0.07)',
    '--book-reflex-opacity': '0.28',
    '--book-card-shadow': '0 1px 2px rgba(0, 0, 0, 0.48), 0 14px 34px rgba(0, 0, 0, 0.62)',
    '--primary-foreground': '#1A2419',
    '--muted': '#141E14',
    '--accent': '#141E14',
    '--chart-1': 'oklch(0.488 0.243 264.376)',
    '--chart-2': 'oklch(0.696 0.17 162.48)',
    '--chart-3': 'oklch(0.769 0.188 70.08)',
    '--chart-4': 'oklch(0.627 0.265 303.9)',
    '--chart-5': 'oklch(0.645 0.246 16.439)',
    '--sidebar-primary-foreground': '#FFFFFF',
  },
};

export function getThemeCssVariables(themeId: ThemeId | string | null | undefined): ThemeCssVariables {
  const resolvedThemeId = isThemeId(themeId) ? themeId : 'light';
  const cssVars = THEME_CSS_VARIABLES[resolvedThemeId];
  const theme = getThemeDefinition(themeId);
  const isDark = theme.mode === 'dark';
  const readerBorder = `rgba(${isDark ? '244, 240, 232' : '44, 59, 45'}, ${isDark ? '0.16' : '0.12'})`;
  const readerMuted = `rgba(${isDark ? '244, 240, 232' : '44, 59, 45'}, ${isDark ? '0.7' : '0.62'})`;
  const readerSubtle = `rgba(${isDark ? '244, 240, 232' : '44, 59, 45'}, ${isDark ? '0.52' : '0.46'})`;
  const readerQuote = `rgba(${isDark ? '244, 240, 232' : '44, 59, 45'}, ${isDark ? '0.82' : '0.78'})`;
  const readerChromeBg = `rgba(${resolvedThemeId === 'light' ? '246, 246, 250' : resolvedThemeId === 'dark' ? '9, 9, 11' : resolvedThemeId === 'forest-light' ? '244, 240, 232' : '26, 36, 25'}, ${isDark ? '0.9' : '0.92'})`;
  return {
    ...cssVars,
    '--primary': 'var(--system-blue)',
    '--background': 'var(--bg-primary)',
    '--foreground': 'var(--label-primary)',
    '--card': 'var(--bg-grouped-secondary)',
    '--card-foreground': 'var(--label-primary)',
    '--popover': 'var(--bg-grouped-secondary)',
    '--popover-foreground': 'var(--label-primary)',
    '--secondary': 'var(--system-gray6)',
    '--secondary-foreground': 'var(--label-primary)',
    '--muted-foreground': 'var(--label-secondary)',
    '--accent-foreground': 'var(--label-primary)',
    '--border': 'var(--separator)',
    '--input': 'var(--separator)',
    '--ring': 'var(--system-gray)',
    '--sidebar': 'var(--bg-secondary)',
    '--sidebar-foreground': 'var(--label-primary)',
    '--sidebar-primary': 'var(--label-primary)',
    '--sidebar-accent': 'var(--system-gray6)',
    '--sidebar-accent-foreground': 'var(--label-primary)',
    '--sidebar-border': 'var(--separator)',
    '--sidebar-ring': 'var(--system-gray)',
    '--app-shell-bg': 'var(--bg-primary)',
    '--app-section-bg': 'var(--bg-grouped)',
    '--app-surface-bg': 'var(--bg-grouped-secondary)',
    '--app-elevated-bg': isDark
      ? 'color-mix(in srgb, var(--bg-grouped-secondary) 78%, transparent)'
      : 'color-mix(in srgb, var(--bg-grouped-secondary) 88%, transparent)',
    '--app-chrome-bg': readerChromeBg,
    '--app-input-bg': 'var(--bg-grouped-secondary)',
    '--app-text': 'var(--label-primary)',
    '--app-text-muted': 'var(--label-secondary)',
    '--app-text-subtle': 'var(--label-tertiary)',
    '--app-accent': 'var(--system-blue)',
    '--app-border': 'var(--separator)',
    '--app-divider': 'var(--separator-opaque)',
    '--reader-panel-bg': theme.colors.bg,
    '--reader-chrome-bg': readerChromeBg,
    '--reader-text': theme.colors.text,
    '--reader-muted-text': readerMuted,
    '--reader-subtle-text': readerSubtle,
    '--reader-accent': theme.colors.accent,
    '--reader-border': readerBorder,
    '--reader-quote-text': readerQuote,
    '--reader-danger': 'var(--danger-fg)',
  };
}

export function getThemeStyle(themeId: ThemeId | string | null | undefined): Record<string, string> {
  return getThemeCssVariables(themeId);
}

export function applyThemeToElement(element: HTMLElement, themeId: ThemeId | string | null | undefined) {
  const theme = getThemeDefinition(themeId);
  const cssVars = getThemeCssVariables(themeId);

  element.classList.remove(...THEME_CLASSES);
  element.classList.add(theme.rootClass);
  element.dataset.themeId = theme.id;
  element.dataset.themeMode = theme.mode;
  element.dataset.themePalette = theme.palette;

  for (const [key, value] of Object.entries(cssVars)) {
    element.style.setProperty(key, value);
  }
}

export function getThemeBootstrapScript(): string {
  return `
    (function() {
      try {
        var classes = ${JSON.stringify(THEME_CLASSES)};
        var cssVars = ${JSON.stringify(THEME_CSS_VARIABLES)};
        var mode = 'dark';
        var palette = 'globoox';
        var raw = localStorage.getItem('globoox-app-theme');
        if (raw) {
          try {
            var parsed = JSON.parse(raw);
            if (parsed && parsed.state) {
              if (parsed.state.mode === 'light' || parsed.state.mode === 'dark' || parsed.state.mode === 'system') mode = parsed.state.mode;
              if (parsed.state.palette === 'globoox' || parsed.state.palette === 'default') palette = parsed.state.palette;
            }
          } catch (_e) {}
        } else {
          var legacyMode = localStorage.getItem('globoox-mode');
          var legacyPalette = localStorage.getItem('globoox-palette');
          if (legacyMode === 'light' || legacyMode === 'dark' || legacyMode === 'system') mode = legacyMode;
          if (legacyPalette === 'globoox' || legacyPalette === 'default') palette = legacyPalette;
        }
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var dark = mode === 'dark' || (mode === 'system' && prefersDark);
        var themeId = palette === 'globoox' ? (dark ? 'forest-dark' : 'forest-light') : (dark ? 'dark' : 'light');
        var root = document.documentElement;
        root.classList.remove.apply(root.classList, classes);
        root.classList.add(themeId);
        root.dataset.themeId = themeId;
        root.dataset.themeMode = dark ? 'dark' : 'light';
        root.dataset.themePalette = palette;
        var vars = cssVars[themeId] || cssVars.light;
        for (var key in vars) {
          if (Object.prototype.hasOwnProperty.call(vars, key)) {
            root.style.setProperty(key, vars[key]);
          }
        }
        root.style.setProperty('--primary', 'var(--system-blue)');
        root.style.setProperty('--background', 'var(--bg-primary)');
        root.style.setProperty('--foreground', 'var(--label-primary)');
        root.style.setProperty('--card', 'var(--bg-grouped-secondary)');
        root.style.setProperty('--card-foreground', 'var(--label-primary)');
        root.style.setProperty('--popover', 'var(--bg-grouped-secondary)');
        root.style.setProperty('--popover-foreground', 'var(--label-primary)');
        root.style.setProperty('--secondary', 'var(--system-gray6)');
        root.style.setProperty('--secondary-foreground', 'var(--label-primary)');
        root.style.setProperty('--muted-foreground', 'var(--label-secondary)');
        root.style.setProperty('--accent-foreground', 'var(--label-primary)');
        root.style.setProperty('--border', 'var(--separator)');
        root.style.setProperty('--input', 'var(--separator)');
        root.style.setProperty('--ring', 'var(--system-gray)');
        root.style.setProperty('--sidebar', 'var(--bg-secondary)');
        root.style.setProperty('--sidebar-foreground', 'var(--label-primary)');
        root.style.setProperty('--sidebar-primary', 'var(--label-primary)');
        root.style.setProperty('--sidebar-accent', 'var(--system-gray6)');
        root.style.setProperty('--sidebar-accent-foreground', 'var(--label-primary)');
        root.style.setProperty('--sidebar-border', 'var(--separator)');
        root.style.setProperty('--sidebar-ring', 'var(--system-gray)');
      } catch (_e) {}
    })();
  `.trim();
}

export function getAppThemeClass(mode: AppMode, palette: AppPalette, prefersDark: boolean): AppThemeClass {
  return getThemeDefinition(resolveThemeId(mode, palette, prefersDark)).rootClass;
}

export const APP_THEME_MODE_OPTIONS = [
  { id: 'system', label: 'System Default' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
] as const;

export const APP_THEME_PALETTE_OPTIONS: ReadonlyArray<{
  id: AppPalette;
  label: string;
  lightTheme: Extract<ThemeId, 'light' | 'forest-light'>;
  darkTheme: Extract<ThemeId, 'dark' | 'forest-dark'>;
}> = [
  { id: 'globoox', label: 'Globoox', lightTheme: 'forest-light', darkTheme: 'forest-dark' },
  { id: 'default', label: 'Neutral', lightTheme: 'light', darkTheme: 'dark' },
] as const;