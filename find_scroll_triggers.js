const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));

files.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  if (code.includes('ScrollTrigger') || code.includes('useScroll') || code.includes('ScrollTrigger.create')) {
    console.log(`\n================== MATCH IN FILE: ${f} ==================`);
    const regex = /(?:ScrollTrigger|useScroll|useTransform)[^\n]{0,150}/g;
    const matches = code.match(regex) || [];
    console.log(`Found ${matches.length} matches. Showing first 10:`);
    matches.slice(0, 10).forEach(m => console.log(m));
  }
});
