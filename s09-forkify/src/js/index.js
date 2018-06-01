import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
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
window.state = state;

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
        // Increase button is clicked
        state.recipe.updateServingsAndIngredients('increase');
        recipeView.updateServingsAndIngredientsUI(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add shopping list button is clicked
        controlShoppingList();
    } else if (event.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    }
});

/**
 * Shopping List Controller
 * ------------------------
**/

const controlShoppingList = () => {
    // 1. Create a new list if there is none yet
    if (!state.shoppingList) state.shoppingList = new ShoppingList();

    // 2. Add each ingredient to the shopping list
    state.recipe.ingredients.forEach(ingredient => {
        const shoppingListIngredient = state.shoppingList.addItem(ingredient.count, ingredient.unit, ingredient.ingredient)

        shoppingListView.renderShoppingListItem(shoppingListIngredient);
    });
}

DOMElements.shoppingList.addEventListener('click', event => {
    const shoppingItemId = event.target.closest('.shopping__item').dataset.itemid;

    // 1. Handle the delete button
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        state.shoppingList.deleteItem(shoppingItemId);
        shoppingListView.deleteShoppingListItem(shoppingItemId)
    } else if (event.target.matches('.shopping__count--value')) {
        // 2. Handle the update count in the modle
        const countValue = parseFloat(event.target.value, 10);

        state.shoppingList.updateCount(shoppingItemId, countValue);
    }
})

/**
 * Likes Controller
 * -----------------
**/

const controlLikes = () => {
    const currentRecipeId = state.recipe.id;
    // 1. Create a new likes list if there is none yet
    if (!state.likes) state.likes = new Likes();

    if(!state.likes.isLiked(currentRecipeId)) {
        // 1. Add like to the state
        const newLike = state.likes.addLike(
            currentRecipeId,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.image,
        )

        // 2. Toggle the like button

        // 3. Add like to the UI list
        console.log(state.likes);
    } else {
        // 1. Remove like to the state
        state.likes.deleteLike(currentRecipeId);

        // 2. Toggle the like button

        // 3. Remove like to the UI list
        console.log(state.likes);
    }
}