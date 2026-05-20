/**
 * palestine-ui — Test Suite
 */

// ─── Mock canvas for Kuffiyeh tests ─────────────────────────
const mockCtx = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  strokeStyle: '' as string,
  fillStyle: '' as string,
  lineWidth: 0,
};

const mockCanvas = {
  getContext: jest.fn(() => mockCtx),
  width: 200,
  height: 100,
} as unknown as HTMLCanvasElement;

// ─── Token Tests ─────────────────────────────────────────────
describe('Tokens', () => {
  const { colors, fonts, spacing, radius, shadows, tokens } =
    require('../tokens') as typeof import('../tokens');

  test('exports four flag colors', () => {
    expect(colors.black).toBe('#0D0D0D');
    expect(colors.white).toBe('#F5F0E8');
    expect(colors.green).toBe('#1B5E3B');
    expect(colors.red).toBe('#B5202A');
  });

  test('exports earth tone colors', () => {
    expect(colors.sand).toBe('#C9B99A');
    expect(colors.olive).toBe('#6B7C3A');
  });

  test('exports extended palette', () => {
    expect(colors.greenLight).toBe('#2E8B5A');
    expect(colors.greenDark).toBe('#0F3D25');
    expect(colors.redLight).toBe('#D32F3A');
    expect(colors.sky).toBe('#A8C8E8');
    expect(colors.sea).toBe('#2E7DAA');
  });

  test('exports font families', () => {
    expect(fonts.arabic).toContain('Amiri');
    expect(fonts.mono).toContain('DM Mono');
    expect(fonts.display).toContain('Georgia');
  });

  test('exports spacing scale', () => {
    expect(spacing[1]).toBe('4px');
    expect(spacing[4]).toBe('16px');
    expect(spacing[8]).toBe('64px');
  });

  test('exports radius values', () => {
    expect(radius.sm).toBe('4px');
    expect(radius.full).toBe('9999px');
  });

  test('exports shadow values', () => {
    expect(shadows.sm).toContain('rgba');
    expect(shadows.lg).toContain('rgba');
  });

  test('tokens object bundles all sub-modules', () => {
    expect(tokens).toHaveProperty('colors');
    expect(tokens).toHaveProperty('fonts');
    expect(tokens).toHaveProperty('spacing');
    expect(tokens).toHaveProperty('radius');
    expect(tokens).toHaveProperty('shadows');
  });
});

// ─── Icon Tests ───────────────────────────────────────────────
describe('Icons', () => {
  const { ICONS, iconNames, renderIcon, mountIcon } =
    require('../icons') as typeof import('../icons');

  test('exports expected icon names', () => {
    expect(iconNames).toContain('olive');
    expect(iconNames).toContain('key');
    expect(iconNames).toContain('dome');
    expect(iconNames).toContain('watermelon');
    expect(iconNames).toContain('flag');
    expect(iconNames).toContain('mosque');
    expect(iconNames).toContain('bird');
  });

  test('all icons have required properties', () => {
    for (const name of iconNames) {
      const icon = ICONS[name]!;
      expect(icon).toHaveProperty('name');
      expect(icon).toHaveProperty('nameAr');
      expect(icon).toHaveProperty('viewBox');
      expect(icon).toHaveProperty('paths');
      expect(typeof icon.paths).toBe('string');
      expect(icon.paths.length).toBeGreaterThan(10);
    }
  });

  test('renderIcon returns valid SVG string', () => {
    const svg = renderIcon('olive');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('aria-label');
    expect(svg).toContain('role="img"');
    expect(svg).toContain('xmlns=');
  });

  test('renderIcon defaults to 24x24', () => {
    const svg = renderIcon('key');
    expect(svg).toContain('width="24"');
    expect(svg).toContain('height="24"');
  });

  test('renderIcon respects size option', () => {
    const svg = renderIcon('key', { size: 48 });
    expect(svg).toContain('width="48"');
    expect(svg).toContain('height="48"');
  });

  test('renderIcon respects width/height independently', () => {
    const svg = renderIcon('flag', { width: 32, height: 16 });
    expect(svg).toContain('width="32"');
    expect(svg).toContain('height="16"');
  });

  test('renderIcon respects color option', () => {
    const svg = renderIcon('flag', { color: '#1B5E3B' });
    expect(svg).toContain('fill="#1B5E3B"');
  });

  test('renderIcon uses custom label', () => {
    const svg = renderIcon('olive', { label: 'Peace symbol' });
    expect(svg).toContain('Peace symbol');
  });

  test('renderIcon uses Arabic name as default label', () => {
    const svg = renderIcon('olive');
    expect(svg).toContain(ICONS["olive"]!.nameAr);
  });

  test('renderIcon applies className', () => {
    const svg = renderIcon('dome', { className: 'my-icon' });
    expect(svg).toContain('class="my-icon"');
  });

  test('renderIcon throws for unknown icon', () => {
    expect(() => renderIcon('nonexistent' as any)).toThrow(
      'palestine-ui: icon "nonexistent" not found'
    );
  });

  test('mountIcon updates element innerHTML', () => {
    const el = { innerHTML: '' } as HTMLElement;
    mountIcon(el, 'watermelon', { size: 20 });
    expect(el.innerHTML).toContain('<svg');
    expect(el.innerHTML).toContain('width="20"');
  });

  test('all icon viewBoxes are 0 0 24 24', () => {
    for (const name of iconNames) {
      expect(ICONS[name]!.viewBox).toBe('0 0 24 24');
    }
  });
});

// ─── Kuffiyeh Tests ───────────────────────────────────────────
describe('Kuffiyeh', () => {
  const { Kuffiyeh, createKuffiyeh } =
    require('../kuffiyeh') as typeof import('../kuffiyeh');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates instance with defaults', () => {
    const k = new Kuffiyeh();
    expect(k).toBeInstanceOf(Kuffiyeh);
  });

  test('toSVG returns valid SVG', () => {
    const k = new Kuffiyeh({ style: 'classic' });
    const svg = k.toSVG();
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('xmlns=');
    expect(svg).toContain('aria-label');
    expect(svg).toContain('role="img"');
  });

  test('toSVG respects width/height', () => {
    const k = new Kuffiyeh({ width: 300, height: 150 });
    const svg = k.toSVG();
    expect(svg).toContain('width="300"');
    expect(svg).toContain('height="150"');
  });

  test('toSVG respects opacity', () => {
    const k = new Kuffiyeh({ opacity: 0.5 });
    const svg = k.toSVG();
    expect(svg).toContain('opacity="0.5"');
  });

  test('toCss returns background CSS string', () => {
    const k = new Kuffiyeh({ style: 'red' });
    const css = k.toCss();
    expect(css).toContain('background-color');
    expect(css).toContain('background-image');
    expect(css).toContain('repeating-linear-gradient');
  });

  test('toCanvas calls ctx methods', () => {
    const k = new Kuffiyeh({ style: 'olive' });
    k.toCanvas(mockCanvas);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 200, 100);
    expect(mockCtx.fillRect).toHaveBeenCalled();
    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  test('toCanvas throws without valid context', () => {
    const badCanvas = { getContext: () => null } as unknown as HTMLCanvasElement;
    const k = new Kuffiyeh();
    expect(() => k.toCanvas(badCanvas)).toThrow('Could not get 2D context');
  });

  test('getPalette returns correct colors — classic', () => {
    const k = new Kuffiyeh({ style: 'classic' });
    expect(k.getPalette().c1).toBe('#0D0D0D');
    expect(k.getPalette().c2).toBe('#F5F0E8');
    expect(k.getPalette().c3).toBe('#1B5E3B');
  });

  test('getPalette returns correct colors — red', () => {
    const k = new Kuffiyeh({ style: 'red' });
    expect(k.getPalette().c1).toBe('#B5202A');
  });

  test('getPalette returns correct colors — olive', () => {
    const k = new Kuffiyeh({ style: 'olive' });
    expect(k.getPalette().c1).toBe('#6B7C3A');
    expect(k.getPalette().c2).toBe('#C9B99A');
  });

  test('custom colors override style preset', () => {
    const k = new Kuffiyeh({ color1: '#AABBCC', color2: '#DDEEFF' });
    expect(k.getPalette().c1).toBe('#AABBCC');
    expect(k.getPalette().c2).toBe('#DDEEFF');
  });

  test('getStyles returns all preset names', () => {
    const styles = Kuffiyeh.getStyles();
    expect(styles).toContain('classic');
    expect(styles).toContain('red');
    expect(styles).toContain('olive');
    expect(styles).toContain('fine');
    expect(styles).toContain('dense');
    expect(styles.length).toBeGreaterThanOrEqual(5);
  });

  test('createKuffiyeh factory returns Kuffiyeh instance', () => {
    const k = createKuffiyeh({ style: 'fine' });
    expect(k).toBeInstanceOf(Kuffiyeh);
  });

  test('scale option affects SVG output', () => {
    const k1 = new Kuffiyeh({ scale: 8 });
    const k2 = new Kuffiyeh({ scale: 32 });
    expect(k1.toSVG()).not.toBe(k2.toSVG());
  });
});

// ─── Utils Tests ──────────────────────────────────────────────
describe('Utils', () => {
  const {
    cssVar, hex, hexToRgb, withOpacity,
    flagStripe, isDark, contrastColor, arabicText, animId,
  } = require('../utils') as typeof import('../utils');

  test('cssVar formats token correctly', () => {
    expect(cssVar('green')).toBe('var(--pl-green)');
    expect(cssVar('sand')).toBe('var(--pl-sand)');
    expect(cssVar('font-arabic')).toBe('var(--pl-font-arabic)');
  });

  test('hex returns correct palette color', () => {
    expect(hex('green')).toBe('#1B5E3B');
    expect(hex('red')).toBe('#B5202A');
    expect(hex('olive')).toBe('#6B7C3A');
    expect(hex('sand')).toBe('#C9B99A');
  });

  test('hexToRgb parses 6-digit hex', () => {
    expect(hexToRgb('#1B5E3B')).toEqual({ r: 27, g: 94, b: 59 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
  });

  test('hexToRgb handles hash-less input', () => {
    expect(hexToRgb('1B5E3B')).toEqual({ r: 27, g: 94, b: 59 });
  });

  test('hexToRgb returns null for invalid input', () => {
    expect(hexToRgb('invalid')).toBeNull();
    expect(hexToRgb('#FFF')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });

  test('withOpacity returns rgba string', () => {
    expect(withOpacity('#1B5E3B', 0.5)).toBe('rgba(27, 94, 59, 0.5)');
    expect(withOpacity('#000000', 0)).toBe('rgba(0, 0, 0, 0)');
    expect(withOpacity('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)');
  });

  test('withOpacity returns original string for invalid hex', () => {
    expect(withOpacity('invalid', 0.5)).toBe('invalid');
  });

  test('flagStripe returns CSS with correct height', () => {
    expect(flagStripe(8)).toContain('height: 8px');
    expect(flagStripe(4)).toContain('height: 4px');
    expect(flagStripe(8)).toContain('linear-gradient');
  });

  test('flagStripe includes all four flag colors', () => {
    const css = flagStripe(8);
    expect(css).toContain('#0D0D0D');
    expect(css).toContain('#F5F0E8');
    expect(css).toContain('#1B5E3B');
    expect(css).toContain('#B5202A');
  });

  test('isDark correctly identifies dark colors', () => {
    expect(isDark('#0D0D0D')).toBe(true);
    expect(isDark('#1B5E3B')).toBe(true);
    expect(isDark('#B5202A')).toBe(true);
    expect(isDark('#F5F0E8')).toBe(false);
    expect(isDark('#FFFFFF')).toBe(false);
    expect(isDark('#C9B99A')).toBe(true);  // sand: luminance ~0.48, slightly dark
  });

  test('contrastColor returns white for dark backgrounds', () => {
    expect(contrastColor('#0D0D0D')).toBe('#F5F0E8');
    expect(contrastColor('#1B5E3B')).toBe('#F5F0E8');
  });

  test('contrastColor returns black for light backgrounds', () => {
    expect(contrastColor('#F5F0E8')).toBe('#0D0D0D');
    expect(contrastColor('#FFFFFF')).toBe('#0D0D0D');
  });

  test('arabicText wraps in RTL marks', () => {
    const result = arabicText('فلسطين');
    expect(result).toContain('فلسطين');
    expect(result.codePointAt(0)).toBe(0x200F); // RTL mark
  });

  test('animId returns unique IDs', () => {
    const id1 = animId();
    const id2 = animId();
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^pl-/);
  });

  test('animId respects custom prefix', () => {
    const id = animId('myprefix');
    expect(id).toMatch(/^myprefix-/);
  });
});

// ─── Main Index Re-exports ────────────────────────────────────
describe('Main Index', () => {
  const lib = require('../index') as typeof import('../index');

  test('exports VERSION', () => {
    expect(lib.VERSION).toBe('1.0.0');
  });

  test('re-exports token module', () => {
    expect(lib.colors).toBeDefined();
    expect(lib.fonts).toBeDefined();
    expect(lib.spacing).toBeDefined();
    expect(lib.tokens).toBeDefined();
  });

  test('re-exports icon module', () => {
    expect(lib.ICONS).toBeDefined();
    expect(lib.iconNames).toBeDefined();
    expect(lib.renderIcon).toBeDefined();
    expect(lib.mountIcon).toBeDefined();
  });

  test('re-exports kuffiyeh module', () => {
    expect(lib.Kuffiyeh).toBeDefined();
    expect(lib.createKuffiyeh).toBeDefined();
  });

  test('re-exports utils module', () => {
    expect(lib.cssVar).toBeDefined();
    expect(lib.hex).toBeDefined();
    expect(lib.isDark).toBeDefined();
    expect(lib.contrastColor).toBeDefined();
  });
});
