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