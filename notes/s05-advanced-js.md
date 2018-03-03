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