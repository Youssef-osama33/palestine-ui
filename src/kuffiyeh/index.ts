/**
 * palestine-ui — Kuffiyeh Pattern Generator
 *
 * Generates the traditional Palestinian kuffiyeh (كوفية) geometric pattern
 * algorithmically. Outputs SVG string, CSS background, or draws to Canvas.
 */

export type KuffiyehStyle = 'classic' | 'red' | 'olive' | 'fine' | 'dense';

export interface KuffiyehOptions {
  /** Visual style preset */
  style?: KuffiyehStyle;
  /** Grid cell size in pixels (default: 16) */
  scale?: number;
  /** Primary color override (overrides style) */
  color1?: string;
  /** Secondary color override (overrides style) */
  color2?: string;
  /** Accent color override (overrides style) */
  color3?: string;
  /** Width in pixels for SVG/CSS output (default: 400) */
  width?: number;
  /** Height in pixels for SVG/CSS output (default: 400) */
  height?: number;
  /** Pattern opacity 0-1 (default: 1) */
  opacity?: number;
}

interface Palette {
  c1: string;
  c2: string;
  c3: string;
}

const PALETTES: Record<KuffiyehStyle, Palette> = {
  classic: { c1: '#0D0D0D', c2: '#F5F0E8', c3: '#1B5E3B' },
  red:     { c1: '#B5202A', c2: '#F5F0E8', c3: '#0D0D0D' },
  olive:   { c1: '#6B7C3A', c2: '#C9B99A', c3: '#0D0D0D' },
  fine:    { c1: '#0D0D0D', c2: '#F5F0E8', c3: '#B5202A' },
  dense:   { c1: '#0D0D0D', c2: '#1B5E3B', c3: '#F5F0E8' },
};

export class Kuffiyeh {
  private opts: Required<KuffiyehOptions>;
  private palette: Palette;

  constructor(options: KuffiyehOptions = {}) {
    this.opts = {
      style:   options.style   ?? 'classic',
      scale:   options.scale   ?? 16,
      color1:  options.color1  ?? '',
      color2:  options.color2  ?? '',
      color3:  options.color3  ?? '',
      width:   options.width   ?? 400,
      height:  options.height  ?? 400,
      opacity: options.opacity ?? 1,
    };

    const base = PALETTES[this.opts.style];
    this.palette = {
      c1: this.opts.color1 || base.c1,
      c2: this.opts.color2 || base.c2,
      c3: this.opts.color3 || base.c3,
    };
  }

  /** Returns an SVG string of the kuffiyeh pattern */
  toSVG(): string {
    const { width, height, opacity } = this.opts;
    const s = this.opts.scale;
    const { c1, c2, c3 } = this.palette;
    const id = `kf-${Math.random().toString(36).slice(2, 7)}`;

    const lines: string[] = [];

    // Diagonal lines (primary)
    for (let x = -height; x < width + height; x += s) {
      lines.push(
        `<line x1="${x}" y1="0" x2="${x + height}" y2="${height}"
          stroke="${c1}" stroke-width="${s * 0.35}" />`
      );
    }

    // Diagonal lines (accent — every 2nd)
    for (let x = -height; x < width + height; x += s * 2) {
      lines.push(
        `<line x1="${x}" y1="0" x2="${x + height}" y2="${height}"
          stroke="${c3}" stroke-width="${s * 0.25}" />`
      );
    }

    // Cross-hatch dots
    for (let x = 0; x < width; x += s * 2) {
      for (let y = 0; y < height; y += s * 2) {
        lines.push(
          `<rect x="${x}" y="${y}" width="${s * 0.4}" height="${s * 0.4}"
            fill="${c2}" />`
        );
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg"
  width="${width}" height="${height}"
  viewBox="0 0 ${width} ${height}"
  opacity="${opacity}"
  role="img"
  aria-label="Kuffiyeh pattern">
  <defs>
    <clipPath id="${id}-clip">
      <rect width="${width}" height="${height}" />
    </clipPath>
  </defs>
  <rect width="${width}" height="${height}" fill="${c2}" />
  <g clip-path="url(#${id}-clip)">
    ${lines.join('\n    ')}
  </g>
</svg>`;
  }

  /** Returns a CSS background property string */
  toCss(): string {
    const s = this.opts.scale;
    const { c1, c2, c3 } = this.palette;

    return [
      `background-color: ${c2}`,
      `background-image:
        repeating-linear-gradient(
          45deg,
          ${c1} 0px, ${c1} ${s * 0.35}px,
          transparent ${s * 0.35}px, transparent ${s}px
        ),
        repeating-linear-gradient(
          45deg,
          ${c3} 0px, ${c3} ${s * 0.25}px,
          transparent ${s * 0.25}px, transparent ${s * 2}px
        ),
        repeating-linear-gradient(
          -45deg,
          ${c1} 0px, ${c1} ${s * 0.35}px,
          transparent ${s * 0.35}px, transparent ${s}px
        )`,
    ].join(';\n');
  }

  /** Draws the pattern onto a provided Canvas element */
  toCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context from canvas');

    const W = canvas.width;
    const H = canvas.height;
    const s = this.opts.scale;
    const { c1, c2, c3 } = this.palette;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = c2;
    ctx.fillRect(0, 0, W, H);

    // Diagonal lines — primary
    ctx.strokeStyle = c1;
    ctx.lineWidth = s * 0.35;
    for (let x = -(H + s); x < W + H; x += s) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }

    // Diagonal lines — accent
    ctx.strokeStyle = c3;
    ctx.lineWidth = s * 0.25;
    for (let x = -(H + s); x < W + H; x += s * 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }

    // Cross-hatch dots
    ctx.fillStyle = c2;
    for (let x = 0; x < W; x += s * 2) {
      for (let y = 0; y < H; y += s * 2) {
        ctx.fillRect(x, y, s * 0.4, s * 0.4);
      }
    }
  }

  /** Returns the active color palette */
  getPalette(): Readonly<Palette> {
    return { ...this.palette };
  }

  /** Returns all available style presets */
  static getStyles(): KuffiyehStyle[] {
    return Object.keys(PALETTES) as KuffiyehStyle[];
  }
}

/** Shorthand factory */
export function createKuffiyeh(options?: KuffiyehOptions): Kuffiyeh {
  return new Kuffiyeh(options);
}

export default Kuffiyeh;
