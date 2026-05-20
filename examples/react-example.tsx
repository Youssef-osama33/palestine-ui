/**
 * palestine-ui — React Usage Example
 *
 * Run with: npx create-react-app my-app && copy this file
 */

import React, { useState, useMemo } from 'react';
import {
  colors,
  renderIcon,
  Kuffiyeh,
  cssVar,
  contrastColor,
  type KuffiyehStyle,
  type IconName,
} from 'palestine-ui';
import 'palestine-ui/tokens.css';
// ── PalestineBadge ────────────────────────────────────────────
interface BadgeProps {
  icon: IconName;
  label: string;
  color?: string;
}

function PalestineBadge({ icon, label, color = colors.green }: BadgeProps) {
  const bg = color ?? colors.green;
  const fg = typeof bg === 'string' && bg.startsWith('var(')
    ? colors.white
    : contrastColor(bg as string);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        background: bg,
        color: fg,
        borderRadius: 'var(--pl-radius-full)',
        fontSize: 14,
        fontFamily: 'var(--pl-font-arabic)',
      }}
    >
      <div
        aria-hidden
        dangerouslySetInnerHTML={{
          __html: renderIcon(icon, { size: 16, color: fg }) || '',
        }}
      />
      <span>{label}</span>
    </div>
  );
}

// ── KuffiyehBanner ────────────────────────────────────────────
interface BannerProps {
  style?: KuffiyehStyle;
  children: React.ReactNode;
}

function KuffiyehBanner({ style = 'classic', children }: BannerProps) {
  const k = useMemo(() => new Kuffiyeh({ style, opacity: 0.12 }), [style]);
  const kStyle = useMemo(() => parseCss(k.toCss()), [k]);

  return (
    <div
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        background: colors.black,
        color: colors.white,
        position: 'relative',
        borderRadius: 'var(--pl-radius-lg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          ...kStyle,
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

/** Parses the toCss() string into a React style object */
function parseCss(css: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  css.split(';').forEach(rule => {
    const [prop, ...vals] = rule.split(':');
    if (prop && vals.length) {
      const key = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[key] = vals.join(':').trim();
    }
  });
  return obj as React.CSSProperties;
}

// ── IconShowcase ──────────────────────────────────────────────
const SHOWCASE_ICONS: IconName[] = ['olive', 'key', 'dome', 'watermelon', 'flag', 'mosque'];

function IconShowcase() {
  const [active, setActive] = useState<IconName>('olive');
  const [iconColor, setIconColor] = useState(colors.green);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {SHOWCASE_ICONS.map(name => (
          <button
            key={name}
            onClick={() => setActive(name)}
            style={{
              background: active === name ? colors.green : 'white',
              color: active === name ? colors.white : colors.black,
              border: `1.5px solid ${active === name ? colors.green : '#ddd'}`,
              borderRadius: 'var(--pl-radius-md)',
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--pl-font-arabic)',
              transition: 'all 200ms',
            }}
          >
            <div dangerouslySetInnerHTML={{
              __html: renderIcon(name, {
                size: 18,
                color: active === name ? colors.white : colors.green,
              }) || '',
            }} />
            {name}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: renderIcon(active, { size: 64, color: iconColor }) || '',
          }}
        />
        <div>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
            Color:
          </label>
          <input
            type="color"
            value={iconColor}
            onChange={e => setIconColor(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function App() {
  const [kuffiyehStyle, setKuffiyehStyle] = useState<KuffiyehStyle>('classic');
  const styles = Kuffiyeh.getStyles();

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '32px 16px',
        fontFamily: 'var(--pl-font-arabic)',
      }}
    >
      <h1 style={{ color: colors.green, marginBottom: 8 }}>
        palestine-ui React Demo 🇵🇸
      </h1>

      {/* Badges */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 12 }}>Badges</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <PalestineBadge icon="olive"      label="زيتون" color={colors.olive} />
          <PalestineBadge icon="watermelon" label="بطيخة" color={colors.red} />
          <PalestineBadge icon="key"        label="عودة"  color={colors.black} />
          <PalestineBadge icon="flag"       label="حرية"  color={colors.green} />
        </div>
      </section>

      {/* Kuffiyeh Banner */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ marginBottom: 12 }}>Kuffiyeh Banner</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {styles.map(s => (
            <button
              key={s}
              onClick={() => setKuffiyehStyle(s)}
              style={{
                padding: '4px 12px',
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
        <KuffiyehBanner style={kuffiyehStyle}>
          <h2
            style={{
              fontFamily: cssVar('font-arabic'),
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            }}
          >
            فلسطين حرة
          </h2>
        </KuffiyehBanner>
      </section>

      {/* Icon Showcase */}
      <section>
        <h2 style={{ marginBottom: 12 }}>Icon Showcase</h2>
        <IconShowcase />
      </section>
    </div>
  );
}
