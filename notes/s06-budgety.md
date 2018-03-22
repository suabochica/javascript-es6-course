Budget App
==========

You can check the app description in the file `budgety-planning-guide.pdf`. In big projects, before to start coding you have to plan to define an architecture to our application. In this case, we have to find the fundamental tasks of our project and put in a **TO-DO List**:

- Add event handler
- Get input values
- Add the new item to our data structure
- Add the new item to the user interface (UI)
- Calculate budget
- Update UI after calculating the budget

Modules
-------

Now, it is time to structure our code and to achieve that we can rely on **Modules**. The next is a list of modules features:

- Modules are an essential aspect of any robust application's architecture
- Modules keep the units of code for a project both cleanly separated and organized
- Modules encapsulate data into privacy and expose other data publicly

In summary, modules allow us to break up our code into logical parts and then make them interact with one another. 


Now let's identify which modules are in our project. An excellent way to determine modules is grouping the tasks by similarity. Looking at the tasks specified before, you can see that some of these tasks are related to the user interface and the others with the internal data manipulation. The next table group the modules with their respective tasks:

|**UI Module**              |**Data Module**                        |**Controller Module**  |
|---------------------------|---------------------------------------|-----------------------|
|Get input values           |Add the new item to our data structure |Add event handler      |
|Add the new item to the UI |Calculate budget                       |                       |
|Update UI                  |                                       |                       |

The goal of the controller module is control the entire app and act as a bridge between the another two modules.

To create modules in JavaScript, you can use the **IIFE + Closures** combo. Check the code of the `app.js,` and you will see which data is private and which data is public in each module. Basically, the next code reflect a generalized backbone of modules in JavaScript:

```javascript
var moduleName = (function() {
    // code in this scope will group the moduleName private data

    return {
        // code in this scope will group the moduleName public data, the power of closures allow this
    }

})() // IIFE allow us data privacy
```

Keyboard Events
---------------

Here are [keyboard events](https://developer.mozilla.org/en-US/docs/Web/Events) in the respective section. For this example, we will use the `keypress` event. When you check the prototype chain of `KeyboardEvent` object you get the next hierarchy:

1. `KeyboardEvent`
2. `UIEvent` 
3. `Event` 
4. `Object`

The `KeyboardEvent` offer us a huge quantity of properties and methods that we can use from the function constructors listed before. To specify an event according to a single key, you have to use the property `keycode` that belongs to the `KeyboardEvent`. You can check the [next reference](http://keycodes.atjayjo.com/) to get the keycodes of each key without open the `KeyboardEvent` in the browser console. Once limited the `keypress` event to a key, you have to call the function that will attend this event.

Reading Input Data
------------------

HTML offers us different input types: text, number, password, button, etc. So, JavaScript is capable of reading the data introduced in these input types. The next code is a generic structure to read data from the HTML inputs using the `querySelector` property of the document object:

```javascript
document.querySelector('{css-selector-notation}').value;
``` 

Group all the staging DOM selectors in our application into an object, and access them through this object is a common practice in big projects. The `UI_CONSTANS` variable in the `app.js` file is the object that group all the selectors in staging for our application and also show us how you can use it.

Creating an Initialization Function
-----------------------------------

As you remember, in the pig name we create an `init` function to set up the default state of the game. Why create an initialization function? Because it is a good practice have a place where we can put all the code that we want to be executed when our application starts. How to create it? Just put the `init` function in the public space of our `appController` module and call the required functions to start the application. Don't forget to call the `init` function from the global scope. Without this call, the application will never start. It is recommendable to have just functions in your `appController` module.

Creating Income and Expense Function Constructors
-------------------------------------------------

In this budget app, we will deal with two features: Incomes and Expenses. These features allow us to chose the function constructors that meet our application's needs. Before we identified that the logic to handle the incomes and expenses belongs to the `budgetController` module. Please check the respective definitions of these functions constructor in the `budgetController` module inside our `app.js` file.

In the other hand, we have to set up a proper data structure for our budget controllers. The best way is put all the data inside an object and set properties to store the respective values for the number of expenses and incomes and the total of expenses and incomes. You can check this data structure in the `data` object of `budgetController` module into the `app.js` file.

Adding a New Item to Our Budget Controller
------------------------------------------

It´s time to put content in the defined data structure inside the `budgetController` module. To achieve that we have to connect the data retrieved from the `uiController` and put in the `data` object of the `budgetController`. Then, we have to create a public function in the `budgetController` to add an item to the `data` object. Next is the statement of this function:

```javascript
var addItem = function(id, description, value)
```

This function has two responsibilities:
1. Handle a logic to add an id for each item that could be an income or an expense.
2. Push the item in the respective property of the `data` object.

> Note: Please check that the inputType uses just two values: `exp` and `inc`. You can take advantage of this values and match them with the properties of the `data` object.

To connect the `budgetController` and the `uiController` you have to use the `appcController` module. Remember that in the `appController` you have access to the data retrieved from the `uiController` module. Then, we can use it to pass this data to the `budgetController` through the public method `addItem()` with the respective arguments. Please check the point two commented in the `app.js` file.

Adding a New Item to the UI
---------------------------

Finally, we will start to add changes in the UI. To get changes in the UI you can follow three steps:

1. Set a markup placeholder that allows us to simulate the dynamic elements in a static version.
2. Add tokens (like *%*) to our dynamics properties. Then replace these parts of strings with actual data.
3. Manipulate the DOM to insert our dynamic elements.

Related to the first step, you can see a placeholder markup inside the `indext.html` files. the placeholder markup is commented inside the `incomes__list` and `expenses__list` selectors.

In the second step, we take the placeholder, and we will put the dynamics properties between tokens that allow us identified easily. In this case, we use: `%id%`, `%description%` and `%value%` in the respective places of the placeholder. Then we will use the [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method of the `String` object to change these static values to the values stored in the `data` object defined in the `budgetController` module.

Lastly, we add the modified placeholder to the DOM through the [`insertAdjacentHTML()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) method of the `Element` object.