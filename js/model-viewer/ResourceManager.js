import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

class ResourceManager {
    constructor(modelsData) {
        // store reference to models data
        this._modelsData = modelsData;

        // create FBX loader
        this._fbxLoader = new FBXLoader();

        // create loading manager for texture loading
        this._textureLoadingManager = new THREE.LoadingManager();
        // set function to be called when all textures are loaded
        this._textureLoadingManager.onLoad = this._onTexturesLoaded.bind(this);
        // create texture loader
        this._textureLoader = new THREE.TextureLoader(this._textureLoadingManager);
        // here is stored function that is supposed to be called when all textures are loaded
        this._texturesLoaded = null;

        // here is store loaded index of loaded model
        this._loadedModelIndex = null;
        // here is stored loaded model
        this._model = null;
        // here are stored loaded texture variations
        this._textureVariations = new Map();
    }

    // called by texture loading manager when all textures are loaded
    _onTexturesLoaded() {
        // call function that is supposed to be called when all textures are loaded
        if (this._texturesLoaded) this._texturesLoaded(true);
        // function was called, set it to null
        this._texturesLoaded = null;
    }

    // loads model based on passed index (returns promise that will resolve to loaded model)
    loadModel(modelIndex) {
        // if model is already loaded, it is returned right away
        if (modelIndex === this._loadedModelIndex) {
            // resolved promise with model is returned
            return Promise.resolve(this._model);
        }

        return new Promise((resolve, reject) => {
            // load model using FBX loader
            this._fbxLoader.load(`${this._modelsData[modelIndex].srcFolder}/${this._modelsData[modelIndex].modelName}.fbx`, (fbx) => {
                // traverse loaded model
                fbx.traverse(child => {
                    // set all meshes to cast and receive shadow and add second UV set for ambient occlusion
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        child.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(child.geometry.attributes.uv.array, 2));
                    }
                });

                // position all direct children of loaded model to center of scene
                for (const child of fbx.children) {
                    if (child.isMesh) {
                        child.position.set(0, 0, 0);
                    }
                }

                // save loaded model and its index
                this._loadedModelIndex = modelIndex;
                this._model = fbx;

                // resolve promise with loaded model
                resolve(fbx);
            });
        });
    }

    // returns loaded model
    getLoadedModel() {
        return this._model;
    }

    // loads texture variation of model
    loadTextureVariation(modelIndex, textureVariationIndex) {
        // convert textureVariationIndex to number
        textureVariationIndex = +textureVariationIndex;

        // if this texture variation is already loaded, it is returned right away
        if (this._textureVariations.has(textureVariationIndex)) {
            // resolved promise with texture variation material is returned
            return Promise.resolve(this._textureVariations.get(textureVariationIndex).material);
        }

        // in this object will be stored textures and material of loaded texture variation
        const textureVariation = {
            textures: []
        }

        // create new promise and set its resolve function to be called by texture loading manager when all textures are loaded
        const promise = new Promise((resolve, reject) => {
            this._texturesLoaded = () => resolve(textureVariation.material);
        });

        // get texture variation description from models data
        const textureVariationDesc = this._modelsData[modelIndex].textureVariations[textureVariationIndex];

        // if this texture variation doesn't have more than one texture set
        if (textureVariationDesc.types) {
            // create material
            const material = new THREE.MeshStandardMaterial();
            // for each type of texture
            for (let textureType of textureVariationDesc.types) {
                // load texture
                const texture = this._textureLoader.load(`${this._modelsData[modelIndex].srcFolder}/textures/${this._modelsData[modelIndex].textureVariations[textureVariationIndex].folderName}/${this._modelsData[modelIndex].modelName}_${textureType}.png`);
                // add texture to material (it doesn't matter whether the texture is loaded or not)
                this._addTextureToMaterial(material, texture, textureType);
    
                // add texture to textureVariation object
                textureVariation.textures.push(texture);
            }
            // apply environment map intensity using specified value or use default one
            material.envMapIntensity = this._modelsData[modelIndex].envMapIntensity || 1.75;

            // add material to textureVariation object
            textureVariation.material = material;
        } else {
            // create array for materials
            const materials = [];
            // for each texture set of texture variation
            for (let part of textureVariationDesc.parts) {
                // create material
                const material = new THREE.MeshStandardMaterial();
                // for each type of texture
                for (let textureType of part.types) {
                    // load texture
                    const texture = this._textureLoader.load(`${this._modelsData[modelIndex].srcFolder}/textures/${this._modelsData[modelIndex].textureVariations[textureVariationIndex].folderName}/${part.name}_${textureType}.png`);
                    // add texture to material (it doesn't matter whether the texture is loaded or not)
                    this._addTextureToMaterial(material, texture, textureType);
                    
                    // add texture to textureVariation object
                    textureVariation.textures.push(texture);
                }
                // apply environment map intensity using specified value or use default one
                material.envMapIntensity = this._modelsData[modelIndex].envMapIntensity || 1.75;
                // add material to material array
                materials.unshift(material);
            }
            // store array of materials as material in textureVariation object
            textureVariation.material = materials;
        }

        // save loaded texture variation
        this._textureVariations.set(textureVariationIndex, textureVariation);

        // return promise that will be resolved with loaded texture variation material after textures are loaded
        return promise;
    }

    // loads textures of model (used for models with only one texture variation)
    loadTextures(modelIndex) {
        // create object that will store loaded textures and material
        const textureVariation = {
            material: new THREE.MeshStandardMaterial(),
            textures: []
        }

        // create new promise and set its resolve function to be called by texture loading manager when all textures are loaded
        const promise = new Promise((resolve, reject) => {
            this._texturesLoaded = () => resolve(textureVariation.material);
        });

        // for each texture type
        for (let textureType of this._modelsData[modelIndex].textures) {
            // load texture
            const texture = this._textureLoader.load(`${this._modelsData[modelIndex].srcFolder}/textures/${this._modelsData[modelIndex].modelName}_${textureType}.png`);
            // add texture to material (it doesn't matter whether the texture is loaded or not)
            this._addTextureToMaterial(textureVariation.material, texture, textureType);
            
            // add texture to textureVariation object
            textureVariation.textures.push(texture);
        }
        // apply environment map intensity using specified value or use default one
        textureVariation.material.envMapIntensity = this._modelsData[modelIndex].envMapIntensity || 1.75;

        // save loaded texture variation
        this._textureVariations.set(modelIndex, textureVariation);

        // return promise that will be resolved with loaded texture variation material after all textures are loaded
        return promise;
    }

    // adds passed texture to passed material based on passed texture type
    _addTextureToMaterial(material, texture, textureType) {
        switch (textureType) {
            case "BaseColor":
                material.map = texture;
                break;
            case "Metallic":
                material.metalnessMap = texture;
                break;
            case "Roughness":
                material.roughnessMap = texture;
                break;
            case "Normal":
                material.normalMap = texture;
                break;
            case "AmbientOcclusion":
                material.aoMap = texture;
                break;
            case "Alpha":
                material.alphaMap = texture;
                material.transparent = true;
                break;
            case "Emissive":
                material.emissiveMap = texture;
                material.emissive.set(0xffffff);
                material.emissiveIntesity = 1;
                break;
        }
    }

    // disposes all loaded resources
    disposeAll() {
        // dispose geometry of loaded model
        if (this._model) {
            this._model.traverse(child => {
                if (child.isMesh) {
                    child.geometry.dispose();
                }
            });
            this._model = null;
        }

        // disposes all materials and loaded textures
        if (this._textureVariations) {
            // for each loaded texture variation
            this._textureVariations.forEach(textureVariation => {
                // dispose material (or materials)
                if (textureVariation.material instanceof Array) {
                    for (let material of textureVariation.material) {
                        material.dispose();
                    }
                } else {
                    textureVariation.material.dispose();
                }
                // dispose textures
                for (let texture of textureVariation.textures) {
                    texture.dispose();
                }
            });
            // clear map that contained all loaded textures and materials
            this._textureVariations.clear();
        }
    }
}

export default ResourceManager;