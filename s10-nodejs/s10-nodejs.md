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


