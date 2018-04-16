// --------------------------------------------
// Arrow functions box examples
// --------------------------------------------

// ES5
var box5 = {
    'color': 'green',
    'position': 1,
    'clickMe': function() {
        // pattern used to isn't lost the context of the box5 object. 
        var self = this;

        document.querySelector('.green').addEventListener('click', function() {
            // If we try to use `this.position`, it will be throw undefinded because tha callback function create the `this` context with the global scope as reference instad of use the box 5 object as reference.
            var message = 'this is box number ' + self.position + ' and it is ' + self.color;

            alert(message);
        });
    }
}
// box5.clickMe(); 


// ES6
const box6 = {
    'color': 'green',
    'position': 1,
    'clickMe': function() {
        document.querySelector('.green').addEventListener('click', () => alert(`this is box number ${this.position} and it is ${this.color}`));
    }
}

box6.clickMe();

// --------------------------------------------
// Array features box examples
// --------------------------------------------

// ES5
var boxesNodeList = document.querySelectorAll('.box');
var boxesArr5 = Array.prototype.slice.call(boxesNodeList);
/*
for(var i = 0; i < boxesArr5.length; i++) {
    if(boxesArr5[i].className === 'box blue') {
        continue;
    }

    boxesArr5[i].style.backgroundColor = 'dodgerblue';
    boxesArr5[i].textContent = 'I changed to blue';
}
*/

// ES6

var boxesArr6 = Array.from(boxesNodeList);
/*
for(const currentElement of boxesArr6) {
    if(currentElement.className === 'box blue') {
        continue;
    }

    currentElement.style.backgroundColor = 'dodgerblue';
    currentElement.textContent = 'I changed to blue'
}
*/

// --------------------------------------------
// The Spread Operator box examples
// --------------------------------------------

var header = document.querySelector('h1');
var boxes = document.querySelectorAll('.box');
var nodeListElements = [header, ...boxes];

Array.from(nodeListElements).forEach(currentElement => currentElement.style.color = 'purple');
