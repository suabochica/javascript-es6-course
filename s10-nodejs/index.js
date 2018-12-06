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
  }

  else if(pathname === '/laptop' && queryId < laptopData.length) {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    fileSystem.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
      const laptop = laptopData[queryId]
      let output = data.replace(/{%PRODUCT_NAME%}/g, laptop.productName)

      output = output.replace(/{%PRODUCT_IMAGE%}/g, laptop.image)
      output = output.replace(/{%PRODUCT_PRICE%}/g, laptop.price)
      output = output.replace(/{%PRODUCT_SCREEN%}/g, laptop.screen)
      output = output.replace(/{%PRODUCT_CPU%}/g, laptop.cpu)
      output = output.replace(/{%PRODUCT_STORAGE%}/g, laptop.storage)
      output = output.replace(/{%PRODUCT_RAM%}/g, laptop.ram)
      output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, laptop.description)

      res.end(output)
    })
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('URL was not found on the server!')
  }
})

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening for request now')
});