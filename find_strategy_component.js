const fs = require('fs');

const chunks = [
  '66d380195c8ea130.js',
  '839e2735bf51bbf7.js',
  'd9686a4c1dbc8848.js',
  'f9d07ad57ff8c010.js'
];

chunks.forEach(chunk => {
  if (!fs.existsSync(chunk)) return;
  const code = fs.readFileSync(chunk, 'utf8');
  if (code.includes('EDzIIq')) {
    console.log(`\n================== EDzIIq Match in: ${chunk} ==================`);
    let idx = 0;
    while ((idx = code.indexOf('EDzIIq', idx)) !== -1) {
      console.log('Context:', code.substring(idx - 200, idx + 800));
      console.log('----------------------------------------------------');
      idx += 6;
    }
  }
});
