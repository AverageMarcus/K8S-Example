const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  return res.end('Hello Test');
});

server.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`server is listening on ${port}`);
});
