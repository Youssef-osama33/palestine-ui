# Kuffiyeh Generator

بيولّد نمط الكوفية الفلسطينية التقليدي algorithmically.
يدعم 4 أشكال مخرجات: SVG string، Data URI، CSS background، وHTML Canvas.

---

## Quick Start

```js
import { createKuffiyeh } from 'palestine-ui';

const kuffiyeh = createKuffiyeh({ style: 'classic' });

// SVG
document.getElementById('pattern').innerHTML = kuffiyeh.toSVG();

// CSS background
document.body.style.cssText = kuffiyeh.toCss();

// Data URI (لـ <img> أو CSS url())
document.getElementById('img').src = kuffiyeh.toDataUri();

// Canvas
kuffiyeh.toCanvas(document.getElementById('myCanvas'));
```

---

## Styles

5 أنماط جاهزة:

| Style | c1 (Primary) | c2 (Background) | c3 (Accent) |
|-------|-------------|-----------------|-------------|
| `classic` | `#0D0D0D` أسود | `#F5F0E8` أبيض | `#1B5E3B` أخضر |
| `red` | `#B5202A` أحمر | `#F5F0E8` أبيض | `#0D0D0D` أسود |
| `olive` | `#6B7C3A` زيتي | `#C9B99A` رملي | `#0D0D0D` أسود |
| `fine` | `#0D0D0D` أسود | `#F5F0E8` أبيض | `#B5202A` أحمر |
| `dense` | `#0D0D0D` أسود | `#1B5E3B` أخضر | `#F5F0E8` أبيض |

```js
import { Kuffiyeh } from 'palestine-ui';

// كل الأنماط المتاحة
console.log(Kuffiyeh.getStyles());
// → ['classic', 'red', 'olive', 'fine', 'dense']
```

---

## Options

```ts
interface KuffiyehOptions {
  style?:   'classic' | 'red' | 'olive' | 'fine' | 'dense'; // default: 'classic'
  scale?:   number;  // حجم الخلية (px) — default: 16, min: 4
  color1?:  string;  // لون رئيسي (يبطّل الـ style)
  color2?:  string;  // لون الخلفية (يبطّل الـ style)
  color3?:  string;  // لون ثانوي (يبطّل الـ style)
  width?:   number;  // عرض SVG — default: 400
  height?:  number;  // ارتفاع SVG — default: 400
  opacity?: number;  // شفافية 0–1 — default: 1
}
```

---

## Methods

### `.toSVG()`

بيرجع SVG string كامل جاهز تحطه في `innerHTML`.

```js
const k = createKuffiyeh({ style: 'classic', width: 600, height: 300 });
const svg = k.toSVG();
document.getElementById('container').innerHTML = svg;
```

### `.toDataUri()`

بيرجع Data URI مناسب لـ `<img src>` أو `background-image: url(...)`.

```js
const uri = createKuffiyeh({ style: 'red' }).toDataUri();

// في HTML
document.getElementById('img').src = uri;

// في CSS (inline)
element.style.backgroundImage = `url("${uri}")`;
```

### `.toCss()`

بيرجع CSS property string جاهز تحطه في `style.cssText` أو `<style>` tag.

```js
const css = createKuffiyeh({ style: 'olive', scale: 20 }).toCss();
// → 'background-color: #C9B99A; background-image: repeating-linear-gradient(...)'

document.getElementById('card').style.cssText = css;
```

### `.toCanvas(canvas)`

بيرسم النمط على `HTMLCanvasElement`.

```js
const canvas = document.getElementById('myCanvas');
canvas.width = 500;
canvas.height = 500;

createKuffiyeh({ style: 'dense', scale: 24 }).toCanvas(canvas);
```

### `.getPalette()`

بيرجع الألوان الفعلية المستخدمة (مفيد لو عملت custom colors).

```js
const k = createKuffiyeh({ style: 'red' });
console.log(k.getPalette());
// → { c1: '#B5202A', c2: '#F5F0E8', c3: '#0D0D0D' }
```

---

## Examples

### Custom Colors

```js
const k = createKuffiyeh({
  color1: '#1a1a2e',
  color2: '#16213e',
  color3: '#0f3460',
  scale: 20,
  opacity: 0.9,
});
```

### Hero Section Background

```js
const hero = document.getElementById('hero');
const k = createKuffiyeh({ style: 'classic', scale: 24, opacity: 0.15 });
hero.style.cssText = k.toCss();
```

### React

```jsx
import { useEffect, useRef } from 'react';
import { createKuffiyeh } from 'palestine-ui';

function KuffiyehCanvas({ style = 'classic', width = 400, height = 400 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    createKuffiyeh({ style, width, height }).toCanvas(canvasRef.current);
  }, [style, width, height]);

  return <canvas ref={canvasRef} aria-label="Kuffiyeh pattern" />;
}
```

### CSS Background Pattern

```js
// إنشاء pattern وتطبيقه على عنصر
const pattern = createKuffiyeh({ style: 'classic', scale: 16, opacity: 0.08 });

// inject في <style> tag
const styleEl = document.createElement('style');
styleEl.textContent = `.kuffiyeh-bg { ${pattern.toCss()} }`;
document.head.appendChild(styleEl);
```

---

## Class vs Factory

```js
// Class مباشرة
import { Kuffiyeh } from 'palestine-ui';
const k = new Kuffiyeh({ style: 'olive' });

// Factory function (أبسط)
import { createKuffiyeh } from 'palestine-ui';
const k = createKuffiyeh({ style: 'olive' });
```

الاتنين بيعملوا نفس الحاجة.
