const t = require('fs').readFileSync('about.html','utf-8');
const scriptMatches = t.match(/<script/g) || [];
console.log('script tags remaining:', scriptMatches.length);
console.log('main.js present:', t.includes('src="/js/main.js"'));
console.log('self.__next_f remaining:', t.includes('self.__next_f'));
