const fs = require('fs');

const code = fs.readFileSync('d9686a4c1dbc8848.js', 'utf8');

// Find imports of block 54742
const target = '54742';
let idx = 0;
while ((idx = code.indexOf(target, idx)) !== -1) {
  console.log('\n--- import of 54742 Match ---');
  console.log(code.substring(Math.max(0, idx - 150), idx + 800));
  console.log('------------------------------');
  idx += 5;
}
