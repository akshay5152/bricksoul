const fs = require('fs');
let t = fs.readFileSync('about.html', 'utf-8');
t = t.replace('<script src="/check_triggers.js"></script>', '');
fs.writeFileSync('about.html', t);
console.log('Cleaned check_triggers.js from about.html');
