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
  
 