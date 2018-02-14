
How JavaScript Works Behind Scenes
==================================

How Our Code Is Executed: JavaScript Parsers and Engines
--------------------------------------------------------

JavaScript is always hosted in some environment (most typically a browser). The browser is where JavaScript runs. There can also be other hosts such as NodeJS web server or even some applications that accept JavaScript code input. But for now, we will always just focus on the browser. So, when you write our JavaScript code, and you want to run it, there's a lot of stuff happening behind the scenes explained in brief in the next list:

1. Our JavaScript host has a **JavaScript Engine** that takes our code an executes it. There are many different engines out there according to the browser. Chrome uses V8 engine and Firefox use SpiderMonkey, for example.
2. The first thing that happens inside the engine is that the JavaScript code is parsed by a **Parser** which reads our code line by line and checks if the syntax of the code that you gave it is correct. So, the parser knows the JavaScript rules and how it has to be written in order to be valid. 
	- The parser doesn't find mistakes,
		- The parser produce a data structure called *Abstract Syntax Tree* which is then translated into *machine code*.
	- The parser find mistakes.
		- Throws an error and stops the execution.

Machine code is no longer JavaScript code, it's a set of instructions that can be executed directly by the computer's processor. It's only when your code already converted to machine code, actually run and does it works. That is the basic idea of what actually happens one you choose to run your code.

Execution Context and Executions Stack
--------------------------------------

**Execution Context** is a concept that helps you to be a focus in the order in which the code is run. All the JavaScript code needs to run in an environment, and these environments are called **execution context**. So you can imagine an execution context like a box/container which stores variables and in which a piece of the code is evaluated and executed. How JavaScript always need an environment to be executed, so by default always exist an execution context called **global context**. In the global context, all the code that is not inside of any function is executed. Also, you can think of an execution context as an object. The global execution context is associated with the global object, in the case of the browser is the `window` object. So everything that we declare in the global context automatically gets attached to the `window` object in the browser. And it works like this:

- Declaring a variable called `lastName`
- Declaring a variable called `window.lastName`
- Both declarations are the exact same thing. This means that `lastName === window.lastName` is true.

Now it is time to talk about **Executions Stack**. Looks the next code:

```javascript
var name = 'John';      // 1. Global Execution context

function first() {
    var a = 'Hello!';
    second();           // 3. Push the second() function in the execution stack
    var x = a + name;   // 7. Pop the first() function from the execution stack
}

function second() {
    var b = 'Hi!';
    third();            // 4. Push the third() function in the execution stack
    var y = b + name;   // 6. Pop the second() function from the execution stack
}

function third() {
    var c = 'Hey!';
    var z = c + name;   // 5. Pop the third() function from the execution stack
}

first();                // 2. Push the first() function in the execution stack
```

We're talking about that the code that is not inside of any function it's executed in the global context. But, what about the code inside a function?. It's actually very simple because each time you call a function it gets its own brand-new execution context. It is in this scenario when the **execution stack** structure enters to stage and its responsibility is to organize the different execution context and determines what is the active execution context. For the last code, the commented lines indicate the order in which each context it's add/remove to the execution stack.

Execution Context in Detail: Creation and Execution Phases and Hoisting
-----------------------------------------------------------------------

Before, you have seen when a new execution context is created but what about how exactly that happens?. To understand the creation of an execution context, in the next list I will group the three properties of an **execution context object**:

1. **Variable Object (VO)**, which will contain function arguments in a variable declaration as well as function declarations.
2. **Scope Chain**, which contains the current variable objects as well as the variable objects of all its parents.
3. **`this` variable**, that you have already seen in action.

So when an execution context is created? when a function is called, a new execution context is put on to of the execution stack, and this passes in two phases:

1. Creation phase: The properties of the execution context object are defined
    - Creation of the variable object.
    - Creation of the scope chain.
    - Determine value of the `this` variable.
2. Execution phase:
    - The code of the function that generated the current execution context is ran line by line, and all variables are defined. If it's the global context then it's the gloaal code that is executed.

Now is time to enter into detail with the creation of the **variable object** in the creation phase:

- The `argument` object is created, containing all the arguments that were passed into the function.
- Code is scanned for **function declarations**: for each function, a property is created in the variable object, **pointing to the function**. This means that all the functions will be stored in the variable object, even before the code start executing.
- Code is scanned for **variable declarations**: for each variable, a property is created in the variable object, and set to `undefined`. 

The last two point is what developers commonly call **hoisting** in JavaScript. Functions and variables are hoisted in JavaScript, which means that they are available before the execution phase actually starts. They are hoisted in a different way. The difference between functions and variables is that functions are already **defined** and variables are set up to `undefined` before the execution phase start and these varialbe only be defined in the execution phase.

So to recap: each execution context has an object which stores a lot of important data that the function will use while it's running, and this happens even before the code is executed.

Hoisting in Practice
--------------------

Hoisting may sound a bit confusing initially, but after some examples and some practice will be simple to understand. With the next example, you going to use very simple functions because we want to focus on how everything works and not exactly what the code is doing. Before to start, it´s important to highlight that hoisting is applied to functions and variables in a different way:

###Function Hoisting

```javascript

calculateAge(1989) //-> 29: By hoisting this call also works! despite not having declared the function yet  

function caclulateAge(year) {
    console.log(2018 - year);
}

calculateAge(1991) //-> 27: This is the expected behavior. Call the function after his declaration.
```

The code above use a function declaration `caclulateAge(year)`. The first call work because that is **hoisting** for function declarations. So in the creation phase of the execution context (this case the global execution context), the function declaration `caclulateAge(year)` is stored in the variable object and even before the code is executed. This is why we then enter the execution phase, the `calculateAge(year)` function is already available for us to use it. Now, I´ll check what happens with function expressions:

```javascript

retirement(1989) //-> Uncaugth TypeError: retirement is not a function

var retirement = function(year) {
    console.log(65 - (2018 - year));
}

retirement(1991) //-> 38: This is the expected behavior. Call the function after his declaration
```
If we try to use hoisting in function expressions, it doesn't work, so we have to call the function expressions after the function is declared.

> Hoisting only works for function declaration.

###Variables Hoisting

To review hoisting in variables please check the next code:

```javascript

console.log(age); //-> undefinded
var age = 23;
console.log(age); //-> 23

```

As you can see, if you try to use a variable before declaring it, hoisting will assign the `undefined` data type to the variable, because remember in the creation phase of the variable object what happens is that the code is scanned for variable declarations and the variables are then set to `undefined`. Now take this one step further with a mix of function and variables code:

```javascript

console.log(age);       //-> 1. undefined
var age = 23

function foo() {
    console.log.(age);  //-> 2. undefined
    var age = 65;
    console.log.(age);  //-> 3. 65
}

foo();
console.log(age);       //-> 4. 23

```

The key to identifying how this code is executed is having clear the different execution contexts object created during the execution phase. In the above code, we have the _global execution context_ that will be store the variable `var age = 23` and the function declaration `foo()`. Also, we have the _foo execution context object_ in which we can store the variable `var age = 65`. Notice that we have the same name for both variables, but it doesn´t matter because these are two completely different variables thanks to the different variable objects associated with each execution context object.

> The most important use case for Hoisting is not even variables, but it's the fact that we use function declarations before we actually declare them in our code.







