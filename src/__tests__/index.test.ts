/**
 * palestine-ui — Public API Entry Point Tests
 */

import * as PalestineUI from '../index';

describe('Main Entry Point (src/index.ts)', () => {
  test('exports current package VERSION', () => {
    expect(PalestineUI.VERSION).toBe('1.1.0');
  });

  test('re-exports all Tokens module members', () => {
    expect(PalestineUI.colors).toBeDefined();
    expect(PalestineUI.fonts).toBeDefined();
    expect(PalestineUI.spacing).toBeDefined();
    expect(PalestineUI.radius).toBeDefined();
    expect(PalestineUI.shadows).toBeDefined();
    expect(PalestineUI.tokens).toBeDefined();
  });

  test('re-exports all Icons module functions and React components', () => {
    expect(PalestineUI.ICONS).toBeDefined();
    expect(PalestineUI.iconNames).toBeDefined();
    expect(PalestineUI.renderIcon).toBeDefined();
    expect(PalestineUI.iconToDataUri).toBeDefined();
    expect(PalestineUI.mountIcon).toBeDefined();
    expect(PalestineUI.createIconElement).toBeDefined();
    expect(PalestineUI.Icon).toBeDefined();

    // Named React Icon exports
    expect(PalestineUI.OliveIcon).toBeDefined();
    expect(PalestineUI.KeyIcon).toBeDefined();
    expect(PalestineUI.DomeIcon).toBeDefined();
    expect(PalestineUI.MapIcon).toBeDefined();
    expect(PalestineUI.WatermelonIcon).toBeDefined();
    expect(PalestineUI.FlagIcon).toBeDefined();
    expect(PalestineUI.WheatIcon).toBeDefined();
    expect(PalestineUI.CrescentIcon).toBeDefined();
    expect(PalestineUI.HandIcon).toBeDefined();
    expect(PalestineUI.SunIcon).toBeDefined();
    expect(PalestineUI.BirdIcon).toBeDefined();
    expect(PalestineUI.MosqueIcon).toBeDefined();
  });

  test('re-exports Kuffiyeh module', () => {
    expect(PalestineUI.Kuffiyeh).toBeDefined();
    expect(PalestineUI.createKuffiyeh).toBeDefined();
  });

  test('re-exports all Utils module helpers', () => {
    expect(PalestineUI.cssVar).toBeDefined();
    expect(PalestineUI.hex).toBeDefined();
    expect(PalestineUI.hexToRgb).toBeDefined();
    expect(PalestineUI.withOpacity).toBeDefined();
    expect(PalestineUI.flagStripe).toBeDefined();
    expect(PalestineUI.isDark).toBeDefined();
    expect(PalestineUI.contrastColor).toBeDefined();
    expect(PalestineUI.arabicText).toBeDefined();
    expect(PalestineUI.animId).toBeDefined();
  });
});
