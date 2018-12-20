Introduction to JavaScript
==========================
- [Introduction to JavaScript](#introduction-to-javascript)
  - [What is JavaScript?](#what-is-javascript)
  - [Getting Started with JavaScript](#getting-started-with-javascript)
  - [Variables and Data Types](#variables-and-data-types)
  - [Variable Mutation and Type Coercion](#variable-mutation-and-type-coercion)
  - [Basic Operators](#basic-operators)
  - [Operator Precedence](#operator-precedence)
  - [If/Else Statement](#ifelse-statement)
  - [Boolean Logic and Switch Statement](#boolean-logic-and-switch-statement)
  - [Falsy and Truthy Values](#falsy-and-truthy-values)
  - [Functions](#functions)
  - [Statements and Expressions](#statements-and-expressions)
  - [Arrays](#arrays)
  - [Objects](#objects)
  - [Objects and Methods](#objects-and-methods)
  - [Loops](#loops)
    - [While Loop](#while-loop)
    - [For Loop](#for-loop)
  - [Important Note: ES5, ES6/ES2015 and ES2016](#important-note-es5-es6es2015-and-es2016)

What is JavaScript?
-------------------

_JavaScript is a lightweight, cross-platform, object-oriented computer programming language_

- *lightweight* means that is a language don't use much of memory of the computer and is composed by a simple syntax and features.
- *cross-platform*  means that can be used on multiple platforms and systems.
- *object-oriented* means that it is a language based on objects.

JavaScript is one of the three core technologies of the web development, so is most commonly used as a part of web pages. Today JavaScript can be used in different places:

- **Client-side**: JavaScript was traditionally only used in the browser.
- **Server-side**: Thanks to *node.js*, we can use JavaScript on the server as well.

JavaScript is what made modern web development possible through dynamic effects and interactivity. It is important to mention that today there are a ton of JavaScript libraries and frameworks out there that implement different architectures and help developers build complex apps more efficiently and faster than ever. All these libraries and frameworks are just based on JavaScript, and so before using them developers need to be good at JavaScript, they need to understand it.

> ### What is the difference between library a Framework?
> **Library**: A library is just a file with functions/methods or other reusable code that you can link and use it in your own code.
> **Framework**: A framework is a broad term. Wikipedia says that framework is a universal, reusable software environment that provides particular functionality. Software frameworks may include support programs, compilers, code libraries, tool sets, and application programming interfaces (APIs) that bring together all the different components to enable development of a project or system.

Getting Started with JavaScript
-------------------------------

You can create JavaScript code in two ways:

- **Inline script:** Put your JavaScript code inside the `<script>` tag.
- **External script:** Put your JavaScript code in an external file and import it using the `<script src="path-to-file.js">`.

Variables and Data Types
------------------------

A **variable** is a container in which we can store a value in order to use it. By saving a value in a variable we don't have to write the variable each time we want to use it.

The **data type** of a value is an attribute that tells what kind of data that value can have. In other words, is a classification of data which tells the compiler or interpreter how the programmer intends to use the data. In JavaScript we have the next primitive data types:

- **`Number:`** Floating point numbers, for decimals and integers.
- **`String:`** Sequence of characters, used for text.
- **`Boolean:`** A logical data type that can only be `true` or `false`.
- **`Undefined:`** Data type of a variable which does not have a value yet.
- **`Null:`** Also means _non-existent_.

JavaScript has a feature called **dynamic typing**. This means that the programmer doesn't have to define the data type of the variable manually. JavaScript figures out the data type of a variable on its own, meaning that we can even change the data type of a variable later in our code. So, this can be very useful, but it can also be the source of some difficult to find bugs. Exist a wrapper to avoid dynamic typing in JavaScript called **TypeScript**.

Variable Mutation and Type Coercion
-----------------------------------

A **type coercion** is a feature of javascript related with **dynamic typing**. Basically means, when you have different data types and you mix them together, JavaScripts tries to automatically figure out which of the variables it has to convert, and then converts them all to the same data type. Check the next examples:

```javascript
var name = 'Edward'
var age = 20

console.log(name + age) //-> 'Edward20' Applies type coercion over the age int data type and convert it into a string
console.log(age + age) //-> 40
```

**Variable mutation** is as his name says, change the value of a variable. consider the next example as a continuation of the code above:

```javascript
age = 'twenty'

console.log(age) //-> 'Twenty'
```

In this code, you change the values of the variable `age` from `20` to `twenty`. Notice that you didn't use the `var` keyword because is only used to declare the variables for the first time. It is important to know that the JavaScript compiler reads our code in a sequence of instructions line to line from up to down.

Basic Operators
---------------

**Operators** are constructs which behave generally like functions, but which differ syntactically or semantically from usual functions. Common simple operator types are:

- Arithmetic operators
- Comparison operators
- Assignment operators
- Logical operators

An essential aspect of operators is the order of how the language programming executes these operations. In JavaScript, you have operators precedents to define which operators are run first and which ones are completed later. Maths establishes the precedent. However, JavaScript counts with several operators, and all the precedence of them are defined in the next [cheat sheet](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Operator_Precedence). With this context we can identify the values of the following operation:

```javascript
var randomOperationValue = 3 + 5 * 5 - 2

console.log(randomOperationValue) //-> '26'
```

Operator Precedence
-------------------

As I mentioned before, operator precedence is just , So to illustrate the concept lets analyse the next code where given a `birthYear` we will determine if the person is full age.

```js
var now = 2018;
var birthYearEdward = 1991;
var fullAge = 18;

var isFullAge = now - birthYearEdward >= fullAge; // True
```

So, our attention is in the last line of code. There we are using three operators `>=`, `-` and `=`. To validate the precedence of each operator we can check the JavaScript Operator Precedence Table shared before. In that table we have:

| Precedence | Operator type         | Associativity | Individual operators |
|------------|-----------------------|---------------|----------------------|
| 3          | Assignment            | right-to-left | `… = …`              |
| 11         | Greater Than Or Equal | left-to-right | `… >= …`             |
| 13         | Subtraction           | left-to-right | `… - …`              |

Now, how does JavaScript know which operator execute first? Imagine that first the `birthYearEdward >= fullAge` is executed. This would return a true/false value. Then we would do `now - true` but this would be nothing significant and of course it would not be what we want.

Instead we want that `now - birthYearEdward` will executed first an then compare that age with the `fullAge` value. This is the execution that follow JavaScript because as you can see the `-` operator has a higher precedence than the `>=` operator. Lastly the `=` is executed because this operator has a lower precedence that the others.

Let's introduce a multiply assignment example to check what means the associativity column of the table:

```js

// Multiple Assignment
var x, y

x = y = (3 + 5) * 4 - 6 // 26

// More operators
x *= 2 // 54
x += 10 // 64
x++ // 65
x-- // 64
```

The next table show the descriptions for the new operators:

| Precedence | Operator type         | Associativity | Individual operators |
|------------|-----------------------|---------------|----------------------|
| 13         | Addition              | left-to-right | `… + …`              |
| 14         | Multiplication        | left-to-right | `… * …`              |
| 20         | Grouping              | n/a           | `( … )`              |

So, How JavaScript will execute `x = y = (3 + 5) * 4 - 6`? First it will start with `(3 + 5)` because the grouping `( … )` operator has the highest precedence. Then we got `8`. Second, JavaScript will execute `8 * 4`, because the `*` operator has a higher precedence than `-`. Then we got `32`. Third it will run `32 - 6` to get `26`.

So, at this moment we have `x = y = 26` and with this step, is time to start to review the associativity property. The associativity means is the direction in which the operation is executed. If you look the `=` has a right-to-left associativity. That is the reason what we get the `26` value instead of `undefined`. If the `=` operator had left-to-right associativity JavaScript will throw `undefined`

If/Else Statement
-----------------

JavaScript like most of the other programming languages has a couple of **control structures**.

> ### Control Structures
> Control structures are features that allow us to execute only certain parts of our code –if/else statements– or to execute some parts even multiple times –loops–

The **if/else statements** allows us to make decisions with our code depending on some **condition**. To avoid misunderstandings in JavaScript at the moment of defining a condition, you should understand the difference between the `==` and `===` operators. The main difference is that `==` is type coercion and `===` isn't. Is a good practice use `===` to have control over the type coercion feature of JavaScript.

Boolean Logic and Switch Statement
----------------------------------

**Boolean Logic** is a branch of the computer science which deals with the `true` and `false` values. To achieve this, you have to use several logical operators (AND `&&`, OR `||` and NOT `!`). Learn it, help you to master the if and else statements in programming languages. Below you can see the respective _truth tables_ of AND and OR logical operators. The truth tables allow us to see see the outcome of the operators at the moment of evaluating variables.

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


Falsy and Truthy Values
-----------------------

In JavaScript, a _Falsy_ value is a value that is considered `false` when evaluated in and `if/else` statement condition. These values are:

+ `undefined`
+ `null`
+ `0`
+ `''`
+ `NaN`

So to illustrate this concept let's review the next example:

```js
var height;

if (height) {
    console.log('Variable is defined')
} else {
    console.log('Variable has NOT been defined') // Printed value
}
```

In the above code, we declared the variable `height` but we never defined it. So when JavaScript evaluate the value in the `if/else` statement we got `undefined` and convert it in `false`. That is why we call them _Falsy_, because they are not exactly false, but they will turn out to be `false` when evaluated in a `if/else` condition.

Also, we have _Truthy_ values and are values that are considered `true` when evaluated in an `if/else` statement condition. So, basically, it is all the values that are not _Falsy_. To illustrate it, let fix the last example:

```js
var height = 20;

if (height) {
    console.log('Variable is defined') // Printed value
} else {
    console.log('Variable has NOT been defined')
}
```

Here, `height` is defined and then is evaluated as `true` in the `if/else` statement.

Functions
---------

Imagine that you have a piece of code that you want to run a lot of times. Also, you want to use over and over again in our code. You can put this piece of code into a *function* instead of writing it over and over again.

Functions are containers that hold a couple of lines of code. In these containers, you can pass arguments into them because the function can have some information from the outside and finally the function can return a result. You can think of functions like a machine that receives some _inputs_, do some stuff with it and generates an _output_. Functions are a vital tool to fight against the programming principle **DRY (Don't Repeat Yourself)**. So to avoid repetition of code we usually use functions. In the next example we use functions to calculate age and a retirement time:

```javascript
function calculateAge(yearOfBirth) {
    var age = 2018 - yearOfBirth;

    return age;
}

var ageEdward = calculateAge(2000); //-> 18
var ageAlphonse = calculateAge(2002); //->16
var ageHohenheim = calculateAge(1900); //-> 118


function yearsUntilRetirement(name, year) {
    var age = calculateAge(year),
        retirement = 65 - age;
    if(retirement > 0) {
        console.log(name + ' retires in ' + retirement + ' years');
    } else {
        console.log(name + ' is already retired');
    }
}

yearsUntilRetirement('Edward', 2000); //-> 'Edward retires in 47 years'
yearsUntilRetirement('Alphonse', 2002); //-> 'Alphonse retires in 49 years'
yearsUntilRetirement('Hohenheim', 1900); //-> 'Hohenheim is already retired'
```

Statements and Expressions
--------------------------

Before to continue, it is a good idea understand that in JavaScript the functions could be defined in terms of **expressions** or **statements**. The difference between a statement and expressions is that an expression _produces a value_, an immediately outcome. While a statement just _performs an action_. Below you can see examples of each one:

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

In the previous notes, inside the examples, we use different variables for different persons. These variables could be bundle all in one single variable. JavaScript have different ways to group data and one of them is **arrays**. The next code shows an array of names and an array of years:

```javascript
var names = ['Edward', 'Alphonse', 'Hohenheim'];
var years = new Array(2000, 2002, 1900);

console.log(names) //-> ['Edward', 'Alphonse', 'Hohenheim']
console.log(names[1]) //-> Alphonse
```

As you can see, exist two ways to define an array. The most commonly used is the first one. An array can hold as many different data types as we want. To access to an element of an array you should use the `index`. In JavaScript, the arrays are zero-based indexed, so the first element of the array has as the index the `0`. Also, JavaScript offers a set of functions to add/remove elements in an array, changing the original array:

- `.push(element)`: Adds an element in the last position of the array.
- `.unshift(element)`: Adds an element in the first position of the array.
- `.pop()`: Removes an element in the last position of the array.
- `.shift()`: Removes an element in the first position of the array.
- `.indexOf(element)`: Returns the index element passed as parameter.

Objects
-------

**Objects** is probably the most important subject in JavaScript. Similar to arrays, objects allow us to store several variables in a single variable. _A difference between object and arrays is the way to access the elements_. In an array, you use an order number and in an object, you use a specific name –a key–. In objects, you have a _key/value_ pairs which mean that each value has a key. You use objects to group together different variables which have no particular order. In the next example we will use an object to define the data associated to a person:

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

As you can see, exist two ways to define an object. The most commonly used is the first one. Also, we have two ways to access the properties of an object: _dot notation_ and _brackets notation_. Object mutation is done through the access property, similar to the array mutation.

> ### What is the difference between a Class and Object
> An **Object** is a collection of related data. Object can have properties (variables that belong to object) and methods (functions that belong to object). We can access them using dot or bracket notation. **Class** works like function constructor plus you can define methods inside of a class and they will be inherited by instances of this class.

Objects and Methods
------------------

**Object methods** is a specific object's feature in JavaScript. As you can see and object can hold different types of data such and `int`, a `string`, a `boolean` and inclusively an `array`. But, that's not all an object can hold, so objects can also have other objects or functions. Below you can see and code example of an object that hold an array and a function expression:

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

The `calculateAge` key inside the edward object is just a variable, then you assign a function to it. To access the `calculateAge` function you can use the dot notation. _So, objects can contain functions, and these functions are called methods_. With this context, you can say that the functions `push(element)` and `pop()` are methods of the `Array` object. Now, you can improve the `calculateAge()` function expression because you could use the `yearOfBirth` property inside the edward object to calculate the age. To achieve that we can use the `this` keyword:

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
console.log(edward); //-> Prints the edward object with the age property

```

The `this` in this example will refer to the object `edward`. So, `edward` is the object that has the `calculateAge()` method and the `yearOfBirth` property, and the `this` keyword is able to retrieve these values right off its own object. In the other hand, you can automatically store the `calculateAge()` result into the edward object. The `this.age` property allow us to achieve that. In `calculateAge()` method you are creating a new property, calculate the age and assign the calculated age to this property. The profit with this structure and the use of `this` is flexibility, because if you create another object with a different `yearOfBirth` the age will be calculated with this value, excluding the context of the edward object.

Loops
-----

**Loops** are another family of control structures in JavaScript. Loops are a very important aspect of any programming language, because they help to the programmer to handle repetitive task. Then instead of write ten lines of code to execute the same task, just have to follow the loop structure to achieve the same result with few lines of code. Loops structure is compose of: a _counter_, a _condition_ and an _action to update the counter_. JavaScript has two popular types of loops: `while` and `for`.

### While Loop

Below you see a `while` loop structure for a task that prints the numbers from 0 to 9:

```javascript
var i = 0; // The counter

while (i < 10) { // The condition
    console.log(i);
    i++; // Action to update the counter
}
```

### For Loop

Below you see a `for` loop structure to accomplish the same task:

```javascript
for (var i = 0; i < 10; i++) { // All the elements of a loop are in this line
    console.log(i);
}
```

Loops are a good control structure to interact with arrays:

```javascript
names = ['Edward', 'Alphonse', 'Trisha', 'Hohenheim'];

for (var i = 0; i < names.length; i++) { // .length() is a method of the array object that returns the length of the array
    console.log(names[i]);
}

// To go through the array from the last to the first element
for (var i = names.length - 1; i >= 0; i--) {
    console.log(names[i]);
}
```

Also the for loop have mechanism to given a condition `break` or `continue` the flow of the loop. The next example print the number from 1 to 5 less the 3:

```javascript
for (var i = 0; i < 5; i++) {
    console.log(i);

    if (i === 3)
        break;
}

for (var i = 0; i < 5; i++) {
    if (i === 3)
        continue;

    console.log(i);
}
```

Important Note: ES5, ES6/ES2015 and ES2016
------------------------------------------

It's important to talk about JavaScript version because every modern developer should know where is the context in the JavaScript community and how the language programming is adapting the changes of several topics today. The next list is a very short history of JavaScript:

- **1996**: Change from LiveScript to JavaScript to attract Java developers –a marketing action–. But, **Java has almost nothing to do with Java**.
- **1997**: ECMAScript 1 became the first version of the JavaScript language standard. This means that ECMA Script is the language standard and JavaScript is the language in practice. ECMA is an international organization.
- **2009**: ECMAScript 5 (ES5) was released with lots of new features. However, it took many years for browsers to implement all these changes, and until few years ago developers can use ES5 without any restrictions.
- **2015**: ECMAScript 2015 (ES2015) was release as the **the biggest update ever** with a lot of new features. These version updates are a really big deal for JavaScript and the whole community. You will listen that this version is also called ES6, but it's better use ES2015 because the ECMA organization will release each year new version with a few minor updates.

So, how is JavaScript today and which version should and we can use?

- **ES5** is fully supported in all modern browsers and is ready to use from 2016.
- **ES2015** is only partial support in modern browsers, no support in older browsers. So, it isn't recommendable to use it in production.
- **ES2016** is almost no support in modern browsers so, for this reason, isn't recommendable to use it in production. However, the magnitude of this version is few important because just add on or two small features to the language.

In conclusion, _it's recommendable to use ES5_. Additionally, it's important to learn to code in ES5 and understand it because almost all the tutorials and code you find on the web today is still in ES5, and it's easier to learn ES5 and then upgrade to ES2015.


