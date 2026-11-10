# Tailwind CSS Plugin

الـ plugin بيضيف كل tokens، patterns، وhelpers بتاعة palestine-ui كـ Tailwind utilities.

---

## Setup

في `tailwind.config.js`:

```js
const palestineUI = require('palestine-ui/tailwind');

module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [palestineUI],
};
```

---

## Colors

بعد إضافة الـ plugin، الألوان متاحة تحت `palestine.*`:

```html
<!-- Text -->
<p class="text-palestine-green">نص أخضر</p>
<p class="text-palestine-red">نص أحمر</p>
<p class="text-palestine-black">نص أسود</p>
<p class="text-palestine-white">نص أبيض</p>

<!-- Background -->
<div class="bg-palestine-sand">خلفية رملية</div>
<div class="bg-palestine-olive">خلفية زيتية</div>
<div class="bg-palestine-sky">خلفية سماوية</div>

<!-- Extended -->
<div class="bg-palestine-green-light">أخضر فاتح</div>
<div class="bg-palestine-green-dark">أخضر داكن</div>
<div class="bg-palestine-red-light">أحمر فاتح</div>
<div class="bg-palestine-red-dark">أحمر داكن</div>
<div class="bg-palestine-sand-light">رملي فاتح</div>
<div class="bg-palestine-olive-light">زيتي فاتح</div>
<div class="bg-palestine-sea">بحري</div>
```

---

## Spacing

```html
<div class="p-pl-md">padding 16px</div>
<div class="m-pl-lg">margin 24px</div>
<div class="gap-pl-sm">gap 8px</div>
```

| Class suffix | Value |
|-------------|-------|
| `pl-xs` | `4px` |
| `pl-sm` | `8px` |
| `pl-md` | `16px` |
| `pl-lg` | `24px` |
| `pl-xl` | `32px` |

---

## Font Families

```html
<p class="font-pl-arabic">نص عربي بخط أميري</p>
<p class="font-pl-sans">Latin text</p>
<code class="font-pl-mono">const x = 1;</code>
```

---

## Shadows

```html
<div class="shadow-pl-sm">ظل خفيف</div>
<div class="shadow-pl-md">ظل متوسط</div>
<div class="shadow-pl-lg">ظل قوي</div>
```

---

## Border Radius

```html
<div class="rounded-pl-sm">4px</div>
<div class="rounded-pl-md">8px</div>
<div class="rounded-pl-lg">12px</div>
<div class="rounded-pl-xl">16px</div>
```

---

## Utility Classes

### Kuffiyeh Pattern

```html
<!-- نمط كوفية كلاسيكي (أسود وأبيض) -->
<div class="pl-kuffiyeh w-64 h-64"></div>

<!-- نمط كوفية داكن (أسود وأخضر) -->
<div class="pl-kuffiyeh-dark w-64 h-64"></div>
```

### Flag Background

```html
<div class="pl-flag-bg h-2 w-full"></div>
```

### RTL Support

```html
<div class="pl-rtl">
  <p>محتوى عربي بخط أميري واتجاه RTL</p>
</div>
```

---

## CSS Variables

الـ plugin بيضيف CSS variables تلقائياً على `:root`, تقدر تستخدمها في arbitrary values:

```html
<div class="text-[var(--pl-green)]">أخضر</div>
<div class="bg-[var(--pl-surface)]">خلفية</div>
<div class="border-[var(--pl-border)]">حد</div>
```

---

## Example — Card Component

```html
<div class="
  bg-white
  border border-palestine-sand
  rounded-pl-lg
  shadow-pl-md
  p-pl-lg
">
  <h2 class="text-palestine-green font-pl-arabic text-xl">
    فلسطين
  </h2>
  <p class="text-palestine-black mt-pl-sm">
    الأرض والهوية والتاريخ
  </p>
  <div class="pl-flag-bg h-1 mt-pl-md rounded-full"></div>
</div>
```
