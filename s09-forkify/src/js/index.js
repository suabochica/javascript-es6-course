import Search from './models/Search';
import * as searchView from './views/searchView';
import { DOMElements } from './views/DOMElements';
/**
 * Global State of the App
 * -----------------------
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. TO DO: Get the query from the view
    const query = searchView.getQueryInput();

    if (query) {
        // 2. New search object and add to the state
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearQueryInput();
        searchView.clearRecipes();

        // 4. Search for recipes
        await state.search.getRecipes();

        // 5. Render results on UI
        searchView.renderRecipes(state.search.recipes);
    }
}

DOMElements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});
