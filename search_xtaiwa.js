const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('XTAiwa')) {
    console.log('Match in ' + f + ':');
    let idx = 0;
    while ((idx = c.indexOf('XTAiwa', idx)) !== -1) {
      console.log(c.substring(idx - 100, idx + 1000));
      console.log('---------------------------------------------');
      idx += 6;
    }
  }
});
