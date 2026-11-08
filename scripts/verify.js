/**
 * palestine-ui — Pre-Publish Verification & Bundle Size Auditor
 * Ensures all package.json exports exist, CSS tokens are synced, and bundle size stays minimal.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(ROOT, 'package.json'));

let hasErrors = false;

function fail(msg) {
  console.error(`❌ [VERIFY FAILED]: ${msg}`);
  hasErrors = true;
}

function pass(msg) {
  console.log(`✅ ${msg}`);
}

// 1. Verify all files referenced in package.json exist
function verifyPackageExports() {
  const requiredFiles = [
    pkg.main,
    pkg.module,
    pkg.types,
    'dist/icons/index.esm.js',
    'dist/icons/index.cjs.js',
    'dist/icons/index.d.ts',
    'dist/tokens/tokens.css',
    'tailwind.js',
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
      fail(`Missing build artifact: ${relPath} (Did you run "npm run build"?)`);
    } else if (fs.statSync(fullPath).size === 0) {
      fail(`Empty build artifact: ${relPath}`);
    }
  }

  // Check standalone SVG icons
  const svgDir = path.join(ROOT, 'dist/icons/svg');
  if (!fs.existsSync(svgDir) || fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg')).length === 0) {
    fail('No standalone SVG files found in dist/icons/svg/');
  } else {
    const svgCount = fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg')).length;
    pass(`Verified ${svgCount} standalone SVG icons in dist/icons/svg/`);
  }
}

// 2. Verify CSS variables sync with JS color tokens
function verifyTokensSync() {
  const distCjs = path.join(ROOT, 'dist/index.cjs.js');
  const cssPath = path.join(ROOT, 'src/tokens/tokens.css');

  if (!fs.existsSync(distCjs) || !fs.existsSync(cssPath)) return;

  const { colors } = require(distCjs);
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  if (!colors) {
    fail('Could not load "colors" object from dist/index.cjs.js');
    return;
  }

  // Convert camelCase (e.g., greenLight) to kebab-case (--pl-green-light)
  for (const [key, hexValue] of Object.entries(colors)) {
    const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    const cssVarName = `--pl-${kebabKey}`;

    if (!cssContent.includes(cssVarName)) {
      fail(`Token sync mismatch: "colors.${key}" (${hexValue}) is missing "${cssVarName}" in src/tokens/tokens.css`);
    }
  }

  pass('All JS color tokens are synced with src/tokens/tokens.css');
}

// 3. Check bundle size limits
function checkBundleSize() {
  const bundles = ['dist/index.esm.js', 'dist/index.cjs.js', 'dist/icons/index.esm.js'];
  const MAX_SIZE_KB = 50;

  console.log('\n📦 Bundle Size Report:');
  for (const relPath of bundles) {
    const fullPath = path.join(ROOT, relPath);
    if (fs.existsSync(fullPath)) {
      const sizeKB = (fs.statSync(fullPath).size / 1024).toFixed(2);
      console.log(`   • ${relPath.padEnd(26)} ${sizeKB} KB`);
      if (parseFloat(sizeKB) > MAX_SIZE_KB) {
        fail(`Bundle ${relPath} exceeds max size limit (${sizeKB} KB > ${MAX_SIZE_KB} KB)`);
      }
    }
  }
  console.log('');
}

function main() {
  console.log('🔍 Running palestine-ui pre-publish verification...\n');
  verifyPackageExports();
  verifyTokensSync();
  checkBundleSize();

  if (hasErrors) {
    console.error('🚨 Verification failed. Please fix the issues above before publishing.');
    process.exit(1);
  } else {
    console.log('🎉 All verification checks passed! Package is ready for publishing.');
  }
}

main();
