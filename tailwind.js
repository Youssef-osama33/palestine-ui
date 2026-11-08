/**
 * palestine-ui — Tailwind CSS Plugin
 *
 * Adds Palestine UI design tokens, patterns, and RTL helpers as Tailwind utilities.
 *
 * Usage in tailwind.config.js:
 *   const palestineUI = require('palestine-ui/tailwind');
 *   module.exports = { plugins: [palestineUI] };
 */

const plugin = require('tailwindcss/plugin');

// Load compiled tokens from dist (with safe fallback if run before build in local dev)
let tokens;
try {
  tokens = require('./dist/index.cjs.js');
} catch {
  tokens = {
    colors: {
      black: '#0D0D0D',
      white: '#F5F0E8',
      green: '#1B5E3B',
      red: '#B5202A',
      greenLight: '#288554',
      greenDark: '#113D26',
      redLight: '#D93843',
      redDark: '#82151C',
      sand: '#C9B99A',
      sandLight: '#E5DEC9',
      olive: '#6B7C3A',
      oliveLight: '#8E9E58',
      sky: '#A8C8E8',
      sea: '#2E7DAA',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
    },
    radius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px rgba(13, 13, 13, 0.08)',
      md: '0 4px 12px rgba(13, 13, 13, 0.12)',
      lg: '0 12px 24px rgba(13, 13, 13, 0.16)',
    },
    fonts: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      arabic: "'Amiri', 'Cairo', 'Noto Naskh Arabic', serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
  };
}

const { colors = {}, spacing = {}, radius = {}, shadows = {}, fonts = {} } = tokens;

module.exports = plugin(
  function ({ addBase, addUtilities }) {
    // 1. Inject CSS custom properties on :root
    addBase({
      ':root': {
        '--pl-black':       colors.black,
        '--pl-white':       colors.white,
        '--pl-green':       colors.green,
        '--pl-red':         colors.red,
        '--pl-green-light': colors.greenLight,
        '--pl-green-dark':  colors.greenDark,
        '--pl-red-light':   colors.redLight,
        '--pl-red-dark':    colors.redDark,
        '--pl-sand':        colors.sand,
        '--pl-sand-light':  colors.sandLight,
        '--pl-olive':       colors.olive,
        '--pl-olive-light': colors.oliveLight,
        '--pl-sky':         colors.sky,
        '--pl-sea':         colors.sea,
      },
    });

    // 2. Pattern & RTL Utilities
    addUtilities({
      '.pl-kuffiyeh': {
        'background-color': colors.white,
        'background-image': [
          `repeating-linear-gradient(45deg, ${colors.black} 0px, ${colors.black} 5px, transparent 5px, transparent 16px)`,
          `repeating-linear-gradient(-45deg, ${colors.black} 0px, ${colors.black} 5px, transparent 5px, transparent 16px)`,
        ].join(', '),
      },
      '.pl-kuffiyeh-dark': {
        'background-color': colors.black,
        'background-image': [
          `repeating-linear-gradient(45deg, ${colors.green} 0px, ${colors.green} 5px, transparent 5px, transparent 16px)`,
          `repeating-linear-gradient(-45deg, ${colors.green} 0px, ${colors.green} 5px, transparent 5px, transparent 16px)`,
        ].join(', '),
      },
      '.pl-flag-bg': {
        background: `linear-gradient(to right, ${colors.black} 25%, ${colors.white} 25% 50%, ${colors.green} 50% 75%, ${colors.red} 75%)`,
      },
      '.pl-rtl': {
        direction: 'rtl',
        'text-align': 'right',
        'font-family': fonts.arabic || "'Amiri', 'Noto Naskh Arabic', serif",
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          palestine: {
            black:         colors.black,
            white:         colors.white,
            green:         colors.green,
            red:           colors.red,
            'green-light': colors.greenLight,
            'green-dark':  colors.greenDark,
            'red-light':   colors.redLight,
            'red-dark':    colors.redDark,
            sand:          colors.sand,
            'sand-light':  colors.sandLight,
            olive:         colors.olive,
            'olive-light': colors.oliveLight,
            sky:           colors.sky,
            sea:           colors.sea,
          },
        },
        spacing: {
          'pl-xs': spacing.xs,
          'pl-sm': spacing.sm,
          'pl-md': spacing.md,
          'pl-lg': spacing.lg,
          'pl-xl': spacing.xl,
        },
        fontFamily: {
          'pl-sans':   fonts.sans ? [fonts.sans] : undefined,
          'pl-arabic': fonts.arabic ? [fonts.arabic] : undefined,
          'pl-mono':   fonts.mono ? [fonts.mono] : undefined,
        },
        boxShadow: {
          'pl-sm': shadows.sm,
          'pl-md': shadows.md,
          'pl-lg': shadows.lg,
        },
        borderRadius: {
          'pl-sm': radius.sm,
          'pl-md': radius.md,
          'pl-lg': radius.lg,
          'pl-xl': radius.xl,
        },
      },
    },
  }
);
