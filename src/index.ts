/**
 * palestine-ui
 *
 * A design system for Palestine.
 * Colors, icons, kuffiyeh patterns, and utilities
 * for developers building Palestine-related projects.
 *
 * @license MIT
 * @version 1.0.0
 */

// ─── Tokens ─────────────────────────────────────────────────
export {
  colors,
  fonts,
  spacing,
  radius,
  shadows,
  tokens,
} from './tokens';
export type { PaletteColor, ColorHex } from './tokens';

// ─── Icons ──────────────────────────────────────────────────
export {
  ICONS,
  iconNames,
  renderIcon,
  mountIcon,
  createIconElement,
  Icon,
} from './icons';
export type { IconName, IconOptions, ReactIconProps } from './icons';

// ─── Kuffiyeh Generator ─────────────────────────────────────
export {
  Kuffiyeh,
  createKuffiyeh,
} from './kuffiyeh';
export type { KuffiyehStyle, KuffiyehOptions } from './kuffiyeh';

// ─── Utilities ───────────────────────────────────────────────
export {
  cssVar,
  hex,
  hexToRgb,
  withOpacity,
  flagStripe,
  isDark,
  contrastColor,
  arabicText,
  animId,
} from './utils';

// ─── Version ─────────────────────────────────────────────────
export const VERSION = '1.0.0';
