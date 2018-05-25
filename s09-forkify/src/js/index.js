import axios from 'axios';

async function getRecipes(query) {
    const key = '3c363f9f897b423356b66cc2539c0bac';
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    try {
        const response = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = response.data.recipes;

        console.log(recipes)
    } catch (error) {
        alert(error);
    }
}

getRecipes('lasagna');