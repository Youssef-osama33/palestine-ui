# Tokens

Design tokens هي الـ primitive values اللي بيتبنى عليها الـ design system كله —
ألوان، خطوط، مسافات، حواف، وظلال.

---

## Colors

### Flag Colors (الألوان الأساسية)

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `black` | `#0D0D0D` | `--pl-black` |
| `white` | `#F5F0E8` | `--pl-white` |
| `green` | `#1B5E3B` | `--pl-green` |
| `red` | `#B5202A` | `--pl-red` |

### Extended Green

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `greenLight` | `#2E8B5A` | `--pl-green-light` |
| `greenDark` | `#0F3D25` | `--pl-green-dark` |
| `greenMuted` | `#4A7C5E` | `--pl-green-muted` |

### Extended Red

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `redLight` | `#D32F3A` | `--pl-red-light` |
| `redDark` | `#7A1219` | `--pl-red-dark` |
| `redMuted` | `#C25460` | `--pl-red-muted` |

### Earth Tones

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `sand` | `#C9B99A` | `--pl-sand` |
| `sandLight` | `#E8DFD0` | `--pl-sand-light` |
| `sandDark` | `#8A7A62` | `--pl-sand-dark` |

### Olive Tones

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `olive` | `#6B7C3A` | `--pl-olive` |
| `oliveLight` | `#9AAB5E` | `--pl-olive-light` |
| `oliveDark` | `#444F22` | `--pl-olive-dark` |

### Environment

| Token | Hex | CSS Variable |
|-------|-----|--------------|
| `sky` | `#A8C8E8` | `--pl-sky` |
| `sea` | `#2E7DAA` | `--pl-sea` |

### Semantic Aliases

متغيرات بتتغير تلقائياً مع الـ dark mode:

| CSS Variable | Light | Dark |
|--------------|-------|------|
| `--pl-primary` | `--pl-green` | `--pl-green-light` |
| `--pl-accent` | `--pl-red` | `--pl-red-light` |
| `--pl-bg` | `#F5F0E8` | `#07090B` |
| `--pl-surface` | `#FFFFFF` | `#11161A` |
| `--pl-text` | `#0D0D0D` | `#F5F0E8` |
| `--pl-muted` | `#8A7A62` | `#C9B99A` |

---

## Usage

### في CSS

```css
.my-button {
  background-color: var(--pl-green);
  color: var(--pl-white);
  border: 1px solid var(--pl-border);
}
```

### في JavaScript / TypeScript

```js
import { colors, hex } from 'palestine-ui';

// كـ object
console.log(colors.green); // → '#1B5E3B'

// عن طريق الـ helper
console.log(hex('olive')); // → '#6B7C3A'
```

---

## Fonts

| Token | Stack |
|-------|-------|
| `arabic` | `'Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', serif` |
| `display` | `'Amiri', Georgia, serif` |
| `mono` | `'DM Mono', 'Fira Code', 'Courier New', monospace` |
| `sans` | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

```css
.arabic-text {
  font-family: var(--pl-font-arabic);
}
```

```js
import { fonts } from 'palestine-ui';
console.log(fonts.arabic);
```

---

## Spacing

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `1` | `4px` | `--pl-space-1` |
| `2` | `8px` | `--pl-space-2` |
| `3` | `12px` | `--pl-space-3` |
| `4` | `16px` | `--pl-space-4` |
| `5` | `24px` | `--pl-space-5` |
| `6` | `32px` | `--pl-space-6` |
| `7` | `48px` | `--pl-space-7` |
| `8` | `64px` | `--pl-space-8` |

```css
.card {
  padding: var(--pl-space-4);
  margin-bottom: var(--pl-space-5);
}
```

---

## Border Radius

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `sm` | `4px` | `--pl-radius-sm` |
| `md` | `8px` | `--pl-radius-md` |
| `lg` | `12px` | `--pl-radius-lg` |
| `xl` | `16px` | `--pl-radius-xl` |
| `full` | `9999px` | `--pl-radius-full` |

---

## Shadows

| Token | Value | CSS Variable |
|-------|-------|--------------|
| `sm` | `0 1px 3px rgba(13,13,13,0.08)` | `--pl-shadow-sm` |
| `md` | `0 4px 12px rgba(13,13,13,0.12)` | `--pl-shadow-md` |
| `lg` | `0 8px 32px rgba(13,13,13,0.16)` | `--pl-shadow-lg` |

---

## Dark Mode

الـ dark mode بيشتغل تلقائياً مع OS preference، أو يتفعل manually:

```html
<!-- Manual dark mode -->
<html data-theme="dark">
  <!-- or -->
<body class="dark">
```

```css
/* أو في CSS بتاعتك */
@media (prefers-color-scheme: dark) {
  /* الـ tokens بتتغير تلقائياً */
}
```

---

## Utility Classes

```html
<!-- Text colors -->
<p class="pl-text-green">نص أخضر</p>
<p class="pl-text-red">نص أحمر</p>

<!-- Background colors -->
<div class="pl-bg-sand">خلفية رملية</div>

<!-- Border colors -->
<div class="pl-border-green" style="border: 1px solid">...</div>

<!-- RTL -->
<div class="pl-rtl">محتوى عربي</div>

<!-- Flag stripe -->
<div class="pl-flag-stripe"></div>

<!-- Kuffiyeh background -->
<div class="pl-kuffiyeh" style="width:200px;height:200px;"></div>
```

---

## Transitions

```css
.my-element {
  transition: color var(--pl-duration) var(--pl-ease);
}
```

| Variable | Value |
|----------|-------|
| `--pl-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--pl-duration` | `200ms` |
