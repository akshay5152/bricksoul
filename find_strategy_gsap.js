const fs = require('fs');
const path = require('path');

const jsDir = './js';
// Wait, the Next.js chunks are in the root directory (downloaded via build_pages.js or search.js)
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('rdV7za') || content.includes('scroller') || content.includes('ScrollTrigger')) {
    // Let's do a regex search for ScrollTrigger structures or card animations
    console.log(`\n================== FILE: ${f} ==================`);
    // Find all occurrences of rdV7za with 300 chars context
    let idx = 0;
    while ((idx = content.indexOf('rdV7za', idx)) !== -1) {
      console.log('--- rdV7za Match ---');
      console.log(content.substring(Math.max(0, idx - 200), idx + 800));
      console.log('--------------------');
      idx += 6;
    }
  }
});
