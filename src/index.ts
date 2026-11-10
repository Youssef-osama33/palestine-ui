/**
 * palestine-ui
 *
 * A design system for Palestine.
 * Colors, icons, kuffiyeh patterns, and utilities
 * for developers building Palestine-related projects.
 *
 * @license MIT
 * @version 1.1.0
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
export type {
  PaletteColor,
  ColorHex,
  FontKey,
  SpacingKey,
  RadiusKey,
  ShadowKey,
} from './tokens';

// ─── Icons ──────────────────────────────────────────────────
export {
  ICONS,
  iconNames,
  renderIcon,
  iconToDataUri,
  mountIcon,
  createIconElement,
  Icon,
  OliveIcon,
  KeyIcon,
  DomeIcon,
  MapIcon,
  WatermelonIcon,
  FlagIcon,
  WheatIcon,
  CrescentIcon,
  HandIcon,
  SunIcon,
  BirdIcon,
  MosqueIcon,
} from './icons';
export type {
  IconName,
  IconDef,
  IconOptions,
  ReactIconProps,
  NamedIconProps,
} from './icons';

// ─── Kuffiyeh Generator ─────────────────────────────────────
export {
  Kuffiyeh,
  createKuffiyeh,
} from './kuffiyeh';
export type {
  KuffiyehStyle,
  KuffiyehOptions,
  KuffiyehPalette,
} from './kuffiyeh';

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
export type { RgbColor } from './utils';

// ─── Version ─────────────────────────────────────────────────
export const VERSION = '1.1.0';
