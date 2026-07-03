const fs = require('fs');
const html = fs.readFileSync('./index.html', 'utf8');

// Extract all unique class names from the HTML
const classRegex = /class="([^"]+)"/g;
let match;
const allClasses = new Set();
while ((match = classRegex.exec(html)) !== null) {
  match[1].split(/\s+/).forEach(c => { if (c.length > 5) allClasses.add(c); });
}

// Group by component prefix
const grouped = {};
allClasses.forEach(c => {
  const m = c.match(/style-module-scss-module__(\w+)__/);
  if (m) {
    const comp = m[1];
    if (!grouped[comp]) grouped[comp] = [];
    grouped[comp].push(c.replace('style-module-scss-module__' + comp + '__', ''));
  }
});

Object.keys(grouped).sort().forEach(k => {
  console.log('\n=== ' + k + ' ===');
  console.log(grouped[k].sort().join(', '));
});
