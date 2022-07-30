import modelsData from "./data";
import ModelsSelectMenu from "./ModelsSelectMenu";
import MainLoop from "mainloop.js";
import CanvasUI from "./CanvasUI";
import ModelRenderer from "./ModelRenderer";
import ResourceManager from "./ResourceManager";
import DownloadWindow from "./DownloadWindow";


// UI
// - models menu, canvas inputs, etc.
const modelsSelectMenu = new ModelsSelectMenu(modelsData);
const canvasUI = new CanvasUI(modelsData);
const downloadWindow = new DownloadWindow(modelsData);
// MODEL RENDERER
// - renderes selected model to canvas
const modelRenderer = new ModelRenderer();
// RESOURCE MANAGER
// - manages loading of models and textures
const resourceManager = new ResourceManager(modelsData);

// here is stored index of currently selected model and index for his current texture variation
let currentModelIndex = null;
let currentVariationIndex = null;


// setup Main Loop
MainLoop.setUpdate(() => modelRenderer.update()).setDraw(() => modelRenderer.render());
// start Main Loop
MainLoop.start();

// when user selects model in models menu, model is loaded
modelsSelectMenu.onChange(loadModel);
// load first model when page is loaded
loadModel(0);

// loads model based on passed index of model in modelsData array
async function loadModel(modelIndex) {
    // model is being loaded, display load icon
    canvasUI.loading = true;
    // reset controls (rotation, etc.)
    canvasUI.resetControls();

    // dispose all loaded resources
    resourceManager.disposeAll();
    // remove currently loaded model from scene
    modelRenderer.clean();

    // load textures for model
    let loadTexturePromise;
    if (modelsData[modelIndex].textures) {
        // if model has only one texture variation
        loadTexturePromise = resourceManager.loadTextures(modelIndex);
    } else {
        // if model has more than one texture variations, default texture variation is loaded
        loadTexturePromise = resourceManager.loadTextureVariation(modelIndex, modelsData[modelIndex].defaultTextureVariation)
    }

    // wait until model and default texture variation (material) is loaded
    const [model, material] = await Promise.all([
        resourceManager.loadModel(modelIndex),
        loadTexturePromise
    ]);

    // set model to be renderered
    modelRenderer.setModel(model);
    // set material of model
    modelRenderer.setMaterial(material);

    // update CanvasUI for loaded model
    canvasUI.setActiveModel(modelIndex);

    // if model contains LOD (level of detail), special input to control it is added to CanvasUI
    if (modelsData[modelIndex].lod) canvasUI.addLODInput(model);
    // if model contains parts that are supposed to be rotated, inputs to rotate them are added to CanvasUI
    if (modelsData[modelIndex].rotationParts) {
        for (let rotationPart of modelsData[modelIndex].rotationParts) {
            canvasUI.addRotationPartInput(model, rotationPart.partName, rotationPart.labelName, rotationPart.min, rotationPart.max);
        }
    }

    // model is loaded, hide load icon
    canvasUI.loading = false;

    // store index to currently selected model and index to its default variation (if has more variations)
    currentModelIndex = modelIndex;
    currentVariationIndex = modelsData[modelIndex].textureVariations ? modelsData[modelIndex].defaultTextureVariation : null;
}

// called when model texture variation is changed
canvasUI.onVariationChange(async variationIndex => {
    // material is being loaded, display load icon
    canvasUI.loading = true;

    // load/get material for texture variation
    const material = await resourceManager.loadTextureVariation(currentModelIndex, variationIndex);
    // apply material to model
    modelRenderer.setMaterial(material);

    // material is loaded, hide load icon
    canvasUI.loading = false;

    // store currently selected texture variation index
    currentVariationIndex = +variationIndex;
});

// handle rotation input
canvasUI.onRotationInputChange(rotation => {
    // update rotation of model
    modelRenderer.setModelRotation(rotation*Math.PI);
});

// handle download button click
canvasUI.onDownloadButtonClick(() => {
    // open download window
    downloadWindow.open(currentModelIndex, currentVariationIndex);
});