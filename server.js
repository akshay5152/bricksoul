const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Parse URL path
    let filePath = req.url.split('?')[0];
    if (filePath === '/log-error') {
        const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
        console.log(`\x1b[31m[BROWSER ERROR]\x1b[0m ${urlParams.get('msg')} at ${urlParams.get('url')}:${urlParams.get('line')}:${urlParams.get('col')}`);
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('ok');
        return;
    }
    if (filePath === '/') {
        filePath = '/index.html';
    } else {
        const ext = path.extname(filePath);
        if (!ext) {
            const htmlPath = filePath + '.html';
            if (fs.existsSync(path.join(__dirname, htmlPath))) {
                filePath = htmlPath;
            }
        }
    }
    
    const absolutePath = path.join(__dirname, filePath);
    const ext = path.extname(absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(absolutePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 Internal Server Error</h1><p>${err.code}</p>`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to terminate.');
});
