# Utils

مجموعة helper functions للتعامل مع الألوان، الـ CSS variables، والنصوص العربية.

---

## Import

```js
import {
  cssVar,
  hex,
  hexToRgb,
  withOpacity,
  flagStripe,
  isDark,
  contrastColor,
  arabicText,
  animId,
} from 'palestine-ui';
```

---

## `cssVar(token)`

بيرجع CSS custom property reference لأي token في الـ design system.
بيتحول camelCase لـ kebab-case تلقائياً.

```js
cssVar('green')       // → 'var(--pl-green)'
cssVar('greenLight')  // → 'var(--pl-green-light)'
cssVar('sandDark')    // → 'var(--pl-sand-dark)'
```

**مفيد في:**

```js
// inline styles في JS
element.style.color = cssVar('primary');

// React
<div style={{ backgroundColor: cssVar('surface') }}>...</div>
```

---

## `hex(color)`

بيرجع الـ hex value لأي اسم لون في الـ palette.

```js
hex('green')  // → '#1B5E3B'
hex('red')    // → '#B5202A'
hex('olive')  // → '#6B7C3A'
hex('sand')   // → '#C9B99A'
```

---

## `hexToRgb(hex)`

بيحول hex string لـ `{ r, g, b }` object.
بيرجع `null` لو الـ input غير صالح.

```js
hexToRgb('#1B5E3B')  // → { r: 27, g: 94, b: 59 }
hexToRgb('1B5E3B')   // → { r: 27, g: 94, b: 59 } (بدون #)
hexToRgb('#FFF')     // → null (3 أرقام مش مدعومة)
hexToRgb('invalid')  // → null
```

---

## `withOpacity(hexOrToken, opacity)`

بيحول لون لـ `rgba()` مع opacity محددة.
بيقبل hex string أو اسم token من الـ palette.

```js
withOpacity('#1B5E3B', 0.5)  // → 'rgba(27, 94, 59, 0.5)'
withOpacity('green', 0.3)    // → 'rgba(27, 94, 59, 0.3)'
withOpacity('#000000', 0)    // → 'rgba(0, 0, 0, 0)'
withOpacity('#FFFFFF', 1)    // → 'rgba(255, 255, 255, 1)'
```

**مفيد لـ overlays وshadows:**

```js
element.style.boxShadow = `0 4px 20px ${withOpacity('black', 0.15)}`;
element.style.backgroundColor = withOpacity('green', 0.08);
```

---

## `flagStripe(height?)`

بيولّد CSS string لشريط العلم الفلسطيني بالألوان الأربعة.

```js
flagStripe()   // → 'height: 8px; background: linear-gradient(...)'
flagStripe(4)  // → 'height: 4px; background: ...'
```

```js
// تطبيق على عنصر
const stripe = document.createElement('div');
stripe.style.cssText = flagStripe(6);
document.body.appendChild(stripe);
```

---

## `isDark(hexColor)`

بيحدد لو اللون "داكن" بناءً على WCAG 2.1 relative luminance.
مفيد لاختيار لون النص (أبيض أو أسود) على خلفية معينة.

```js
isDark('#0D0D0D')  // → true
isDark('#1B5E3B')  // → true
isDark('#B5202A')  // → true
isDark('#F5F0E8')  // → false
isDark('#FFFFFF')  // → false
```

---

## `contrastColor(bg)`

بيرجع `#F5F0E8` (أبيض فلسطين) أو `#0D0D0D` (أسود) —
أيهم أوضح contrast على الخلفية اللي بتديها.

```js
contrastColor('#1B5E3B')  // → '#F5F0E8' (أبيض على أخضر داكن)
contrastColor('#A8C8E8')  // → '#0D0D0D' (أسود على سماوي فاتح)
contrastColor('#0D0D0D')  // → '#F5F0E8'
contrastColor('#F5F0E8')  // → '#0D0D0D'
```

**مثال عملي:**

```js
function makeButton(bgColor, text) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.style.backgroundColor = bgColor;
  btn.style.color = contrastColor(bgColor); // نص readable تلقائياً
  return btn;
}
```

---

## `arabicText(text)`

بيلف النص العربي في Unicode RTL marks (U+200F) لمنع مشاكل الـ bidirectional text
مع الأرقام والترقيم.

```js
arabicText('فلسطين')   // → '\u200Fفلسطين\u200F'
arabicText('الله أكبر') // → '\u200Fالله أكبر\u200F'
```

```js
// مفيد في mixed content
const label = document.createElement('span');
label.textContent = arabicText('٢٠٢٤ — غزة');
```

---

## `animId(prefix?)`

بيولّد unique ID آمن للـ CSS animations وإلـ SVG elements.

```js
animId()          // → 'pl-1ab2' (prefix افتراضي 'pl')
animId('kf')      // → 'kf-2cd3'
animId('mosque')  // → 'mosque-3ef4'
```

```js
// مثال في SVG
const id = animId('clip');
const svg = `
  <svg>
    <defs>
      <clipPath id="${id}">
        <rect width="100" height="100" />
      </clipPath>
    </defs>
    <g clip-path="url(#${id})">...</g>
  </svg>
`;
```

---

## TypeScript Types

```ts
import type { RgbColor, PaletteColor, ColorHex } from 'palestine-ui';

const color: PaletteColor = 'green';   // يقبل فقط الأسماء الموجودة في الـ palette
const hexVal: ColorHex = '#1B5E3B';
const rgb: RgbColor = { r: 27, g: 94, b: 59 };
```
