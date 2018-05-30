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
    - `babel-preset-env`: a package that compiles ES6+ down to ES5 by automatically determining the Babel plugins and polyfills you need on your runtime environments
    - `babel-loader`: loader required by webpack to use babel
    - `babel-polyfill`: Package that supports the new ES6 features (as Promises) in browsers
2. The `babel-preset-env` requires a configuration file. Then we have to set up the `.babelrc` file
3. Include the `babel-polyfill` to support features that we cannot convert with babel loaders

As you can see in the above list, we talk about `babel-loader`. With this package, we fall into the last concept in webpack: _loaders_. Loaders allow us to load all kinds of different files to process them. With loaders, we can convert SASS to CSS code or transpile ES6 to ES5 JavaScript.

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

Notice that we use regular expressions the set the values of the `test` and `exclude` properties. Finally, in the `loader` property we put as value the `babel-loader` package.

Alike the `webpack.config.js` file the `.babelrc` file receive a combination of key-values to set up the run environment where babel will do his work. A basic configuration of this file is:

```json
{
    "presets": ["env"]
}
```

After that configuration, we run our `dev` script, and we can see how babel transpile our ES6 in our `.js` files inside `/src` in ES5 code in the `bundle.js` file generated to the `/dist` folder.

Planning our Project Architecture with MVC
------------------------------------------

Thinking about architecture is fundamental to starting any new project. No matter if it is a Vanilla JavaScript project, a React application or whatever you are using, the best way to start a project in planning his architecture.

In _Forkify_ we are going to use the well known *Model-View-Controller (MVC)* architecture. The main advantage of MVC is that decouples the presentation logic from the application logic with a controller between them that controls the entire app.

In this case, we will use the **ES6 modules** instead of the **Module Pattern** to structure our architecture. With ES6 modules we will have the best approach to the separation of concerns in JavaScript.

Now, exist a lot of ways of implementing MVC pattern. In this project, we are going to apply it straightforwardly. So let's check the context of the _Forkify_ app.

| **Model**                 | **Controller**                        | **View**                                         |
|---------------------------|---------------------------------------|--------------------------------------------------|
| `Search.js`               | `index.js`                            | `searchView.js`                                  |
| `Recipe.js`               |                                       | `recipeView.js`                                  |
| `List.js`                 |                                       | `listView.js`                                    |
| `Likes.js`                |                                       | `likesView.js`                                   |
| Concern about data        | Controls all the communication issues | Gets and display data from to the user interface |
| Concern about app's logic |                                       |                                                  |

In the table, each column is a module. So, in the `Controller` we will have an `index.js` file, and it will work as a bridge between the `Model` and the `View`. With ES6 we can have a model and a view for each of the different aspects of the app. Notice that the Model and the View never have to communicate with them. We can have multiple controllers, but have a global controller provides more natural management of the MVC pattern.

How ES6 Modules Works
---------------------

To use ES6 modules we have to get familiar with two keywords `export` and `import`. The next snippet shows _defalut export_ used when you will export only one thing from a module:

```js
//from x.js file
export default 'Any string'

// in y.js file
import str from 'path/to/x'
console.log(`${str}`) //-> 'Any String'
```

Now, let's check _Named Exports_. Named Exports are used when you will export multiple things from the same module.

```js

//from x.js file
export const add = (a, b) => (a + b);
export const multiply = (a, b) => (a * b);

// in y.js file
import { add, multiply } from 'path/to/x'
console.log(`${add(2, 6)}`) //-> 8
console.log(`${multiply(2, 6)}`) //-> 12
```

Notice that the `import` file should match the variables names in the `export` file. That is why is called named exports. We can customize these names in the `import` file with the following syntax:

```js
//from x.js file
export const add = (a, b) => (a + b);
export const multiply = (a, b) => (a * b);

// in y.js file
import { add as a, multiply as m } from 'path/to/x'
console.log(`${a(2, 6)}`) //-> 8
console.log(`${m(2, 6)}`) //-> 12
```

Finally, we have the _Import All_ syntax.

```js
//from x.js file
export const add = (a, b) => (a + b);
export const multiply = (a, b) => (a * b);

// in y.js file
import * as xFile from 'path/to/x'
console.log(`${xFile.add(2, 6)}`) //-> 8
console.log(`${xFile.multuply(2, 6)}`) //-> 12
```

Here, we access to the functions through the `xFile` object created at the moment of import the variables from `x.js`

API Calls
---------

To the _Forkify_ project we will consume the [RecipeAPI](http://food2fork.com/about/api) of Food2Fork. Please, sign up with the free plan to get an API Key. The API key is required to access to the services exposed by the RecipeAPI.

In this project we will use the [`axios`](https://github.com/axios/axios) npm package to do our Ajax calls. Axios is a Promise based HTTP client for browsers and will replace the `fetch()` method of JavaScript. The reason why we will use `axios` instead of `fetch()` is because `fetch()` is not supported in old browser. So, install the `axios` package running:

    npm i --save axios

The `axios` package have an `axios()` method that is similar to the `fetch()` method of JavaScript. The difference is that `axios()` method returns the Ajax's response in `.json` format saving for us this step. The next snippet shows how to use the `axios()` method:

```js
import axios from 'axios';

async function getRecipes(query) {
    const key = '3c363f9f897b423356b66cc2539c0bac';
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    try {
        const response = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = response.data.recipes;

        console.log(recipes)
    } catch (error) {
        alert(error);
    }
}

getRecipes('lasagna');
```

Building the Search Model
-------------------------

With the `Search` model we will learn how to build a simple data model using _ES6 Classes_. The ES6 class will describe the data model for the search. The data for the search is a `query`. After getting this query, the search will retrieve results related to the query.

In the Search model, the only thing that we will export from the module will be the `Search` class. Then, we will use the _export default_ mode.

Remember that the first thing that we have to define in a class is the `constructor()` method. The constructor will be called as soon as we create the object based on this class. In the constructor, we pass the properties that we want the new object to have. In the `Search` model, we want to have a query, so we should add it to his constructor method.

The second point to handle in our `Search` model is getting the result related to the query. Then we create a `searchRecipes()` method inside our `Search` model, responsible for doing the Ajax call to retrieve the result from the RecipesAPI.

Finally, we have to import this model into our global controlled hosted in the `index.js` file. There, we instantiate a new object of the `Search` model class with their respective query argument, and later we use his respective `getRecipes()` method to retrieve our results.

### Formatting ingredients description
Now our recipe model have to format the ingredient description from:

    4 ounces cream cheese, room temperature

to:

    {
        count: 4,
        unit: 'oz',
        ingredient: 'cream cheese, room temperature'
    }

Unfourtonately, the ingredients values have next presentations:

- Ingredient value has parenthesis
- Ingredient value hasn't number
- Ingredient value hasn't unit
- Ingredient value has number but not unit
- Ingredient values has the nex number presentation (4 1/2)
- ...

So, the `parseIngredients()` method have to consider all these scenarios. To reach our objective, we have to work with array and stiring manipulation. There we have two important points:

- Use array methods like `map()`, `slice()`, `findIndex()` and `includes()`
- Use `eval()` function to evaluate JavaScript code represented as a string

All these modifications are stored in the `state.recipe.ingredients` object's property.

Building the Search Controller
------------------------------

Before to start with the search controller, we have to go deep with the concept of **Application State**. The state is all the data that defines our app in a given moment of our app. In the _Forkify_ app the state is related to:

- What happens with the current search query?
- What is the current recipe?
- What is currently on the shopping list?
- How many serving are presently being calculated?

So, all these data is the current state at the present moment in the app. Therefore, we want to have all the data in one central place like an object. To get this purpose, we define an empty object in our `index.js` file;

```js
const state = {};
```

To add the content related to the search in the `state` varaible, first we're gonna to add an event listener for the search forum on the `submit` event:

```js
document.querySelector('.search').addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});
```
In our callback function, we add the `preventDefault()` to avoid that the page will be reloaded after submitting the form. Finally, we call the `controlSearch` function. This function will retrieve the query from the view and with this information will instantiate the `Search` model. Also, will handle the logic to send the recipes to the view after getting the results of the `getRecipes()` promise of the `Search` model.

Building the Search View
------------------------

In the search view we will review three points:

1. Advanced DOM manipulation techniques.
2. How to use ES6 template strings to render entire HTML components. (Yeah!)
3. How to create a loading spinner.

About the first point, we will create a `.js` the file where we will store all the DOM elements that are on stage in our app. This file will be accessible from the views and the controller to execute our DOM manipulations. In our project, this file is `DOMElemnts.js`.

Regarding the use of ES6 template strings, now our markup injected from JavaScript will be more legible. Before we save our markup in an illegible variable, but with template strings, we have the next code:

```js
const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOMElements.searchResultsList.insertAdjacentHTML('beforeend', markup);
}
```

Looks similar to the `JSX` in React. Now our markup inserted from JavaScript is easier to read.

### Short Recipe's Title

Now, we will explain an algorithm to show the recipe's title in just one line. The critical point in this algorithm is the use of the Array's object `reduce()` method. Our method will handle the next context:

    limit: 17
    shortTile: []
    title: Pasta with tomato and spinach
    title to show: Pasta with tomato ...

    Iterations
    ----------
    accumulator: 0 / accumulator + currentWord.length = 5 / shortTitle = ['Pasta']
    accumulator: 5 / accumulator + currentWord.length = 9 / shortTitle = ['Pasta', 'with']
    accumulator: 9 / accumulator + currentWord.length = 15 / shortTitle = ['Pasta', 'with', 'tomato']
    *accumulator: 15 / accumulator + currentWord.length = 18 / shortTitle = ['Pasta', 'with', 'tomato', 'and']
    accumulator: 18 / accumulator + currentWord.length = 25 / shortTitle = ['Pasta', 'with', 'tomato', 'and', 'spinach']

    * point where the condition happens

The next snippet handles the described context:

```js
const limitRecipeTitle = (title, limit = 17 => {
    const shortTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((accumulator, currentWord) => {
            if (accumulator + currentWord.length <= limit) {
                shortTitle.push(currentWord);
            }

            return accumulator + currentWord.length
        }, 0)

        return `${shortTitle.join(' ')} ...`;
    }

    return title;
}
```
Finally, to show the recipe's title short version we have to call this method with the `recipe.title` as a parameter.

### Loader Spinner

The loader spinner will be used in different panels of _Forkify_. It is for that reason that we will put the logic to render and clear the spinner in the `DOMElements.js` file instead of the `searchView.js`.

For add the spinner we have to identify a parent element and use the `insertAdjacentHTML` to insert the markup that will render the spinner. The spinner in this project is a `<svg>` element, and it is animated with CSS animations. In the same way, to remove the spinner, first we have to guarantee that the loader's markup exists and then use the weird logic to remove markup:

    {elementToRemove}.parentElement.removeChild(elementToRemove)

### Results Pagination

To achieve our recipes pagination, we will highlight the next to points:

- How to use `closest` method for easier event handling.
- How and why to use `data-*` attributes in HTML.

The statement of our method to render our recipes will change to:

    export const renderRecipes = (recipes, page = 1, resultsPerPage = 10)

As you can see, our parameters are:

- The whole recipes.
- The page that we want to display.
- The number of results per page.

With the help of the `slice()` Array's prototype method, we can return a shallow copy of a portion of an array into a new array object selected. The original array will not be modified. Now, it is time to add our method to render the pagination with the next statement:

    export const renderPagination = (page, numResults, resultsPerPage)

In this method we will have three scenarios:

1. Showing the first page. Then render the next page button.
2. Showing the last page. Then render the previous page button.
3. Showing the in-between pages. Then render both page buttons.

Now lets deep into our pagination component. First, we have to define the markup of this component:

```js
`
<button class="btn-inline results__btn--${direction}" data-goto=${direction === 'next' ? page + 1 : page - 1}>
    <span>Page ${direction === 'next' ? page + 1 : page - 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${direction === 'next' ? 'right' : 'left'}"></use>
    </svg>
</button>
`;
```

Check the use of the `data-goto` attribute. This attribute allows us to store the number of the page where we want to move. Later, we can use this property in the event handler of these buttons. To access to the value of this property we use the `dataset` property of the `HTMLElement` interface. In our case will:

    {HTMLElement}.dataset.goto;

Notice that the suffix should match with the property after `dataset`.

Now it is time to add an event handler to these buttons. Remember that all our event handlers go into the controller. Here is in the stage the concept of _event delegation_. The event handler for our elements is:

```js
DOMElements.searchPagination.addEventListener('click', (event) => {
    console.log(event.target)
}
```

The issue with event delegation is that according the place where the user clicks the `event.target` could be:

1. `<span>Page 1</span>`
2. `<svg class="search__icon"><use href="img/icons.svg#icon-triangle-left"></use></svg>`
3. `<button class="btn-inline results__btn--next" data-goto=2>...</button>`

For these possibilities the only that works for us ins the third one, because there we have out `data-goto` attribute. So, to have the guarantee of no matters where the user clicks, we always will get the third option we have to use the `closest()` method of the `Element` object. The `Element.closest()` method returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter.

    var elt = element.closest(selectors);

So in our case we will use:

    const inlineButton = event.target.closest('btn-inline');

Now we can call our `renderRecipes()` method with the parameter to move into our next or previous page.

Building the Recipe Model
-------------------------

In our `Recipe` model we can follow the same step applied to our `Search` model. The difference is the service API that we will consume for this model. Again, we create our `Recipe` model from the data that will receive in the response of the Ajax call.

Building the Recipe Controller
------------------------------

To build our Recipe controller we need:

- Read data from the page URL.
- Respond to the `hashchange` event.
- Add the same event listener to multiple events.


To read data from a URL, we have to interact with the `Location` interface that represents the location (URL) of the object it is linked to. This interface is accessible from the `Window.location` Object. The `Window.location` object has the information about the current location of the document.

In our case, the recipe id has the next form: `#35107`. This recipe is attached to the URL in the `renderRecipe()` method of the `searchView.js`. Then we can use the location object's `hash` (#) property to retrieve our recipe id.

    window.location.hash //->#35107

This property has an associated event: `hashchange`. So, every time that the hash value changes, the event is triggered. Therefore, we can add an event listener to the `window` object expecting the `hashchange` event and pass as callback the `controlRecipe()` method.

    window.addEventListener('hashchange', controlRecipe);

Finally, to add multiple events to the same event listener we change this snippet:

    window.addEventListener('hashchange', controlRecipe);
    window.addEventListener('load', controlRecipe);

to:

    ['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

Building the Recipe View
------------------------

To create our `recipeView.js`, we can follow the steps explained in the `Search` View. To recapitalize these steps:

1. Create the `recipeView.js` and import it into the `index.js` controller.
2. Create the `renderRecipe(recipe)` method and export it.
3. Add the mark app in the `index.html` file associated with the recipes into the `renderRecipe(recipe)` method.
4. Create the `createIngredient(ingredient)` private method to handle the markup associated with the ingredient.
5. Add the `recipe` property to our `DOMElements` object with the parent recipe selector.
6. Use the `insertAdjacentHTML('afterbegin', markup)` method to insert the recipe markup in the `DOMElements.recipe` Element.
7. Call the `recipeView.renderRecipe(state.recipe)` in the `index.js` controller.

Now, we have to handle the next two scenarios:

- Change the count format of the ingredient `count` value from _4.5_ to _4 1/2_
- Highlight the selected recipe in the search results panel.

In the first point, we will use the [`fractional`](https://www.npmjs.com/package/fractional) npm package. This package enables us to extract the numerator and the denominator of a respective number. With this package and with the string templates we can get our desired format. The logic is in the `formatFractionalCount(count)` method of the `recipeView.js`

To the second point, we have to do a call of the `searchView.js` in our `controlRecipe`, because the recipe in the search panel should be highlighted after render the recipe information. To achieve this result, we have to add the `results__link--active` class in the appropriate element.