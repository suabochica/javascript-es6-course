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

    deleteLike(likeId) {
        const likeIndex = this.likes.findIndex(currentElement => currentElement.id === likeId);

        this.likes.splice(itemIndex, 1);
    }

    isLiked(likeId) {
        return this.likes.findIndex(currentElement => currentElement.likeId === likeId) !== -1;
    }

    getLikesNumber() {
        return this.likes.length;
    }
}