# Icons

12 أيقونة SVG ثقافية مرتبطة بفلسطين، كلها على 24×24 viewBox.

---

## Available Icons

| Name | Arabic | Description |
|------|--------|-------------|
| `olive` | غصن زيتون | Olive branch |
| `key` | مفتاح العودة | Key of Return |
| `dome` | قبة الصخرة | Dome of the Rock |
| `map` | خريطة فلسطين | Map of Palestine |
| `watermelon` | بطيخة | Watermelon |
| `flag` | العلم الفلسطيني | Palestinian Flag |
| `wheat` | قمح | Wheat |
| `crescent` | هلال ونجمة | Crescent and Star |
| `hand` | يد التضامن | Open Hand / Solidarity |
| `sun` | شمس الأمل | Sun / Hope |
| `bird` | طائر الحرية | Free Bird / Freedom |
| `mosque` | مسجد | Mosque |

---

## Vanilla JS — `renderIcon()`

بيرجع SVG string جاهز تحطه في الـ DOM.

```js
import { renderIcon } from 'palestine-ui';

// أبسط استخدام
document.getElementById('icon').innerHTML = renderIcon('olive');

// مع options
document.getElementById('icon').innerHTML = renderIcon('key', {
  size: 48,
  color: '#1B5E3B',
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `number` | `24` | عرض وارتفاع الأيقونة |
| `width` | `number` | — | عرض مستقل |
| `height` | `number` | — | ارتفاع مستقل |
| `color` | `string` | `'currentColor'` | لون الأيقونة |
| `className` | `string` | — | CSS class |
| `style` | `object` | — | inline styles |
| `label` | `string` | اسم الأيقونة بالعربي | aria-label للـ accessibility |
| `strokeWidth` | `number` | — | تعديل سمك الخطوط |

```js
renderIcon('dome', {
  size: 32,
  color: '#B5202A',
  className: 'my-icon',
  label: 'Dome of the Rock',
  strokeWidth: 2,
});
```

---

## `mountIcon()`

بيحقن الأيقونة مباشرة في DOM element.

```js
import { mountIcon } from 'palestine-ui';

const el = document.getElementById('my-icon');
mountIcon(el, 'watermelon', { size: 28, color: '#1B5E3B' });
```

---

## `createIconElement()`

بيعمل ويرجع `SVGElement` جاهز تضيفه في الـ DOM.

```js
import { createIconElement } from 'palestine-ui';

const svg = createIconElement('bird', { size: 24 });
document.body.appendChild(svg);
```

---

## React — `<Icon />`

```jsx
import { Icon } from 'palestine-ui';

function MyComponent() {
  return (
    <Icon
      name="olive"
      size={32}
      color="#1B5E3B"
      className="my-icon"
      label="Olive branch"
    />
  );
}
```

> **ملاحظة:** الـ `<Icon />` component بيتطلب React في الـ environment. لو بتشتغل بـ vanilla JS استخدم `renderIcon()` بدله.

---

## Standalone SVG Files

بعد الـ build، كل أيقونة موجودة كـ `.svg` مستقل:

```
dist/icons/svg/
├── olive.svg
├── key.svg
├── dome.svg
├── map.svg
├── watermelon.svg
├── flag.svg
├── wheat.svg
├── crescent.svg
├── hand.svg
├── sun.svg
├── bird.svg
└── mosque.svg
```

ممكن تستخدمها مباشرة في HTML:

```html
<img src="node_modules/palestine-ui/dist/icons/svg/olive.svg" alt="غصن زيتون" width="24" />
```

أو في CSS:

```css
.icon-olive {
  background-image: url('palestine-ui/icons/olive.svg');
}
```

---

## الـ Icons Object

لو محتاج تتعامل مع الـ metadata مباشرة:

```js
import { ICONS, iconNames } from 'palestine-ui';

// كل الأسماء
console.log(iconNames);
// → ['olive', 'key', 'dome', ...]

// metadata أيقونة معينة
console.log(ICONS['olive'].name);   // → 'Olive Branch'
console.log(ICONS['olive'].nameAr); // → 'غصن زيتون'
console.log(ICONS['olive'].viewBox); // → '0 0 24 24'

// إنشاء icon picker
iconNames.forEach(name => {
  const btn = document.createElement('button');
  btn.innerHTML = renderIcon(name, { size: 20 });
  btn.title = ICONS[name].nameAr;
  document.getElementById('picker').appendChild(btn);
});
```

---

## Accessibility

كل أيقونة بتشيب تلقائياً:
- `aria-label` بالاسم العربي (أو بـ `label` option لو حددت)
- `role="img"`

```html
<!-- المخرج -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  aria-label="غصن زيتون"
  role="img"
>...</svg>
```

لو الأيقونة decorative وعندك نص وصفي جنبها، اعملها `aria-hidden`:

```js
renderIcon('olive', { label: '' }); // aria-label=""
```
