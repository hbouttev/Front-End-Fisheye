function updateLightbox(lightboxElement, media) {
    const lightBoxMediaContent = lightboxElement.querySelector('.lightbox__media-wrapper');
    lightBoxMediaContent.innerHTML = getLightboxMediaContentHTML(media); // ATTENTION ON NE VEUT PAS METTRE A JOUR LA NAVIGATION ET BOUTON CLOSE
}

const getLightboxMediaContentHTML = (media) => (`
    <figure class="lightbox__media" data-media-id="${media.id}">
        ${media.getMediaElementHTML()}
        <figcaption class="lightbox__title">${media.title}</figcaption>
    </figure>
`);

const getLightboxHTML = (media) => (`
    <dialog id="media-lightbox" aria-label="image closeup view">
        <div class="lightbox__container">
            <div class="lightbox__nav-container lightbox__nav-container--left">
                 <div class="lightbox__button lightbox__nav-button lightbox__nav-button--previous" role="link" aria-label="Previous image" tabindex="0">
                    <i class="fa-solid fa-chevron-left"></i>
                 </div>
            </div>
            <div class="lightbox__media-wrapper">
                ${getLightboxMediaContentHTML(media)}
            </div>
            <div class="lightbox__nav-container lightbox__nav-container--right">
                <div class="lightbox__button lightbox__nav-button lightbox__nav-button--next" role="link" aria-label="Next image" tabindex="0">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div class="lightbox__button lightbox__close-button" role="button" aria-label="Close dialog" tabindex="0">
                <i class="fa-sharp fa-solid fa-xmark"></i>
            </div>
        </div>
    </dialog>
`);

function initLightbox(lightboxElement, mediaList) {
    const lightboxCloseButton = lightboxElement.querySelector('.lightbox__close-button');
    lightboxCloseButton.addEventListener('click', () => closeModal(lightboxElement));
    lightboxCloseButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            closeModal(lightboxElement);
        }
    });
    const handleClickPreviousMedia = () => {
        const currentMediaId = parseInt(lightboxElement.querySelector('.lightbox__media').getAttribute('data-media-id'));
        const previousMedia = getPreviousMediaById(currentMediaId, mediaList)
        updateLightbox(lightboxElement, previousMedia);
    }
    const handleClickNextMedia = () => {
        const currentMediaId = parseInt(lightboxElement.querySelector('.lightbox__media').getAttribute('data-media-id'));
        const nextMedia = getNextMediaById(currentMediaId, mediaList)
        updateLightbox(lightboxElement, nextMedia);
    }
    const lightboxPreviousButton = lightboxElement.querySelector('.lightbox__nav-button--previous');
    lightboxPreviousButton.addEventListener('click', handleClickPreviousMedia);
    lightboxPreviousButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleClickPreviousMedia();
    });
    const lightboxNextButton = lightboxElement.querySelector('.lightbox__nav-button--next');
    lightboxNextButton.addEventListener('click', handleClickNextMedia);
    lightboxNextButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleClickNextMedia();
    });
    lightboxElement.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') handleClickPreviousMedia();
        if (event.key === 'ArrowRight') handleClickNextMedia();
        if (event.key === 'Escape') closeModal(lightboxElement);
    });
}
