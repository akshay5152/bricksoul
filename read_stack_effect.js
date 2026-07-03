const fs = require('fs');

const code = fs.readFileSync('d9686a4c1dbc8848.js', 'utf8');

// Find the component T definition which has w.default.card
const target = 'w.default.card';
const idx = code.indexOf(target);
if (idx !== -1) {
  // Let's print 3000 characters from idx - 100 to show the whole logic of component T
  console.log(code.substring(idx - 400, idx + 4500));
} else {
  console.log('Not found');
}
