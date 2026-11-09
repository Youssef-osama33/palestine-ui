/**
 * palestine-ui — Design Tokens Unit Tests
 */

import { colors, fonts, spacing, radius, shadows, tokens } from '../tokens';

describe('Tokens Module', () => {
  test('exports four Palestinian flag colors', () => {
    expect(colors.black).toBe('#0D0D0D');
    expect(colors.white).toBe('#F5F0E8');
    expect(colors.green).toBe('#1B5E3B');
    expect(colors.red).toBe('#B5202A');
  });

  test('exports Palestinian earth & nature tone colors', () => {
    expect(colors.sand).toBe('#C9B99A');
    expect(colors.olive).toBe('#6B7C3A');
    expect(colors.sky).toBe('#A8C8E8');
    expect(colors.sea).toBe('#2E7DAA');
  });

  test('exports extended light/dark palette variations', () => {
    expect(colors.greenLight).toBe('#2E8B5A');
    expect(colors.greenDark).toBe('#0F3D25');
    expect(colors.redLight).toBe('#D32F3A');
  });

  test('exports typography font families', () => {
    expect(fonts.arabic).toContain('Amiri');
    expect(fonts.mono).toContain('DM Mono');
    expect(fonts.display).toContain('Georgia');
  });

  test('exports spacing scale', () => {
    expect(spacing[1]).toBe('4px');
    expect(spacing[4]).toBe('16px');
    expect(spacing[8]).toBe('64px');
  });

  test('exports border radius values', () => {
    expect(radius.sm).toBe('4px');
    expect(radius.full).toBe('9999px');
  });

  test('exports box shadow values', () => {
    expect(shadows.sm).toContain('rgba');
    expect(shadows.lg).toContain('rgba');
  });

  test('tokens aggregate object bundles all sub-modules', () => {
    expect(tokens).toHaveProperty('colors');
    expect(tokens).toHaveProperty('fonts');
    expect(tokens).toHaveProperty('spacing');
    expect(tokens).toHaveProperty('radius');
    expect(tokens).toHaveProperty('shadows');
  });
});
