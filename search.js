const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const target = 'style-module-scss-module__rdV7za__scroller';
const idx = html.indexOf(target);
if (idx !== -1) {
  // Let's print the slice from idx - 600 to idx + 2000
  console.log(html.substring(idx - 600, idx + 2000));
} else {
  console.log('Not found');
}
