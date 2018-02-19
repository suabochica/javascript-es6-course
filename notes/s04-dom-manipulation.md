JavaScript in the Browser: DOM Manipulation and Events
======================================================

The DOM and DOM manipulation
----------------------------

It's time to make that JavaScript interact with a webpage. The technical term for that is doing **DOM Manipulation**. So in order to do that, we need to first know what the DOM and DOM manipulation actually are. DOM stands for **Document Object Model** and is a structured representation of an HTML document that can be used to connect web pages to scripts like JavaScript. Plese check the next HTML markup:

```html
<body>
    <section>
        <p>A paragraph with a <a>link</a>.</p>
        <p>Another second paragraph</p>
    </section>
    <section>
        <img src="x.jpg" alt="The DOM">
    </section>
</body>
```

Each HTML element of this markup can be represented by a box. The DOM is a fully object-oriented representation, and for each of these boxes, there is an object in the DOM that we can access and interact with from our JavaScript code. Before to moving on, do you have to be clear that JavaScript and the DOM are two different things? So far we just use the JavaScript language without any interaction with a webpage, printing some stuff in the console, that's it. Now we are going to use special JavaScript methods that allow us to interact an manipulate the DOM and therefore the webpage. When I said methods, means that they are functions attached to some object, this object is the `document` object. The `document` object gives us access to the DOM.

First DOM Access and Manipulation
---------------------------------

What you will learn in this lecture?

- How to create the fundamental pig game variables
- How to generate a random number (Use of the `Math` object)
- How to manipulate the DOM (Use of the `document` object and his methods `querySelector` and `innerHTML`)
- How to read from the DOM  (Use of the `document` object and his method `querySelector` and `textContent`)
- How to change the CSS styles  (Use of the `document` object and his method `style`)

Please check all these task in the file `../s04-dom-manipulation/app.js`

Events and Event Handling: Rolling the Dice
-------------------------------------------

**Events** is a topic that is directly related to DOM and DOM Manipulation. Basically, events are notifications. An event is sent to notify the code that something happened on the webpage. These events are trigger by actions that the user does in the webpage like clicking a button, resizing a window, press a key, etc. Please check the list of [web events](https://developer.mozilla.org/en-US/docs/Web/Events). The event is accompanied by **event listener** to code responses to all these events. An event listener is a function that performs an action based on a certain event. It waits for a specific event to happen. Now how is that event processed?

To answer this question we need to remember about **execution stack** because an event can only be processed as soon as execution stack is empty. Besides to the execution context, the JavaScript engine has a structure called **message queue** where all the events that happen in the browser are put and they sit there waiting to be processed –after the execution stack is empty–. Here the event listener enters to stage because is called. As the event listener, it is a function it gets its own execution context which is then put at the top of the execution stack and becomes the active execution context.

> Rule: An event is handled once the execution stack is empty after return the execution context objects created by functions.

The next list is the steps that explain how an event is processed:

1. The execution stack returns his current execution context functions until getting empty.
2. The message queue attends the first event in the queue.
3. The event listener function is called.
4. Like the event listener is a function, it gets its own execution context.
5. The execution context of the event listener is put on top of the execution stack.
6. The execution context of the event listener is active.
7. The event is processed.

What you will learn in this lecture?

- How to set up an event handler.
- What a callback function is.
- What an anonymous function is.
- Select elements by id.
- How to change the image in an `<img>` element.

Please check all these task in the file `../s04-dom-manipulation/app.js`


A **callback function** is a function that is not called by us, is called by another function. In other words, a callback function is a function that we pass into another function as an argument and this function then call that function for us. In the events context, the event listener is the function where you pass the callback function as an argument. Please check the next code to understand the callback function's structure:

```javascript

function callbackFunction () {
    // Do something
}

callbackFunction();
domElement.addEventListener('event', callbackFunction);

```

An **anonymous function** is simply a function that doesn't have a name, so it cannot be reused because is a function that cannot use outside of the context of the function that has the anonymous function as a parameter. Please check the next code to understand the anonymous function's structure:

```javascript
domElement.addEventListener('event', function() {
    // Do something
});

```