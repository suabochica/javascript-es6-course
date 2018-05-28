// Search model
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getRecipes() {
        const key = '3c363f9f897b423356b66cc2539c0bac';
        const proxy = 'https://cors-anywhere.herokuapp.com/';

        try {
            const response = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);

            this.recipes = response.data.recipes;
        } catch (error) {
            alert(error);
        }
    }

}
