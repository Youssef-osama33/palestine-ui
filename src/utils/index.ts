/**
 * palestine-ui — Utility Helpers
 */

import { colors, type PaletteColor, type ColorHex } from '../tokens';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Returns a CSS variable reference for a Palestine UI token.
 * Automatically converts camelCase token names (e.g. 'greenLight') to kebab-case ('--pl-green-light').
 *
 * @example
 * cssVar('green') // → 'var(--pl-green)'
 * cssVar('greenLight') // → 'var(--pl-green-light)'
 */
export function cssVar(token: PaletteColor | (string & {})): string {
  const clean = token
    .replace(/^--pl-/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
  return `var(--pl-${clean})`;
}

/**
 * Returns the hex value for a named palette color.
 *
 * @example
 * hex('olive') // → '#6B7C3A'
 */
export function hex(color: PaletteColor): ColorHex {
  return colors[color];
}

/**
 * Converts a 6-digit hex color string to an RGB object.
 * Returns `null` if the input is not a valid 6-character hexadecimal string.
 *
 * @example
 * hexToRgb('#1B5E3B') // → { r: 27, g: 94, b: 59 }
 */
export function hexToRgb(hexColor: string): RgbColor | null {
  const clean = hexColor.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return null;
  }
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/**
 * Returns a CSS `rgba()` string with the given opacity (clamped between 0 and 1).
 * Accepts either a raw 6-digit hex string or a named `PaletteColor` token.
 *
 * @example
 * withOpacity('#1B5E3B', 0.5) // → 'rgba(27, 94, 59, 0.5)'
 */
export function withOpacity(hexOrToken: string, opacity: number): string {
  const resolvedHex =
    hexOrToken in colors
      ? colors[hexOrToken as PaletteColor]
      : hexOrToken;

  const rgb = hexToRgb(resolvedHex);
  if (!rgb) return hexOrToken;

  const clampedAlpha = Math.min(1, Math.max(0, opacity));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedAlpha})`;
}

/**
 * Generates an inline CSS style string for a 4-color Palestinian flag stripe bar.
 *
 * @example
 * element.style.cssText = flagStripe(8);
 */
export function flagStripe(height = 8): string {
  const safeHeight = Math.max(1, height);
  return [
    `height: ${safeHeight}px;`,
    `background: linear-gradient(to right,`,
    `${colors.black} 0%, ${colors.black} 25%,`,
    `${colors.white} 25%, ${colors.white} 50%,`,
    `${colors.green} 50%, ${colors.green} 75%,`,
    `${colors.red} 75%, ${colors.red} 100%);`,
  ].join(' ');
}

/**
 * Checks if a hex color is considered "dark" (relative luminance < 0.5 per WCAG 2.1).
 * Useful for automatically deciding foreground text contrast.
 */
export function isDark(hexColor: string): boolean {
  const resolvedHex =
    hexColor in colors ? colors[hexColor as PaletteColor] : hexColor;

  const rgb = hexToRgb(resolvedHex);
  if (!rgb) return false;

  const linearize = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };

  const rL = linearize(rgb.r);
  const gL = linearize(rgb.g);
  const bL = linearize(rgb.b);

  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL < 0.5;
}

/**
 * Returns `#F5F0E8` (Palestine white) or `#0D0D0D` (Palestine black)
 * depending on which has better contrast against the given background color.
 */
export function contrastColor(bg: string): typeof colors.white | typeof colors.black {
  return isDark(bg) ? colors.white : colors.black;
}

/**
 * Wraps an Arabic text string in Unicode Right-to-Left Marks (U+200F)
 * to prevent bidirectional punctuation/number corruption.
 */
export function arabicText(text: string): string {
  return `\u200F${text}\u200F`;
}

let animCounter = 0;

/**
 * Generates a unique, deterministic-safe CSS identifier for Palestine UI components.
 */
export function animId(prefix = 'pl'): string {
  animCounter = (animCounter + 1) % 1_000_000;
  const rand = Math.random().toString(36).slice(2, 6);
  return `${prefix}-${animCounter.toString(36)}${rand}`;
}
