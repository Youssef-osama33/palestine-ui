/**
 * palestine-ui — Kuffiyeh Generator Unit Tests
 */

import { Kuffiyeh, createKuffiyeh } from '../kuffiyeh';

const mockCtx = {
  save: jest.fn(),
  restore: jest.fn(),
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  strokeStyle: '' as string,
  fillStyle: '' as string,
  lineWidth: 0,
  globalAlpha: 1,
};

const mockCanvas = {
  getContext: jest.fn(() => mockCtx),
  width: 200,
  height: 100,
} as unknown as HTMLCanvasElement;

describe('Kuffiyeh Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates instance with default options', () => {
    const k = new Kuffiyeh();
    expect(k).toBeInstanceOf(Kuffiyeh);
  });

  test('toSVG returns valid accessible SVG string', () => {
    const k = new Kuffiyeh({ style: 'classic' });
    const svg = k.toSVG();
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('xmlns=');
    expect(svg).toContain('aria-label');
    expect(svg).toContain('role="img"');
  });

  test('toSVG respects width, height, and opacity options', () => {
    const k = new Kuffiyeh({ width: 300, height: 150, opacity: 0.5 });
    const svg = k.toSVG();
    expect(svg).toContain('width="300"');
    expect(svg).toContain('height="150"');
    expect(svg).toContain('opacity="0.5"');
  });

  test('toCss returns valid CSS background properties', () => {
    const k = new Kuffiyeh({ style: 'red' });
    const css = k.toCss();
    expect(css).toContain('background-color');
    expect(css).toContain('background-image');
    expect(css).toContain('repeating-linear-gradient');
  });

  test('toCanvas draws pattern onto 2D canvas context', () => {
    const k = new Kuffiyeh({ style: 'olive' });
    k.toCanvas(mockCanvas);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 200, 100);
    expect(mockCtx.fillRect).toHaveBeenCalled();
    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  test('toCanvas throws error when 2D context is unavailable', () => {
    const badCanvas = { getContext: () => null } as unknown as HTMLCanvasElement;
    const k = new Kuffiyeh();
    expect(() => k.toCanvas(badCanvas)).toThrow('Could not get 2D context');
  });

  test('getPalette returns accurate colors for presets (classic, red, olive)', () => {
    const classic = new Kuffiyeh({ style: 'classic' });
    expect(classic.getPalette()).toEqual({
      c1: '#0D0D0D',
      c2: '#F5F0E8',
      c3: '#1B5E3B',
    });

    const red = new Kuffiyeh({ style: 'red' });
    expect(red.getPalette().c1).toBe('#B5202A');

    const olive = new Kuffiyeh({ style: 'olive' });
    expect(olive.getPalette().c1).toBe('#6B7C3A');
    expect(olive.getPalette().c2).toBe('#C9B99A');
  });

  test('custom colors override preset palette', () => {
    const k = new Kuffiyeh({ color1: '#AABBCC', color2: '#DDEEFF' });
    expect(k.getPalette().c1).toBe('#AABBCC');
    expect(k.getPalette().c2).toBe('#DDEEFF');
  });

  test('getStyles returns all available style presets', () => {
    const styles = Kuffiyeh.getStyles();
    expect(styles).toEqual(
      expect.arrayContaining(['classic', 'red', 'olive', 'fine', 'dense'])
    );
    expect(styles.length).toBeGreaterThanOrEqual(5);
  });

  test('createKuffiyeh factory creates instance and scale modifies SVG output', () => {
    const k1 = createKuffiyeh({ style: 'fine', scale: 8 });
    const k2 = createKuffiyeh({ style: 'fine', scale: 32 });
    expect(k1).toBeInstanceOf(Kuffiyeh);
    expect(k1.toSVG()).not.toBe(k2.toSVG());
  });
});
