function getURLPhotographerID() {
    return parseInt(new URLSearchParams(window.location.search).get('id'));
}

async function displayPhotographerData(photographer) {
    const photographerHeader = document.querySelector('.photographer-header');
    const photographerHeaderHTML = photographer.getUserPageHeaderHTML();
    photographerHeader.insertAdjacentHTML('beforeend', photographerHeaderHTML);

    const photographerInsertDetails = document.querySelector('.fixed-box');
    const photographerInsertDetailsHTML = await photographer.getUserInsertDetailsHTML();
    photographerInsertDetails.insertAdjacentHTML('beforeend', photographerInsertDetailsHTML);
}

function displayPhotographerMedia(mediaList, photographer) {
    const mediaSortContainer = document.querySelector('.photographer-media__sort');
    const mediaSortSelectHTML = getMediaSortSelectHTML();
    mediaSortContainer.insertAdjacentHTML('beforeend', mediaSortSelectHTML);
    initMediaSortSelect(mediaList);

    const photographerMedia = document.querySelector('.photographer-media__media-cards');
    mediaList.forEach((media) => {
        const mediaCardHTML = media.getMediaCardHTML();
        photographerMedia.insertAdjacentHTML('beforeend', mediaCardHTML);
        const mediaContentElement = document.querySelector(`[data-media-id="${media.id}"] .media-card__media`);
        mediaContentElement.addEventListener('click', () => displayLightbox(media, mediaList));
        mediaContentElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') displayLightbox(media, mediaList);
        });
        const mediaLikesButtonElement = document.querySelector(`[data-media-id="${media.id}"] .media-likes__icon`);
        const handleClickLikes = async () => {
            media.toggleLiked();
            if (media.isLiked()) {
                await photographer.incrementTotalLikes()
                mediaLikesButtonElement.classList.add('media-likes__icon--liked');
            } else {
                await photographer.decrementTotalLikes()
                mediaLikesButtonElement.classList.remove('media-likes__icon--liked');
            }
            const mediaLikesElement = document.querySelector(`[data-media-id="${media.id}"] .media-likes__count`);
            mediaLikesElement.textContent = media.getLikes();
            const photographerTotalLikesElement = document.querySelector('.photographer-total-likes .total-likes');
            photographerTotalLikesElement.textContent = await photographer.getTotalLikes();
        }
        mediaLikesButtonElement.addEventListener('click', handleClickLikes);
        mediaLikesButtonElement.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') handleClickLikes();
        });
    });
}

function renderSortedMedia(mediaList) {
    const fragment = document.createDocumentFragment();
    const mediaCardsContainer = document.querySelector('.photographer-media__media-cards');
    const mediaCards = mediaCardsContainer.querySelectorAll('.media-card');
    const mediaSortedIndexMap = new Map();
    // To have a constant sort O(n) complexity and avoid using indexOf, we store the id and index of each
    // media from the already sorted mediaList in a map as key and value to sort the DOM mediaCards
    mediaList.forEach(({id}, index) => {
        mediaSortedIndexMap.set(id, index);
    });
    const sortedMediaCards = Array.from(mediaCards).sort((a, b) => {
        return mediaSortedIndexMap.get(parseInt(a.dataset.mediaId)) - mediaSortedIndexMap.get(parseInt(b.dataset.mediaId));
    });
    sortedMediaCards.forEach((mediaCard) => {
        fragment.appendChild(mediaCard);
    });
    mediaCardsContainer.appendChild(fragment);
}

function displayModal(photographer) {
    const modal = document.getElementById('contact-modal');
    if (modal !== null) {
        openModal(modal);
    } else {
        const pageMain = document.getElementById('main');
        const photographerContactModalHTML = photographer.getUserContactModalHTML();
        pageMain.insertAdjacentHTML('afterend', photographerContactModalHTML);
        const newModal = document.getElementById('contact-modal');
        const modalCloseButton = document.querySelector('#contact-modal header img');
        modalCloseButton.addEventListener('click', () => closeModal(newModal));
        modalCloseButton.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') closeModal(newModal);
        });
        openModal(newModal);
        initForm();
    }
}

function displayLightbox(media, mediaList) {
    const lightbox = document.getElementById('media-lightbox');
    if (lightbox !== null) {
        updateLightbox(lightbox, media);
        openModal(lightbox);
    } else {
        const pageMain = document.getElementById('main');
        const lightboxHTML = getLightboxHTML(media);
        pageMain.insertAdjacentHTML('afterend', lightboxHTML);
        const newLightbox = document.getElementById('media-lightbox');
        initLightbox(newLightbox, mediaList);
        openModal(newLightbox);
    }
}

async function init() {
    const photographerID = getURLPhotographerID();
    const photographerData = await getPhotographerById(photographerID);
    const photographer = photographerFactory(photographerData);
    const photographerMedia = await photographer.getMedia();

    await displayPhotographerData(photographer);
    displayPhotographerMedia(photographerMedia, photographer);
    const photographerContactButton = document.querySelector('.photographer-header__contact .contact-button');
    photographerContactButton.addEventListener('click', () => displayModal(photographer));
    console.log('init, photographer', photographer);
    console.log('init, photographerMedia', photographerMedia);
    // console.log(totalLikes);
}

init();
