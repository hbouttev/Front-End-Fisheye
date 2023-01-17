function photographerFactory(data) {
    const {name, portrait, id, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add('photographer-card');
        // const divImageContainer = document.createElement('div');
        // divImageContainer.classList.add('photographer-card__image-container');
        const img = document.createElement('img');
        img.classList.add('photographer-card__profile-picture');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.classList.add('photographer-card__name');
        h2.textContent = name;
        const pLocation = document.createElement('p');
        pLocation.classList.add('photographer-card__location');
        pLocation.textContent = `${city}, ${country}`;
        const pTagline = document.createElement('p');
        pTagline.classList.add('photographer-card__tagline');
        pTagline.textContent = tagline;
        const pPrice = document.createElement('p');
        pPrice.classList.add('photographer-card__price');
        pPrice.textContent = `${price}€/jour`;
        // article.appendChild(divImageContainer);
        // divImageContainer.appendChild(img);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }

    return {name, picture, getUserCardDOM}
}