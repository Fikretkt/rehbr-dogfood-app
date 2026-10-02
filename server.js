const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "0.0.0.0";
const port = process.env.PORT || 3000;
const distIndex = path.join(__dirname, "dist", "index.html");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end("ok");
    return;
  }

  fs.readFile(distIndex, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Server listening on ${host}:${port}`);
});
