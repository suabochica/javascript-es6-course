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

### Configuring webpack
To start with a webpack configuration, you should create a `webpack.config.js` file. In this file, we will define the tasks associated with webpack. As we described before, in _Forkify_ we will work with bundle ES6 modules through webpack. The next code represents the setup to export modules with webpack:

```js
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    }
}
```

For the above code, it is important to highlight that in webpack are essential four concepts:

- Entry point
- Output
- Loaders
- Plugins

In this example, we will handle the _entry point_ and the _output_ concepts. The `entry` property of the webpack configuration object is the path of the file (or files) where webpack will start the bundling. The `output` property will tell webpack where to save our bundled file. Then we have to specify an output object with the  `path` and `filename` properties to the boundled file.

The `path` property of the `output` object needs an absolute path that is retrieved with a built-in node package called `path`. The `resolve()` method of this package allow us the access to absolute paths through the variable `__dirname`. Then we can join our destiny path adding the `dist/js` folder as the second argument of the `resolve` method.

After webpack v4, the package counts with two modes: _development_ and _production_. Development mode builds our bundled without minifying our code to be as fast as possible. For another side, production mode will automatically enable all kinds of optimization, like minification and tree shaking to reduce the final bundle size. These modes can be handled with **NPM scripts**.

To add an NPM script, we have to use the `scripts` property in our `package.json` file. To enable the webpack commands, we have to install the `webpack-cli` package as a dev dependency: we have to install the `webpack-cli` package as a dev dependency:

    npm i --save-dev webpack-cli

Then, we can configure our script like:

```js
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
},
```

Finally, to run these script we use the next commands

    npm run dev // to run development mode
    npm run build // to run production mode

Now, would it will be nice to run these script series just once instead of to run it every time that we add changes. To solve this behavior, we can add the `webpack-dev-server` package.

    npm i --save-dev webpack-dev-server

After install the `webpack-dev-server` package we have to add a `devServer` property in the `webpack.config.js`:

```js
...
module.exports = {
    ...
    devServer: {
        contentBase: './dist'
    }
}
```

The `devServer` property recieve an object with a `contentBase` property whose value is the path that we want to deploy in our HTTP server (In this case  the `./dist` folder). Next we have to add new script in our `package.json`.

```js
"scripts": {
    ...
    "start": "webpack-dev-server --mode development --open"
},
```

The `start` script use the `webpack-dev-server` in mode development and the `--open` is an option that open the browser after run the command. To use it, you have to run the next command:

    npm run start

Now, it is time to go back to one of the four fundamental concepts of webpack: _plugins_. Plugins allow us to do complex processing of our input files. We will use the `index.html` file as an example. Our goal is to copy the `index.html` file of our `/src` folder in the `/dist` folder. To get this, we have to use a plugin called `html-webpack-plugin` that is installed as an NPM package:

    npm i --save-dev html-webpack-plugin

Afterward, we have to add the `plugin` property to our `webpack.config.js`. Also, we have to import the `HtmlWebpackPlugin` module to create an object from this constructor. Next, you can check the `html-webpack-plugin` code setup:

```js
....
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
```

With this code, the plugin and the web server will put our source `.html` file specified in the value of the `template` property in the `/dist` folder with their respective `filename` value.

Bable Setup
-----------

To install and setup [Babel](https://babeljs.io/) we have to follow the next three steps:

1. Install this set of packages
    - `babel-core`: self-explanatory
    - `babel-preset-env`: package that compiles ES6+ down to ES5 by automatically determining the Babel plugnis and polyfills you need on your runtime environments
    - `babel-loader`: loader required by webpack to use babel
    - `babel-polyfill`: Package thas supports the new ES6 features (as Promises) in browsers
2. The `babel-preset-env` requires a configuration file. Then we have to setup the `.babelrc` file
3. Include the `babel-polyfill` to suppor features that we cannot convert with babel loaders

As you can see in the above list we talk about `babel-loader`. With this package we fall into the last concept in webpack: _loaders_. Loaders allow us to load all kinds of different files to process them. With loaders we can converting SASS to CSS code or traspile ES6 to ES5 JavaScript.

To configure loaders in the `webpack.config.js` we have to respect the next structure:

```js
...
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    }]
}
...
```

Notice that we use regular expressions the set the values of the `test` and `exclude` properties. Finally, in the `loader` property we put as value the `bable-loader` package.

Alike the `webpack.config.js` file the `.babelrc` file receive a combination of key-values to setup the runenvironment where babel will do his work. A basic configuration of this file is:

```json
{
    "presets": ["env"]
}
```

After that configuration, we run our `dev` script and we can see how babel traspile our ES6 in our `.js` files inside `/src` in ES5 code in the `bundle.js` file generated to the `/dist` folder.