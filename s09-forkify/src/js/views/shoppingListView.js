import { DOMElements } from './DOMElements';

export const renderShoppingListItem = shoppingListItem => {
    const shoppingListItemMarkup = `
        <li class="shopping__item" data-itemid="${shoppingListItem.id}">
            <div class="shopping__count">
                <input type="number" value="${shoppingListItem.count}" step="${shoppingListItem.count}" class="shopping__count--value">
                <p>${shoppingListItem.unit}</p>
            </div>
            <p class="shopping__description">${shoppingListItem.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    DOMElements.shoppingList.insertAdjacentHTML('beforeend', shoppingListItemMarkup);
}

export const deleteShoppingListItem = (shoppingListItemId) => {
    const shoppingListItem = document.querySelector(`[data-itemid="${shoppingListItemId}"]`);

    shoppingListItem.parentElement.removeChild(shoppingListItem);
}