Node.js
=======

The Laptop Store
----------------

We are aware of the fact that we can use JavaScript outside the browser. The most popular way of doing this is using a technology called Node.js. In this section you we will build a simpre project using Node.js, because in fact we will still be using JavaScript, and it made perfect sense to include this topic in the course.

The small project is _The Laptop Store_. There we have five laptops and the page is completely generated on a Node.js web server. The web store have the next features:

- We have a products pages with basic information of all the laptops
- We have a laptop page with specifin information of one laptop
- When you click in a laptop button, the URL change from `products` to  `laptop#id`

A Quick Overview of Node.js
---------------------------

The oficial definition of Node.js is:

Node.js
  :Node.js is a JavaScript runtime built on google's open source v8 JavaScript Engine

To understand this defintion, let's start by trying to understand what a _JavaScript runtime_ and a _V8 engine_ are. JavaScript is commonly used in the browser because any broweser natively understand HTML, CSS and JavaScript. No matter if you write Vanilla JavaScript or React or Angular, it is just JavaScript that gets executed right in the browser. So in this case _the browser is the JavaScript runtime_.

But, what if we could take JavaScript out of the browser and simply execute our code somewhere else without all the restrictions that we have in the browser? Well, it turns out that we actually can, and the solution for this is callde Node.js. Node.js is just another JavaScript runtime. It is like a container or an environment in which a program written in JavaScript can be excuted outside a browser. For now, this approach is enough, because Node.js itself is more complex.

For other side, who actually does executa a code if not the browser? Here is where the V8 engine, developed by google, comes to play because that is exactly where JavaScript code will be parsed and run in Node.js.

Now, the definition have more sense. This is a crush course, so remember that this section will a very high level overview of what Node is and how it works. The purpose is get a quick idea of what Node is and what amazing things we can do with it.

With JavaScript run outside of the browser we can do several things like:

- Accessing the file system
- Better networking capabilities

All these factors togehter give us the perfect conditions for using Node.js as a web server, meaning that now we can use JavaScript on the server side of the web development in order to build fast highly scalable network applications for porwering the back-end of web apps.


The Laptop Store Project
------------------------

The project structure is the next one:

    app
    |-- data/img/*              # Laptop images
    |-- data/data.json          # The data that will be in the laptop store
    |-- laptop.html             # Detailed laptop page
    |-- overview.html           # General laptops page

Now to run JavaScript outside the browser lets run node. To determine if node is installed you can run:

    node -v

If you get a number, then node is installed locally and the number is the respoective version. To run node just execute:

    node

Now we are running JavaScript outside the browser, and our terminal is now like a JavaScript console, just like you have in the browser. Of course we don't want to write all of our Node code in the command line, then we can create a new JavaScript file called `index.js`. To run it, execute:

    node index.js

A usefull tool to avoid turn off and turn on the node enviroment every time that we insert changes in the JavaScript files is `nodemon`. To install it we use `npm`:

    npm i -g nodemon

Now you when you run:

    nodemon

It will automatically figure out which file you want to run, and then it actually runs it. This helper will save us a ton of time.

Now it is time to start and implement the code to run read the content of the `data.json` and parse it into a JavaScript object. This is something that we can´t do in the browser because it doesn't give us access to the file system. But with node, we can.

To achieve that we have to be aware that node comes with a very powerfull module system and mos of the functionality that we have in Node is always in one of the node packages. So, to read a file we need to use the file system module, which is a node core module. the code show us how to use the filse system module and then read the `data.json` file.

```js
const fileSystem = require("fs");

const json = fileSystem.readFileSync(`${__dirname}/data/data.json`, 'utf-8')
const laptopData = JSON.parse(json)

console.log(__dirname);
console.log(json);
console.log(laptopData); // data as a JavaScript object
```

> The `__dirname` is a node variable to determine the project path

With the `laptopData` object we are ready to start working on implementing the laptop store.

Time to use node for what was really itended to do, which is to create web servers. To get this, we have to use another core module of node, the `http` module. To create a server we can check the next code:

```js
const http = require("http");
...
const json = http.createServer())
```

There are different ways to create a server, but for learning this way is the easiest one. The `createServer()` receive as argument a callback function that will fired each time that someone accesses our web server.

