import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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
    // 1. TO DO: Get the query from the view
    const query = searchView.getQueryInput();

    if (query) {
        // 2. New search object and add to the state
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearQueryInput();
        searchView.clearRecipes();
        renderLoader(DOMElements.searchResults)

        // 4. Search for recipes
        await state.search.searchRecipes();

        // 5. Render results on UI
        clearLoader();
        searchView.renderRecipes(state.search.recipes);
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

        searchView.clearRecipes();
        searchView.clearPagination();
        searchView.renderRecipes(state.search.recipes, goToPage);
    }
});

/**
 * Recipe Controller
 * -----------------
**/

const r = new Recipe(49408);
r.getRecipe();

console.log(r);