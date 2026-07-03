const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find card 3 by its title 'Strategic thinking'
const target = 'Strategic thinking';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('Match at ' + idx + ':');
  console.log(html.substring(idx - 1000, idx + 1000));
} else {
  console.log('Not found');
}
