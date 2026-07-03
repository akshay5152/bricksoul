const fs = require('fs');

const code = fs.readFileSync('d9686a4c1dbc8848.js', 'utf8');

const target = '43538,e=>';
const idx = code.indexOf(target);
if (idx !== -1) {
  console.log(code.substring(idx - 100, idx + 4000));
} else {
  console.log('Not found');
}
