/**
 * palestine-ui — Utility Helpers
 */

import { colors, PaletteColor } from '../tokens';

/**
 * Returns a CSS variable reference for a Palestine UI token.
 * @example cssVar('green') // → 'var(--pl-green)'
 */
export function cssVar(token: string): string {
  return `var(--pl-${token})`;
}

/**
 * Returns the hex value for a named palette color.
 * @example hex('olive') // → '#6B7C3A'
 */
export function hex(color: PaletteColor): string {
  return colors[color];
}

/**
 * Converts a hex color string to an RGB object.
 */
export function hexToRgb(hexColor: string): { r: number; g: number; b: number } | null {
  const clean = hexColor.replace('#', '');
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

/**
 * Returns a CSS rgba() string with the given opacity.
 * @example withOpacity('#1B5E3B', 0.5) // → 'rgba(27, 94, 59, 0.5)'
 */
export function withOpacity(hexColor: string, opacity: number): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return hexColor;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

/**
 * Generates a CSS flag stripe element (for use with .pl-flag-stripe).
 * Returns inline style for a 4-color horizontal bar.
 */
export function flagStripe(height = 8): string {
  return [
    `height: ${height}px`,
    `background: linear-gradient(to right,`,
    `  ${colors.black} 0%, ${colors.black} 25%,`,
    `  ${colors.white} 25%, ${colors.white} 50%,`,
    `  ${colors.green} 50%, ${colors.green} 75%,`,
    `  ${colors.red} 75%, ${colors.red} 100%`,
    `)`,
  ].join(' ');
}

/**
 * Checks if a hex color is considered "dark"
 * (luminance < 0.5). Useful for deciding text contrast.
 */
export function isDark(hexColor: string): boolean {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return false;
  // Relative luminance per WCAG 2.1
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
 * Returns 'white' or 'black' depending on which
 * has better contrast against the background color.
 */
export function contrastColor(bg: string): string {
  return isDark(bg) ? colors.white : colors.black;
}

/**
 * Formats an Arabic number string (adds proper RTL marks).
 */
export function arabicText(text: string): string {
  return `\u200F${text}\u200F`;
}

/**
 * Generates a unique CSS animation name for Palestine UI components.
 */
export function animId(prefix = 'pl'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}
