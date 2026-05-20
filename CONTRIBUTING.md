# Contributing to palestine-ui 🇵🇸

Thank you for contributing. Every line of code is an act of solidarity.

## How to Contribute

### Adding a New Icon

1. Open `src/icons/definitions.ts`.
2. Add your icon to the `ICONS` object, for example:

```ts
myIcon: {
  name: 'Icon Name (English)',
  nameAr: 'اسم الأيقونة بالعربي',
  viewBox: '0 0 24 24',
  paths: `
    <path d="..." fill="currentColor" />
  `,
},
```

3. Checklist:
   - The `viewBox` must be exactly `0 0 24 24`.
   - Use `fill="currentColor"` for filled shapes and `stroke="currentColor"` for stroked shapes so color can be overridden via CSS.
   - Prefer explicit `opacity` values only when needed for layering.
   - Ensure the icon is culturally accurate and respectful.

### Adding a Kuffiyeh Style

1. Open `src/kuffiyeh/index.ts`.
2. Add a new style to the `PALETTES` object, for example:

```ts
myStyle: { c1: '#0D0D0D', c2: '#F5F0E8', c3: '#B5202A' },
```

3. Update the `KuffiyehStyle` union type to include your new style and run the type checks.

### Adding a Token

1. Open `src/tokens/index.ts` — add the color to the `colors` object, for example:

```ts
brandTeal: '#0FB4A0',
```

2. Open `src/tokens/tokens.css` — add the corresponding CSS variable, for example:

```css
--pl-brand-teal: #0FB4A0;
```

3. Run the build and type-checks to ensure tokens are exported correctly.

### Running Tests & Checks

Run these before submitting a PR:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

All tests, lint rules, and TypeScript checks must pass before submitting a PR.

## Code Style

- Project uses TypeScript strict mode.
- Avoid adding external runtime dependencies.
- All public exports must be typed.
- Run `npm run lint` and `npx tsc --noEmit` locally before opening a PR.

## Commit & PR Guidelines

- Use Conventional Commits, e.g.:

```
feat(icons): add mosque icon
fix(kuffiyeh): adjust toCss opacity
docs(readme): update examples
```

- Open a pull request against the `main` branch, include a short description, and ensure CI passes.

---

Be respectful and considerate in contributions.

## Free Palestine
