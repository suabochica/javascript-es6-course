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
    fileSystem.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
      let overviewOutput = data

      fileSystem.readFile(`${__dirname}/templates/template-product-card.html`, 'utf-8', (err, data) => {
        const cardsOutput = laptopData.map(element => replaceTemplate(data, element)).join('')

        overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)

        res.end(overviewOutput);
      })
    })
  }

  else if(pathname === '/laptop' && queryId < laptopData.length) {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    fileSystem.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
      const laptop = laptopData[queryId]
      const output = replaceTemplate(data, laptop)

      res.end(output)
    })
  }

  else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathname)) {
    fileSystem.readFile(`${__dirname}/data/img${pathname}`, (err, data) => {
      res.writeHead(200, { 'Content-type': 'image/jpg'});
      res.end(data);
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('URL was not found on the server!')
  }
})

server.listen(1337, '127.0.0.1', () => {
  console.log('Listening for request now')
});

function replaceTemplate(originalHTML, laptop) {
  let output = originalHTML.replace(/{%PRODUCT_NAME%}/g, laptop.productName)

  output = output.replace(/{%PRODUCT_IMAGE%}/g, laptop.image)
  output = output.replace(/{%PRODUCT_PRICE%}/g, laptop.price)
  output = output.replace(/{%PRODUCT_SCREEN%}/g, laptop.screen)
  output = output.replace(/{%PRODUCT_CPU%}/g, laptop.cpu)
  output = output.replace(/{%PRODUCT_STORAGE%}/g, laptop.storage)
  output = output.replace(/{%PRODUCT_RAM%}/g, laptop.ram)
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, laptop.description)
  output = output.replace(/{%PRODUCT_ID%}/g, laptop.id)

  return output;
}