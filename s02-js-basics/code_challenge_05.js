//-------------------------------------
// Coding Challenge Five: Basketball average
//-------------------------------------
/**
 * John and his family went on a holiday and went to 3 different restaurants.
 * The bills were $124, $48 and $268.
 *
 * To tip the waite a fair amount, John created a simple tip calculator (as a function).
 * He likes to tip:
 *
 * - 20% of the bill when the bill is less than $50
 * - 15% of the bill when the bill is less is between $50 and $200
 * - 10% of the bill when the bill is greater than $200
 *
 * In the end John would like to have two arrays:
 * 1. Containing all three tips (one for each bill)
 * 2. Containing all three final paid amounts (bill + tip)
 */

console.log('-------------------------------------------------')
console.log('Coding Challenge Five - Start')
console.log('-------------------------------------------------')

const bills = [124, 48, 268]

function tipCalculator(billsArray) {
  let tipsByBill = []
  let totalBills = []

  for (i = 0; i < billsArray.length; i++) {
    if (billsArray[i] <= 50) {
      tipsByBill.push(billsArray[i] * 20/100)
    } else if (50 > billsArray[i] <= 200) {
      tipsByBill.push(billsArray[i] * 15/100)
    } else {
      tipsByBill.push(billsArray[i] * 10/100)
    }

    totalBills.push(billsArray[i] + tipsByBill[i])
  }

  console.log(`${tipsByBill}`)
  console.log(`${totalBills}`)

  return tipsByBill
}

function tipCalculatorWithoutLoop(bill) {
  let percentage;

  switch(percentage) {
    case (bill <= 50):
      percentage = 20/100
      break
    case (50 > bill <= 200):
      percentage = 15/100
      break
    default:
      percentage = 10/100
  }

  return percentage * bill
}

//tipCalculator(bills)

tips = [tipCalculatorWithoutLoop(bills[0]),
        tipCalculatorWithoutLoop(bills[1]),
        tipCalculatorWithoutLoop(bills[2])]

console.log(tips)

console.log('-------------------------------------------------')
console.log('Coding Challenge Five - End')
console.log('-------------------------------------------------')