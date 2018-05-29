import { DOMElements } from './DOMElements';

const limitRecipeTitle = (title, limit = 18) => {
    const shortTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((accumulator, currentWord) => {
            if (accumulator + currentWord.length <= limit) {
                shortTitle.push(currentWord);
            }

            return accumulator + currentWord.length
        }, 0)

        return `${shortTitle.join(' ')} ...`;
    }

    return title;
}

const renderSearchResult = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOMElements.searchResultsList.insertAdjacentHTML('beforeend', markup);
}

const createButtonMarkup = (page, direction) => {
    return `
        <button class="btn-inline results__btn--${direction}" data-goto=${direction === 'next' ? page + 1 : page - 1}>
            <span>Page ${direction === 'next' ? page + 1 : page - 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction === 'next' ? 'right' : 'left'}"></use>
            </svg>
        </button>
    `;
}

export const getQueryInput = () => DOMElements.searchInputQuery.value;

export const clearQueryInput = () => {
    DOMElements.searchInputQuery.value = '';
}

export const clearSearchResults = () => {
    DOMElements.searchResultsList.innerHTML = '';
}

export const clearPagination = () => {
    DOMElements.searchPagination.innerHTML = '';
}

export const renderPaginationButtons = (page, numResults, resultsPerPage) => {
    let buttonMarkup;
    const pages = Math.ceil(numResults / resultsPerPage);

    if (page === 1 && pages > 1) {
        buttonMarkup = createButtonMarkup(page, 'next');
    } else if (page < pages) {
        buttonMarkup = `
            ${createButtonMarkup(page, 'prev')}
            ${createButtonMarkup(page, 'next')}
        `;
    } else if (page === pages && page > 1) {
        buttonMarkup = createButtonMarkup(page, 'prev');
    }

    DOMElements.searchPagination.insertAdjacentHTML('afterbegin', buttonMarkup);
}

export const renderSearchResults = (recipes, page = 1, resultsPerPage = 10) => {
    const firstRecipe = (page - 1) * resultsPerPage;
    const lastRecipe = page * resultsPerPage;

    recipes.slice(firstRecipe, lastRecipe).forEach(renderSearchResult);
    renderPaginationButtons(page, recipes.length, resultsPerPage);
}