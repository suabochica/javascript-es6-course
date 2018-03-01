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