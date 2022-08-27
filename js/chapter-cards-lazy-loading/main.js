// LAZY LOADING FOR IMAGES OF CHAPTER CARDS ON HOME PAGE

const images = document.querySelectorAll("[data-image-src]");
const observer = new IntersectionObserver(onIntersection, {
    root: null, // intersection with viewport
    threshold: 0
});

// for each image
for (let image of images) {
    // add load icon
    const loadIcon = document.createElement("div");
    loadIcon.classList.add("card__image-load-icon");
    loadIcon.innerHTML = `
    <svg>
        <use xlink:href="./static/img/icon-sprite.svg#icon-spinner10"></use>
    </svg>
    `;
    image.appendChild(loadIcon);

    // observe image (image container)
    observer.observe(image);
}

// called by IntersectionObserver, when intersection occurs
function onIntersection(entries) {
    for (let entry of entries) {
        if (!entry.isIntersecting) continue;

        // unobserver intersecting image
        let image = entry.target;
        observer.unobserve(image);

        // create img element 
        const imgElement = document.createElement("img");
        imgElement.classList.add("card__image");
        imgElement.setAttribute("src", image.dataset.imageSrc);
        imgElement.setAttribute("alt", "");

        // after image is loaded, it is added to card
        imgElement.addEventListener("load", () => {
            image.innerHTML = "";
            image.appendChild(imgElement);
        })
    }
}