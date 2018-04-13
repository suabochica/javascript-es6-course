// ES6
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
