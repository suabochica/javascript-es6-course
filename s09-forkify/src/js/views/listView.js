import { DOMElements } from './base'

export const renderShoppingshoppingListItem = shoppingListItem => {
    const shoppingListItemMarkup = `
        <li class="shopping__item" data-item-id="${shoppingListItem.id}">
            <div class="shopping__count">
                <input type="number" value="${shoppingListItem.count}" step="${shoppingListItem.count}">
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
    const shoppingListItem = document.querySelector(`[date-item-id="${shoppingListItemId}"]`);

    shoppingListItem.parentElement.removeChild(shoppingListItem);
}