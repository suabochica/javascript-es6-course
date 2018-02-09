//-------------------------------------
// Coding Challange Two
//-------------------------------------

/**
 * 1. Create create an array with some years where persons were born.
 * 2. Create an empty array.
 * 3. Use the loop to fill the array with the ages of persons.
 * 4. Use another loop to log into the console whether each person is of full age (18 or older), as well as their age.
 * 5. Finally create a function called `printFullAge()` which receives the array of years as argument, executes the steps 2., 3., and 4. and returns an array of true/false boolean values. true if the person is of full age and false if not.
 * 6. Call the function with two different arrays and store the results in two variables: full_1 and full_2.
 */
 
console.log('-------------------------------------------------')
console.log('Coding Challenge Two - Start')
console.log('-------------------------------------------------')
 
var currentYear = 2018;
    birthYearsArray = [1990, 2006, 1958, 1984, 2002, 1995],
    emptyArray = [];

for (var i = 0; i < birthYearsArray.length; i++) {
    emptyArray.push(currentYear - birthYearsArray[i]);
}

console.log(emptyArray);
emptyArray = [];

for (var i = 0; i < birthYearsArray.length; i++) {
    
    if (18 < currentYear - birthYearsArray[i]) {
        emptyArray.push(true);
    } else {
        emptyArray.push(false);
    }
}

console.log(emptyArray);

var birthYearsArrayOne = [2010, 1994, 2006, 1998],
    birthYearsArrayTwo = [1994, 2010, 1998, 2006];

function printFullAge(yearsArray) {
    for (var i = 0; i < yearsArray.length; i++) {
        if (18 < currentYear - yearsArray[i]) {
            yearsArray[i] = true;
        } else {
            yearsArray[i] = false;
        }
    }
    return yearsArray;
}

var full_1 = printFullAge(birthYearsArrayOne),
    full_2 = printFullAge(birthYearsArray);


console.log('This is full_1 ' + full_1);
console.log('This is full_2 ' + full_2);

console.log('-------------------------------------------------')
console.log('Coding Challenge Two - End')
console.log('-------------------------------------------------')