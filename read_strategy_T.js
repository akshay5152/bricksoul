const fs = require('fs');

const code = fs.readFileSync('d9686a4c1dbc8848.js', 'utf8');

const target = 'itemStackDistance:l=300';
const idx = code.indexOf(target);
if (idx !== -1) {
  console.log(code.substring(idx - 200, idx + 4000));
} else {
  console.log('Not found');
}
