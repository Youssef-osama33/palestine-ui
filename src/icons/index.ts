/**
 * palestine-ui — Icon Renderer
 *
 * Vanilla JS renderer + Data URI helper + React components.
 * Works in any JS environment; React exports are tree-shakeable.
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
 * Returns a CSS-ready SVG Data URI for use in `<img src>` or CSS `url(...)`.
 */
export function iconToDataUri(name: IconName, options: IconOptions = {}): string {
  const svg = renderIcon(name, options)
    .replace(/\s+/g, ' ')
    .trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Mounts an icon into a DOM element.
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

// ─── React Exports (Tree-shakeable & Bundler-compatible) ───────────────────
export interface ReactIconProps extends IconOptions {
  name: IconName;
}

export type NamedIconProps = Omit<ReactIconProps, 'name'>;

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

function createNamedIcon(iconName: IconName) {
  const NamedIcon = (props: NamedIconProps) => Icon({ ...props, name: iconName });
  NamedIcon.displayName = `PalestineUI(${iconName})`;
  return NamedIcon;
}

// Named React Icon Components for direct import
export const OliveIcon = createNamedIcon('olive');
export const KeyIcon = createNamedIcon('key');
export const DomeIcon = createNamedIcon('dome');
export const MapIcon = createNamedIcon('map');
export const WatermelonIcon = createNamedIcon('watermelon');
export const FlagIcon = createNamedIcon('flag');
export const WheatIcon = createNamedIcon('wheat');
export const CrescentIcon = createNamedIcon('crescent');
export const HandIcon = createNamedIcon('hand');
export const SunIcon = createNamedIcon('sun');
export const BirdIcon = createNamedIcon('bird');
export const MosqueIcon = createNamedIcon('mosque');

export default renderIcon;
