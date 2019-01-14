//-------------------------------------
// Coding Challenge Seven: Super Tip Calculator
//-------------------------------------

/**
 * Let's remember the coding challenge where Mark and John compared their BMIs.
 * Let's now implement the same functionality with objects and methods,
 * BMI = mass / height^2
 * mass in "kg" and height in "meters"
 *
 * 1. For each of them, create and object with the properties fo their full name, mass, and height.
 * 2. Then add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
 * 3. In the end, log to the console who has the highest BMI. Don't forget they might have the same BMI.
 *
 */

console.log('-------------------------------------------------')
console.log('Coding Challenge Six - Start')
console.log('-------------------------------------------------')

let isMarkBMIHigher = false;

const john = {
  fullName: 'John James',
  mass: 78,
  height: 1.82,
  calculateBMI: function() {
    this.bmi = this.mass / (this.height * this.height)

    return this.bmi
  }
}

const mark = {
  fullName: 'Mark Miller',
  mass: 80,
  height: 1.64,
  calculateBMI: function() {
    this.bmi = this.mass / (this.height * this.height)

    return this.bmi
  }
}

if(john.calculateBMI() > mark.calculateBMI()) {
  console.log(`${john.fullName} has a higher BMI of ${john.bmi}`)
} else if(mark.bmi > john.bmi) {
  console.log(`${mark.fullName} has a higher BMI of ${mark.bmi}`)
} else {
  console.log(`They have the same BMI`)
}


console.log('-------------------------------------------------')
console.log('Coding Challenge Six - End')
console.log('-------------------------------------------------')