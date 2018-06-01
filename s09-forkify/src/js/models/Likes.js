export default class List {
    constructor() {
        this.likes = []
    }

    addLike(recipeId, title, publisher, image) {
        const like = {
            recipeId,
            title,
            publisher,
            image
        }

        this.likes.push(like);
        this.persistData()

        return like;
    }

    deleteLike(recipeId) {
        const likeIndex = this.likes.findIndex(currentElement => currentElement.recipeId === recipeId);

        this.persistData()
        this.likes.splice(likeIndex, 1);
    }

    isLiked(recipeId) {
        return this.likes.findIndex(currentElement => currentElement.recipeId === recipeId) !== -1;
    }

    getLikesNumber() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readLocalStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        if (storage) this.likes = storage;
    }
}