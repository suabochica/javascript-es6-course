//-------------------------------------
// Coding Challenge Six: BMI score with Functions and Objects
//-------------------------------------

/**
 * Let's remember the coding challenge where Mark and John use a tip calculator,
 * Let's now implement a more advanced version of using everything we learned
 *
 * This time, John and his family went to 5 different restaurants. The bills were:
 *
 * - $124, $48, $268, $180, and $42
 *
 * Again, the John´s distribution is:
 *
 * - 20% of the bill when the bill is less than $50
 * - 15% of the bill when the bill is less is between $50 and $200
 * - 10% of the bill when the bill is greater than $200
 *
 * Implement a tip calculator using objects and loops:
 *
 * 1. Create an object with an array for the bill values
 * 2. Add a method to calculate the tip
 * 3. This method should include a loop to iterate over all the paid bills and do the tip calculations
 * 4. As an output, create:
 *  4.1. A new array containing all the tips
 *  4.2. An carry containing all the final paid amounts (bill + tip)
 *
 * Hint: Start with two empty arrays as properties and then fill them up in the loop.
 *
 * EXTRA
 * Mark's family also went on a holiday, going to 4 different restaurants. The bills were:
 *
 * - $77, $375, $110, and $45
 *
 * Marks´s tip distribution is:
 *
 * - 20% of the bill when the bill is less than $100
 * - 10% of the bill when the bill is less is between $100 and $300
 * - 25% of the bill when the bill is greater than $300
 *
 * 1. Implement the same functionality as before, this time using Mark´s tipping rules.
 * 2. Create a function (not a method) to calculate the average og a given array of tips.
 * 3. Calculate the average tip for each family
 * 4. Log to the console which family paid the highest tip on average
 *
 * Hint: For the point two, loop over the array, and in each iteration store the current sum in a variable (starting from 0).
 * After you have the sum of the array, divide it by the number of elements in it (that is how you calculate the average)
 */

console.log('-------------------------------------------------')
console.log('Coding Challenge Seven - Start')
console.log('-------------------------------------------------')

const foxRules = {
  fullName: 'Fox McCloud',
  bills: [124, 48, 268, 180, 42],
  calculateTips: function() {
    this.tipByBill = []
    this.totalBills = []

    for (i = 0; i < this.bills.length; i++) {
      let percentage
      let bill = this.bills[i]

      if (bill <= 50) {
        percentage = 20/100
      } else if (50 > bill <= 200) {
        percentage = 15/100
      } else {
        percentage = 10/100
      }

      this.tipByBill[i] = bill * percentage
      this.totalBills[i] = bill + bill * percentage
    }
  }
}

const falcoRules = {
  fullName: 'Falco Lombardi',
  bills: [77, 375, 110, 45],
  calculateTips: function() {
    this.tipByBill = []
    this.totalBills = []

    for (i = 0; i < this.bills.length; i++) {
      let percentage
      let bill = this.bills[i]

      if (bill <= 100) {
        percentage = 20/100
      } else if (100 > bill <= 300) {
        percentage = 10/100
      } else {
        percentage = 15/100
      }

      this.tipByBill[i] = bill * percentage
      this.totalBills[i] = bill + bill * percentage
    }
  }
}

function calculateAverage(tips) {
  let sum = 0

  for (let i = 0; i < tips.length; i++) {
    sum =  sum + tips[i];
  }

  return sum
}

foxRules.calculateTips()
falcoRules.calculateTips()

foxRules.average = calculateAverage(foxRules.tipByBill)
falcoRules.average = calculateAverage(falcoRules.tipByBill)

if (foxRules.average > falcoRules.average) {
  console.log(`${foxRules.fullName}'s family pays higher tips with a value of ${foxRules.average}`)
} else if(falcoRules.average > foxRules.average) {
  console.log(`${falcoRules.fullName}'s family pays higher tips with a value of ${falcoRules.average}`)
}

console.log('-------------------------------------------------')
console.log('Coding Challenge Seven - End')
console.log('-------------------------------------------------')