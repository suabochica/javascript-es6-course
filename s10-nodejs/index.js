const fileSystem = require("fs")
const http = require("http")
const url = require("url")

const json = fileSystem.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json)

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname
  const queryId = url.parse(req.url, true).query.id

  // Routing
  if(pathname === '/products' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('This is the products page!')
  } else if(pathname === '/laptop' && queryId < laptopData.length) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`This is the detailed page for laptop ${queryId}!`)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('URL was not found on the server!')
  }
})

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening for request now')
});