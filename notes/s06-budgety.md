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

The goal of the controller module controls the entire app and act as a bridge between another two modules.

To create modules in JavaScript, you can use the **IIFE + Closures** combo. Check the code of the `app.js,` and you will see which data is private and which data is public in each module. The next code reflects a generalized backbone of modules in JavaScript:

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

Finally, we will start to add changes in the UI. To get changes in UI you can follow three steps:

1. Set a markup placeholder that allows us to simulate the dynamic elements in a static version.
2. Add tokens (like *%*) to our dynamics properties. Then replace these parts of strings with actual data.
3. Manipulate the DOM to insert our dynamic elements.

Related to the first step, you can see a placeholder markup inside the `indext.html` files. the placeholder markup is commented inside the `incomes__list` and `expenses__list` selectors.

In the second step, we take the placeholder, and we will put the dynamics properties between tokens that allow us identified easily. In this case, we use: `%id%`, `%description%` and `%value%` in the respective places of the placeholder. Then we will use the [`replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) method of the `String` object to change these static values to the values stored in the `data` object defined in the `budgetController` module.

Lastly, we add the modified placeholder to the DOM through the [`insertAdjacentHTML()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) method of the `Element` object.

Clearing our Input Fileds
-------------------------

To clear the description and value input fields we can use the `querySelectorAll()` method of the `Document` prototype. Unfourtonatelu, this method returns a `NodeList` object instead of an `Array` object. To convert this `NodeList` into an `Array` we can use the next trick:

```javascript
Array.prototype.slice.call(NodeList)
```

The key to this trick is to use the `call()` method of the `Function` prototype. To use the `call()` method we have to use the `slice()` method of the `Array` object, that is a function; then we can inherit the `call()` method from the `Function` prototype.


Now we have an array with the description and value selectors. Therefore, we can use the `forEach()` method of the `Array` object, that is another way to loop over an array. The advantage of this way is the readability, but we have to know that when we use the `forEach()` method, we have access to three properties, the current element, the index and the array itself. By last, to clear our input fields we have to do the next assignation inside our `forEach()` method: `current.value = "";`.


Fixing minor problems
---------------------

Until this point we have two problems to fix:

1. The `data` object is storing the value property as a string and not as a number.
2. Currently, the user can add clear descriptions and values in the incomes and expenses list.

The first issue is solved using the top-level function `parseFloat()` that receive as argument the retrieved value from the input value field. Now, the `data` object is storing a float instead of a string.

You can fix the second drawback by putting the function calls of the `addItemController()` method within an `if` statement that check that the `description` and `values` properties of the inputData is not empty and is number, respectively.

Updating the Budget: Budget Controller
--------------------------------------

It's time for the next steps:

1. Calculate the budget each time the user adds an Income or an Expense
2. Store this budget inside an object that will enable the data to the UI

To calculate our budget, we will use the `totals` property of our `data` object to store our total incomes and total expenses. Also, we add two properties: `budget` and `percentage`. The totals calculation is a summary of the values stored in the respective `totals` array, the `budget` is simple incomes minus expenses, and the `percentage` is the division between the expenses by the incomes. Some details have to handle the put proper values in the `percentage` property.

Finally, we retrieve these calculations by a getter. Te getter will return an object whose properties are the results of the budget operations. Also, this object will allow us to send the budget values to the UI in the respective fields.

Updating the Budget: UI Controller
----------------------------------

Now it's time to go over DOM manipulation updating all the data related to the budget object. We can summarize these changes in the UI controller with the next steps:

1. Add the budget selectors to the `UI_CONSTANS` object.
2. Create a method `displayBudgetData(budgedData)` in the `uiController`, which receive as parameter the `budgetData` object calculated in the `budgetController`.
3. In this case, we will update text content, so we can use the method `textContent()` from the `Node` object.
4. Finally, call the `displayBudgetData(budgedData)` in the `appController`.


Part Two: Delete Incomes and Expenses Items
-------------------------------------------

To-do list:

1. Add an event handler to delete the items.
2. Delete the item from our data structure.
3. Delete the item to the UI.
4. Re-calculate the budget.
5. Update the UI.

Event Delegation
----------------

JavasScript interacts with the DOM by events. Then, you have defaults behaviors when an event is trigger on a DOM element. A concept that enters the stage is the **Event Bubbling.**  Event bubbling means that when an event is fired on some DOM element (e.g., click on a `<button>` that is inside a `<p>` tag), then the exact same event is also triggered on all of the parent elements (e.g the click event is also fired to the `<p>`, and actually all the way up in the DOM tree until the HTML element which is the root). In summary, the event bubbles up inside the DOM tree.

Another important concept is the **Target Element**. The target element is the element on which the event was first fired so the element that caused the event to happen. In the last example, our target element is the clicked `<button>`. An important part of the target element is that is stored as a property in the `Event` object. Then, all the parent's elements on which the event will also fire will know the target element of the event, so where the event was first shot.

These concepts bring us to the **Event Delegation**. Event delegation is a technique that combines the ideas of **Event Bubbling** and **Target Element**. The technique consists in to attach an event handler to a parent element and wait for the event to bubble up. Then, we can do whatever we intended to do with our target element property. The event delegation technique offers us two use cases:

1. When we have an element with lots of child element that we are interested in. (i.e., Instead of adding an event handler to all of these child elements, we add it to the parent element, and then determine on which child element the event was fired).
2. When we want an event handler attached to an element that is not yet in the DOM when our page is loaded. That is because of course, we cannot add an event handler to something that isn't on our page.

Setting Up the Delete Event Listener
------------------------------------

Pending tasks:

1. How to use event delegation in practice.
2. How to use IDs in HTML to connect the UI to the data model.
3. How to use `parentNode()` method of the Event object to DOM traversing.

To accomplish the first task, we have to identify the DOM element which contains the incomes and the expenses in our markup. This element is the `<div class="container clearfix">`. Then, we add the event listener on this element and in our callback function called `deleteItemController()` we pass the event object as an argument to get the target element that first fires the event.

Time to execute the second task. In our markup, we have to identify the element with the `id` attribute. Remember that the `id` attribute allows us to add the quality of unique an element. The element with the `id` attribute is `<div class="item clearfix" id="income-0">`.

To connect the step one and the step two we execute the task three, DOM traversing. if you check the mark up the target element is `<i class="ion-ios-close-outline"></i>` but this element is four element down to the element with the `id` attribute. To go up in the markup, we have to use the `parentNode()`. We have to call this method four times until reach the `<div class="item clearfix" id="income-0">` element and get the `id` property. With this property, we can start updating our budget calculations.

Deleting an Item from our Budget Controller
-------------------------------------------

Array methods that allow us to achieve the delete of an element in our `data` object:

1. `map(function(current){})`. This method returns a new array with the ids of our incomes and expenses arrays. Remember that this scenario exposes misunderstandings between the ids and the index of the items int he array. It is a wrong assumption that the value of the id property will match with the index position. So, to avoid this confusion you can store the ids of the items in a new array and add the logic of removing an item from this new array.
2. `indexOf(value)`. With this method, we can retrieve the expected index of the id property that belongs to the item that we want to delete.
3. `splice(index, quantity)`. This method allows us to remove items from an array. It will require an index, and the quantity of the items to remove from the array.


Deleting an Item from the UI
----------------------------

All the stuff related to UI relies on DOM Manipulation. To remove a node, we have the method `removeChild(element)`. As you can read, you have to locate the parent node to remove a child. This way is naturally weird but is how JavaScript works to remove elements in the DOM. 

You can look at the next guide to check [common actions in DOM manipulation](blog.garstasio.com/you-dont-need-jquery/dom-manipulation)