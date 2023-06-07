function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const pictureUrl = `assets/photographers/${portrait}`;

    let media = null; // photographer's media array
    let mediaCurrentSort = null; // photographer's media current sort
    let totalLikes = null; // photographer's total likes calculated from media

    // Sort options: date, title, likes. Default: likes.
    async function getMedia({ sortedBy = 'likes' } = {}) {
        if (media === null) {
            const mediaData = await getMediaByPhotographerId(id);
            media = mediaData.map(mediaFactory);
        }
        sortMedia(sortedBy);
        return media;
    }

    function sortMedia(sortedBy) {
        if (mediaCurrentSort === sortedBy) return;
        switch (sortedBy) {
            case 'date':
                sortMediaByDate(media);
                break;
            case 'title':
                sortMediaByTitle(media);
                break;
            case 'likes':
            default:
                sortMediaByLikes(media);
        }
        mediaCurrentSort = sortedBy;
    }

    async function getTotalLikes() {
        if (totalLikes === null) {
            totalLikes = getMedia().then(mediaList => mediaList.reduce((total, media) => total + media.getLikes(), 0));
        }
        return totalLikes;
    }

    async function incrementTotalLikes() {
        totalLikes = getTotalLikes().then(total => total + 1);
    }

    async function decrementTotalLikes() {
        totalLikes = getTotalLikes().then(total => total - 1);
    }

    const getUserCardHTML = () => (`
        <article class="photographer-card">
            <a href="photographer.html?id=${id}" class="photographer-card__link" aria-label="Profil page of ${name}" tabindex="0">
                <img src="${pictureUrl}" alt="${name}"
                    class="photographer-profile-picture photographer-profile-picture--card">
                <h2 class="photographer-name photographer-name--card">${name}</h2>
            </a>
            <p class="photographer-location photographer-location--card" aria-label="Located in ${city} ${country}">${city}, ${country}</p>
            <p class="photographer-tagline photographer-tagline--card" aria-label="My tagline is ${tagline}">${tagline}</p>
            <p class="photographer-price photographer-price--card" aria-label="Price is ${price} per day">${price}€/jour</p>
        </article>
    `);


    const getUserPageHeaderHTML = () => (`
        <div class="photographer-header__profile" aria-label="About me">
            <h1 class="photographer-name">${name}</h1>
            <p class="photographer-location" aria-label="Located in ${city} ${country}">${city}, ${country}</p>
            <p class="photographer-tagline" aria-label="My tagline is ${tagline}">${tagline}</p>
        </div>
        <div class="photographer-header__contact">
            <button class="contact-button" aria-label="Contact me">Contactez-moi</button>
        </div>
        <div class="photographer-header__profile-picture">
            <img src="${pictureUrl}" alt="${name}"
                class="photographer-profile-picture">
        </div>
    `);

    const getUserInsertDetailsHTML = async () => (`
        <div class="fixed-box__total-likes">
            <p class="photographer-total-likes" aria-label="${await getTotalLikes()} total likes">
                <span class="total-likes">${await getTotalLikes()}</span> <i class="fa-solid fa-heart media-likes__icon" aria-label="likes"></i>
            </p>
        </div>
        <div class="fixed-box__price"><p class="photographer-price" aria-label="Price is ${price} euro per day">${price}€ / jour</p></div>
    `);

    const getUserContactModalHTML = () => (`
        <dialog id="contact-modal" aria-labelledby="contact-modal-title">
            <div class="modal">
                <header class="modal__header">
                    <h2 id="contact-modal-title" aria-label="Contact me ${name}">Contactez-moi<br> ${name}</h2>
                    <img role="button" aria-label="Close contact form" src="assets/icons/close.svg" alt="Close cross"/>
                </header>
                <form name="contact-photographer" class="modal__contact-form" novalidate>
                    <div class="form-section">
                        <label class="form-section__label" for="first-name" aria-label="First name">Prénom</label>
                        <input class="form-section__input" type="text" id="first-name" name="firstName" minlength="2"
                               pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
                               required/>
                    </div>
                    <div class="form-section">
                        <label class="form-section__label" for="last-name" aria-label="Last name">Nom</label>
                        <input class="form-section__input" type="text" id="last-name" name="lastName" minlength="2"
                               pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
                               required/>
                    </div>
                    <div class="form-section">
                        <label class="form-section__label" for="email" aria-label="Email">Email</label>
                        <input class="form-section__input" type="email" id="email" name="email" minlength="2"
                               pattern="[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                               required/>
                    </div>
                    <div class="form-section">
                        <label class="form-section__label" for="message" aria-label="Your message">Votre message</label>
                        <textarea class="form-section__input form-section__input--textarea" id="message" name="message" minlength="2" required></textarea>
                    </div>
                    <button class="contact-button" aria-label="Send">Envoyer</button>
                </form>
            </div>
        </dialog>
    `);

    return {
        name,
        portrait,
        id,
        city,
        country,
        tagline,
        price,
        pictureUrl,
        getUserCardHTML,
        getUserPageHeaderHTML,
        getUserInsertDetailsHTML,
        getUserContactModalHTML,
        getMedia,
        getTotalLikes,
        incrementTotalLikes,
        decrementTotalLikes,
    };
}
