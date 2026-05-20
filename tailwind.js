/**
 * palestine-ui — Tailwind CSS Plugin
 *
 * Adds Palestine UI design tokens as Tailwind utilities.
 *
 * Usage in tailwind.config.js:
 *   const palestineUI = require('palestine-ui/tailwind');
 *   module.exports = { plugins: [palestineUI] };
 */

const plugin = require('tailwindcss/plugin');
const { colors, spacing: sp, radius, shadows } = require('./src/tokens');

module.exports = plugin(
  function ({ addBase, addUtilities }) {
    // Inject CSS custom properties
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

    // Kuffiyeh background utility
    addUtilities({
      '.pl-kuffiyeh': {
        'background-color': colors.white,
        'background-image': [
          `repeating-linear-gradient(45deg, ${colors.black} 0px, ${colors.black} 5px, transparent 5px, transparent 16px)`,
          `repeating-linear-gradient(-45deg, ${colors.black} 0px, ${colors.black} 5px, transparent 5px, transparent 16px)`,
        ].join(', '),
      },
      '.pl-flag-bg': {
        'background': `linear-gradient(to right, ${colors.black} 25%, ${colors.white} 25% 50%, ${colors.green} 50% 75%, ${colors.red} 75%)`,
      },
      '.pl-rtl': {
        direction: 'rtl',
        'font-family': "'Amiri', 'Noto Naskh Arabic', serif",
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          palestine: {
            black:      colors.black,
            white:      colors.white,
            green:      colors.green,
            red:        colors.red,
            'green-light': colors.greenLight,
            'green-dark':  colors.greenDark,
            'red-light':   colors.redLight,
            'red-dark':    colors.redDark,
            sand:       colors.sand,
            'sand-light':  colors.sandLight,
            olive:      colors.olive,
            'olive-light': colors.oliveLight,
            sky:        colors.sky,
            sea:        colors.sea,
          },
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
