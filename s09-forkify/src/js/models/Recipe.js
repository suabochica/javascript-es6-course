import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const response = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);

            this.title = response.data.recipe.title;
            this.publisher = response.data.recipe.publisher;
            this.image = response.data.recipe.image_url;
            this.source = response.data.recipe.source_url;
            this.ingredients = response.data.recipe.ingredients;

        } catch (error) {
            alert('Something went wrong ñ.ñ')
            console.log(error);
        }
    }

    timePreparation() {
        const ingredientsNumber = this.ingredients.length;
        const periods = Math.ceil(ingredientsNumber / 3);

        // Assuming that we need 15 minutes for each 3 ingredients
        this.time = periods * 15;
    }

    servingsNumber() {
        this.servings = 4;
    }

    /**
     * This method will convert the ingedients strings
     * Case 1:
     * from: 4 small chicken breasts, pounded thin
     * to: {
     *  count: 4
     *  unit: ''
     *  ingredient: 'small chicken breasts, pounded thin'
     * }
     *
     * Case 2:
     * from: 4 ounces cream cheese, room temperature
     *  to: {
     *  count: 4
     *  unit: 'oz'
     *  ingredient: 'cream cheese, room temperature'
     * }
     */
    parseIngredients() {
        const unitsLong = [
            'tablespoons',
            'tablespoon',
            'ounces',
            'ounce',
            'teaspoons',
            'teaspoon',
            'cups',
            'pounds'
        ];
        const unitsShort = [
            'tbsp',
            'tbsp',
            'oz',
            'oz',
            'tsp',
            'tsp',
            'cup',
            'pound',
            'kg',
            'g'
        ];

        const newIngredientsFormat = this.ingredients.map(element => {
            // 1. Uniform units
            let ingredient = element.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            })

            // 2. Remove parentheses (Regular expression)
            ingredient = ingredient.replace(/ *\([^]*\) */g, ' ');

            // 3. Parse ingredients into count, unit, and ingredient
            let ingredientObject;
            const ingredientArray = ingredient.split(' ');
            const unitIndex = ingredientArray.findIndex(shortUnitElement => unitsShort.includes(shortUnitElement));

            if (unitIndex > -1) {
                // There is a unit
                let count;
                const countArray = ingredientArray.slice(0, unitIndex);

                if (countArray.length === 1) {
                    count = eval(ingredientArray[0].replace('-', '+'));
                } else {
                    count = eval(ingredientArray.slice(0, unitIndex).join('+'));
                }

                ingredientObject = {
                    count: count,
                    unit: ingredientArray[unitIndex],
                    ingredient: ingredientArray.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(ingredientArray[0], 10)) {
                // There is NO unit, but first element is number
                ingredientObject = {
                    count: parseInt(ingredientArray[0], 10),
                    unit: '',
                    ingredient: ingredientArray.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in first position
                ingredientObject = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            return ingredientObject;
        });

        this.ingredients = newIngredientsFormat;
    }

    updateServingsAndIngredients(type) {
        // Update servings
        const newServings = type === 'decrease' ? this.servings - 1 : this.servings + 1;

        // Update ingredients
        this.ingredients.forEach((ingredient) => {
            ingredient.count *= (newServings/this.servings);
        })

        this.servings = newServings;
    }
}