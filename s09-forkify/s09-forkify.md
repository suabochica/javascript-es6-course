Modern JavaScript
=================

Modern JavaScript: Using ES6, NPM, Babel and Webpack
----------------------------------------------------

The next features are in the staging of the JavaScript Development:

- Write ES6 (even newer versions) and compiled it in ES5
- Use module bundlers
- Use task runners

Until now, we are writing JavaScript code in the old school way. With the _Forkify_ project we will use modern JavaScript for a real application.

Modern JavaScipt is not so much about the language itself. but it is more about the whole **JavaScript Ecosystem** and the environment that we use to write it in. So, we still write the exact same JavaScript code, but we use it togheter with a set of tools thta make it easer and better to work with.

The foundation of these tools is the [NodeJS](https://nodejs.org/es/) and the [NPM](https://www.npmjs.com/) ecosystem. There we can find all kind of third-party open source tools, libraries and frameworks needed for web development. NPM (Node Package Manager) is a command line interface that allow us to share, install and manage these packages. Moreover, NPM allow us to write scripts to user our development tools.

The first tool that we use is [Babel](https://babeljs.io/). Babel works to convert cuttiing edge JavaScript like ES6, ES7 and ES8, back to ES5. The purpose is be secure that all the browser are capable of understanding our JavaScript code. In a couple years, this now will be necessary, but nowdays we have to consider it in our development process.

The second tool is [Webpack](https://webpack.js.org/) to make our code modular, and therefore, easier to maintain. ES6 brought us exactly that possibility by implementing module. The problem with ES6 modules is browsers can not support thi functionality yet. So we have to bundle these module together into a single file using a _module bundler_ like webpack. Webpack offer additional features like codesplitting, loading menu types of assets like sass or image to decrease our JavaScript bundle size using an algorithm called treeshaking, etc. But in _Forkify_ we will use webpack to bundle all the module together.

We can put all the this ecosytem together with an automated development setup powered by **NMP scripts**.