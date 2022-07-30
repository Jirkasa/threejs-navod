class CanvasUI {
    constructor(modelsData) {
        // create UI Elements
        this._createUIElements();
        // store reference to models data
        this._modelsData = modelsData;

        // add event listener to variations menu (container of buttons to select texture variation)
        this._variationsMenu.addEventListener("click", this._onVariationMenuClick.bind(this));

        // here is stored currently selected variation button element
        this._selectedVariationButton = null;

        // here are stored custom controls (LOD, rotation of model parts..)
        this._customControls = [];
    }

    // loading setter
    set loading(isLoading) {
        if (isLoading) {
            // display load icon, hide everything else
            this._loadIcon.style.display = "block";

            this._modelName.style.display = "none";
            this._variationsMenu.style.display = "none";
            this._rotationControl.style.display = "none";
            this._downloadButton.style.display = "none";

            for (let customControl of this._customControls) {
                customControl.style.display = "none";
            }
        } else {
            // hide load icon, show everything else
            this._loadIcon.style.display = "none";

            this._modelName.style.display = "block";
            this._variationsMenu.style.display = "flex";
            this._rotationControl.style.display = "flex";
            this._downloadButton.style.display = "block";

            for (let customControl of this._customControls) {
                customControl.style.display = "flex";
            }
        }
    }

    // creates UI elements (and stores references to them)
    _createUIElements() {
        // get container element of canvas (here will be added created UI elements)
        const modelViewerViewport = document.getElementById("ModelViewerViewport");

        // create model name label (displayed at top left corner of canvas)
        const modelName = document.createElement("h2");
        modelName.classList.add("model-viewer__model-name");
        modelName.style.display = "none";
        modelViewerViewport.appendChild(modelName);

        // create download button
        const downloadButton = document.createElement("button");
        downloadButton.classList.add("model-viewer__download-button");
        downloadButton.innerHTML = `Stáhnout
            <svg>
                <use xlink:href="../static/img/icon-sprite.svg#icon-download"></use>
            </svg>
        `;
        downloadButton.style.display = "none";
        modelViewerViewport.appendChild(downloadButton);

        // create variations menu (here are added buttons to select texture variation)
        const variationsMenu = document.createElement("div");
        variationsMenu.classList.add("model-viewer__variations");
        variationsMenu.style.display = "none";
        modelViewerViewport.appendChild(variationsMenu);

        // create rotation control
        const rotationControl = document.createElement("div");
        rotationControl.classList.add("model-viewer__control");
        // - label
        const label = document.createElement("label");
        label.innerText = "Rotace";
        rotationControl.appendChild(label);
        // - input
        const rotationInput = document.createElement("input");
        rotationInput.setAttribute("type", "range");
        rotationInput.setAttribute("min", 0);
        rotationInput.setAttribute("max", 2);
        rotationInput.setAttribute("step", 0.01);
        rotationInput.value = 0;
        rotationControl.appendChild(rotationInput);
        // ---
        rotationControl.style.display = "none";
        modelViewerViewport.appendChild(rotationControl);

        // create load icon
        const loadIcon = document.createElement("div");
        loadIcon.classList.add("model-viewer__load-icon");
        loadIcon.innerHTML = `
            <svg>
                <use xlink:href="../static/img/icon-sprite.svg#icon-spinner10"></use>
            </svg>
        `;
        loadIcon.style.display = "none";
        modelViewerViewport.appendChild(loadIcon);


        // store references to UI elements
        this._modelName = modelName;
        this._downloadButton = downloadButton;
        this._variationsMenu = variationsMenu;
        this._rotationControl = rotationControl;
        this._rotationControlInput = rotationInput;
        this._loadIcon = loadIcon;

        // store reference to container element of canvas
        this._modelViewerViewport = modelViewerViewport;
    }

    // called when variation menu is clicked
    _onVariationMenuClick(e) {
        // get clicked button
        const button = e.target.closest(".model-viewer__variation-button");
        // if no button was clicked or currently selected button was clicked, do nothing
        if (!button || button === this._selectedVariationButton) return;

        // change styles of old and new selected buttons
        this._selectedVariationButton.classList.remove("model-viewer__variation-button--active");
        button.classList.add("model-viewer__variation-button--active");
        // set clicked button as selected button
        this._selectedVariationButton = button;

        // if onVariationChange callback is registered, call it
        if (this._onVariationChange) {
            this._onVariationChange(button.dataset.variationIndex);
        }
    }

    // registeres callback function to be called when variation is changed
    onVariationChange(callback) {
        this._onVariationChange = callback;
    }

    // registeres callback function to be called when rotation input changes
    onRotationInputChange(callback) {
        this._rotationControlInput.addEventListener("input", (e) => {
            callback(+e.target.value);
        })
    }

    // registeres callback function to be called when download button is clicked
    onDownloadButtonClick(callback) {
        this._downloadButton.addEventListener("click", callback);
    }

    // updates UI for model based on passed model index
    setActiveModel(modelIndex) {
        // change name label of model
        this._modelName.innerText = this._modelsData[modelIndex].name;

        // remove buttons in variations menu
        this._variationsMenu.innerHTML = "";
        // if model contains only one texture variation, no variation menu buttons are created
        if (this._modelsData[modelIndex].textures) return;
        // create variation menu button for each texture variation
        for (let i = 0; i < this._modelsData[modelIndex].textureVariations.length; i++) {
            // create texture variation button
            const button = document.createElement("button");
            button.classList.add("model-viewer__variation-button");

            // if this texture variation is default, set variation button as selected
            if (i === this._modelsData[modelIndex].defaultTextureVariation) {
                button.classList.add("model-viewer__variation-button--active");
                this._selectedVariationButton = button;
            }

            // set text of button
            button.innerText = this._modelsData[modelIndex].textureVariations[i].name;
            // set data attribut containing texture variation index
            button.dataset.variationIndex = i;

            // add button to variations menu
            this._variationsMenu.appendChild(button);
        }
    }

    // resets control inputs (display at bottom left corner)
    resetControls() {
        // reset rotation input value
        this._rotationControlInput.value = 0;

        // remove all custom controls
        while (this._customControls.length > 0) {
            const customControl = this._customControls.pop();
            customControl.remove();
        }
    }

    // adds custom input for LOD (level of detail)
    addLODInput(model) {
        // get number of LOD
        let numberOfLOD = 0;
        // - traverse model
        model.traverse(child => {
            if (child.isMesh && child.name.includes("_LOD")) {
                // increase number of LOD
                numberOfLOD++;

                // all meshes are hidden except mesh with LOD0
                if (!child.name.includes("_LOD0")) {
                    child.visible = false;
                }
            }
        });

        // create LOD control
        const lodControl = document.createElement("div");
        lodControl.classList.add("model-viewer__control");
        // - label
        const label = document.createElement("label");
        label.innerText = "LOD";
        lodControl.appendChild(label);
        // - input
        const lodInput = document.createElement("input");
        lodInput.setAttribute("type", "range");
        lodInput.setAttribute("min", 0);
        lodInput.setAttribute("max", numberOfLOD-1);
        lodInput.value = 0;
        lodControl.appendChild(lodInput);

        // position LOD control based on other custom controls
        lodControl.style.bottom = `${1.6  + 2.4 * (this._customControls.length+1)}rem`;

        // add event listener to LOD input
        lodInput.addEventListener("input", (e) => {
            // get ending name of mesh, that should be visible
            const activeLODPartName = `LOD${e.target.value}`;

            // traverse model
            model.traverse(child => {
                if (child.isMesh) {
                    // hide/show mesh based on currently selected LOD
                    child.visible = child.name.substring(child.name.length-activeLODPartName.length, child.name.length) === activeLODPartName;
                }
            });
        });

        // add LOD control to DOM
        this._modelViewerViewport.appendChild(lodControl);
        // store LOD control in custom controls array
        this._customControls.push(lodControl);
    }

    // adds custom input for rotation of model parts
    addRotationPartInput(model, modelPartName, labelText, min, max) {
        // get model part that is supposed to be rotated
        let modelPart;
        model.traverse(child => {
            if (child.isMesh && child.name === modelPartName) modelPart = child;
        });

        // create rotation control
        const rotationPartControl = document.createElement("div");
        rotationPartControl.classList.add("model-viewer__control");
        // - label
        const label = document.createElement("label");
        label.innerText = labelText;
        rotationPartControl.appendChild(label);
        // - input
        const rotationPartInput = document.createElement("input");
        rotationPartInput.setAttribute("type", "range");
        rotationPartInput.setAttribute("min", min);
        rotationPartInput.setAttribute("max", max);
        rotationPartInput.setAttribute("step", 0.01);
        rotationPartInput.value = 0;
        rotationPartControl.appendChild(rotationPartInput);

        // position rotation control based on other custom controls
        rotationPartControl.style.bottom = `${1.6  + 2.4 * (this._customControls.length+1)}rem`;

        // add event listener to rotation input
        rotationPartInput.addEventListener("input", (e) => {
            // updated rotation of model part
            modelPart.rotation.z = e.target.value;
        });

        // add rotation control to DOM
        this._modelViewerViewport.appendChild(rotationPartControl);
        // store rotation control in custom controls array
        this._customControls.push(rotationPartControl);
    }
}

export default CanvasUI;