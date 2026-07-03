const fs = require('fs');

const files = ['index.html', 'about.html', 'projects.html', 'contact.html'];
files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all instances of srcset or srcSet
  const regex = /(?:srcset|srcSet)\s*=\s*"([^"]*)"/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const urls = match[1].split(',');
    urls.forEach(url => {
      const trimmed = url.trim();
      if (trimmed && !trimmed.startsWith('https://') && !trimmed.startsWith('http://')) {
        console.log(`[${file}] Relative URL in srcset: "${trimmed}"`);
      }
    });
  }
});
