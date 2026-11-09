/**
 * palestine-ui — Public API Entry Point Tests
 */

import * as PalestineUI from '../index';

describe('Main Entry Point (src/index.ts)', () => {
  test('exports current package VERSION', () => {
    expect(PalestineUI.VERSION).toBeDefined();
    expect(typeof PalestineUI.VERSION).toBe('string');
  });

  test('re-exports Tokens module', () => {
    expect(PalestineUI.colors).toBeDefined();
    expect(PalestineUI.fonts).toBeDefined();
    expect(PalestineUI.spacing).toBeDefined();
    expect(PalestineUI.radius).toBeDefined();
    expect(PalestineUI.shadows).toBeDefined();
    expect(PalestineUI.tokens).toBeDefined();
  });

  test('re-exports Icons module', () => {
    expect(PalestineUI.ICONS).toBeDefined();
    expect(PalestineUI.iconNames).toBeDefined();
    expect(PalestineUI.renderIcon).toBeDefined();
    expect(PalestineUI.mountIcon).toBeDefined();
  });

  test('re-exports Kuffiyeh module', () => {
    expect(PalestineUI.Kuffiyeh).toBeDefined();
    expect(PalestineUI.createKuffiyeh).toBeDefined();
  });

  test('re-exports Utils module', () => {
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
