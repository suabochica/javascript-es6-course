Budget App
==========

You can check the app description in the file `budgety-planning-guide.pdf`. In big projects, before to start coding you have to plan to define an architecture to our application. In this case, we have to find the fundamental tasks of our project and put in a **TO-DO List**:

- Add event handler
- Get input values
- Add the new item to our data structure
- Add the new item to the user interface (UI)
- Calculate budget
- Update UI after calculating the budget

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

To create modules in JavaScript, you can use the **IIFE + Closures** combo. Check the code of the `app.js,` and you will see which data is private and which data is public in each module.
