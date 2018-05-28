import { DOMElements } from './DOMElements';

export const getQueryInput = () => DOMElements.searchInputQuery.value;

export const clearQueryInput = () => {
    DOMElements.searchInputQuery.value = '';
}

export const clearRecipes = () => {
    DOMElements.searchResultsList.innerHTML = '';
}

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOMElements.searchResultsList.insertAdjacentHTML('beforeend', markup);
}

export const renderRecipes = (recipes) => {
    recipes.forEach(renderRecipe);
}