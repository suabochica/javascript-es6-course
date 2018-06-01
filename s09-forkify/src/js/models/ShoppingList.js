import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = []
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);

        return item;
    }

    deleteItem(itemId) {
        const itemIndex = this.items.findIndex(currentElement => currentElement.id === itemId);

        this.items.splice(itemIndex, 1);
    }

    updateCount(itemId, newCount) {
        this.items.find(currentElement => currentElement.id === itemId).count = newCount;
    }
}