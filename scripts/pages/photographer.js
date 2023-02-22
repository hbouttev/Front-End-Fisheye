function getURLPhotographerID() {
    return parseInt(new URLSearchParams(window.location.search).get("id"));
}

function getPhotographerById(photographers, id) {
    return photographers.find(photographer => photographer.id === id);
}

function getMediaByPhotographerId(media, id) {
    return media.filter(media => media.photographerId === id);
}

// TODO: METTRE TOTALLIKES et getTotalLikes ? dans la factory media
function getTotalLikesFromMedia(media) {
    return media.reduce((total, media) => total + media.likes, 0);
}

function displayPhotographerData(photographer) {
    const photographerModel = photographerFactory(photographer);
    localData.photographer = photographerModel;
    const photographerHeader = document.querySelector(".photographer-header");
    const photographerHeaderHTML = photographerModel.getUserPageHeaderHTML();
    photographerHeader.insertAdjacentHTML("beforeend", photographerHeaderHTML);

    const photographerDailyRate = document.querySelector(".fixed-box__price");
    const photographerDailyRateHTML = photographerModel.getUserDailyRateHTML();
    photographerDailyRate.insertAdjacentHTML("beforeend", photographerDailyRateHTML);
}

function displayPhotographerMedia(media) {
    const photographerMedia = document.querySelector(".photographer-media");
    media.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardHTML = mediaModel.getMediaCardHTML();
        photographerMedia.insertAdjacentHTML("beforeend", mediaCardHTML);
    });
}

function displayPhotographerTotalLikes(totalLikes) {
    const photographerTotalLikes = document.querySelector("#total-likes");
    photographerTotalLikes.textContent = totalLikes;
}

function displayModal(photographer) {
    const modal = document.getElementById("contact-modal");
    if (!!modal) {
        openModal(modal);
    } else {
        const pageMain = document.getElementById("main");
        const photographerContactModalHTML = photographer.getUserContactModalHTML();
        pageMain.insertAdjacentHTML("afterend", photographerContactModalHTML);
        const newModal = document.getElementById("contact-modal");
        const modalCloseButton = document.querySelector("#contact-modal header img");
        modalCloseButton.addEventListener("click", () => closeModal(newModal));
        openModal(newModal);
        initForm();
    }
}

async function init() {
    const photographerID = getURLPhotographerID();
    const {photographers, media} = await getPhotographers();
    const photographer = getPhotographerById(photographers, photographerID);
    const photographerMedia = getMediaByPhotographerId(media, photographerID);
    displayPhotographerData(photographer);
    // TODO
    // SORT MEDIA IN ARRAY BEFORE SEND TO DISPLAY
    // MIEUX ? : récupérer tous les mediaModel avec la factory, les stocker dans un tableau, puis les trier et envoyer
    // à fonction affichage qui parcours et appelle la méthode getMediaCardHTML() de chaque mediaModel (évite de
    // rappeler factory à chaque fois
    // TODO:
    // totalLikes et likes : mettre totallikes factory media (cf. plus haut), et pour gestion des likes : session storage
    // (garde en mémoire, mais peut clear au chargement de page ?) ou alors modifier directement objet media dans tableau
    // pour changer les likes, et update le total likes avec getTotalLikes qui le recalcule à chaque fois à l'affichage
    // (mais c'est lourd, ou alors il est juste incrémenté ou décrémenté à chaque fois qu'on like ou dislike, comme ça
    // simple, et si recharge page alors dans l'idée comme le calcul est fait au chargement ou création media factory il
    // est à jour de toute façon). Likes media > update media likes dans tableau > update total likes (incrément) et affiche
    // ou recalcul total likes et affiche
    displayPhotographerMedia(photographerMedia);
    let totalLikes = getTotalLikesFromMedia(photographerMedia);
    displayPhotographerTotalLikes(totalLikes);
    // TODO: TEMPS LOCAL DATA
    localData.totalLikes = totalLikes;
    // TODO: ajouter les event listener pour modal
    const photographerContactButton = document.querySelector(".photographer-header__contact .contact-button");
    photographerContactButton.addEventListener("click", () => displayModal(localData.photographer));
    console.log(photographer);
    console.log(photographerMedia);
    console.log(totalLikes);
}

// TODO: il faut qu'on stock localement des données : photographe (objet), media (tableau), totalLikes (nombre) (ou le mettre
// dans media factory ou photographe, à voir cf. plus haut). Soit un objet local qui contient ces données.
// Soit localSession storage pour stocker dans navigateur (objet en json stringify car que value string / ou pas,
// doc sous-entend que conversion objet > string est automatique, à tester), ce sera effacé
// en quittant fenêtre ? Ou event beforeunload / onunload pour le clear en quittant page (y compris retour arrière),
// car dois gérer visiter plusieurs pages photographes à la suite sans mélanger donner ? Ou ne pas clear en quittant la
// la page et recharger depuis session storage si existe déjà, mais demande de ne pas sauvegarder likes au refresh donc
// pas le faire.
const localData = {
    photographer: null,
    media: null,
    totalLikes: null
}

init();
console.log("localData", localData);
