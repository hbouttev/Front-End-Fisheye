function mediaFactory(data) {
    const { id, photographerId, title, image, video, date, price } = data;
    let { likes } = data;

    let liked = false;

    const mediaUrl = `assets/media/${photographerId}/${image || video}`;

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

    const getMediaElementHTML = ({controls = true} = {}) => (`
        <${image ? 'img' : 'video'} class="media-content" src="${mediaUrl}" alt="${title}" ${video && controls ? 'controls' : ''}>
        ${video ? '</video>' : ''}
    `);

    const getMediaCardHTML = () => (`
        <article class="media-card" data-media-id="${id}">
            <div class="media-card__media" role="link" aria-label="${title}, closeup view" tabindex="0">
                ${getMediaElementHTML({controls: false})}
            </div>
            <div class="media-card__info">
                <h2 class="media-title">${title}</h2>
                <p class="media-likes" aria-label="${likes} likes">
                    <span class="media-likes__count">${likes}</span> <i class="fa-solid fa-heart media-likes__icon" aria-label="likes"></i>
                </p>
            </div>
        </article>
    `);

    return {
        id,
        photographerId,
        title,
        image,
        video,
        date,
        price,
        getMediaElementHTML,
        getMediaCardHTML,
        getLikes,
        isLiked,
        toggleLiked
    };
}
