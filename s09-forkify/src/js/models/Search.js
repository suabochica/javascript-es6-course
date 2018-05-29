import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async searchRecipes() {
        try {
            const response = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);

            this.recipes = response.data.recipes;
        } catch (error) {
            alert(error);
        }
    }

}
