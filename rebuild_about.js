const fs = require('fs');
let t = fs.readFileSync('live_about.html', 'utf-8');

// Replace CSS chunk paths to local
t = t.replace(/href="\/_next\/static\/chunks\/([^"]+\.css)"/g, 'href="./css/$1"');

// Remove ALL script tags (async JS chunks AND inline RSC hydration scripts)
t = t.replace(/<script[^>]*src="\/_next\/static\/chunks\/[^"]*"[^>]*><\/script>/g, '');
t = t.replace(/<link[^>]*rel="preload"[^>]*href="\/_next\/static\/chunks\/[^"]*"[^>]*\/>/g, '');

// Remove ALL inline scripts (self.__next_f and others) 
t = t.replace(/<script>[^<]*<\/script>/g, '');
// Also handle multi-line inline scripts
t = t.replace(/<script>[\s\S]*?<\/script>/g, '');

// Remove noModule script
t = t.replace(/<script[^>]*noModule=""[^>]*><\/script>/g, '');

// Inject main.js before </body>
t = t.replace(/<\/body>/, '<script src="/js/main.js"></script></body>');

fs.writeFileSync('about.html', t);
console.log('Rebuilt about.html - size:', t.length);

// Verify
const scriptMatches = t.match(/<script/g) || [];
console.log('Script tags remaining:', scriptMatches.length);
console.log('main.js present:', t.includes('src="/js/main.js"'));
console.log('self.__next_f remaining:', t.includes('self.__next_f'));
console.log('Has screenContent:', t.includes('screenContent'));
console.log('Has data-page="about":', t.includes('data-page="about"'));
