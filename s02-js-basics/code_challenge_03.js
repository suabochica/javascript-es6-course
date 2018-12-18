//-------------------------------------
// Coding Challenge Three: BMI score
//-------------------------------------
/**
 * Mark and John are trying to compare their BMI (Body Mass Index) which is calculated using the formula:
 * BMI = mass / height^2
 * mass in "kg" and height in "meters"
 *
 * 1. Store Mark's and John's mass and height in variables.
 * 2. Calculate both their BMIs.
 * 3. Create a boolean variable containing the information about whether Mark has a higher BMI thant John.
 * 4. Print a string to the console containing the variable from step 3. ("Is Mark's BMI higher than John's? true")
 *
 */

console.log('-------------------------------------------------')
console.log('Coding Challenge Three - Start')
console.log('-------------------------------------------------')

const markMass = 80
const markHeight = 1.64
const johnMass = 78
const johnHeight = 1.82
let isMarkBMIHigher = false;

const markBMI = markMass/(markHeight*markHeight)
const johnBMI = johnMass/(johnHeight*johnHeight)

isMarkBMIHigher = markBMI > johnBMI ? true : false

console.log(`Is Mark's BMI higher than John's? ${isMarkBMIHigher}`)

console.log('-------------------------------------------------')
console.log('Coding Challenge Three - End')
console.log('-------------------------------------------------')