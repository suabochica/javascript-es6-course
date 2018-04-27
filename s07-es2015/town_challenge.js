/**
 * Suppose that you are working in a small town administration, and you are in charge of two elements:
 * 1. Parks
 * 2. Streets
 * 
 * It is a very small town, so rigth now there are only 3 parks and 4 streets. all parks and streets have a name and a build year.
 * 
 * At an end-of-year meeting, youur boss wants a final report with the following:
 * 
 * 1. Tree density of each park in the town (formula: number of tree/park area)
 * 2. Average age of each town's park (formula: sum of all ages/number of parks)
 * 3. The name of the park that has more than 1000 trees.
 * 4. Total and average length of the town's streets.
 * 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal.
 * 
 * All report data should be printed to the console
 * 
 * Hint: Use the next ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
 */
 
 class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownElement {
    constructor(name, buildYear, area, numberOfTrees) {
        super(name, buildYear);

        this.area = area;
        this.numberOfTrees = numberOfTrees;
    }

    treeDensity() {
        const density = this.numberOfTrees / this.area;

        console.log(`${this.name} has a tree density of ${density} trees per kilometer square`);
    }
}

class Street extends TownElement {
    constructor(name, buildYear, length ,size = 3) {
        super(name, buildYear);

        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const streetClassification = new Map()

        streetClassification.set(1, 'tiny');
        streetClassification.set(2, 'small');
        streetClassification.set(3, 'normal');
        streetClassification.set(4, 'big');
        streetClassification.set(5, 'huge');

        console.log(`${this.name} build in ${this.buildYear} is a ${streetClassification.get(this.size)} street` );
    }
}

const parks = [
    new Park('Green Park', 1810, 2 , 900),
    new Park('National Park', 1894, 3.9 , 3941),
    new Park('Oak Park', 1894, 2.9, 864)

];

const streets = [
    new Street('Ocean Avenue', 1999, 1.1, 4),
    new Street('Evergree Avenue', 2008, 2.7, 2),
    new Street('4th Street', 2015, 2.8),
    new Street('Sunset Boulevart', 1982, 2.5, 5)
]

function calculateArrayAverage(array) {
    const sum = array.reduce((previous, current, index) => previous + current, 0);

    return [sum, sum/array.length]
}

function reportParks(parks) {
    console.log('---------------- Parks Report ----------------');

    // Density
    parks.forEach(park => park.treeDensity());

    // Average parks age
    const parksAges = parks.map(park => new Date().getFullYear() - park.buildYear);
    const [totalAge, averageAge] = calculateArrayAverage(parksAges);

    console.log(`Our ${parks.length} parks have an average of ${averageAge} years`);

    // Park with more than 1000 trees
    const index = parks.map(park => park.numberOfTrees).findIndex(treeNumber => treeNumber > 1000);

    console.log(`The ${index} park has more than 1000 tress`);
}

function reportStreets(streets) {
    console.log('---------------- Streets Report ----------------');

    // Total and average length of of town's street
    const [totalLength, averageLength] = calculateArrayAverage(streets.map(street => street.length));

    console.log(`Our ${streets.length} streets have a total length of ${totalLength} km with an average of ${averageLength} km`);

    // Street Classification
    streets.forEach(street => street.classifyStreet());
}

reportParks(parks);
reportStreets(streets);
