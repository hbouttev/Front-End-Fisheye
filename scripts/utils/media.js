const MediaSortOptions = [
    { label: 'Popularité', handler: sortMediaByLikes },
    { label: 'Date', handler: sortMediaByDate },
    { label: 'Titre', handler: sortMediaByTitle },
]

const getMediaSortSelectHTML = () => (`
    <label id="combo-label" class="media-sort__label" aria-label="Order by">
      Trier par
    </label>
    <div class="combo js-select">
      <div aria-controls="listbox"
           aria-expanded="false"
           aria-haspopup="listbox"
           aria-labelledby="combo-label"
           id="combo"
           class="combo-input"
           role="combobox"
           tabindex="0"></div>
      <div class="combo-menu"
           role="listbox"
           id="listbox"
           aria-labelledby="combo-label"
           tabindex="-1">
      </div>
    </div>
`);

function initMediaSortSelect(mediaList) {
    const options = MediaSortOptions.map((option) => option.label);
    const selectEl = document.querySelector('.js-select');
    new Select(selectEl, options);

    selectEl.addEventListener('selectChange', (event) => handleMediaSortChange(event, mediaList));
}

function sortMediaByDate(mediaList) {
    return mediaList.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
    });
}

function sortMediaByTitle(mediaList) {
    return mediaList.sort((a, b) => a.title.localeCompare(b.title));
}

function sortMediaByLikes(mediaList) {
    return mediaList.sort((a, b) => b.getLikes() - a.getLikes());
}

function getMediaById(mediaId, mediaList) {
    return mediaList.find(media => media.id === mediaId);
}

function getNextMediaById(currentMediaId, mediaList) {
    const mediaIndex = mediaList.findIndex(media => media.id === currentMediaId);
    const nextMediaIndex = (mediaIndex + 1) % mediaList.length; // allow cycling through mediaList
    return mediaList[nextMediaIndex];
}

function getPreviousMediaById(currentMediaId, mediaList) {
    const mediaIndex = mediaList.findIndex(media => media.id === currentMediaId);
    const previousMediaIndex = (mediaIndex - 1 + mediaList.length) % mediaList.length; // allow cycling through mediaList
    return mediaList[previousMediaIndex];
}

function handleMediaSortChange(event, mediaList) {
    const sortLabel = event.target.textContent;
    const { handler } = MediaSortOptions.find(({ label }) => sortLabel === label);
    handler(mediaList);
    renderSortedMedia(mediaList);
}
