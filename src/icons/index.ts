/**
 * palestine-ui — Icon Renderer
 *
 * Vanilla JS renderer + optional React component wrapper.
 * Works in any JS environment; React export is tree-shakeable.
 */

import { ICONS, type IconName, type IconDef, iconNames } from './definitions';
export { ICONS, type IconName, type IconDef, iconNames };

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
  style?: Record<string, string | number>;
  /** Accessible label (adds aria-label). If omitted uses icon.nameAr */
  label?: string;
  /** Optional stroke-width override for stroked paths */
  strokeWidth?: number;
}

/**
 * Applies an optional stroke-width override to inner SVG paths.
 */
function applyStrokeWidth(paths: string, strokeWidth?: number): string {
  if (strokeWidth === undefined) return paths;
  return paths.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
}

/**
 * Returns an SVG string for any named icon.
 *
 * @example
 * document.body.innerHTML = renderIcon('olive', { size: 32, color: '#1B5E3B' });
 */
export function renderIcon(name: IconName, options: IconOptions = {}): string {
  const icon = ICONS[name];
  if (!icon) {
    throw new Error(`palestine-ui: icon "${String(name)}" not found`);
  }

  const w = options.width ?? options.size ?? 24;
  const h = options.height ?? options.size ?? 24;
  const color = options.color ?? 'currentColor';
  const label = options.label ?? icon.nameAr;
  const cls = options.className ? ` class="${options.className}"` : '';

  const styleStr = options.style
    ? ` style="${Object.entries(options.style)
        .map(([k, v]) => `${k}:${v}`)
        .join(';')}"`
    : '';

  const innerPaths = applyStrokeWidth(icon.paths, options.strokeWidth);

  return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${w}"
  height="${h}"
  viewBox="${icon.viewBox}"
  fill="${color}"
  color="${color}"
  aria-label="${label}"
  role="img"${cls}${styleStr}
>${innerPaths}</svg>`;
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
  const svg = container.firstElementChild as SVGElement | null;
  if (!svg) throw new Error('Failed to create icon element');
  return svg;
}

// ─── React Export (Tree-shakeable & Bundler-compatible) ────────────────────
export interface ReactIconProps extends IconOptions {
  name: IconName;
}

function resolveReact(): typeof import('react') | null {
  if (typeof globalThis !== 'undefined' && (globalThis as any).React) {
    return (globalThis as any).React;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react');
  } catch {
    return null;
  }
}

/**
 * React component for rendering Palestine UI icons.
 * Automatically resolves React in modern bundlers (Vite/Next/Webpack) or global scope.
 *
 * @example
 * import { Icon } from 'palestine-ui/icons';
 * <Icon name="olive" size={24} color="#1B5E3B" />
 */
export function Icon({
  name,
  size = 24,
  width,
  height,
  color = 'currentColor',
  className,
  label,
  style,
  strokeWidth,
}: ReactIconProps) {
  const ReactInstance = resolveReact();
  if (!ReactInstance) {
    throw new Error(
      'palestine-ui: React is required to use the <Icon /> component. For vanilla JS, use renderIcon() instead.'
    );
  }

  const icon = ICONS[name];
  if (!icon) return null;

  const w = width ?? size;
  const h = height ?? size;
  const innerPaths = applyStrokeWidth(icon.paths, strokeWidth);

  return ReactInstance.createElement('svg', {
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
    dangerouslySetInnerHTML: { __html: innerPaths },
  });
}

export default renderIcon;
