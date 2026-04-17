const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7000;
const TEMPLATE_DIR = path.join(__dirname, 'templates');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
    let filePath = path.join(TEMPLATE_DIR, req.url === '/' ? 'home.html' : req.url);
    
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(TEMPLATE_DIR, '404.html'), (e, c) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(c || 'Not Found');
            });
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});