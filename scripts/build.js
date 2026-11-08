/**
 * palestine-ui — Build Script
 * Bundles ESM + CJS using esbuild, generates TypeScript declarations (.d.ts),
 * copies CSS tokens, and exports standalone SVG icon files.
 */

const { build, context } = require('esbuild');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const isProd = process.env.NODE_ENV === 'production' || !isWatch;

const externalDeps = ['react', 'react-dom', 'react/jsx-runtime'];

const sharedConfig = {
  bundle: true,
  external: externalDeps,
  sourcemap: true,
  minify: isProd,
  target: ['es2020'],
  logLevel: 'silent',
};

/**
 * Clean dist directory before a fresh build
 */
function cleanDist() {
  const distPath = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
}

/**
 * Copy static assets (tokens.css) and generate standalone SVG files
 */
function copyAssetsAndGenerateSVGs() {
  // 1. Copy CSS tokens
  const tokensDir = path.resolve(__dirname, '../dist/tokens');
  fs.mkdirSync(tokensDir, { recursive: true });
  fs.copyFileSync(
    path.resolve(__dirname, '../src/tokens/tokens.css'),
    path.join(tokensDir, 'tokens.css')
  );

  // 2. Generate standalone .svg files into dist/icons/svg/*.svg
  try {
    const iconsModulePath = path.resolve(__dirname, '../dist/icons/index.cjs.js');
    // Clear require cache in watch mode
    delete require.cache[require.resolve(iconsModulePath)];
    const iconsModule = require(iconsModulePath);

    if (iconsModule && iconsModule.iconNames && typeof iconsModule.renderIcon === 'function') {
      const svgDir = path.resolve(__dirname, '../dist/icons/svg');
      fs.mkdirSync(svgDir, { recursive: true });

      for (const name of iconsModule.iconNames) {
        const svgContent = iconsModule.renderIcon(name, { size: 24 });
        if (svgContent) {
          fs.writeFileSync(path.join(svgDir, `${name}.svg`), svgContent, 'utf8');
        }
      }
    }
  } catch (err) {
    console.warn('⚠️ Could not pre-generate standalone SVG files:', err.message);
  }
}

/**
 * Generate TypeScript declaration files (.d.ts)
 */
function generateTypes() {
  try {
    execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ TypeScript declaration generation failed.');
    if (!isWatch) process.exit(1);
  }
}

async function runBuild() {
  const startTime = Date.now();

  if (!isWatch) {
    cleanDist();
  }

  const targets = [
    // Root Entry (ESM + CJS)
    {
      ...sharedConfig,
      entryPoints: ['src/index.ts'],
      format: 'esm',
      outfile: 'dist/index.esm.js',
    },
    {
      ...sharedConfig,
      entryPoints: ['src/index.ts'],
      format: 'cjs',
      outfile: 'dist/index.cjs.js',
    },
    // Icons Sub-package (ESM + CJS)
    {
      ...sharedConfig,
      entryPoints: ['src/icons/index.ts'],
      format: 'esm',
      outfile: 'dist/icons/index.esm.js',
    },
    {
      ...sharedConfig,
      entryPoints: ['src/icons/index.ts'],
      format: 'cjs',
      outfile: 'dist/icons/index.cjs.js',
    },
  ];

  if (isWatch) {
    console.log('👀 Starting palestine-ui in watch mode...');
    const contexts = await Promise.all(targets.map((t) => context(t)));
    await Promise.all(contexts.map((ctx) => ctx.watch()));
    copyAssetsAndGenerateSVGs();
    generateTypes();
    console.log('⚡ Watching for changes in src/...');
    return;
  }

  // Run all esbuild bundles in parallel
  await Promise.all(targets.map((t) => build(t)));

  // Copy CSS and extract standalone SVGs
  copyAssetsAndGenerateSVGs();

  // Generate .d.ts files
  generateTypes();

  const duration = Date.now() - startTime;
  console.log(`✅ Build complete in ${duration}ms (ESM + CJS + Types + CSS + SVGs)`);
}

runBuild().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
