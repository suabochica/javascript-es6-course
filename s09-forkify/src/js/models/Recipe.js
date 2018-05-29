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
        const periods = Math.ceil(this.ingredients / 3);

        // Assuming that we need 15 minutes for each 3 ingredients
        this.time = periods * 15;
    }

    servingsNumber() {
        this.servings = 4;
    }
}