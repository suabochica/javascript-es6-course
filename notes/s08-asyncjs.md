Asynchronous JavaScript: Promises, Async/Await, and AJAX
========================================================

An Example of Asynchronous JavaScript
-------------------------------------

All the contents reviewed until now in this course are **synchronous** JavaScript. Synchronous code means that all the instructions are executed one after the other, line by line just in the order that they appear in the code. Next code is an example of synchronous code in JavaScript.

```javascript
const second = () => {
    console.log('Second');
}

const first = () => {
    console.log('Hey There');
    second();
    console.log('The end');
}

first() // 1. Hey There 2. Second 3. The end
```

Now, let's add an **asynchronous** code. To do that we are going to use the `setTimeout()` function that allows us to set a timer in JavaScript for write code that should be executed later. That is asynchronous code in JavaScript, Next to an example of an asynchronous call in JavaScript:

```javascript
const second = () => {
    setTimeout(() => {
        console.log('Async Hey There');
    }, 2000)
}

const first = () => {
    console.log('Hey There');
    second();
    console.log('The end');
}

first() // 1. Hey There 2. The end 3. Async Hey There
```

An issue with the last code is that probably you expected that the `The end` message would print after `Async Hey There` message. We have this behavior thanks to how JavaScript works with asynchronous code, then its time to review how asynchronous JavaScript works behind the scenes.

The tasks that we get with asynchronous code are:

- Run functions in "background"
- These functions are pass in a callback that runs once the function has finished its work
- Move on immediately, Non-blocking!

Understanding Asynchronous JavaScript: The Event Loop
-----------------------------------------------------

The next scheme illustrates the elements that are part of the JavaScript make up runtime:

![JavaScript Make Up Runtime](https://cdn.scotch.io/4974/xCkAPcmuQNqQCGpO2avR_Event-loop.png.jpg)

- **Execution Stack:** Explained in section five.
- **Web APIs:** Live outside the JavaScript engine itself. Stuff like DOM manipulation methods, Set Timeout, AJAX, Geolocation, and Storage are Web APIs.
- **Message Queue:**: Queue that determines which function will pass to the Execution Stack.
- **Event Loop:** Mechanism that continuously monitors the Message Queue and the Execution Stack to push the first callback function in line onto the Execution Stack, as soon as the stack is empty. His job allow us asynchronous code in JavaScript.