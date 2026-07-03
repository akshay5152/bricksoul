const fs = require('fs');

const code = fs.readFileSync('f9d07ad57ff8c010.js', 'utf8');

const target = '11712,e=>';
const idx = code.indexOf(target);
if (idx !== -1) {
  // Print 4000 characters from the definition
  console.log(code.substring(idx - 100, idx + 4000));
} else {
  console.log('Not found');
}
