const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('UBLvha')) {
    console.log('Match in ' + f + ':');
    let idx = 0;
    while ((idx = c.indexOf('UBLvha', idx)) !== -1) {
      console.log(c.substring(idx - 100, idx + 400));
      console.log('---------------------------------------------');
      idx += 6;
    }
  }
});
