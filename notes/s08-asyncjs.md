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