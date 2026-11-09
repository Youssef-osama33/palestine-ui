/**
 * palestine-ui — Cultural Icons Unit Tests
 */

import React from 'react';
import * as IconsModule from '../icons';

const { ICONS, iconNames, renderIcon, mountIcon } = IconsModule;

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

  test('renderIcon respects size option', () => {
    const svg = renderIcon('key', { size: 48 });
    expect(svg).toContain('width="48"');
    expect(svg).toContain('height="48"');
  });

  test('renderIcon respects independent width and height options', () => {
    const svg = renderIcon('flag', { width: 32, height: 16 });
    expect(svg).toContain('width="32"');
    expect(svg).toContain('height="16"');
  });

  test('renderIcon respects color, custom label, and className', () => {
    const svg = renderIcon('dome', {
      color: '#1B5E3B',
      label: 'Peace symbol',
      className: 'my-icon',
    });
    expect(svg).toContain('fill="#1B5E3B"');
    expect(svg).toContain('Peace symbol');
    expect(svg).toContain('class="my-icon"');
  });

  test('renderIcon throws descriptive error for unknown icon', () => {
    expect(() => renderIcon('nonexistent' as any)).toThrow(
      'palestine-ui: icon "nonexistent" not found'
    );
  });

  test('mountIcon injects SVG into target DOM element', () => {
    const el = { innerHTML: '' } as HTMLElement;
    mountIcon(el, 'watermelon', { size: 20 });
    expect(el.innerHTML).toContain('<svg');
    expect(el.innerHTML).toContain('width="20"');
  });

  test('React Icon component renders valid React element if exported', () => {
    const MaybeIcon = (IconsModule as Record<string, unknown>)['Icon'];
    if (typeof MaybeIcon === 'function') {
      const el = MaybeIcon({ name: 'olive', size: 28, color: '#1B5E3B' });
      expect(React.isValidElement(el)).toBe(true);
    }
  });
});
