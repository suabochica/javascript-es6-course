Introduction to JavaScript
==========================

What is JavaScript?
-------------------

_JavaScript is a lightweight, cross-platform, object-oriented computer programming language_

- *lightweight* means that is a language don't use much of memory of the computer and is composed by a simple syntax and features.
- *cross-platform*  means that can be used on multiple platforms and systems.
- *object-oriented* means that it is a language based on objects.

JavaScript is one of the three core technologies of the web development, so is most commonly used as a part of web pages. Today JavaScript can be used in different places:

- Client-side: JavaScript was traditionally only used in the browser.
- Server-side: Thanks to *node.js*, we can use JavaScript on the server as well.

JavaScript is what made modern web development possible through dynamic effects and interactivity. It is important to mention that today there are a ton of JavaScript libraries and frameworks out there that implement different architectures and help developers build complex apps more easily and faster than ever. All these libraries and frameworks  are just based on JavaScript, and so before using them developers need to be really good at JavaScript, they need to really understand it.

> What is the difference between library a Framework?
> *Library*: A library is just a file with functions/methods or other reusable code that you can link and use it in your own code.
> *Framework*: A framework is a broad term. Wikipedia says that framework is a universal, reusable software environment that provides particular functionality. Software frameworks may include support programs, compilers, code libraries, toolsets, and application programming interfaces (APIs) that bring together all the different components to enable development of a project or system.

Getting Started with JavaScript
-------------------------------

You can create JavaScript code in two ways:

- *Inline script:* Put your JavaScript code inside the `<script>` tag.
- *External script:* Put your JavaScript code in an external file and import it using the `<script src="path-to-file.js">`.

Variables and Data Types
------------------------

A *variable* is a container in which we can store a value in order to use it. By saving a value in a variable we don't have to write the variable each time we want to use it.

The *data type* of a value is an attribute that tells what kind of data that value can have. In other words, is a classification of data which tells the compiler or interpreter how the programmer intends to use the data. In JavaScript we have the next primitive data types:

- *Number:* Floating point numbers, for decimals and integers.
- *String:* Sequence of characters, used for text.
- *Boolean:* A logical data type that can only be `true` or `false`.
- *Undefined:* Data type of a variable which does not have a value yet.
- *Null*: Also means _non-existent_.
- 

JavaScript has a feature called *dynamic typing*. This means that the programmer doesn't have to manually define the data type of the variable. JavaScript figures out the data type of a variable on its own, meaning that we can even change the data type of a variable later in our code. So, this can be very useful, but it can also be the source of some difficult to find bugs. Exist a wrapper to avoid dynamic typing in JavaScript called *TypeScript*.

Variable Mutation and Type Coercion
-----------------------------------

A *type coercion* is a feature of javascript related with *dynamic typing*. Basically means, when you have different data types and you mix them together, JavaScripts tries to automatically figure out which of the variables it has to convert, and then converts them all to the same data type. Check the next examples:

```javascript
var name = 'Edward'
var age = 20

console.log(name + age) //-> 'Edward20' Applies type coercion over the age int data type and convert it into a string
console.log(age + age) //-> 40
```

*Variable mutation* is as his name says, change the value of a variable. consider the next example as a continuation of the code above:

```javascript
age = 'twenty'

console.log(age) //-> 'Twenty'
```

In this code, you change the values of the variable `age` from `20` to `twenty`. Notice that you didn't use the `var` keyword because is only used to declare the variables for the first time. It is important to know that the JavaScript compiler reads our code in a sequence of instructions line to line from up to down.

Operators
---------

*Operators* are constructs which behave generally like functions, but which differ syntactically or semantically from usual functions. Common simple operator types are:

- Arithmetic operators
- Comparison operators
- Assignment operators
- Logical operators

An important aspect of operators is the order of how the language programming executes these operations. In JavaScript, you have *operators precedents* to define which operators are executed first and which ones are executed later. The precedent is defined by maths. However, JavaScript counts with several operators and all the precedence of them are defined in the next [cheat sheet](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). With this context we can identify the values of the next operation:

```javascript
var randomOperationValue = 3 + 5 * 5 - 2

console.log(randomOperationValue) //-> '26'
```

If/Else Statement
-----------------

JavaScript like most of the other programming languages has a couple of *control structures*. These are features that allow us to execute only certain parts of our code –if/else statements– or to execute some parts even multiple times –loops–. The *if/else statements* allows us to make decisions with our code depending on some condition. An important aspect of the control structures is the *condition*. To avoid misunderstandings in JavaScript at the moment of defining a condition, you should understand the difference between the `==` and `===` operators. The main difference is that `==` is type coercion and `===` isn't. Is a good practice use `===` to have control over the type coercion feature of JavaScript.

Boolean Logic and Switch Statement
----------------------------------

*Boolean Logic* is a branch of the computer science which deals with the `true` and `false` values. To achieve this, you have to use several logical operators (AND `&&`, OR `||` and NOT `!`). Learn it, help you to master the if and else statements in programming languages. Below you can see the respective _truth tables_ of AND and OR logical operators. The truth tables allow us to see see the outcome of the operators at the moment of evaluating variables.

|*AND*  |True    |False  |
|-------|--------|-------|
|True   |True    |False  |
|False  |False   |False  |

- AND `&&` => True if *all* are true


|*OR*   |True   |False  |
|-------|-------|-------|
|True   |True   |True   |
|False  |True   |False  |

- OR `||` => True if *one* is true
- NOT `!` => Inverts true/false value
 
According we the next explanation we have the next examples:

```javascript
var age = 16;

age >= 20;      //-> False
age < 30;       //-> True
!(age < 30)     //-> False

age >= 20 && age < 30; //-> False
age >= 20 || age < 30; //-> True

```

The `switch` statement is another way to take decisions in JavaScript. It is proper to use when you have a lot of different cases for one variable, avoiding the abuse of `if/else if/else` statements. Below a switch statement example:

```javascript
var job = 'teacher';

switch:
    case 'teacher':
        console.log('Hohenheim teaches kids.');
        break;
    case 'driver':
        console.log('Hohenheim drives a car in Amestris.');
        break;
    case 'cop':
        console.log('Hohenheim fights crime.');
        break;
    default:
        console.log('Hohenheim does something else.');
        break;
```

JavaScript will now look at each of these cases one-by-one and decide which one is the correct one. The `break` keyword is needed in case that JavaScript decides that this is the correct case, then after this, it needs to break out and to finish the switch statement without a look at the other different cases.


Functions
---------

Imagine that you have a piece of code that you want to run a lot of times. Also, you want to use over and over again in our code. You can put this piece of code into a *function* instead of writing it over and over again. So functions are containers that hold a couple of lines of code. In these containers, you can pass arguments into them because the function can have some information from the outside and finally the function can return a result. You can think of functions like a machine that receives some inputs, do some stuff with it and generates an output. Functions are a very important tool to fight against the programming principle DRY (Don't Repeat Yourself). So in order to avoid repetition of code we usually use functions. In the next example we use functions to calculate an age and a retirement time:

```javascript
function calculateAge(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    
    return age;
}

var ageEdward = calculateAge(2000); //-> 18
var ageAlphonse = calculateAge(2002); //->16
var ageHohenheim = calculateAge(1900); //-> 118


function yearsUntileRetirement(name, year) {
    var age = calculateAge(year),
        retirement = 65 -age;
    if(retirement > 0) {
        console.log(name + ' retires in ' + retirement + ' years');
    } else {
        console.log(name + ' is already retired');
    }
}

yearsUntileRetirement('Edward', 2000); //-> 'Edward retires in 47 years'
yearsUntileRetirement('Alphonse', 2002); //-> 'Alphonse retires in 49 years'
yearsUntileRetirement('Hohenheim', 1900); //-> 'Hohenheim is already retired'
```

Statements and Expressions
--------------------------

Before to continue, it is a good idea understand that in JavaScript the functions could be defined in terms of *expressions* or *statements*. The difference between a statement and expressions is that an expression produces a value, an immediately outcome. While a statement just performs an action. Below you can see examples of each one:

```javascript
// Expressions

var x = 3;
3 + 2

// Statements
if (x === 5) {
    //Do something ...
}

```

In JavaScript you can identify if a function is defined in term of expression or statement according to the used syntax:

```javascript
function fnStatement() {
    // code
}

var fnExpression = function() {
    // code
}
```

Arrays
------

In the previous notes, inside the examples, we use different variables for different persons. These variables could be bundle all in one single variable. JavaScript have different ways to group data and one of them is *arrays*. The next code shows an array of names and an array of years:

```javascript
var names = ['Edward', 'Alphonse', 'Hohenheim'];
var years = new Array(2000, 2002, 1900);

console.log(names) //-> ['Edward', 'Alphonse', 'Hohenheim']
console.log(names[1]) //-> Alphonse
```

As you can see, exist two ways to define an array. The most commonly used is the first one. An array can hold as many different data types as we want. To access to an element of an array you should use the `index`. In JavaScript, the arrays are zero-based indexed, so the first element of the array has as the index the `0`. Also, JavaScript offers a set of functions to add/remove elements in an array, changing the original array:

- `.push(element)`: Adds an element in the last position of the array.
- `.unshift(element)`: Adds an element in the first position of the array.
- `.pop(element)`: Removes an element in the last position of the array.
- `.shift()`: Removes an element in the first position of the array.
- `.indexOf(element)`: Returns the index element passed as parameter.

Objects
-------

*Objects* is probably the most important subject in JavaScript. Similar to arrays, objects allow us to store several variables in a single variable. A difference between object and arrays is the way to access the elements. In an array, you use an order number and in an object, you use a specific name –a key–. In objects, you have a *key/value* pairs which mean that each value has a key. You use objects to group together different variables which have no particular order. In the next example we will use an object to define the data associated to a person:

```javascript
var edward = {
    name: 'Edward',
    lastName: 'Elric',
    yearOfBirth: 2000,
    job: 'Alchemist',
    isMarried: true
};


console.log(edward) //-> Prints the edward object
console.log(edward.job) //-> 'Alchemist'. To access the edward object you can use the dot notation
console.log(edward['yearOfBirth']) //-> 2000. To access the edward object you can also use the brackets notation

var alphonse =  new Object();

alphonse.name = 'Alphonse';
alphonse.lastName = 'Elric';
alphonse.yearOfBirth = 2002;
alphonse.job = 'Alchemist';
alphonse.isMarried = false;
```

As you can see, exist two ways to define an object. The most commonly used is the first one. Also, we have two ways to access the properties of an object: *dot notation* and *brackets notation*. Object mutation is done through the access property, similar to the array mutation.

> *What is the difference between a Class and Object*
> An object is a collection of related data. Object can have properties (variables that belong to object) and methods (functions that belong to object). We can access them using dot or bracket notation.
> Class works like function constructor plus you can define methods inside of a class and they will be inherited by instances of this class.


Objects and Methods
------------------

*Object methods* is a specific object's feature in JavaScript. As you can see and object can hold different types of data such and int, a string, a boleean and inclusively an array. But, that's not all an object can hold, so objects can also have other objects or functions. Below you ca see and code example of an object that hold an array and a function expression:

```javascript
var edward = {
    name: 'Edward',
    lastName: 'Elric',
    yearOfBirth: 2000,
    job: 'Alchemist',
    isMarried: true
    family: ['Trisha', 'Hohenheim', 'Alphonse'],
    calculateAge: function(yearOfBirth) {
        return 2018 - yearOfBirth;
    }
};

console.log(edward); //-> Prints the edward object
console.log(edward.family); //-> ['Trisha', 'Hohenheim', 'Alphonse']
console.log(edward.family[2]); //-> 'Alphonse'
console.log(edward.calculateAge(2000)); //-> 18

```

The `calculateAge` key inside the edward object is just a variable, then you assign a function to it. To access the `calculateAge` function you can use the dot notation. So, objects can contain functions, and these functions are called methods. With this context, you can say that the functions `push(element)` and `pop()` are methods of the `Array` object. Now, you can improve the `calculateAge()` function expression because you could use the `yearOfBirth` property inside the edward object to calculate the age. To achieve that we can use the `this` keyword:

```javascript
var edward = {
    name: 'Edward',
    lastName: 'Elric',
    yearOfBirth: 2000,
    job: 'Alchemist',
    isMarried: true
    family: ['Trisha', 'Hohenheim', 'Alphonse'],
    calculateAge: function() {
        this.age = 2018 - this.yearOfBirth;
    }
};
edward.calculateAge();
console.log(edward); //-> Pritnst the edward object with the age property

```

The `this` in this example will refer to the object edward. So, edward is the object that has the `calculateAge()` method and the `yearOfBirth` property, and the `this` keyword is able to retrieve these values rigth off it's own object. In the other hand, you can automatically store the `calculateAge()` result into the edward object. The `this.age` property allow us to achieve that. In `calculateAge()` method you are creating a new property, calculate the age and assign the calculated age to this property. The profit with this structure and the use of `this` is flexibility, because if you create another object with a different `yearOfBirth` the age will be calculated with this value, excluding the context of the edward object.