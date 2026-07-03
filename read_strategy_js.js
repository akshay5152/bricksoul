const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('Approach')) {
    console.log('Match in ' + f + ':');
    let idx = 0;
    while ((idx = c.indexOf('Approach', idx)) !== -1) {
      console.log(c.substring(idx - 150, idx + 250));
      console.log('---------------------------------------------');
      idx += 8;
    }
  }
});
