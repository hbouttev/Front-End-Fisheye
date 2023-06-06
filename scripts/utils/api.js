// local cache for fetched data. Would be better in a module scope.
let cachedPhotographers = null;

async function getPhotographers() {
    if (cachedPhotographers !== null) {
        return cachedPhotographers;
    }
    return await fetch('../../data/photographers.json').then((response) => {
        return response.json();
    }).then((data) => {
        cachedPhotographers = data;
        return data;
    });
}

async function getPhotographerById(id) {
    const { photographers } = await getPhotographers();
    return photographers.find(photographer => photographer.id === id);
}

async function getMediaByPhotographerId(id) {
    const { media } = await getPhotographers();
    return media.filter(media => media.photographerId === id);
}
