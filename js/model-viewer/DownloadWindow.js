class DownloadWindow {
    constructor(modelsData) {
        // store reference to models data
        this._modelsData = modelsData;

        // store reference to download window and page overlay
        this._window = document.getElementById("DownloadWindow");
        this._overlay = document.getElementById("PageOverlay");
        // store reference to close button, texture variation select input, texture download buttons container and model (FBX file) download button
        this._closeButton = document.getElementById("DownloadWindowCloseButton");
        this._variationSelectInput = document.getElementById("DownloadWindowVariationSelectInput");
        this._texturesContainer = document.getElementById("DownloadWindowTexturesContainer");
        this._modelDownloadButton = document.getElementById("ModelDownloadButton");

        // add event listener to close button
        this._closeButton.addEventListener("click", this.close.bind(this));
        // add event listener to texture variation select input
        this._variationSelectInput.addEventListener("change", this._onVariationSelectInputChange.bind(this));

        // here is stored index to model and index to texture variation for which the download window is opened
        this._modelIndex = null;
        this._variationIndex = null;
    }

    // opens download window
    open(modelIndex, variationIndex=null) {
        // show overlay and download window
        this._overlay.style.display = "block";
        this._window.style.display = "block";

        // clear texture buttons container
        this._texturesContainer.innerHTML = ``;

        // store index to model and index to texture variation of that model
        this._modelIndex = modelIndex;
        this._variationIndex = variationIndex;

        // setup model (FBX file) download button
        this._modelDownloadButton.setAttribute("href", `${this._modelsData[modelIndex].srcFolder}/${this._modelsData[modelIndex].modelName}.fbx`);
        this._modelDownloadButton.download = `${this._modelsData[modelIndex].modelName}.fbx`;

        // if model contains more than one texture variation
        if (this._modelsData[modelIndex].textureVariations) {
            // variation select input is displayed
            this._variationSelectInput.style.display = "inline-block";
            // clear variation select input
            this._variationSelectInput.innerHTML = "";
            // fill variation select input with appropriate texture variations
            for (let i = 0; i < this._modelsData[modelIndex].textureVariations.length; i++) {
                // create option element
                const option = document.createElement("option");
                option.value = i;
                option.innerText = this._modelsData[modelIndex].textureVariations[i].name;
                // set whether this option should be selected
                option.selected = i === variationIndex;
                // add option element to select input
                this._variationSelectInput.appendChild(option);
            }
        } else {
            // if model contains only one texture variation, select input is hidden
            this._variationSelectInput.style.display = "none";
        }

        // create texture download buttons for currently selected texture variation of model
        this._createTextureButtons();
    }

    // closes download window
    close() {
        this._overlay.style.display = "none";
        this._window.style.display = "none";
    }

    // creates texture buttons in textures container (based on selected variation index - if model has more than one texture variation)
    _createTextureButtons() {
        // if model contains only one texture variation
        if (!this._variationIndex && this._variationIndex !== 0) {
            // create container of download texture buttons
            this._createContainerOfTextureButtons(this._modelsData[this._modelIndex].textures, this._modelsData[this._modelIndex].modelName, `${this._modelsData[this._modelIndex].srcFolder}/textures`);
            return;
        }

        // if model contains texture variations that have more textures for different parts of model
        if (this._modelsData[this._modelIndex].textureVariations[this._variationIndex].parts) {
            // for each texture set
            for (let part of this._modelsData[this._modelIndex].textureVariations[this._variationIndex].parts) {
                // create textures part heading
                const partHeading = document.createElement("h4");
                partHeading.classList.add("download-window__part-heading");
                partHeading.innerText = part.name;
                this._texturesContainer.appendChild(partHeading);
                // - create container of download texture buttons for this part
                this._createContainerOfTextureButtons(part.types, part.name, `${this._modelsData[this._modelIndex].srcFolder}/textures/${this._modelsData[this._modelIndex].textureVariations[this._variationIndex].folderName}`);
            }

            return;
        }

        // else model contains more than one texture variation
        // - create container of download texture buttons
        this._createContainerOfTextureButtons(this._modelsData[this._modelIndex].textureVariations[this._variationIndex].types, this._modelsData[this._modelIndex].modelName, `${this._modelsData[this._modelIndex].srcFolder}/textures/${this._modelsData[this._modelIndex].textureVariations[this._variationIndex].folderName}`);
    }

    // creates container of download texture buttons
    _createContainerOfTextureButtons(textureTypesArray, textureBeginningText, srcFolder) {
        // create buttons container
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("download-window__buttons");
        // add buttons container to textures container
        this._texturesContainer.appendChild(buttonsContainer);

        // create download button for each type of texture
        for (let textureType of textureTypesArray) {
            // determine button text
            let buttonText;
            switch (textureType) {
                case "BaseColor":
                    buttonText = "Base Color";
                    break;
                case "AmbientOcclusion":
                    buttonText = "Ambient Occlusion";
                    break;
                default:
                    buttonText = textureType;
            }

            // create download button
            const button = document.createElement("a");
            button.classList.add("button-secondary");
            button.innerText = buttonText;
            button.download = `${textureBeginningText}_${textureType}.png`;
            button.setAttribute("href", `${srcFolder}/${textureBeginningText}_${textureType}.png`);

            // add download button to buttons container
            buttonsContainer.appendChild(button);
        }
    }

    // called when variation select input is changed
    _onVariationSelectInputChange(e) {
        // change selected variation index
        this._variationIndex = +e.target.value;

        // clear textures container
        this._texturesContainer.innerHTML = ``;
        // create download texture buttons in textures container
        this._createTextureButtons();
    }
}

export default DownloadWindow;