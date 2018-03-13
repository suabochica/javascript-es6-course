//-------------------------------------------------------------
// Inheritance through function constructor
//-------------------------------------------------------------
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;

    // Method inheritance through the constructor function
    this.caculateAge = function() {
        console.log(2018 - this.yearOfBirth);
    }
}

var edward = new Person('Edward', 1991, 'Statal Alchemist');
var alphonse = new Person('Alphonse', 1995, 'Alchemist');
var hohenheim = new Person('Hohenheim', 1891, 'Statal Alchemist');

// Remember call the function to create the execution context
edward.caculateAge();
alphonse.caculateAge();
hohenheim.caculateAge();

//-------------------------------------------------------------
// Inheritance through prototype object of the function constructor
//-------------------------------------------------------------

var PersonPrototype = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// Method inheritance through the prototype property of the constructor function
PersonPrototype.prototype.caculateAge = function() {
    console.log(2018 - this.yearOfBirth);
}

// Property inheritance through the prototype property of the constructor function
PersonPrototype.prototype.lastName = 'Elric';

var edwardPrototype = new PersonPrototype('Edward', 1991, 'Statal Alchemist');
var alphonsePrototype = new PersonPrototype('Alphonse', 1995, 'Alchemist');
var hohenheimPrototype = new PersonPrototype('Hohenheim', 1891, 'Statal Alchemist');

// Same result as before
edwardPrototype.caculateAge();
alphonsePrototype.caculateAge();
hohenheimPrototype.caculateAge();


console.log(edwardPrototype.lastName); // Elric
console.log(alphonsePrototype.lastName); // Elric
console.log(hohenheimPrototype.lastName); // Elric


//-------------------------------------------------------------
// Object.create
//-------------------------------------------------------------

var homunculusProto = {
    calculateAge: function() {
        console.log(2018 - yearOfBirth); //I know, yearOfBirth is not defined yet, but...
    }
}

var wrath = Object.create(homunculusProto);

// This is not an ideal way, because we are adding the properties to an empty object
wrath.name = "Bradley";
wrath.yearOfBirth = 1889;
wrath.job = "Furher";

// A better way, but is weird the form as the properties are defined
var pride = Object.create(homunculusProto, {
    name: {
        value: "Selim"
    },
    yearOfBirth: {
        value: 1800
    },
    job: {
        value: "Shadowhunter"
    }
});

//-------------------------------------------------------------
// Function as Arguments: Pass Functions As Arguments
//-------------------------------------------------------------

var years = [1958, 1962, 1982, 1985, 1991, 1995];

function arrayCalculations(arrayArgument, callbackFunction) {
    var arrayResponse = [];

    for (var i = 0; i < arrayArgument.length; i++) {
        arrayResponse.push(callbackFunction(arrayArgument[i]));
    }

    return arrayResponse;
}

function calculateAge(yearOfBirth) {
    return 2018 - yearOfBirth;
}

function isFullAge(age) {
    return age >= 18;
}

function maxHeartRate(age) {
    if (age >= 18 && age <= 81) {
        return Math.round(206.9 - (0.67 * age));
    } else {
        return -1;
    }
}

var ages = arrayCalculations(years, calculateAge);
var fullAges = arrayCalculations(ages, isFullAge);
var rates = arrayCalculations(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);

//-------------------------------------------------------------
// Function as Arguments: Functions Returning Functions
//-------------------------------------------------------------

function interviewQuestion(job) {
    if (job === 'alchemist') {
        return function(name) {
            console.log(name + ', Did you an human transmutation?');
        }
    } else if (job === 'statal') {
        return function(name) {
            console.log('Why do you decide be an army dog, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hi' + name + '. Do you want practice alchemy')
        }
    }
}

var alchemistQuestion = interviewQuestion('alchemist')
var statalQuestion = interviewQuestion('statal')

alchemistQuestion('Alphonse');
statalQuestion('Edward');
statalQuestion('Roy');

// Another way to call the interview functions without declare a var
interviewQuestion('alchemist')('Izumi');

//-------------------------------------------------------------
// Immediately Invoked Function Expressions (IIFE)
//-------------------------------------------------------------

(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();


//-------------------------------------------------------------
// Closures
//-------------------------------------------------------------

function retirement(retirementAge) {
    var message = ' years left until retirement';
    
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        
        console.log((retirementAge - age) + message);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1991) 
retirementGermany(1991) 
retirementIceland(1991) 
// or their equivalent retirement(66)(1991)


function interviewQuestion(job) {
    return function(name) {
        if (job === 'alchemist') {
            console.log(name + ', Did you an human transmutation?');
        } else if (job === 'statal') {
            console.log('Why do you decide be an army dog, ' + name + '?');
        } else {
            console.log('Hi' + name + '. Do you want practice alchemy');
        }
    }
}

interviewQuestion('alchemist')('edward');
