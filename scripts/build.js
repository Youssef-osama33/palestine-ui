/**
 * palestine-ui — Build Script
 * Bundles ESM + CJS using esbuild
 */

const { build } = require('esbuild');
const fs = require('fs');
const path = require('path');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  external: ['react', 'react-dom'],
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production',
};

async function main() {
  // ESM
  await build({
    ...shared,
    format: 'esm',
    outfile: 'dist/index.esm.js',
  });

  // CJS
  await build({
    ...shared,
    format: 'cjs',
    outfile: 'dist/index.cjs.js',
  });

  // Icons sub-package
  await build({
    entryPoints: ['src/icons/index.ts'],
    bundle: true,
    external: ['react', 'react-dom'],
    format: 'esm',
    outfile: 'dist/icons/index.esm.js',
    sourcemap: true,
  });

  await build({
    entryPoints: ['src/icons/index.ts'],
    bundle: true,
    external: ['react', 'react-dom'],
    format: 'cjs',
    outfile: 'dist/icons/index.cjs.js',
    sourcemap: true,
  });

  // Copy CSS tokens
  fs.mkdirSync('dist/tokens', { recursive: true });
  fs.copyFileSync(
    'src/tokens/tokens.css',
    'dist/tokens/tokens.css'
  );

  console.log('✅ Build complete');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
