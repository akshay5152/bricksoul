const fs = require('fs');

const files = ['d9686a4c1dbc8848.js', 'f9d07ad57ff8c010.js'];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const c = fs.readFileSync(f, 'utf8');
  let idx = 0;
  while ((idx = c.indexOf('54742', idx)) !== -1) {
    console.log('Match in ' + f + ' at ' + idx + ':');
    console.log(c.substring(idx - 200, idx + 400));
    console.log('---------------------------------------------');
    idx += 5;
  }
});
