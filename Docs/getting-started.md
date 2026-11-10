# Getting Started

## Installation

```bash
npm install palestine-ui
# or
yarn add palestine-ui
# or
pnpm add palestine-ui
```

## Setup

### Vanilla HTML / CSS

أضف الـ CSS tokens في الـ `<head>`:

```html
<link rel="stylesheet" href="node_modules/palestine-ui/dist/tokens/tokens.css" />
```

أو عن طريق CSS import:

```css
@import 'palestine-ui/tokens.css';
```

### JavaScript / TypeScript

```js
import { colors, renderIcon, createKuffiyeh, cssVar } from 'palestine-ui';
```

### React

```jsx
import { Icon, renderIcon, colors } from 'palestine-ui';

function App() {
  return <Icon name="olive" size={32} color={colors.green} />;
}
```

### Tailwind CSS

في `tailwind.config.js`:

```js
const palestineUI = require('palestine-ui/tailwind');

module.exports = {
  plugins: [palestineUI],
};
```

---

## Project Structure

```
palestine-ui/
├── dist/
│   ├── index.esm.js       ← ESM bundle
│   ├── index.cjs.js       ← CJS bundle
│   ├── index.d.ts         ← TypeScript types
│   ├── tokens/
│   │   └── tokens.css     ← CSS custom properties
│   └── icons/
│       ├── index.esm.js
│       ├── index.cjs.js
│       └── svg/           ← Standalone .svg files
├── tailwind.js            ← Tailwind plugin
└── docs/                  ← You are here
```

---

## Browser Support

الـ package يستخدم CSS Custom Properties — مدعومة في كل المتصفحات الحديثة (Chrome 49+, Firefox 31+, Safari 9.1+).

## TypeScript

الـ package مكتوب بـ TypeScript ويشيب `.d.ts` declarations بشكل تلقائي. مفيش حاجة تضيفها.

```ts
import type { PaletteColor, IconName, KuffiyehStyle } from 'palestine-ui';
```
