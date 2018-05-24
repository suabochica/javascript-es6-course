Modern JavaScript
=================

Modern JavaScript: Using ES6, NPM, Babel and Webpack
----------------------------------------------------

The next features are in the staging of the JavaScript Development:

- Write ES6 (even newer versions) and compiled it in ES5
- Use module bundlers
- Use task runners

Until now, we are writing JavaScript code in the old school way. With the Forkify project, we will use modern JavaScript for a real application.

Modern JavaScipt is not so much about the language itself. But it is more about the whole JavaScript Ecosystem and the environment that we use to write it in. So, we still write the same JavaScript code, but we use it together with a set of tools that make it easier and better to work with.

The foundation of these tools is the [NodeJS](https://nodejs.org/es/) and the [NPM](https://www.npmjs.com/) ecosystem. There we can find all kind of third-party open source tools, libraries, and frameworks needed for web development. NPM (Node Package Manager) is a command line interface that allows us to share, install and manage these packages. Moreover, NPM enables us to write scripts to user our development tools.

The first tool that we use is [Babel](https://babeljs.io/). Babel works to convert cutting edge JavaScript like ES6, ES7, and ES8, back to ES5. The purpose is to be secure that all the browser are capable of understanding our JavaScript code. In a couple of years, this now will be necessary, but nowadays we have to consider it in our development process.

The second tool is [Webpack](https://webpack.js.org/) to make our code modular, and therefore, easier to maintain. ES6 brought us precisely that possibility by implementing modules. The problem with ES6 modules is browsers cannot support this functionality yet. So we have to bundle these modules together into a single file using a module bundler like webpack. Webpack offers additional features like code-splitting, loading menu types of assets like sass or image to decrease our JavaScript bundle size using an algorithm called tree shaking, etc. But in Forkify we will use webpack to bundle all the module together.

We can put all this ecosystem together with an automated development setup powered by **NMP scripts**.

A Modern Setup
--------------

### Installing NodeJS and NPM

To install NodeJS you have to download it from his [official page](https://nodejs.org/es/) and then intalled. To verify that NodeJS was installed correctly run the next command in the Terminal:

    node -v

This command should return the NodeJS version installed in your machine. The NodeJS installation includes NPM. To verify that NPM is installed run the next command:

    npm -v

This command should return the NPM version installed in your machine. Now, to start a NodeJS project run the next command:

    npm init

This command will ask you some questions related to the project, and after confirmation, it will create a `package.json` file. The `package.json` is input to the NodeJS project where are defined his dependencies.

We can install packages locally and globally. Also, we have a package classification between dependencies and development dependencies. In dependencies goes all the packages that are _libreries_ or _frameworks_ jquery and angular. In development, dependencies go all the packages that are _develpment tools_ like webpack and gulp.

So to install webpack locally as a development dependecy we run the next command:

    npm install --save-dev webpack

Sameway, to install a library like jquery locally we run the next command:

    npm install --save jquery

To install a package globally we omit the --save argument in our command

    npm install liveserver

All thes installation will registered in the `package.json` files. Finally to remove a package run the next command:

    npm uninstall --save jquery