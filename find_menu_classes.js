const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir);

files.forEach(file => {
    if (!file.endsWith('.css')) return;
    const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    
    // Find classes starting with style-module-scss-module__MjpYSW
    const regex = /\.style-module-scss-module__MjpYSW__[a-zA-Z0-9_-]+/g;
    const matches = content.match(regex) || [];
    const unique = [...new Set(matches)];
    if (unique.length > 0) {
        console.log(`=== MjpYSW Classes in ${file} ===`);
        console.log(unique.join('\n'));
    }
});
