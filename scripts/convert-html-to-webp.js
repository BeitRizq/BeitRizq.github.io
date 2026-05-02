// Node script: replace <img src="Images/xxx.ext"> with <picture> using Images/WebP/xxx.webp if it exists
// Usage: node scripts/convert-html-to-webp.js

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));

function webpExists(src) {
  const dir = path.join(root, 'Images', 'WebP');
  const base = path.basename(src, path.extname(src));
  const candidate = path.join(dir, base + '.webp');
  return fs.existsSync(candidate) ? path.relative(root, candidate).replace(/\\/g, '/') : null;
}

files.forEach(file => {
  const full = path.join(root, file);
  let content = fs.readFileSync(full, 'utf8');
  // simple regex to find <img src="Images/..."> occurrences
  content = content.replace(/<img\s+([^>]*?)src=("|')Images\/(.+?)("|')([^>]*?)>/gi, (m, before, q1, srcPath, q2, after) => {
    const original = `Images/${srcPath}`;
    const webp = webpExists(original);
    if (!webp) return m; // leave as-is if webp not found
    // build picture
    const altMatch = (before + after).match(/alt=("|')([^"']*?)("|')/i);
    const alt = altMatch ? altMatch[2] : '';
    return `<picture>\n  <source srcset="${webp}" type="image/webp">\n  <img src="${original}" alt="${alt}" loading="lazy">\n</picture>`;
  });
  fs.writeFileSync(full, content, 'utf8');
  console.log('Updated', file);
});
