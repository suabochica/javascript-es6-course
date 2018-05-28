export const DOMElements = {
    searchForm: document.querySelector('.search'),
    searchInputQuery: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list')
}

export const DOMStrings = {
    loader: 'loader'
}

export const renderLoader = (parent) => {
    const loader = `
        <div class="${DOMStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = (parent) => {
    const loader = document.querySelector(`.${DOMStrings.loader}`);

    if (loader) {
        loader.parentElement.removeChild(loader)
    }
}