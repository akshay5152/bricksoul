const fs = require('fs');

const code = fs.readFileSync('f9d07ad57ff8c010.js', 'utf8');

const target = 'UBLvha__titleUnderline';
const idx = code.indexOf(target);
if (idx !== -1) {
  console.log(code.substring(idx - 200, idx + 4000));
} else {
  console.log('Not found');
}
