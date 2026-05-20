# palestine-ui 🇵🇸

> نظام تصميم لفلسطين — ألوان، أيقونات، نمط الكوفية، وأدوات للمطورين الذين يبنون مشاريع عن فلسطين.

[![npm version](https://img.shields.io/npm/v/palestine-ui.svg)](https://www.npmjs.com/package/palestine-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

[English](README.md) | **العربية**

---

## ليه palestine-ui؟

كل مطور بيبني مشروع عن فلسطين بيبدأ من الصفر — ألوان، أيقونات، أنماط.
`palestine-ui` هو الأساس المشترك اللي يخليك تركز على اللي يهم.

**بيشتغل مع:** Vanilla JS · React · Vue · Svelte · أي framework

---

## التثبيت

```bash
npm install palestine-ui
# أو
yarn add palestine-ui
# أو
pnpm add palestine-ui
```

---

## البداية السريعة

```js
import { colors, renderIcon, Kuffiyeh } from 'palestine-ui';
import 'palestine-ui/tokens.css';

// استخدام الألوان
console.log(colors.green); // '#1B5E3B'

// رسم أيقونة
const svg = renderIcon('olive', { size: 32 });
document.body.innerHTML += svg;

// توليد نمط الكوفية
const k = new Kuffiyeh({ style: 'classic' });
document.body.style.cssText = k.toCss();
```

---

## المحتويات

### 🎨 الألوان — Tokens

توكنز التصميم — ألوان، خطوط، مسافات، وأكتر.

```js
import { colors, fonts, spacing, radius, shadows } from 'palestine-ui';
```

**ألوان العلم:**

| التوكن | القيمة | المعنى |
|---|---|---|
| `colors.black` | `#0D0D0D` | الشريط الأسود في العلم |
| `colors.white` | `#F5F0E8` | الشريط الأبيض في العلم |
| `colors.green` | `#1B5E3B` | الشريط الأخضر في العلم |
| `colors.red`   | `#B5202A` | المثلث الأحمر في العلم |

**الألوان الممتدة:**

| التوكن | القيمة | المعنى |
|---|---|---|
| `colors.sand`  | `#C9B99A` | تراب فلسطين |
| `colors.olive` | `#6B7C3A` | أوراق الزيتون |
| `colors.sky`   | `#A8C8E8` | سماء غزة |
| `colors.sea`   | `#2E7DAA` | البحر المتوسط |

**متغيرات CSS** (بعد استيراد `tokens.css`):

```css
.مكون {
  background: var(--pl-green);
  color: var(--pl-white);
  border: 1px solid var(--pl-red);
  font-family: var(--pl-font-arabic);
}
```

---

### 🖼 الأيقونات — Icons

13 أيقونة SVG مصنوعة يدوياً من الموروث الفلسطيني.

```js
import { renderIcon, mountIcon, iconNames } from 'palestine-ui';

// الحصول على SVG string
const svg = renderIcon('olive', { size: 24, color: '#1B5E3B' });

// وضع الأيقونة داخل عنصر HTML
const el = document.getElementById('icon');
mountIcon(el, 'key', { size: 32 });

// قائمة كل الأيقونات
console.log(iconNames);
```

**الأيقونات المتاحة:**

| الاسم | العربي | الوصف |
|---|---|---|
| `olive` | غصن زيتون | غصن الزيتون |
| `key` | مفتاح العودة | مفتاح العودة |
| `dome` | قبة الصخرة | قبة الصخرة |
| `map` | خريطة فلسطين | خريطة فلسطين |
| `watermelon` | بطيخة | البطيخة |
| `flag` | علم فلسطين | العلم الفلسطيني |
| `wheat` | قمح | القمح |
| `crescent` | هلال ونجمة | الهلال والنجمة |
| `hand` | يد التضامن | يد التضامن |
| `sun` | شمس الأمل | شمس الأمل |
| `bird` | طائر الحرية | طائر الحرية |
| `mosque` | مسجد | المسجد |

**الاستخدام مع React:**

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

### 🧣 مولّد الكوفية — Kuffiyeh Generator

يولّد نمط الكوفية الفلسطينية التقليدية بشكل خوارزمي.

```js
import { Kuffiyeh, createKuffiyeh } from 'palestine-ui';

const k = new Kuffiyeh({
  style: 'classic',  // 'classic' | 'red' | 'olive' | 'fine' | 'dense'
  scale: 16,         // حجم الخلية بالبكسل
  width: 400,
  height: 400,
  opacity: 1,
});

// صيغ الإخراج
k.toSVG();               // → نص SVG
k.toCss();               // → خاصية CSS للخلفية
k.toCanvas(canvasEl);    // → يرسم على عنصر <canvas>

// ألوان مخصصة
const custom = new Kuffiyeh({
  color1: '#000000',
  color2: '#FFFFFF',
  color3: '#1B5E3B',
});

// كل الأنماط المتاحة
Kuffiyeh.getStyles(); // → ['classic', 'red', 'olive', 'fine', 'dense']
```

**الأنماط المتاحة:**

| النمط | اللون الأساسي | الخلفية | اللون المميز |
|---|---|---|---|
| `classic` | `#0D0D0D` | `#F5F0E8` | `#1B5E3B` |
| `red`     | `#B5202A` | `#F5F0E8` | `#0D0D0D` |
| `olive`   | `#6B7C3A` | `#C9B99A` | `#0D0D0D` |
| `fine`    | `#0D0D0D` | `#F5F0E8` | `#B5202A` |
| `dense`   | `#0D0D0D` | `#1B5E3B` | `#F5F0E8` |

---

### 🛠 الأدوات المساعدة — Utils

```js
import {
  cssVar,        // 'green' → 'var(--pl-green)'
  hex,           // 'olive' → '#6B7C3A'
  hexToRgb,      // '#1B5E3B' → { r: 27, g: 94, b: 59 }
  withOpacity,   // '#1B5E3B', 0.5 → 'rgba(27, 94, 59, 0.5)'
  flagStripe,    // يولّد تدرج ألوان العلم
  isDark,        // '#0D0D0D' → true
  contrastColor, // '#0D0D0D' → '#F5F0E8' (لون النص المناسب)
  arabicText,    // يضيف علامات RTL للنص العربي
} from 'palestine-ui';
```

---

### 🎨 إضافة Tailwind CSS

```js
// tailwind.config.js
const palestineUI = require('palestine-ui/tailwind');

module.exports = {
  plugins: [palestineUI],
};
```

بعدين تقدر تستخدم:

```html
<!-- ألوان -->
<div class="bg-palestine-green text-palestine-white">...</div>
<div class="border-palestine-red">...</div>

<!-- نمط الكوفية -->
<div class="pl-kuffiyeh">...</div>

<!-- دعم RTL -->
<p class="pl-rtl">مرحباً بالعالم</p>
```

---

## أمثلة

### زر فلسطيني

```html
<style>
  .pl-btn {
    background: var(--pl-green);
    color: var(--pl-white);
    border: none;
    padding: 10px 20px;
    border-radius: var(--pl-radius-md);
    cursor: pointer;
  }
  .pl-btn:hover { background: var(--pl-green-light); }
</style>

<button class="pl-btn">فلسطين حرة</button>
```

### هيرو بنمط الكوفية

```js
import { Kuffiyeh, renderIcon } from 'palestine-ui';

const hero = document.getElementById('hero');
const k = new Kuffiyeh({ style: 'classic', opacity: 0.15 });

hero.style.cssText = k.toCss() + '; padding: 60px; text-align: center;';
hero.innerHTML = renderIcon('olive', { size: 48, color: '#1B5E3B' });
```

---

## هيكل المشروع

```
palestine-ui/
├── src/
│   ├── tokens/       ← ألوان + CSS variables
│   ├── icons/        ← 13 أيقونة SVG
│   ├── kuffiyeh/     ← مولّد الكوفية
│   ├── utils/        ← أدوات مساعدة
│   └── index.ts      ← الـ public API
├── examples/
│   ├── demo.html           ← ديمو HTML شغال مباشرة
│   └── react-example.tsx   ← مثال React
├── tailwind.js       ← إضافة Tailwind
├── tsconfig.json
└── package.json
```

---

## المساهمة

المساهمات مرحب بها — خصوصاً:
- أيقونات جديدة من الثقافة الفلسطينية
- أنماط كوفية جديدة
- تحسينات دعم RTL والعربية

```bash
git clone https://github.com/palestine-ui/palestine-ui.git
cd palestine-ui
npm install
npm run build
npm test
```

راجع [CONTRIBUTING.md](CONTRIBUTING.md) للتفاصيل.

---

## الرخصة

MIT © مساهمو palestine-ui

*هذا المشروع مهدى للشعب الفلسطيني.*

**فلسطين حرة 🇵🇸**
