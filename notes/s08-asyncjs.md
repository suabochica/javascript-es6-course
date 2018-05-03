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

The Old Way: Asynchronous Code in JavaScript
--------------------------------------------

To review the old way to create asynchronous code in JavaScript lets create a small fake recipe reader, where we are gonna simulate AJAX calls to get some fake recipes using set timeouts. Please check the next code:

```javascript
function getRecipe() {
    setTimeout(() => {
        const recipeId = [123, 456, 789, 147, 852]
        console.log(recipeId);
        
        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }
            
            console.log(`${id}: ${recipe.title}`);
            
            setTimeout(publisher => {
                const recipeTwo = {
                    title: 'Italian Pizza',
                    publisher: 'Edward'
                }
                
                console.log(recipe);
            }, 1500, recipe.publisher);
        }, 1500, recipeId[3]);
    }, 1500);
}
```

This code has three nested callbacks. The code is like having three chained AJAX calls to get some data from the server. Also, you can see that the code is getting a bit out of hand if you imagine that we had more and more chaining levels. Then we would have all these callbacks here inside one of another giving place to the **callback hell** in JavaScript. The triangular shape of the code is a sign of the callback hell, and the issue with this behavior is that gets unmanageable. For this reason in ES6 were introduced the **Promises**. With promises, we can avoid the callback hell, and have a cleaner syntax when using asynchronous JavaScript.