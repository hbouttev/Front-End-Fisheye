async function getPhotographers() {
    return await fetch("../../data/photographers.json").then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    });
}
