function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardHTML = photographerModel.getUserCardHTML();
        photographersSection.insertAdjacentHTML("beforeend", userCardHTML);
    });
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    displayData(photographers);
}

init();
