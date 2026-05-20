/**
 * palestine-ui — Icon Renderer
 *
 * Vanilla JS renderer + optional React wrapper.
 * Works in any JS environment; React export is tree-shakeable.
 */

import { ICONS, IconName, iconNames } from './definitions';
export { ICONS, IconName, iconNames };

export interface IconOptions {
  /** Icon size in px (applied to width & height). Default: 24 */
  size?: number;
  /** Explicit width override */
  width?: number;
  /** Explicit height override */
  height?: number;
  /** CSS color or hex. Default: 'currentColor' */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline style object (serialized to style attr) */
  style?: Record<string, string>;
  /** Accessible label (adds aria-label). If omitted uses icon.nameAr */
  label?: string;
  /** stroke-width override */
  strokeWidth?: number;
}

/**
 * Returns an SVG string for any named icon.
 *
 * @example
 * document.body.innerHTML = renderIcon('olive', { size: 32, color: '#1B5E3B' });
 */
export function renderIcon(name: IconName, options: IconOptions = {}): string {
  const icon = ICONS[name];
  if (!icon) throw new Error(`palestine-ui: icon "${name}" not found`);

  const w = options.width  ?? options.size ?? 24;
  const h = options.height ?? options.size ?? 24;
  const color = options.color ?? 'currentColor';
  const label = options.label ?? icon.nameAr;
  const cls = options.className ? ` class="${options.className}"` : '';

  const styleStr = options.style
    ? ` style="${Object.entries(options.style).map(([k, v]) => `${k}:${v}`).join(';')}"`
    : '';

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${w}"
  height="${h}"
  viewBox="${icon.viewBox}"
  fill="${color}"
  color="${color}"
  aria-label="${label}"
  role="img"${cls}${styleStr}
>${icon.paths}</svg>`;
}

/**
 * Mounts an icon into a DOM element.
 *
 * @example
 * const el = document.getElementById('my-icon');
 * mountIcon(el, 'key', { size: 28 });
 */
export function mountIcon(
  element: HTMLElement,
  name: IconName,
  options?: IconOptions
): void {
  element.innerHTML = renderIcon(name, options);
}

/**
 * Creates and returns a DOM SVGElement for the icon.
 */
export function createIconElement(
  name: IconName,
  options?: IconOptions
): SVGElement {
  const container = document.createElement('div');
  container.innerHTML = renderIcon(name, options);
  const svg = container.firstElementChild as SVGElement;
  if (!svg) throw new Error('Failed to create icon element');
  return svg;
}

// ─── React Export (tree-shakeable) ──────────────────────────────────────────
// Only included when React is available in the consuming project.
// This avoids a hard React dependency for vanilla JS users.

let _React: typeof import('react') | null = null;

try {
  // Dynamic import — bundlers handle this gracefully
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  _React = (globalThis as any)?.React;
} catch {
  // React not available — vanilla JS only
}

export interface ReactIconProps extends IconOptions {
  name: IconName;
}

/**
 * React component for rendering Palestine UI icons.
 * Only available when React is installed in your project.
 *
 * @example
 * import { Icon } from 'palestine-ui/icons';
 * <Icon name="olive" size={24} color="#1B5E3B" />
 */
export const Icon = _React
  ? function PaIcon({ name, size = 24, width, height, color = 'currentColor', className, label, style }: ReactIconProps) {
      const icon = ICONS[name];
      if (!icon) return null;

      const w = width ?? size;
      const h = height ?? size;

      return _React!.createElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: w,
        height: h,
        viewBox: icon.viewBox,
        fill: color,
        color,
        'aria-label': label ?? icon.nameAr,
        role: 'img',
        className,
        style,
        dangerouslySetInnerHTML: { __html: icon.paths },
      });
    }
  : null;

export default renderIcon;
