const fs = require('fs');
const log = fs.readFileSync('C:\\Users\\Admin\\.gemini\\antigravity\\brain\\f329bb5c-0ab7-4a1e-8ac2-b7f5696db1dd\\.system_generated\\tasks\\task-2548.log', 'utf-8');

console.log('Searching scrollY = 2000 block...');
const lines = log.split('\n');
let print = false;
let count = 0;
for (let line of lines) {
  if (line.includes('scrollY = 2000')) {
    print = true;
    count = 0;
  }
  if (print) {
    console.log(line);
    count++;
    if (count > 60) break;
  }
}
