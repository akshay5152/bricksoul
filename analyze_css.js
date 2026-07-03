const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');
const files = fs.readdirSync(cssDir);

files.forEach(file => {
    if (!file.endsWith('.css')) return;
    const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    
    // Find all class names matching style-module-scss-module__...
    const regex = /\.style-module-scss-module__[a-zA-Z0-9_-]+/g;
    const matches = content.match(regex) || [];
    
    // Filter duplicates
    const unique = [...new Set(matches)];
    console.log(`=== Classes in ${file} ===`);
    console.log(unique.slice(0, 30).join('\n'));
    if (unique.length > 30) {
        console.log(`... and ${unique.length - 30} more`);
    }
});
