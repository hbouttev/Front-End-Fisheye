function photographerFactory(data) {
    const {name, portrait, id, city, country, tagline, price} = data;

    const pictureUrl = `assets/photographers/${portrait}`;

    // const getUserCardHTML = () => (`
    //     <article class="photographer-card">
    //         <a href="photographer.html?id=${id}" class="photographer-card__link">
    //             <img src="${pictureUrl}" alt="Portrait de ${name}"
    //                 class="photographer-profile-picture photographer-profile-picture--card">
    //             <h2 class="photographer-name photographer-name--card">${name}</h2>
    //         </a>
    //         <p class="photographer-location photographer-location--card">${city}, ${country}</p>
    //         <p class="photographer-tagline photographer-tagline--card">${tagline}</p>
    //         <p class="photographer-price photographer-price--card">${price}€/jour</p>
    //     </article>
    // `);

    function getUserCardHTML() {
        return (`
            <article class="photographer-card">
                <a href="photographer.html?id=${this.id}" class="photographer-card__link">
                    <img src="${this.pictureUrl}" alt="Portrait de ${this.name}"
                        class="photographer-profile-picture photographer-profile-picture--card">
                    <h2 class="photographer-name photographer-name--card">${this.name}</h2>
                </a>
                <p class="photographer-location photographer-location--card">${this.city}, ${this.country}</p>
                <p class="photographer-tagline photographer-tagline--card">${this.tagline}</p>
                <p class="photographer-price photographer-price--card">${this.price}€/jour</p>
            </article>
        `)
    }

    // const getUserPageHeaderHTML = () => (`
    //     <div class="photographer-header__profile">
    //         <h1 class="photographer-name">${name}</h1>
    //         <p class="photographer-location">${city}, ${country}</p>
    //         <p class="photographer-tagline">${tagline}</p>
    //     </div>
    //     <div class="photographer-header__contact">
    //         <button class="contact-button" onclick="displayModal()">Contactez-moi</button>
    //     </div>
    //     <div class="photographer-header__profile-picture">
    //         <img src="${pictureUrl}" alt="Portrait de ${name}"
    //             class="photographer-profile-picture">
    //     </div>
    // `);

    function getUserPageHeaderHTML() {
        return (`
            <div class="photographer-header__profile">
                <h1 class="photographer-name">${this.name}</h1>
                <p class="photographer-location">${this.city}, ${this.country}</p>
                <p class="photographer-tagline">${this.tagline}</p>
            </div>
            <div class="photographer-header__contact">
                <button class="contact-button">Contactez-moi</button>
            </div>
            <div class="photographer-header__profile-picture">
                <img src="${this.pictureUrl}" alt="Portrait de ${this.name}"
                    class="photographer-profile-picture">
            </div>
        `)
    }

    // const getUserDailyRateHTML = () => (`
    //     <p class="photographer-price">${price}€ / jour</p>
    // `);

    function getUserDailyRateHTML() {
        return (`
            <p class="photographer-price">${this.price}€ / jour</p>
        `);
    }

    // const getUserContactModalHTML = () => (`
    //     <dialog id="contact-modal">
    //         <div class="modal">
    //             <header class="modal__header">
    //                 <h2>Contactez-moi ${name}</h2>
    //                 <img src="assets/icons/close.svg" onclick="closeModal()"/>
    //             </header>
    //             <form name="contact-photographer" class="modal__contact-form" novalidate>
    //                 <div class="form-section">
    //                     <label class="form-section__label" for="first-name">Prénom</label>
    //                     <input class="form-section__input" type="text" id="first-name" name="first-name" minlength="2"
    //                            pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
    //                            required/>
    //                 </div>
    //                 <div class="form-section">
    //                     <label class="form-section__label" for="last-name">Nom</label>
    //                     <input class="form-section__input" type="text" id="last-name" name="last-name" minlength="2"
    //                            pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
    //                            required/>
    //                 </div>
    //                 <div class="form-section">
    //                     <label class="form-section__label" for="email">Email</label>
    //                     <input class="form-section__input" type="email" id="email" name="email" minlength="2"
    //                            pattern="[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    //                            required/>
    //                 </div>
    //                 <div class="form-section">
    //                     <label class="form-section__label" for="message">Votre message</label>
    //                     <textarea class="form-section__input form-section__input--textarea" id="message" name="message" minlength="2" required></textarea>
    //                 </div>
    //                 <button class="contact-button">Envoyer</button>
    //             </form>
    //         </div>
    //     </dialog>
    // `);

    function getUserContactModalHTML() {
        return (`
            <dialog id="contact-modal">
                <div class="modal">
                    <header class="modal__header">
                        <h2>Contactez-moi ${this.name}</h2>
                        <img src="assets/icons/close.svg"/>
                    </header>
                    <form name="contact-photographer" class="modal__contact-form" novalidate>
                        <div class="form-section">
                            <label class="form-section__label" for="first-name">Prénom</label>
                            <input class="form-section__input" type="text" id="first-name" name="firstName" minlength="2"
                                   pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
                                   required/>
                        </div>
                        <div class="form-section">
                            <label class="form-section__label" for="last-name">Nom</label>
                            <input class="form-section__input" type="text" id="last-name" name="lastName" minlength="2"
                                   pattern="^[^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$"
                                   required/>
                        </div>
                        <div class="form-section">
                            <label class="form-section__label" for="email">Email</label>
                            <input class="form-section__input" type="email" id="email" name="email" minlength="2"
                                   pattern="[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                                   required/>
                        </div>
                        <div class="form-section">
                            <label class="form-section__label" for="message">Votre message</label>
                            <textarea class="form-section__input form-section__input--textarea" id="message" name="message" minlength="2" required></textarea>
                        </div>
                        <button class="contact-button" type="submit">Envoyer</button>
                    </form>
                </div>
            </dialog>
        `);
    }

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
        getUserDailyRateHTML,
        getUserContactModalHTML
    };
}
