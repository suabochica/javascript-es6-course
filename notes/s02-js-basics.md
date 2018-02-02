Introduction to JavaScript
==========================

What is JavaScript?
-------------------

_JavaScript is a lightweight, cross-platform, object-oriented computer programming language_

- *lightweight* means that is a language don't use much of memory of the computer and is compose by a simple syntax and features.
- *cross-platform*  means that can be use in multiple platforms and systems.
- *object-oriented* means that it is a language based in objects.

JavaScript is one of the three core technologies of the web development, so is most commonly used as a part of web pages. Today JavaScript can be used in different places:

- Client-side: JavaScript was traditionally only used in the browser.
- Server-side: Thanks to *node.js*, we can use JavaScript on the server as well.

JavaScript is what made modern web development possible through dynamic effects and interactivity. It is important to mention that today there are a ton of JavaScript libraries and frameworks out there that implement different architectures and help developers build complex apps more easily and faster than ever. All these libraries and frameworks  are just based in JavaScript, and so before using them developers need to be really good at JavaScript, they need to really understand it.

> What is the differences between library an Framework?
> *Library*: A library is just a file with functions/methods or other reusable code that you can link and use it in your own code.
> *Framework*: A framework is a broad term. Wikipedia says that framework is a universal, reusable software environment that provides particular functionality. Software frameworks may include support programs, compilers, code libraries, tool sets, and application programming interfaces (APIs) that bring together all the different components to enable development of a project or system.

Getting Started with JavaScript
-------------------------------

You can create JavaScript code in two ways:

- *Inline script:* Put your JavaScript code inside the `<script>` tag.
- *External script:* Put your JavaScript code in an external file and import it using the `<script src="path-to-file.js">`.

Variables and Data Types
------------------------

A *variable* is a container in which we can store a value in order to use it. By saving a vialue in a variable we don't have to write the variable each time we want to use it.

The *data type* of a value is an attribute that tells what kind of data that value can have. In other words, is a classification of data which tells the compiler or interpreter how the programmer intends to use the data. In JavaScript we have the next primitive data types:

- *Number:* Floating point numbers, for decimals and integers.
- *String:* Sequence of characters, used for text.
- *Boolean:* Logical data type that can only be `true` or `false`.
- *Undefined:* Data type of a variable wich does not have a values yet.
- *Null*: Also means _non-existent_.
- 

JavaScript have a feature called *dynamic typing*. this means that the programmer don't have to manually define the data type of the variable. JavaScript figures out the data type of a variable on its own, meaning that we can even change the data type of a variabble later in our code. So, this can be very useful, but it can also be the source of some difficult to find bugs. Exist a wrapper to avoid dynamic typing in JavaScript called *TypeScript*.

Variable Mutation and Type Coercion
-----------------------------------

A *type coercion* is a feature of javascript related with *dynamic typing*. Basically means, when you have different data types and you mix them together, JavaScripts tries to automatically figure out which of the variables it has to convert, and then converts them all to the same data type. Check the next examples:

```javascript
var name = 'Edward'
var age = 20

console.log(name + age) //-> 'Edward20' Applies type coercion over the age int data type and convert it into a string
console.log(age + age) //-> 40
```

*Variable mutation* is as his name says, change the value of a variable. consider the next example as continue of the code above:

```javascript
age = 'twenty'

console.log(age) //-> 'Twenty'
```

in this code you change the values of the variable `age` from `20` to `twenty`. Notice that you didn't use the `var`keyword, because is only used to declare the variables in the first time. It is important know that the JavaScript compiler reads our code in a sequence of instructions line to line from up to down.

