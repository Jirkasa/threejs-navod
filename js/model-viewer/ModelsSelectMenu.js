class ModelsSelectMenu {
    constructor(modelsData) {
        // store reference to models data
        this._modelsData = modelsData;

        // get container of model cards
        this._container = document.getElementById("ModelsSelectMenu");
        // here is stored currently selected card
        this._selectedCard = null;

        // create intersection observer for lazy loading of model images
        this._intersectionObserver = new IntersectionObserver(this._observerCallback.bind(this), {
            root: null, // intersection with viewport
            threshold: 0
        });

        // create model cards based on models data
        this._createModelCards(modelsData);

        // add click event listener to container of cards
        this._container.addEventListener("click", this._onMenuClick.bind(this));
    }

    // creates model cards based on passed models data
    _createModelCards(modelsData) {
        // for each model in models data
        for (let i = 0; i < modelsData.length; i++) {
            // create model card
            const cardElement = document.createElement("button");
            cardElement.classList.add("model-card");
            // store model index on card element as custom data attribute
            cardElement.dataset.modelIndex = i;
            // name part of card
            const modelName = document.createElement("div");
            modelName.classList.add("model-card__name");
            modelName.innerText = modelsData[i].name;
            cardElement.appendChild(modelName);

            // observe card element by intersection observer
            this._intersectionObserver.observe(cardElement);

            // set first model card as selected
            if (i === 0) {
                cardElement.classList.add("model-card--selected");
                this._selectedCard = cardElement;
            }

            // add model card to container
            this._container.appendChild(cardElement);
        }
    }

    // callback for intersection observer
    _observerCallback(entries) {
        // for each entry of entries
        for (let entry of entries) {
            // if entry is intersecting, image can be loaded
            if (entry.isIntersecting) {
                // get card element
                const cardElement = entry.target;
                // unobserver card element
                this._intersectionObserver.unobserve(cardElement);

                // create load icon
                const loadIcon = document.createElement("div");
                loadIcon.classList.add("model-card__load-icon");
                loadIcon.innerHTML = `
                    <svg>
                        <use xlink:href="../static/img/icon-sprite.svg#icon-spinner10"></use>
                    </svg>
                `;
                // display load icon in model card
                cardElement.appendChild(loadIcon);

                // create image element
                const img = document.createElement("img");
                img.classList.add("model-card__image");
                // load image
                img.src = `${this._modelsData[cardElement.dataset.modelIndex].srcFolder}/image.jpg`;
                // add image to card element
                cardElement.appendChild(img);

                // after image is loaded, load icon is removed
                img.addEventListener("load", () => loadIcon.remove());
            }
        }
    }

    // called when user clicks on menu
    _onMenuClick(e) {
        // get clicked card element
        const cardElement = e.target.closest(".model-card");
        // if user didn't click on card or clicked on currently selected card, do nothing
        if (!cardElement || cardElement === this._selectedCard) return;

        // change selected card
        this._selectedCard.classList.remove("model-card--selected");
        cardElement.classList.add("model-card--selected");
        this._selectedCard = cardElement;

        // call onChange callback if registered
        if (this._onChange) this._onChange(cardElement.dataset.modelIndex);
    }

    // registeres callback function which is called when user selects new model card
    onChange(callback) {
        this._onChange = callback;
    }
}

export default ModelsSelectMenu;