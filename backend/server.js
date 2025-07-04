const http = require('http');
const fs = require('fs');
const path = require('path');
const backenddata = require('./datamodels/backenddatas');
const frontenddata = require('./datamodels/frontenddatas');

const port = 3000;
const protocol = 'http://';
let host = 'localhost';

const server = http.createServer((req, res) => {
    const url = req.url;

    // Serve logo image
   if (url.startsWith('/img/')) {
  const imagePath = path.join(__dirname, '..', 'frontend', url);
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': backenddata.contentType.TEXTPLAIN });
      res.end('Image not found');
    } else {
      // Set content-type based on extension
      
      const ext = path.extname(imagePath).toLowerCase();
      const contentType = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp'
      }[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
  return;
}


    // Serve nav sidebar data
    if (url === '/api/sidebar') {
        res.writeHead(200, {
            'Content-Type': backenddata.contentType.APPJSON,
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify(frontenddata.sidebar));
        return;
    }

    // Serve logo info
    if (url === '/api/logo') {
        res.writeHead(200, {
            'Content-Type': backenddata.contentType.APPJSON,
            'Access-Control-Allow-Origin': '*',
        });
        res.end(JSON.stringify(frontenddata.logo));
        return;
    }

    // Default fallback
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

server.listen(port, () => {
    console.log(`Server running at ${protocol}${host}:${port}`);
});
