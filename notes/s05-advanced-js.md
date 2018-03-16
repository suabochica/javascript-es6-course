Advanced JavaScript: Objects and Functions
==========================================

*In JavaScript everything is an Object* well, almost everything, because in JavaScript you have two big types of values:

1. **Primitives**
    - Numbers
    - Strings
    - Booleans
    - Undefined
    - Null
2. **Objects** 
    - Arrays
    - Functions
    - Objects
    - Dates
    - Wrappers for numbers, strings, booleans, ... *everything else*

This makes JavaScript so unique and different from other programming lenguages.

Now that we see that in JavaScript almost everything is an object, let's look at **Object-Oriented (OO) programming**. In very simple terms, OO programming makes heavy use of objects, properties, and methods, and these objects interact with one another to form complex applications. We use objects to store data, structure applications in modules and keep code clean. So far, we just use simple objects to holding some data (Remember `edward`, `alphonse` objects before notes). Actually, exist a better way to create these objects. Imagine that you have a blueprint from which you can generate as many objects you want. For example, you have the next special object `Person`:

|Person             |
|-------------------|
|`name`             |
|`yearOfBirth`      |
|`job`              |
|`calculateAge()`   |

From this blueprint, you can create a lot of person objects as `edward` or `alphonse`. In other programming languages this is called a **class**, but in JavaScript, it's more accurate call it **constructor** or **prototype**. So, base in this constructor you can create as many instances as you want. as for example:

|`var edward`       |`var alphonse`     |
|-------------------|-------------------|
|Edward             |Alphonse           |
|1990               |1993               |
|Statal Alchemist   |Alchemist          |
|`calculateAge()`   |`calculateAge()`   |

Now it's time to do one step further, with **Inheritance**. In simple terms, inheritance is when one object is based on another object, and this new object has access to the another object's properties and methods. So, from our `Person` example, now you want to have an `Athlete` constructor beside the person constructor with a couple of different properties and methods:

|Athlete            |
|-------------------|
|`olympics`         |
|`olympicsMedals`   |
|`allowedOlympics()`|

But an athlete is also a person because an athlete also has a `name` a `yearOfBirth`, and a `job`. So, what we can be doing that the athlete constructor inherits the properties and methods from the person constructor to get the next constructor:

|Athlete            |
|-------------------|
|`olympics`         |
|`olympicsMedals`   |
|`allowedOlympics()`|
|`name`             |
|`yearOfBirth`      |
|`job`              |
|`calculateAge()`   |


This allows us to reuse code and create more logical programs. Inheritance concept is traversal to different programming languages because they have OO features. Now, let's see how JavaScript handle inheritance. JavaScript is a **prototype-based** language which means that inheritance works by using `prototypes`. In practice, it means that each and every JavaScript object has a prototype property which makes inheritance possible in JavaScript. Let's look how inheritance is executed in JavaScript behind the scenes with our `Person` constructor and the `edward` instance.

|`var edward`       |`Person`           |`Object`           |`null(>)`  |
|-------------------|-------------------|-------------------|-----------|
|Edward             |-                  |`Prototype(>)`     |-          |
|1990               |-                  |`hasOwnProperty()` |-          |
|Statal Alchemist   |`Prototype(>)`     |`isPrototypeOf()`  |-          |
|`Prototype(>)`     |`calculateAge()`   |...                |-          |
 
 > "``(>)" Symbol to represent the **prototype chain** flow, that establishes the steps to get inheritance in JavaScript
 
 The above table illustrates the prototype chain from `edward` to null (always is the ends of the prototype chain). When you try to access a certain method, property or object, JavaScript will try to find the method on that exact object. If cannot find it, it will look in the object's prototype, which is the prototype property of its parent. So its move up in the prototype chain. If the method is still not there this continues until there is no more prototype to look at, which is `null`, the only type that doesn't have a prototype, then return `undefined`. Also, in the above table, you see an `Object` cell that represents the `Object` type in javascript and has his default prototype property. In summary:
 
 - Every JavaScript object has a prototype property, which makes inheritance possible in JavaScript.
 - The prototype property of an object is where you put methods and properties that we want **other objects to inherit**.
 - The constructor's prototype property is **not** the prototype of the constructor itself, it's the prototype property of **all** the instances that are created through it.
 - When a certain method or property is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found (or not) generating the **prototype chain**.

Creating Objects: Function Constructors
----------------------------------------

As we see before, you can create an object used with the object literal notation. However, you now know that the **function constructor** (maybe this is the most popular way to create objects) is a pattern that allows us to create a blueprint for an object and through instances, we can create objects based on this blueprint. Having that in mind, please check the next code:

> Pattern: The standard way to solve a problem always in the same way.

```javascript
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    // Method inheritance through the constructor function
    this.caculateAge = function() {
        console.log(2018 - this.yearOfBirth);
    }
}

var edward = new Person('Edward', 1991, 'Statal Alchemist');
var alphonse = new Person('Alphonse', 1995, 'Alchemist');
var hohenheim = new Person('Hohenheim', 1891, 'Statal Alchemist');

// Remember call the function to create the execution context
edward.caculateAge();
alphonse.caculateAge();
hohenheim.caculateAge();
```

Above, the function constructor is the `Person` variable. It is a convention called the function constructor with the capitalizing case. Now, How it works? First, we have to understand what the `new` operator does. When we use the `new` operator initially a brand new **empty object** is created. After that, the constructor function (`Person` in this case) is called with the arguments that we specified. As we already know, calling a function creates a new execution context that also has a `this` variable attached. Remember that in a regular function call the `this` variable point to the global object, but in the constructor function scenario, this would not be useful, because in that case, you would simply set all these properties on the global object and we, of course, don't want that behavior. Our goal is that the `this` keyword points to the empty object that was created with the `new` operator, and is the `new` keyword the responsible to achieve this. In summary, what the `new` operator does is to point the `this` variable, not the global object but to this new empty object created in the beginning when using the `new` keyword. Then the properties `name` and `job` are set to the new empty object. Next, if the constructor function does not return anything the result is simply the object that was created with the `new` operator with the properties that the code define. Finally, this object is assigned to the variable that instantiates the function constructor.

To add **Inheritance** in the code you can see the `calculateAge` function. Basically, you can add a method to the function constructor in a similar way a property is added. In the above code, the objects `alphonse` and `hohenheim` can use the `calculateAge()` because the method is attached to the function constructor, allowing inheritance. Now, in the last lecture, we have learned that we have to add all the methods and properties that we want to be inherited into the constructor's prototype property. The next code shows the way to use inheritance through the `prototype` property of the function constructor.

```javascript
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// Method inheritance through the prototype property of the constructor function
Person.prototype.caculateAge = function() {
    console.log(2018 - this.yearOfBirth);
}

// Property inheritance through the prototype property of the constructor function, but it is not common.
Person.prototype.lastName = 'Elric';

var edward = new Person('Edward', 1991, 'Statal Alchemist');
var alphonse = new Person('Alphonse', 1995, 'Alchemist');
var hohenheim = new Person('Hohenheim', 1891, 'Statal Alchemist');

// Same result as before
edward.caculateAge();
alphonse.caculateAge();
hohenheim.caculateAge();

console.log(edward.lastName); // Elric
console.log(alphonse.lastName); // Elric
console.log(hohenheim.lastName); // Elric
```

This code is a prove that inheritance really works in JavaScript.

The Prototype Chain in the Console
----------------------------------

The browser console is not just to logs, also allow us to trace the prototype chain of the objects. If you inspect the `edward` object you will get:

```javascript
edward
Person {
    name: "Edward",
    yearOfBirth: 1991,
    job: "Statal Alchemist"
}
job: "Statal Alchemist"
name: "Edward"
yearOfBirth: 1991
__proto__: // Prototype of the Person Object
    calculateAge: f calculateAge()
    lastName: "Elric"
    constructor: f(name, yearOfBirth, job)
    __proto__: // Prototype of the Object Object
        ...
        hasOwnProperty: f hasOwnProperty()
        // All the Object Object methods

```

As you can see, the console shows us all the information of the prototype chain for the `edward` object. As you know, all the prototype chain ends in the `null` type but before pass to the `Object Object` function constructor. If for that reason that we can use the methods of this object as `hasOwnProperty()`.

```javascript
edward.hasOwnProperty('job'); //-> true
edward.hasOwnProperty('lastName'); //-> false, this property belong to the function constructor Person
```

In the same way, you can track the prototype chain of an array:

```javascript
x = [0, 1, 2, 3, 5];
console.info(x);

(5)[0, 1, 2, 3, 5];
0: 0
1: 1
2: 2
3: 3
4: 5
length: 4 // There is our fomous property used to set the loop limits
__proto__: Array(0) // Prototype of the Array Object
    ...
    pop: f pop()
    push: f push()
    unshift(): f unshift()
    // All the Array Object methods
    __proto__: // Prototype of the Object Object
        ...
        hasOwnProperty: f hasOwnProperty()
        // All the Object Object methods
```

Voila!. There is the property `length` and the methods `push()` and `pop()` used before in the section where we review the array type in javascript.

Creating Objects: `Object.create`
---------------------------------

`Object.create` is another method to create objects that inherit from the prototype. In this method, the process is a little bit different. First, you define an object that will act as the prototype and then create a new object based on that prototype. Check the next code:

```javascript
var homunculusProto = {
	calculateAge: function() {
		console.log(2018 - yearOfBirth); //I know, yearOfBirth is not defined yet, but...
	}
}

var wrath = Object.create(homunculusProto);

// This is not an ideal way, because we are adding the properties to an empty object
wrath.name = "Bradley";
wrath.yearOfBirth = 1889;
wrath.job = "Furher";

// A better way using the second parameter in the Object.create method, but is weird the form as the properties are defined
var pride = Object.create(homunculusProto, 
	{
		name: {value: "Selim"},
		yearOfBirth: {value: 1800},
		job: {value: "Shadowhunter"}
	}
);

```

The `homunculusProto` is the prototype that acts as a reference in the `Object.create` method. In this case, `wrath` and `pride` inherit the `calculateAge()` method from the prototype `homunculusProto`. The difference between **Object.create** and the **Function Constructor pattern** is that `object.create` builds an object that inherits directly from the prototype that we passed into the first argument, white the **function constructor** inherits from the constructor's prototype property. Actually, one of the biggest benefits of the `object.create` is that allows us to implement a really complex inheritance structure in an easier way because it allows us to directly specify which object should be a prototype.

Primitives vs Objects
---------------------

If you review the first part of this document, you will find what is a primitive and what is an object. Now we will go deeper into this two concept because the JavaScript engine manages them in different ways. A significant difference between primitives and objects is that variables containing primitives hold that data inside of the variable itself. On the other hand, the variables associated with object do not include the object. Instead, they contain a reference to the place in memory where stores the object. Let's see this in practice:

```javascript
var a = 20;
var b = a;

a = 40;

console.log(a); //-> 40
console.log(b); //-> 20
```

This work as expected, because the `b` assignation is before mutating `a`. Then the value of `a` is 40, and the value of `b` is 20. This means that each of the variables holds their copy of the data and they do not reference anything. Now it is object's turn:

```javascript
var objectOne = {
 name = "edward",
 age = 27
};
var objectTwo = objectOne;

objectTwo.age = 30

console.log(objectOne.age); //-> 30
console.log(objectTwo.age); //-> 30
```

In this case, both values are 30. That is because when we said `objectTwo = objectOne` we did not create a new object, we create a new reference which points to `objectOne`. So, `objectOne` and `objectTwo` both hold a reference that point to the same object in the memory. For this reason when we change the age in `objectOne` this change is also reflected in `objectTwo`. In fact, it is the same object. Now it is time to pass how these behaviors are in functions:

```javascript
var age = 27;
var object = {
    name: "Alphonse",
    city: "Central"
}

function change(a, b) {
    a = 30;
    b.city = "Ishbal"
}

change(age, object);

console.log(age); //-> 27
console.log(object.city); //-> Ishbal
```

Here we pass the `age` variable holding a primitive and an `object` variable holding a reference to an object into `change()` function. When this function is invoked attempted to change the argument that we passed into it. In the `console.log,` we see the same behavior as before: the primitive has remained unchanged, and the city in the object has changed from Central to Ishbal. This shows us that when we pass a primitive as a function parameter, a simple copy is created. So you can change `a` as much as you want but the value of `age` will never be affected because it is a primitive. But when passing the object, it is not the object that we give; we are passing the reference to the object. You have to be aware of this behaviors because this can lead to some unexpected results.

First Class Functions: Passing Functions as Arguments
-----------------------------------------------------

Already you know that functions are also objects. Then it makes sense that with functions you can do the same things that you can do with objects. Below, some facts about functions:

- A function is an instance of the `Object` type.
- A function behaves like any other object.
- You can store functions in a variable.
- You can pass a function as an argument to another function.
- You can return a function from a function. 

All these facts allow us to talk about **first-class functions** in JavaScript. We already do this in the pig game code challenge, at the moment to add event listeners. Now let's check an example where a function can accept another function as an argument, with the context of do some calculations over an array with years of birth:

```javascript
var years = [1958, 1962, 1982, 1985, 1991, 1995];

function arrayCalculations(arrayArgument, callbackFunction) {
    var arrayResponse = [];

    for (var i = 0; i < arrayArgument.length; i++) {
        arrayResponse.push(callbackFunction(arrayArgument[i]));
    }

    return arrayResponse;
}

function calculateAge(yearOfBirth) {
    return 2018 - yearOfBirth;
}

function isFullAge(age) {
    return age >= 18;
}

var ages = arrayCalculations(years, calculateAge);
console.log(age); //-> [60, 56, 36, 33, 27, 23]

var fullAges = arrayCalculations(years, ages);
console.log(age); //-> [True, True, True, True, True, True]
```

In the above code, the `arrayCalculations()` function is a generic function that will allow us to do different calculations over the array that receives as an argument. The `caculateAge()` and the `isFullAge()` functions are **callback functions** that you will pass into `arrayCalculations` an this functions will then call them later. In this example, the `arrayCalculations()` will call the `callbackFunction` when the code push an element in the `arrayResponse`. In summary, the code has a generic function which loops over an input array. Then you gave it a function as input which is used to calculate something based on each element of the array. Also, you have created a bunch of different callbacks functions –you can create even more– to do a specific task. This is a better way because it creates modular and readable code instead of having a one big function calculating all this stuff at the same time. Each of these callback functions has a simple and a single task, and this is an excellent practice.

First Class Functions: Functions Returning Functions
----------------------------------------------------

To understand this first-class feature. Let 's create a function which according to a job will print different interview questions. Then for each role, you will return the function that builds a string using the person's name as an input (i.e., a function returning another function). Please, check the next code:

```javascript
function interviewQuestion(job) {
  if (job === 'alchemist') {
    return function(name) {
      console.log(name + ', Did you an human transmutation?');
    }
  } else if (job === 'statal') {
    return function(name) {
      console.log('Why do you decide be an army dog, ' + name + '?');
    }
  } else {
    return function(name) {
      console.log('Hi' + name + '. Do you want practice alchemy');
    }
  }
}

var alchemistQuestion = interviewQuestion('alchemist')
var statalQuestion = interviewQuestion('statal')

alchemistQuestion('Alphonse');
statalQuestion('Edward');
statalQuestion('Roy');

// Another way to call the interview functions without declare a var
interviewQuestion('alchemist')('Izumi');
```

The `interviewQuestion()` function return a function instead of return a value. In JavaScript, you can return a function, because as you know, functions are always first-class functions and then they are effectively objects. In summary, the `interviewQuestion()` function is returning objects. Also, remember that these returned functions can be stored in variables. It is the case of the  `alchemistQuestion` and `statalQuestion` variables. The `alchemistQuestion` will be the anonymous function returned when the jab is `alchemist,` and the `statalQuestion` will be the anonymous function returned when the job is `statal`. It is the reason for you can pass a `name` argument to this variables. This reference is the same thing that stores a function expression in a variable. Again, with this method, we can create a generic function (e.g., the `interviewQuestion()` function), and then create a bunch of more specific function (e.g. `alchemistQuestion` and `statalQuestion`) based on that generic function. You can use these specific questions as many times you want. The last line of the code is a different way to interact with functions that return functions. The call `interviewQuestion('alchemist')` will return a function (the anonymous function that receives `name` as argument). So when you write `interviewQuestion('alchemist')('Izumi')` you are calling the anonymous function inside `interviewQuestion()`. The advantage of this syntax is that you don't even need to store the anonymous function in a variable. This is possible because JavaScript engine reads the code from left to right.

Immediately Invoked Function Expressions (IIFE)
-----------------------------------------------

**IIFE** is a typical pattern in JavaScript, and to illustrate it, we can follow the next example. You want to create a silly game where we win the game if a random score from zero to nine is greater or equal to five, and lost if it's smaller. But we want to keep the score hidden in this game. So, the first approach is the next one:


```javascript
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();
```

But, you can do this in a different way using IIFE. If the only purpose is to hide the score variable from the outside, so which means creating a private variable, then you don't need to declare a whole function with a name and the call it. The next code is an IIFE for this context:

```javascript
(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();
```

The first detail in the code example is that we have to put our anonymous function inside a `()` because if not, the JavaScript parser would think that this is a function declaration. However, this function declaration doesn't have any name then it will throw an error. We need to trick to the parser and make it believe that what we have here is an expression, and the solution wraps the entire function into parenthesis, because in JavaScript, what is inside of parenthesis cannot be a statement. The second detail is the `()` at the end of the expression to invoke the function. If we don't do this, then it would never be called and never do anything. Also, the IIFE can receive arguments:

```javascript
(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);
```

Now it's time to evaluate the features of the IIFE. The primary purpose of IIFE is **data privacy**. It means IIFE allow us to create a new scope that is hidden from the outside scope so where we can safely put variables. IIFE don't interfere with other variables in our global execution context and of course, don't pretend reuse code, it is for this reason that you don't assign IIFE to variables. The no variable assignation is the reason why JavaScript calls IIFE just once. The example is just a toy example, but later you will see how IIFE is a good pattern in real-life projects to allow us to obtain data privacy and code modularity.

Closures
--------

**Closures** are one of the most crucial and advanced things about JavaScript. Also is one of the most difficult to understand topics for beginners, but you already know everything that you need to understand and use closures. To understand closures we are using the next problem: Write a function that returns a function which calculates how many years we have left until retirement and this value changes according de country. Please check the next code:

```javascript
function retirement(retirementAge) {
    var message = ' years left until retirement';
    
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        
        console.log((retirementAge - age) + message);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1991) // -> 39 years
retirementGermany(1991) // -> 38 years
retirementIceland(1991) // -> 41 years
// or their equivalent retirement(66)(1991)
```

Let's examine this code: we started by calling the retirement function in the `var` declaration and pass the respective `retirementAge`. The `retirement()` function then declares the `message` variable and returns the anonymous function which calculates the years of retirement and receives as argument a `yearOfBirth`. When the anonymous function finishes, its execution context gets popped off the execution stack. The anonymous return function is stored in the `retirement[Country]` variable, and then it is called. Now comes the cool part, and is that the anonymous function can use the `retirementAge` parameter and the `message` variable declared in the `retirement()` outer function, and it works. We can still use the `retirementAge` and the `message` variables even after the `retirement()` function already stopped its execution. This behavior is a closure.

Now that we know what a closure is let's see how and why it works behind the scenes. A formal summary of closures is:

_An inner function has always access to the variables and the parameters of its outer function, even after the outer function has returned_

Now let´s what is happens when you call the `retirement()` function. Be aware that JavaScript has the execution stack and scope chain concepts running:

1. When the  `retirement()` function is called, gets a new execution context push at the top of the execution stack.
2. The execution context has an object which stores the `retirementAge` and the `message` variables.
3. Paralelly, the scope chain enables the access of the variables of the `retirement()` function. Remember that the scope chain is like a pointer to all the variables objects that the function has access to.
4. Then the `retirement()` function is returned, and now the execution context of the `retirement()` function is gone. However, the variables object of the execution context is still there, it is still sitting in the memory and can be accessed. This is the secret of closures and the explanation of why works.
5. After you call the `retirementUS()` function with the `yearOfBirth` argument and the `age` variable declared, and it is put his new execution context at the top of the execution stack.
6. As the inner `retirementUS()` function is written lexically in the `retirement()` function, it has access to its scope. Now, how the variable object of the `retirement()` function is still there, the _scope chain stays intact_ and enable the access to the `retirementAge`, `message`. `yearOfBirth` and `age` variables to the `retirementUS()` function.
7. Finally the `retirementUS()` is popped off the stack, as usual.

> Note: You can't create closures manually. Closures are built into JavaScript.

Now, lets use the power of closure to solve the `interviewQuestion` problem exposed in the **First Class Functions: Functions Returning Functions** section. will be something like:

```javascript
function interviewQuestion(job) {
    return function(name) {
        if (job === 'alchemist') {
            console.log(name + ', Did you an human transmutation?');
        } else if (job === 'statal') {
            console.log('Why do you decide be an army dog, ' + name + '?');
        } else {
            console.log('Hi' + name + '. Do you want practice alchemy');
        }
    }
}

interviewQuestion('alchemist')('Edward');
```

Bind, Call and Apply
--------------------

You know that function are a particular kind of objects, and such array objects, functions have unique methods inherit from the function constructor object, these special methods are `call()`, `apply()` and `bind().` Let´s create a scenario where a person has two styles of presentations (formal and friendly), and do these presentations at different times of the day. Also, we have another person that pretends to use the presentation feature of the first one. The next code allows us to handle the mentioned scenario:

```javascript
var edward = {
    name: 'Edward',
    age: 26,
    job: 'Statal Alchemist',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good '+ timeOfDay +', Ladies and gentleman! my name is ' + this.name + ' I\'m a ' + this.job + ' and I\'m '+ this.age +' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m '+ this.age +' years old. Have a nice '+ timeOfDay +'.');
        }
    }
}

var alphonse = {
    name: 'Alphonse',
    age: 22,
    job: 'Alchemist'
}

edward.presentation('formal', 'morning'); //-> Good morning, Ladies and gentleman! my name is Edward I'm a Statal Alchemist and I'm 26 years old
edward.presentation.call(alphonse, 'friendly', 'noon'); //-> Hey! What's up? I'm Alphonse, I'm a Alchemist and I'm 22 years old. Have a nice noon.
// edward.presentation.apply(alphonse, ['friendly', 'noon']);  Apply doesn't work becasue sent the arguments in an array, and our function was definde without receive the parameters in an array.
```

In the above code, the `presentation()` method of the `edward` object is used by the `alphonse` object, although the alphonse object doesn't have defined the `presentation()` method. This is called **method borrowing**, because we borrowed the `presentation()` method from the `edward` object to the `alphonse` object. We can enable the method borrowing thanks to the `call()` method of the function constructor object. Now, How this work?. If you see the first argument of the `call()` method is always to set the `this` variable –In that case; the `this` is set to the `alphonse` object–. The remaining arguments are the expected parameters to the method that is being borrowing. The `apply()` method have the same purpose of the `call(),` the only difference is that the `apply()` method accept the arguments of the borrowed method as an array. However, in our example it is not going to work because our `presentation()` method does not expect to receive an array as the input, it expects two common arguments. Now let's review the `bind()` method that also defines the `this` variable explicitly. The difference is that it doesn't immediately call the function. Instead, the `bind()` method generates a copy of the function, so we can store it somewhere, like in a variable that returns the function. This is extremely useful to create functions with preset arguments. The next code illustrates the use of `bind()`.

```javascript
var edwardFriendly = edward.presentation.bind(edward, 'friendly');

edwardFriendly('morning');
edwardFriendly('nigth');

var alphonseFormal = edward.presentation.bind(alphonse, 'formal');

alphonseFormal('morning');
alphonseFormal('nigth');
```

In the last code, we preset the style argument of the `presentation()` method. This means that we have a function which is always a friendly version of the `presentation()` method so that we can call the `edwardFriendly()` with several times of the day. This behavior is called currying. *Currying* is a technique in which we create a function based on another function but with some preset parameters. These are toy examples, but they help you to understand what we can do with `call()` `apply()` and `bind()`.