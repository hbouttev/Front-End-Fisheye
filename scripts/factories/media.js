function mediaFactory(data) {
    const { id, photographerId, title, image, video, date, price } = data;
    let { likes } = data;

    let liked = false;

    const mediaUrl = `assets/media/${photographerId}/${!!image ? image : video}`;

    function getLikes() {
        return likes;
    }

    function incrementLikes() {
        likes += 1;
    }

    function decrementLikes() {
        likes -= 1;
    }

    function isLiked() {
        return liked;
    }

    function toggleLiked() {
        if (liked) {
            decrementLikes();
        } else {
            incrementLikes();
        }
        liked = !liked;
    }

    const getMediaCardHTML = () => (`
        <article class="media-card" id="${id}">
            <a href="#" class="media-card__link">
                <${!!image ? 'img' : 'video'} class="media-thumbnail" src=${mediaUrl} alt="">
                ${!!video ? '</video>' : ''}
            </a>
            <div class="media-card__info">
                <h2 class="media-title">${title}</h2>
                <p class="media-likes">${likes} <i class="fa-solid fa-heart media-likes__icon"></i></p>
            </div>
        </article>
    `);

    return {
        id,
        photographerId,
        title,
        image,
        video,
        likes,
        date,
        price,
        getMediaCardHTML,
        getLikes,
        isLiked,
        toggleLiked
    };
}
