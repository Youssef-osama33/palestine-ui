/**
 * palestine-ui — Kuffiyeh Pattern Generator
 *
 * Generates the traditional Palestinian kuffiyeh (كوفية) geometric pattern
 * algorithmically. Outputs SVG string, Data URI, CSS background, or draws to Canvas.
 */

export type KuffiyehStyle = 'classic' | 'red' | 'olive' | 'fine' | 'dense';

export interface KuffiyehOptions {
  /** Visual style preset (default: 'classic') */
  style?: KuffiyehStyle;
  /** Grid cell size in pixels (default: 16, min: 4) */
  scale?: number;
  /** Primary color override (overrides style) */
  color1?: string;
  /** Secondary background color override (overrides style) */
  color2?: string;
  /** Accent color override (overrides style) */
  color3?: string;
  /** Width in pixels for SVG output (default: 400) */
  width?: number;
  /** Height in pixels for SVG output (default: 400) */
  height?: number;
  /** Pattern opacity 0–1 (default: 1) */
  opacity?: number;
}

export interface KuffiyehPalette {
  c1: string;
  c2: string;
  c3: string;
}

const PALETTES: Record<KuffiyehStyle, KuffiyehPalette> = {
  classic: { c1: '#0D0D0D', c2: '#F5F0E8', c3: '#1B5E3B' },
  red:     { c1: '#B5202A', c2: '#F5F0E8', c3: '#0D0D0D' },
  olive:   { c1: '#6B7C3A', c2: '#C9B99A', c3: '#0D0D0D' },
  fine:    { c1: '#0D0D0D', c2: '#F5F0E8', c3: '#B5202A' },
  dense:   { c1: '#0D0D0D', c2: '#1B5E3B', c3: '#F5F0E8' },
};

let instanceCounter = 0;

export class Kuffiyeh {
  private opts: Required<KuffiyehOptions>;
  private palette: KuffiyehPalette;

  constructor(options: KuffiyehOptions = {}) {
    const rawScale = options.scale ?? 16;
    const rawOpacity = options.opacity ?? 1;

    this.opts = {
      style:   options.style  ?? 'classic',
      scale:   Math.max(4, rawScale),
      color1:  options.color1 ?? '',
      color2:  options.color2 ?? '',
      color3:  options.color3 ?? '',
      width:   Math.max(1, options.width ?? 400),
      height:  Math.max(1, options.height ?? 400),
      opacity: Math.min(1, Math.max(0, rawOpacity)),
    };

    const base = PALETTES[this.opts.style] ?? PALETTES.classic;
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
    const id = `kf-${++instanceCounter}`;

    const elements: string[] = [];
    const primaryStroke = +(s * 0.35).toFixed(2);
    const accentStroke = +(s * 0.25).toFixed(2);
    const knotSize = +(s * 0.4).toFixed(2);

    // 1. Primary diagonal crosshatch (+45 deg & -45 deg)
    for (let x = -height; x < width + height; x += s) {
      elements.push(
        `<line x1="${x}" y1="0" x2="${x + height}" y2="${height}" stroke="${c1}" stroke-width="${primaryStroke}" />`,
        `<line x1="${x + height}" y1="0" x2="${x}" y2="${height}" stroke="${c1}" stroke-width="${primaryStroke}" />`
      );
    }

    // 2. Accent diagonal lines (every 2nd step)
    for (let x = -height; x < width + height; x += s * 2) {
      elements.push(
        `<line x1="${x}" y1="0" x2="${x + height}" y2="${height}" stroke="${c3}" stroke-width="${accentStroke}" />`
      );
    }

    // 3. Geometric cross-hatch intersection knots
    for (let x = 0; x < width; x += s * 2) {
      for (let y = 0; y < height; y += s * 2) {
        elements.push(
          `<rect x="${x}" y="${y}" width="${knotSize}" height="${knotSize}" fill="${c2}" />`
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
    ${elements.join('\n    ')}
  </g>
</svg>`;
  }

  /** Returns an SVG Data URI string suitable for `<img src>` or CSS `url(...)` */
  toDataUri(): string {
    const svg = this.toSVG().replace(/\s+/g, ' ').trim();
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  /** Returns a CSS background property string */
  toCss(): string {
    const s = this.opts.scale;
    const { opacity } = this.opts;
    const { c1, c2, c3 } = this.palette;

    const rules = [
      `background-color: ${c2}`,
      `background-image: repeating-linear-gradient(45deg, ${c1} 0px, ${c1} ${s * 0.35}px, transparent ${s * 0.35}px, transparent ${s}px), repeating-linear-gradient(45deg, ${c3} 0px, ${c3} ${s * 0.25}px, transparent ${s * 0.25}px, transparent ${s * 2}px), repeating-linear-gradient(-45deg, ${c1} 0px, ${c1} ${s * 0.35}px, transparent ${s * 0.35}px, transparent ${s}px)`,
    ];

    if (opacity < 1) {
      rules.push(`opacity: ${opacity}`);
    }

    return rules.join(';\n');
  }

  /** Draws the pattern onto a provided HTMLCanvasElement */
  toCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context from canvas');

    const W = canvas.width;
    const H = canvas.height;
    const s = this.opts.scale;
    const { opacity } = this.opts;
    const { c1, c2, c3 } = this.palette;

    if (typeof ctx.save === 'function') ctx.save();
    ctx.clearRect(0, 0, W, H);

    if (opacity < 1) {
      ctx.globalAlpha = opacity;
    }

    // 1. Background
    ctx.fillStyle = c2;
    ctx.fillRect(0, 0, W, H);

    // 2. Primary diagonal crosshatch (+45 deg & -45 deg)
    ctx.strokeStyle = c1;
    ctx.lineWidth = s * 0.35;
    for (let x = -(H + s); x < W + H; x += s) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x + H, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // 3. Accent diagonal lines
    ctx.strokeStyle = c3;
    ctx.lineWidth = s * 0.25;
    for (let x = -(H + s); x < W + H; x += s * 2) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + H, H);
      ctx.stroke();
    }

    // 4. Cross-hatch intersection knots
    ctx.fillStyle = c2;
    const knotSize = s * 0.4;
    for (let x = 0; x < W; x += s * 2) {
      for (let y = 0; y < H; y += s * 2) {
        ctx.fillRect(x, y, knotSize, knotSize);
      }
    }

    if (typeof ctx.restore === 'function') ctx.restore();
  }

  /** Returns a copy of the active color palette */
  getPalette(): Readonly<KuffiyehPalette> {
    return { ...this.palette };
  }

  /** Returns all available style preset names */
  static getStyles(): KuffiyehStyle[] {
    return Object.keys(PALETTES) as KuffiyehStyle[];
  }
}

/** Shorthand factory function for creating a Kuffiyeh instance */
export function createKuffiyeh(options?: KuffiyehOptions): Kuffiyeh {
  return new Kuffiyeh(options);
}

export default Kuffiyeh;
