export default class List {
    constructor() {
        this.likes = []
    }

    addLike(recipeId, title, author, image) {
        const like = {
            recipeId,
            title,
            author,
            image
        }

        this.likes.push(like);

        return like;
    }

    deleteLike(recipeId) {
        const likeIndex = this.likes.findIndex(currentElement => currentElement.recipeId === recipeId);

        this.likes.splice(likeIndex, 1);
    }

    isLiked(recipeId) {
        return this.likes.findIndex(currentElement => currentElement.recipeId === recipeId) !== -1;
    }

    getLikesNumber() {
        return this.likes.length;
    }
}