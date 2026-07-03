const fs = require('fs'), path = require('path');
const cssDir = './css';
fs.readdirSync(cssDir).forEach(f => {
  if (!f.endsWith('.css')) return;
  const c = fs.readFileSync(path.join(cssDir, f), 'utf8');
  const matches = c.match(/\.style-module-scss-module__UBLvha__[^{]+\{[^}]+\}/g) || [];
  matches.forEach(r => {
    if (r.includes('height') || r.includes('min-height') || r.includes('padding') || r.includes('margin') || r.includes('position')) {
      console.log(f + ': ' + r.trim());
    }
  });
});
