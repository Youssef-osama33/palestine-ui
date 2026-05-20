# palestine-ui 🇵🇸

> A design system for Palestine — colors, icons, kuffiyeh patterns, and utilities for developers building Palestine-related projects.

[![npm version](https://img.shields.io/npm/v/palestine-ui.svg)](https://www.npmjs.com/package/palestine-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## Why

Every developer building a Palestine-related project starts from scratch — colors, icons, patterns. `palestine-ui` is the shared foundation that lets you focus on what matters.

**Works with:** Vanilla JS · React · Vue · Svelte · Any framework

---

## Installation

```bash
npm install palestine-ui
# or
yarn add palestine-ui
# or
pnpm add palestine-ui
```

---

## Quick Start

```js
import { colors, renderIcon, Kuffiyeh } from 'palestine-ui';
import 'palestine-ui/tokens.css';

// Use colors
console.log(colors.green); // '#1B5E3B'

// Render an icon
const svg = renderIcon('olive', { size: 32 });
document.body.innerHTML += svg;

// Generate kuffiyeh pattern
const k = new Kuffiyeh({ style: 'classic' });
document.body.style.cssText = k.toCss();
```

---

## Modules

### 🎨 Tokens

Design tokens — colors, typography, spacing, and more.

```js
import { colors, fonts, spacing, radius, shadows } from 'palestine-ui';
```

**Flag Colors:**

| Token          | Value     | Usage              |
|----------------|-----------|--------------------|
| `colors.black` | `#0D0D0D` | Flag black stripe  |
| `colors.white` | `#F5F0E8` | Flag white stripe  |
| `colors.green` | `#1B5E3B` | Flag green stripe  |
| `colors.red`   | `#B5202A` | Flag red triangle  |

**Extended Palette:**

| Token              | Value     | Meaning              |
|--------------------|-----------|----------------------|
| `colors.sand`      | `#C9B99A` | Palestinian earth    |
| `colors.olive`     | `#6B7C3A` | Olive tree leaves    |
| `colors.sky`       | `#A8C8E8` | Gaza sky             |
| `colors.sea`       | `#2E7DAA` | Mediterranean Sea    |

**CSS Variables** (after importing `tokens.css`):

```css
.my-component {
  background: var(--pl-green);
  color: var(--pl-white);
  border: 1px solid var(--pl-red);
  font-family: var(--pl-font-arabic);
}
```

---

### 🖼 Icons

12 hand-crafted SVG icons rooted in Palestinian culture.

```js
import { renderIcon, mountIcon, iconNames } from 'palestine-ui';

// Get SVG string
const svg = renderIcon('olive', { size: 24, color: '#1B5E3B' });

// Mount into DOM element
const el = document.getElementById('my-icon');
mountIcon(el, 'key', { size: 32 });

// List all icons
console.log(iconNames);
// → ['olive', 'key', 'dome', 'map', 'watermelon', 'flag', ...]
```

**Available Icons:**

| Name          | Arabic          | Description              |
|---------------|-----------------|--------------------------|
| `olive`       | غصن زيتون       | Olive branch             |
| `key`         | مفتاح العودة    | Key of Return            |
| `dome`        | قبة الصخرة      | Dome of the Rock         |
| `map`         | خريطة فلسطين    | Map of Palestine         |
| `watermelon`  | بطيخة           | Watermelon               |
| `flag`        | العلم الفلسطيني | Palestinian Flag         |
| `wheat`       | قمح             | Wheat                    |
| `crescent`    | هلال ونجمة      | Crescent and Star        |
| `hand`        | يد التضامن      | Open Hand / Solidarity   |
| `sun`         | شمس الأمل       | Sun / Hope               |
| `bird`        | طائر الحرية     | Free Bird / Freedom      |
| `mosque`      | مسجد            | Mosque                   |

**React Usage:**

```jsx
import { Icon } from 'palestine-ui/icons';

function App() {
  return (
    <div>
      <Icon name="olive" size={24} color="#1B5E3B" />
      <Icon name="key" size={32} />
      <Icon name="watermelon" size={28} color="#B5202A" />
    </div>
  );
}
```

---

### 🧣 Kuffiyeh Generator

Algorithmically generate the traditional Palestinian kuffiyeh pattern.

```js
import { Kuffiyeh, createKuffiyeh } from 'palestine-ui';

// Using the class
const k = new Kuffiyeh({
  style: 'classic',   // 'classic' | 'red' | 'olive' | 'fine' | 'dense'
  scale: 16,          // grid cell size in px
  width: 400,         // output width
  height: 400,        // output height
  opacity: 1,
});

// Output formats
k.toSVG();     // → SVG string
k.toCss();     // → CSS background property string
k.toCanvas(canvasElement);  // → draws on <canvas>

// Custom colors
const custom = new Kuffiyeh({
  color1: '#000000',
  color2: '#FFFFFF',
  color3: '#1B5E3B',
});

// Shorthand factory
const k2 = createKuffiyeh({ style: 'red' });

// Get all styles
Kuffiyeh.getStyles(); // → ['classic', 'red', 'olive', 'fine', 'dense']
```

**Style Presets:**

| Style     | c1 (primary) | c2 (bg)   | c3 (accent) |
|-----------|-------------|-----------|-------------|
| `classic` | `#0D0D0D`   | `#F5F0E8` | `#1B5E3B`   |
| `red`     | `#B5202A`   | `#F5F0E8` | `#0D0D0D`   |
| `olive`   | `#6B7C3A`   | `#C9B99A` | `#0D0D0D`   |
| `fine`    | `#0D0D0D`   | `#F5F0E8` | `#B5202A`   |
| `dense`   | `#0D0D0D`   | `#1B5E3B` | `#F5F0E8`   |

---

### 🛠 Utilities

```js
import {
  cssVar,        // 'green' → 'var(--pl-green)'
  hex,           // 'olive' → '#6B7C3A'
  hexToRgb,      // '#1B5E3B' → { r: 27, g: 94, b: 59 }
  withOpacity,   // '#1B5E3B', 0.5 → 'rgba(27, 94, 59, 0.5)'
  flagStripe,    // generates CSS flag gradient
  isDark,        // '#0D0D0D' → true
  contrastColor, // '#0D0D0D' → '#F5F0E8' (accessible text color)
  arabicText,    // wraps text in RTL marks
} from 'palestine-ui';
```

---

### 🎨 Tailwind CSS Plugin

```js
// tailwind.config.js
const palestineUI = require('palestine-ui/tailwind');

module.exports = {
  plugins: [palestineUI],
};
```

This adds:

```html
<!-- Color utilities -->
<div class="bg-palestine-green text-palestine-white">...</div>
<div class="border-palestine-red">...</div>

<!-- Pattern utilities -->
<div class="pl-kuffiyeh">...</div>
<div class="pl-flag-bg">...</div>

<!-- RTL support -->
<p class="pl-rtl">مرحباً بالعالم</p>
```

---

## CSS-Only Usage

No JavaScript required for basic tokens:

```html
<link rel="stylesheet" href="https://unpkg.com/palestine-ui/dist/tokens/tokens.css" />

<style>
  .hero {
    background: var(--pl-black);
    color: var(--pl-white);
    border-left: 4px solid var(--pl-green);
  }
</style>
```

---

## Examples

### Palestine-Themed Button

```html
<style>
  .pl-btn {
    background: var(--pl-green);
    color: var(--pl-white);
    border: none;
    padding: 10px 20px;
    border-radius: var(--pl-radius-md);
    font-family: var(--pl-font-sans);
    cursor: pointer;
    transition: background var(--pl-duration) var(--pl-ease);
  }
  .pl-btn:hover { background: var(--pl-green-light); }
  .pl-btn--red  { background: var(--pl-red); }
</style>

<button class="pl-btn">Free Palestine</button>
```

### Kuffiyeh Hero Section

```html
<div id="hero"></div>

<script type="module">
  import { Kuffiyeh, renderIcon } from 'palestine-ui';

  const hero = document.getElementById('hero');
  const k = new Kuffiyeh({ style: 'classic', opacity: 0.15 });

  hero.style.cssText = k.toCss() + '; padding: 60px; text-align: center;';
  hero.innerHTML = renderIcon('olive', { size: 48, color: '#1B5E3B' });
</script>
```

### React Component

```jsx
import { Icon, colors, Kuffiyeh } from 'palestine-ui';
import 'palestine-ui/tokens.css';

export function PalestineBadge({ label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 16px',
      background: colors.green,
      color: colors.white,
      borderRadius: 8,
    }}>
      <Icon name="olive" size={18} color={colors.white} />
      <span>{label}</span>
    </div>
  );
}
```

---

## Contributing

Contributions are welcome — especially:
- New icons representing Palestinian culture
- Additional kuffiyeh style presets
- Translations and RTL improvements

```bash
git clone https://github.com/palestine-ui/palestine-ui.git
cd palestine-ui
npm install
npm run build
npm test
```

---

## License

MIT © Palestine UI Contributors

*This project is dedicated to the Palestinian people.*

**Free Palestine 🇵🇸**
