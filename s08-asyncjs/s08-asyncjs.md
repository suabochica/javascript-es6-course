
Asynchronous JavaScript: Promises, Async/Await, and AJAX
========================================================

- [Asynchronous JavaScript: Promises, Async/Await, and AJAX](#asynchronous-javascript-promises-asyncawait-and-ajax)
  - [An Example of Asynchronous JavaScript](#an-example-of-asynchronous-javascript)
  - [Understanding Asynchronous JavaScript: The Event Loop](#understanding-asynchronous-javascript-the-event-loop)
  - [The Old Way: Asynchronous Code in JavaScript](#the-old-way-asynchronous-code-in-javascript)
  - [From Callback Hell to Promises](#from-callback-hell-to-promises)
  - [From Promises to Async/Await](#from-promises-to-asyncawait)
  - [AJAX and APIs](#ajax-and-apis)
  - [Making AJAX Calls with Fetch and Promises](#making-ajax-calls-with-fetch-and-promises)
  - [Making AJAX Calls with Fetch and Async/Await](#making-ajax-calls-with-fetch-and-asyncawait)

An Example of Asynchronous JavaScript
-------------------------------------

All the contents reviewed until now in this course are **synchronous** JavaScript. Synchronous code means that all the instructions are executed one after the other, line by line just in the order that they appear in the code. Next code is an example of synchronous code in JavaScript.

```javascript
const second = () => {
    console.log('Second')
}

const first = () => {
    console.log('Hey There')
    second()
    console.log('The end')
}

first() // 1. Hey There 2. Second 3. The end
```

Now, let's add an **asynchronous** code. To do that we are going to use the `setTimeout()` function that allows us to set a timer in JavaScript for write code that should be executed later. That is asynchronous code in JavaScript, Next to an example of an asynchronous call in JavaScript:

```javascript
const second = () => {
    setTimeout(() => {
        console.log('Async Hey There')
    }, 2000)
}

const first = () => {
    console.log('Hey There')
    second()
    console.log('The end')
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

![JavaScript Make Up Runtime](https://cdn-images-1.medium.com/max/1600/1*TozSrkk92l8ho6d8JxqF_w.gif)

- **Execution Stack:** Explained in section five.
- **Web APIs:** Live outside the JavaScript engine itself. Stuff like DOM manipulation methods, Set Timeout, AJAX, Geolocation, and Storage are Web APIs.
- **Message Queue:** Queue that determines which function will pass to the Execution Stack.
- **Event Loop:** Mechanism that continuously monitors the Message Queue and the Execution Stack to push the first callback function in line onto the Execution Stack, as soon as the stack is empty. His job allow us asynchronous code in JavaScript.

The Old Way: Asynchronous Code in JavaScript
--------------------------------------------

To review the old way to create asynchronous code in JavaScript lets create a small fake recipe reader, where we are gonna simulate AJAX calls to get some fake recipes using set timeouts. Please check the next code:

```javascript
function getRecipe() {
    setTimeout(() => {
        const recipeId = [123, 456, 789, 147, 852]
        console.log(recipeId)

        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }

            console.log(`${id}: ${recipe.title}`)

            setTimeout(publisher => {
                const recipeTwo = {
                    title: 'Italian Pizza',
                    publisher: 'Edward'
                }

                console.log(recipe)
            }, 1500, recipe.publisher)
        }, 1500, recipeId[3])
    }, 1500)
}
```

This code has three nested callbacks. The code is like having three chained AJAX calls to get some data from the server. Also, you can see that the code is getting a bit out of hand if you imagine that we had more and more chaining levels. Then we would have all these callbacks here inside one of another giving place to the **callback hell** in JavaScript. The triangular shape of the code is a sign of the callback hell, and the issue with this behavior is that gets unmanageable. For this reason in ES6 were introduced the **Promises**. With promises, we can avoid the callback hell, and have a cleaner syntax when using asynchronous JavaScript.

From Callback Hell to Promises
------------------------------

To start let's answer the question *What is a Promise?*

- A Promise is an object that keeps track of whether a particular event has happened already or not
- Determines what happens after the event has happened
- Implements the concept of a future value that we're expecting. It's like saying, hey, get me some data from the server in the background and the promise then promises us to get that data so that we can handle it in the future.

A promise can have different states:

- Pending
- Settled/Resolved
    - The promise was successfully which means that a result is available -> Fulfilled
    - The promise was an error -> Rejected

The connection between the Pending and Settled/Resolved states is when the event happens. With this context we are ready to put the logic of the recipes handled with callbacks regarding promises:


```javascript
const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([123, 456, 789, 147, 852])
    }, 1500)
})

const getRecipe = recipeId => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }

            resolve(`${id}: ${recipe.title}`)
        }, 1500, recipeId)
    })
}

const getRelatedByPublisher = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pubilser => {
            const recipeTwo = {
                title: 'Italian Pizza',
                publisher: 'Edward'
            }

            resolve(`${publisher}: ${recipeTwo.title}`)
        }, 1500, publisher)
    })
}

getIds
.then( ids => {
    console.log(ids)
    return getRecipe(ids[2])
})
.then(recipeId => {
    console.log(recipeId)
    return getRelatedByPublisher(`Edward`)
})
.then(recipeByPublisher => {
    console.log(recipeByPublisher)
})
.catch(error => {
    console.log('Error!')
})
```

This code is more extended but is more maintainable. The key to avoiding the callback hell is returned a promise and chain it with the `.then()` method.

From Promises to Async/Await
----------------------------

Until this section, we learned how to construct and how to consume promises. The syntax to consume promises can still be confusing and difficult to manage. So, in ES2017/ES8 the **Async/Await** concept was introduced to the JavaScript to consume promises. Let's put our recipe logic regarding async/await:

```javascript
const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([123, 456, 789, 147, 852])
    }, 1500)
})

const getRecipe = recipeId => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = {
                title: 'Fresh Tomato',
                publisher: 'Edward'
            }

            resolve(`${id}: ${recipe.title}`)
        }, 1500, recipeId)
    })
}

const getRelatedByPublisher = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pubilser => {
            const recipeTwo = {
                title: 'Italian Pizza',
                publisher: 'Edward'
            }

            resolve(`${publisher}: ${recipeTwo.title}`)
        }, 1500, publisher)
    })
}

async function getRecipeAwait() {
    const ids = await getIds
    console.log(ids)

    const recipe = await getRecipe(ids[1])
    console.log(recipe)

    const related = await getRelatedByPublisher('Edward')
    console.log(related)

    return recipe
}

getRecipeAwait()
.then(result => {
    console.log(`${result} is delicious!`)
})
```

Three essential things in the last code:

1. The `async` keyword gives the property to run the function in the background
2. The `async` function returns a promise
3. Inside the `async` function we can have one or more `await` expression to consume promises.

Async/Await makes it so much easier to work with promises thanks to the fact that it looks like the standard synchronous code.

AJAX and APIs
-------------

- **AJAX** stands for Asynchronous JavaScript and XML and is a technology that allows us to communicate with remote servers through
- **HTTP** request asynchronously. In practice, there are many ways in which we can do AJAX in JavaScript. In this course, we are gonna look at the **Fetch Web API** to make some AJAX calls easily.
- **API** stands for Application Programming Interface, and at a high level, it is a piece of software that can be used by another piece of software to allow applications to talk to each other. The API concept is a general concept in programming. Now, let's distinguish between two types of APIs that you can use in JavaScript:

> - Your API, for data coming from your server
> - Third Party APIs (Google Maps, Embed YouTube Videos, Weather Data, Movies Data, ...)


Making AJAX Calls with Fetch and Promises
-----------------------------------------

We will make an AJAX call to request weather data from [MetaWeather API](https://www.metaweather.com/api/) using a web API called [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Generally, an API requires an API key, but this one is a straightforward one, and it doesn't require an API key. We will use the `location` service of the MetaWeather API that requires a `woeid` (where on earth id) for the next example:

```javascript
function getWeather(woeid) {
    const proxy = 'https://cors-anywhere.herokuapp.com/'

    fetch(`${proxy}https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        console.log(result)
        return result.json()
    })
    .then(data =>{
        const today = data.consolidated_weather[0]

        console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}`)
    })
    .catch(error => {
        console.log(error)
    })
}

getWeather(2487956)
getWeather(44418)
```

Every time you try to do an AJAX call you face the **No Access Control Allow Origin** errors. The reason for this error is the so-called **Same Origin Policy** in JavaScript, which prevents us from making AJAX request to a domain different than our own. Right now we don't have any domain, we're just opening the JavaScript file, and the domain we are requesting this resource is MetaWeather API. So because of this same origin policy, we cannot access this resource.

To allow developers to request different domains you can use CORS that stands for **Cross-Origin Resource Sharing**. The CORS should be implemented by the API's developers, and unfortunately, the developers of MetaWeather skip this feature. Then the alternative is to proxy the request through their server to do the AJAX call and avoid the same origin policy. But this is another topic. For now, we can use a proxy called https://crossorigin.me/. This proxy is a service that allows us to access from other websites, without having to own that website. All we have to do is prefix our request URL with `https://crossorigin.me/.`

The `fetch()` function returns a promise that retrieves the data from the URL passed as a parameter. This response is a JSON file. Is for that reason that we have to use the `json()` function to convert the JSON into a JavaScript Object. Now we this context we can apply the syntax of promises reviewed in couple section before.

Making AJAX Calls with Fetch and Async/Await
--------------------------------------------

Now we can put the last code regarding Async/Await.

```javascript
async function getWeatherAwait(woeid) {
    try {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const result = await fetch(`${proxy}https://www.metaweather.com/api/location/${woeid}/`)
        const data = await result.json()
        const tomorrow = data.consolidated_weather[1]

        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}`)

        return data
    } catch(error) {
        alert(error)
    }
}

getWeatherAwait(2487956)

let dataLondon

getWeatherAwait(44418)
.then( data => {
    dataLondon - data
    console.log(dataLondon)
})
```

Here we are reviewing and applying the benefits of async/await. The code is written synchronously, by behind the scenes is running in the background, so the code its familiar to us. Also, remember that an async expression always returns a promise. It is for that reason that we have to resolve the promise with the data to store the data in the `dataLondon` variable. For another hand, you can see that to handle errors we use a `try/catch` scheme.