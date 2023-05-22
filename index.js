const http = require("http");

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  switch(req.url) {
    case '/test':
      res.end("My first test!");
      break;
    case '/altro':
      res.end("Altro!");
      break;
    default:
      res.end("My first server!");
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});