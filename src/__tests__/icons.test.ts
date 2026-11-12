/**
 * palestine-ui — Cultural Icons Unit Tests
 */

import React from 'react';
import * as IconsModule from '../icons';

const {
  ICONS,
  iconNames,
  renderIcon,
  iconToDataUri,
  mountIcon,
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
} = IconsModule;

describe('Icons Module', () => {
  test('exports all 12 expected cultural icon names', () => {
    const expected = [
      'olive',
      'key',
      'dome',
      'map',
      'watermelon',
      'flag',
      'wheat',
      'crescent',
      'hand',
      'sun',
      'bird',
      'mosque',
    ];
    for (const name of expected) {
      expect(iconNames).toContain(name);
    }
    expect(iconNames.length).toBeGreaterThanOrEqual(12);
  });

  test('all icons have required metadata and standardized 0 0 24 24 viewBox', () => {
    for (const name of iconNames) {
      const icon = ICONS[name]!;
      expect(icon).toHaveProperty('name');
      expect(icon).toHaveProperty('nameAr');
      expect(icon.viewBox).toBe('0 0 24 24');
      expect(typeof icon.paths).toBe('string');
      expect(icon.paths.length).toBeGreaterThan(10);
    }
  });

  test('renderIcon returns valid accessible SVG string with 24x24 default', () => {
    const svg = renderIcon('olive');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('width="24"');
    expect(svg).toContain('height="24"');
    expect(svg).toContain('aria-label');
    expect(svg).toContain('role="img"');
    expect(svg).toContain('xmlns=');
    expect(svg).toContain(ICONS['olive']!.nameAr);
  });

  test('renderIcon respects size, width, height, color, label, className, style, and strokeWidth', () => {
    const sized = renderIcon('key', {
      size: 48,
      strokeWidth: 2.5,
      style: { display: 'inline-block' },
    });
    expect(sized).toContain('width="48"');
    expect(sized).toContain('height="48"');
    expect(sized).toContain('stroke-width="2.5"');
    expect(sized).toContain('style="display:inline-block"');

    const rect = renderIcon('flag', { width: 32, height: 16 });
    expect(rect).toContain('width="32"');
    expect(rect).toContain('height="16"');

    const custom = renderIcon('dome', {
      color: '#1B5E3B',
      label: 'Peace symbol',
      className: 'my-icon',
    });
    expect(custom).toContain('fill="#1B5E3B"');
    expect(custom).toContain('Peace symbol');
    expect(custom).toContain('class="my-icon"');
  });

  test('renderIcon throws descriptive error for unknown icon', () => {
    expect(() => renderIcon('nonexistent' as any)).toThrow(
      'palestine-ui: icon "nonexistent" not found'
    );
  });

  test('iconToDataUri returns valid encoded SVG data URI', () => {
    const uri = iconToDataUri('watermelon', { color: '#B5202A', size: 32 });
    expect(uri.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(decodeURIComponent(uri)).toContain('<svg');
  });

  test('mountIcon injects SVG into target DOM element', () => {
    const el = { innerHTML: '' } as HTMLElement;
    mountIcon(el, 'watermelon', { size: 20 });
    expect(el.innerHTML).toContain('<svg');
    expect(el.innerHTML).toContain('width="20"');
  });

  test('React Icon and all 12 NamedIcon components render valid React elements', () => {
    expect(React.isValidElement(Icon({ name: 'olive', size: 28, color: '#1B5E3B' }))).toBe(true);
    expect(Icon({ name: 'invalid' as any })).toBeNull();

    const namedComponents = [
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
    ];

    for (const Comp of namedComponents) {
      expect(React.isValidElement(Comp({ size: 24 }))).toBe(true);
    }
  });
});
