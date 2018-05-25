// Global app controller
import string from './models/Search'
import { add, multiply, num } from './views/searchView'

const x = 21;

console.log(`this ${num} was imported from test.js`)
console.log(`The x variable with the value of ${x} use the const keyword of ES6. This is a test that prove that bable is transpiled the code`)
console.log(`Using imported functions: ${add(num, x)} and ${multiply(x, 2)}, ${string}`);