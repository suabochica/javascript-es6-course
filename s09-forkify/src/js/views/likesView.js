import { DOMElements } from './DOMElements'

export const toggleLikeButton = (isLiked) => {
    const likeStateClass = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${likeStateClass}`);
}

export const toggleLikeMenu = (numLikes) => {
    DOMElements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = (like) => {
    const likeMarkup = `
        <li>
            <a class="likes__link" href="#${like.recipeId}">
                <figure class="likes__fig">
                    <img src="${like.image}" alt="Test">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.publisher}</p>
                </div>
            </a>
        </li>
    `;

    DOMElements.likesList.insertAdjacentHTML('beforeend', likeMarkup);
}

export const deleteLike = (recipeId) => {
    const likeItem = document.querySelector(`.likes__link[href*="${recipeId}"]`).parentElement;

    if (likeItem) likeItem.parentElement.removeChild(likeItem);
}