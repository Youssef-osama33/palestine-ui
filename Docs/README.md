# palestine-ui — Documentation

A design system for Palestine. Colors, icons, kuffiyeh patterns, and utilities
for developers building Palestine-related projects.

## Modules

| Module | Description |
|--------|-------------|
| [Getting Started](./getting-started.md) | Installation and setup |
| [Tokens](./tokens.md) | Colors, fonts, spacing, radius, shadows |
| [Icons](./icons.md) | 12 cultural SVG icons |
| [Kuffiyeh](./kuffiyeh.md) | Traditional pattern generator |
| [Utils](./utils.md) | Color, CSS, and text helpers |
| [Tailwind Plugin](./tailwind.md) | Tailwind CSS integration |

## Quick Example

```html
<link rel="stylesheet" href="node_modules/palestine-ui/dist/tokens/tokens.css" />

<div style="color: var(--pl-green); font-family: var(--pl-font-arabic);">
  فلسطين
</div>
```

```js
import { renderIcon, withOpacity, createKuffiyeh } from 'palestine-ui';

document.body.innerHTML = renderIcon('olive', { size: 32 });

const greenHalf = withOpacity('#1B5E3B', 0.5); // → 'rgba(27, 94, 59, 0.5)'

const kuffiyeh = createKuffiyeh({ style: 'classic' });
document.body.style.cssText = kuffiyeh.toCss();
```

## License

MIT © Youssef Osama
