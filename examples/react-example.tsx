/**
 * palestine-ui — React Usage Example
 *
 * Compatible with Vite, Next.js, and modern React 17/18/19 projects.
 */

import React, { useState, useMemo } from 'react';
import {
  colors,
  Kuffiyeh,
  cssVar,
  contrastColor,
  iconNames,
  type KuffiyehStyle,
  type IconName,
} from 'palestine-ui';
import { Icon } from 'palestine-ui/icons';
import 'palestine-ui/tokens.css';

// ── 1. PalestineBadge ─────────────────────────────────────────
interface BadgeProps {
  icon: IconName;
  label: string;
  color?: string;
}

export function PalestineBadge({ icon, label, color = colors.green }: BadgeProps) {
  const bg = color ?? colors.green;
  const fg =
    typeof bg === 'string' && bg.startsWith('var(')
      ? colors.white
      : contrastColor(bg);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        background: bg,
        color: fg,
        borderRadius: 'var(--pl-radius-full, 9999px)',
        fontSize: 14,
        fontFamily: 'var(--pl-font-arabic)',
      }}
    >
      <Icon name={icon} size={16} color={fg} />
      <span>{label}</span>
    </div>
  );
}

// ── 2. KuffiyehBanner ─────────────────────────────────────────
interface BannerProps {
  patternStyle?: KuffiyehStyle;
  children: React.ReactNode;
}

export function KuffiyehBanner({ patternStyle = 'classic', children }: BannerProps) {
  const k = useMemo(() => new Kuffiyeh({ style: patternStyle, opacity: 0.14 }), [patternStyle]);
  const kStyle = useMemo(() => parseCssToReactStyle(k.toCss()), [k]);

  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: colors.black,
        color: colors.white,
        position: 'relative',
        borderRadius: 'var(--pl-radius-lg, 12px)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          ...kStyle,
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

/** Parses a semicolon-separated CSS string into a React CSSProperties object */
function parseCssToReactStyle(css: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  css.split(';').forEach((rule) => {
    const [prop, ...vals] = rule.split(':');
    if (prop && vals.length) {
      const key = prop
        .trim()
        .replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
      obj[key] = vals.join(':').trim();
    }
  });
  return obj as React.CSSProperties;
}

// ── 3. IconShowcase ───────────────────────────────────────────
function IconShowcase() {
  const [active, setActive] = useState<IconName>('olive');
  const [iconColor, setIconColor] = useState<string>(colors.green);
  const [iconSize, setIconSize] = useState<number>(64);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {iconNames.map((name) => {
          const isSelected = active === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              style={{
                background: isSelected ? colors.green : colors.white,
                color: isSelected ? colors.white : colors.black,
                border: `1.5px solid ${isSelected ? colors.green : '#ddd'}`,
                borderRadius: 'var(--pl-radius-md, 8px)',
                padding: '8px 14px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--pl-font-sans, sans-serif)',
                fontSize: 13,
                transition: 'all 180ms',
              }}
            >
              <Icon
                name={name}
                size={18}
                color={isSelected ? colors.white : colors.green}
              />
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          padding: 20,
          background: '#f9f8f6',
          borderRadius: 12,
          border: '1px solid #e5dec9',
        }}
      >
        <Icon name={active} size={iconSize} color={iconColor} />

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}>
              Color:
            </label>
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 600 }}>
              Size ({iconSize}px):
            </label>
            <input
              type="range"
              min={24}
              max={96}
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Main App ───────────────────────────────────────────────
export default function App() {
  const [kuffiyehStyle, setKuffiyehStyle] = useState<KuffiyehStyle>('classic');
  const styles = Kuffiyeh.getStyles();

  return (
    <div
      style={{
        maxWidth: 840,
        margin: '0 auto',
        padding: '32px 16px',
        fontFamily: 'var(--pl-font-arabic)',
      }}
    >
      <h1 style={{ color: colors.green, marginBottom: 8 }}>
        palestine-ui React Demo 🇵🇸
      </h1>
      <p style={{ color: '#555', marginBottom: 32 }}>
        Interactive showcase of tokens, React icons, and algorithmic Kuffiyeh patterns.
      </p>

      {/* Badges */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 12 }}>1. Cultural Badges</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <PalestineBadge icon="olive"      label="غصن زيتون" color={colors.olive} />
          <PalestineBadge icon="watermelon" label="بطيخة"     color={colors.red} />
          <PalestineBadge icon="key"        label="مفتاح العودة" color={colors.black} />
          <PalestineBadge icon="flag"       label="حرية"      color={colors.green} />
          <PalestineBadge icon="dome"       label="القدس"     color={colors.sea} />
        </div>
      </section>

      {/* Kuffiyeh Banner */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 12 }}>2. Kuffiyeh Banner</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {styles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setKuffiyehStyle(s)}
              style={{
                padding: '5px 14px',
                borderRadius: 20,
                border: `1px solid ${kuffiyehStyle === s ? colors.green : '#ddd'}`,
                background: kuffiyehStyle === s ? colors.green : 'white',
                color: kuffiyehStyle === s ? 'white' : 'black',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <KuffiyehBanner patternStyle={kuffiyehStyle}>
          <h2
            style={{
              fontFamily: cssVar('font-arabic'),
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              margin: 0,
            }}
          >
            فلسطين حرة 🇵🇸
          </h2>
        </KuffiyehBanner>
      </section>

      {/* Icon Showcase */}
      <section>
        <h2 style={{ marginBottom: 12 }}>3. All 12 Cultural Icons</h2>
        <IconShowcase />
      </section>
    </div>
  );
}
