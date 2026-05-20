/**
 * palestine-ui — Color & Design Tokens (TypeScript)
 */

export const colors = {
  // Flag Colors
  black:       '#0D0D0D',
  white:       '#F5F0E8',
  green:       '#1B5E3B',
  red:         '#B5202A',

  // Extended Green
  greenLight:  '#2E8B5A',
  greenDark:   '#0F3D25',
  greenMuted:  '#4A7C5E',

  // Extended Red
  redLight:    '#D32F3A',
  redDark:     '#7A1219',
  redMuted:    '#C25460',

  // Earth Tones
  sand:        '#C9B99A',
  sandLight:   '#E8DFD0',
  sandDark:    '#8A7A62',

  // Olive
  olive:       '#6B7C3A',
  oliveLight:  '#9AAB5E',
  oliveDark:   '#444F22',

  // Environment
  sky:         '#A8C8E8',
  sea:         '#2E7DAA',
} as const;

export type PaletteColor = keyof typeof colors;
export type ColorHex = typeof colors[PaletteColor];

export const fonts = {
  arabic:  "'Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', serif",
  display: "'Amiri', Georgia, serif",
  mono:    "'DM Mono', 'Fira Code', 'Courier New', monospace",
  sans:    "system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
} as const;

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(13, 13, 13, 0.08)',
  md: '0 4px 12px rgba(13, 13, 13, 0.12)',
  lg: '0 8px 32px rgba(13, 13, 13, 0.16)',
} as const;

/** All tokens in one object for easy spread */
export const tokens = { colors, fonts, spacing, radius, shadows } as const;

export default tokens;
