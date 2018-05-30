import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { DOMElements, DOMStrings, renderLoader, clearLoader } from './views/DOMElements';

/**
 * Global State of the App
 * -----------------------
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
**/
const state = {};

/**
 * Search Controller
 * -----------------
**/

const controlSearch = async () => {
    // 1. Get the query from the view
    const query = searchView.getQueryInput();

    if (query) {
        // 2. New search object and add to the state
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearQueryInput();
        searchView.clearPagination();
        searchView.clearSearchResults();
        renderLoader(DOMElements.searchResults)

        try {
            // 4. Search for recipes
            await state.search.searchRecipes();

            // 5. Render results on UI
            clearLoader();
            searchView.renderSearchResults(state.search.recipes);
        } catch (error) {
            alert('Error processing the search....');
            clearLoader();
        }
    }
}

DOMElements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});

DOMElements.searchPagination.addEventListener('click', (event) => {
    const inlineButton = event.target.closest(`.${DOMStrings.inlineButton}`);

    if (inlineButton) {
        const goToPage = parseInt(inlineButton.dataset.goto, 10);

        searchView.clearPagination();
        searchView.clearSearchResults();
        searchView.renderSearchResults(state.search.recipes, goToPage);
    }
});

/**
 * Recipe Controller
 * -----------------
**/
const controlRecipe = async () => {
    // Get id from URL
    const recipeId = window.location.hash.replace('#', '');

    if (recipeId) {
        // 1. Prepare the UI
        recipeView.clearRecipe()
        renderLoader(DOMElements.recipe);

        // 1.1 Highlight the selected recipe
        if (state.search) searchView.highlightSelectedRecipe(recipeId);

        // 2. Create new recipe object in the state
        state.recipe = new Recipe(recipeId);

        try {
            // 3. Get recipe data
            await state.recipe.getRecipe();

            // 4. Parse ingredients format
            state.recipe.parseIngredients();

            // 5. Calculate time preparation and serbing
            state.recipe.timePreparation();
            state.recipe.servingsNumber();

            // 6. Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing the recipe');
        }
    }
}

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

DOMElements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServingsAndIngredients('decrease');
            recipeView.updateServingsAndIngredientsUI(state.recipe);
        }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServingsAndIngredients('increase');
        recipeView.updateServingsAndIngredientsUI(state.recipe);
    }
});