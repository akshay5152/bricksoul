const fs = require('fs');

const code = fs.readFileSync('d9686a4c1dbc8848.js', 'utf8');

// Find all occurrences of ScrollTrigger.create
let idx = 0;
while ((idx = code.indexOf('ScrollTrigger.create', idx)) !== -1) {
  console.log('\n--- ScrollTrigger.create Match ---');
  console.log(code.substring(idx - 100, idx + 600));
  console.log('----------------------------------');
  idx += 20;
}

// Also search for scrollTrigger config inside gsap.to
idx = 0;
while ((idx = code.indexOf('scrollTrigger:', idx)) !== -1) {
  console.log('\n--- scrollTrigger: Match ---');
  console.log(code.substring(idx - 200, idx + 500));
  console.log('-----------------------------');
  idx += 14;
}
