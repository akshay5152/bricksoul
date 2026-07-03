const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const target = 'servicesOverview';
let idx = 0;
while ((idx = html.indexOf(target, idx)) !== -1) {
  console.log('Match:');
  console.log(html.substring(idx - 150, idx + 250));
  console.log('-------------------------------------------');
  idx += 10;
}
