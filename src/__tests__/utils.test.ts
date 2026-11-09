/**
 * palestine-ui — Utilities Unit Tests
 */

import {
  cssVar,
  hex,
  hexToRgb,
  withOpacity,
  flagStripe,
  isDark,
  contrastColor,
  arabicText,
  animId,
} from '../utils';

describe('Utils Module', () => {
  test('cssVar formats token into CSS custom property', () => {
    expect(cssVar('green')).toBe('var(--pl-green)');
    expect(cssVar('sand')).toBe('var(--pl-sand)');
    expect(cssVar('font-arabic')).toBe('var(--pl-font-arabic)');
  });

  test('hex retrieves hex value by token key', () => {
    expect(hex('green')).toBe('#1B5E3B');
    expect(hex('red')).toBe('#B5202A');
    expect(hex('olive')).toBe('#6B7C3A');
    expect(hex('sand')).toBe('#C9B99A');
  });

  test('hexToRgb parses 6-digit hex codes with or without leading hash', () => {
    expect(hexToRgb('#1B5E3B')).toEqual({ r: 27, g: 94, b: 59 });
    expect(hexToRgb('1B5E3B')).toEqual({ r: 27, g: 94, b: 59 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  test('hexToRgb returns null for invalid hex strings', () => {
    expect(hexToRgb('invalid')).toBeNull();
    expect(hexToRgb('#FFF')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });

  test('withOpacity converts hex to rgba or returns original string if invalid', () => {
    expect(withOpacity('#1B5E3B', 0.5)).toBe('rgba(27, 94, 59, 0.5)');
    expect(withOpacity('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
    expect(withOpacity('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)');
    expect(withOpacity('invalid', 0.5)).toBe('invalid');
  });

  test('flagStripe generates CSS gradient with all four flag colors', () => {
    const css = flagStripe(8);
    expect(css).toContain('height: 8px');
    expect(css).toContain('linear-gradient');
    expect(css).toContain('#0D0D0D');
    expect(css).toContain('#F5F0E8');
    expect(css).toContain('#1B5E3B');
    expect(css).toContain('#B5202A');
  });

  test('isDark accurately classifies dark and light colors by luminance', () => {
    expect(isDark('#0D0D0D')).toBe(true);
    expect(isDark('#1B5E3B')).toBe(true);
    expect(isDark('#B5202A')).toBe(true);
    expect(isDark('#C9B99A')).toBe(true);
    expect(isDark('#F5F0E8')).toBe(false);
    expect(isDark('#FFFFFF')).toBe(false);
  });

  test('contrastColor returns accessible foreground color', () => {
    expect(contrastColor('#0D0D0D')).toBe('#F5F0E8');
    expect(contrastColor('#1B5E3B')).toBe('#F5F0E8');
    expect(contrastColor('#F5F0E8')).toBe('#0D0D0D');
    expect(contrastColor('#FFFFFF')).toBe('#0D0D0D');
  });

  test('arabicText wraps text in Unicode RTL marks (U+200F)', () => {
    const result = arabicText('فلسطين');
    expect(result).toContain('فلسطين');
    expect(result.codePointAt(0)).toBe(0x200f);
  });

  test('animId generates unique prefixed identifiers', () => {
    const id1 = animId();
    const id2 = animId();
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^pl-/);
    expect(animId('custom')).toMatch(/^custom-/);
  });
});
