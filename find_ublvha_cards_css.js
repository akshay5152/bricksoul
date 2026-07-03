const fs = require('fs'), path = require('path');
const cssDir = './css';
fs.readdirSync(cssDir).forEach(f => {
  if (!f.endsWith('.css')) return;
  const c = fs.readFileSync(path.join(cssDir, f), 'utf8');
  const matches = c.match(/\.style-module-scss-module__UBLvha__cards[^{]*\{[^}]*\}/g) || [];
  matches.forEach(r => {
    console.log(f + ': ' + r.trim());
  });
});
