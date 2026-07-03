const t = require('fs').readFileSync('about.html', 'utf-8');
const m = t.match(/href="\.\/css\/[^"]+\.css"/g);
console.log('CSS refs in about.html:', m);

// Check which CSS files exist locally
const fs = require('fs');
const files = fs.readdirSync('css');
console.log('Local CSS files:', files);
