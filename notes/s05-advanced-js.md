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
Person {name: "Edward", yearOfBirth: 1991, job: "Statal Alchemist"}
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
 __proto__ : Array(0) // Prototype of the Array Object
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

function change (a, b) {
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
 
 for(var i = 0; i < arrayArgument.length; i++) {
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




