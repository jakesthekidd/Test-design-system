const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Development Server</title>
    </head>
    <body>
      <h1>Development Server Running</h1>
      <p>Your application is now working!</p>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4200;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
