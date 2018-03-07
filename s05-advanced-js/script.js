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
var pride = Object.create(homunculusProto, 
	{
		name: {value: "Selim"},
		yearOfBirth: {value: 1800},
		job: {value: "Shadowhunter"}
	}
);

//-------------------------------------------------------------
// Function as Arguments
//-------------------------------------------------------------

var years = [1958, 1962, 1982, 1985, 1991, 1995];

function arrayCalculations(arrayArgument, callbackFunction) {
 var arrayResponse = [];
 
 for(var i = 0; i < arrayArgument.length; i++) {
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
 if(age >= 18 && age <= 81) {
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
