import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// GET DOM ELEMENTS
const canvasContainer = document.getElementById("WebGLCanvasContainer");
const loadingInfoElement = document.getElementById("LoadingInfo");
const progressBarTrack = document.getElementById("ProgressBarTrack");

/* ---------------------- */
// SETUP SCENE

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, (canvasContainer.clientWidth*1.25) / (canvasContainer.clientHeight*1.25), 0.1, 1000);
camera.position.set(23, 43, 83);
scene.add(camera);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(45, 193, 132);
scene.add(directionalLight);

/* ---------------------- */
// SETUP RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("WebGLCanvas"),
    antialias: true
});
renderer.setClearAlpha(0);
renderer.physicallyCorrectLights = true;

renderer.setSize(canvasContainer.clientWidth*1.25, canvasContainer.clientHeight*1.25);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ---------------------- */
// ADD EVENT LISTENER FOR RESIZING

window.addEventListener("resize", () => {
    // update camera
    camera.aspect = (canvasContainer.clientWidth*1.25) / (canvasContainer.clientHeight*1.25);
    camera.updateProjectionMatrix();
    // update renderer
    renderer.setSize(canvasContainer.clientWidth*1.25, canvasContainer.clientHeight*1.25);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* ---------------------- */
// CREATE ORBIT CONTROLS

const orbitControls = new OrbitControls(camera, canvasContainer);
orbitControls.enableDamping = true;
orbitControls.enablePan = false;
orbitControls.enableZoom = false;
orbitControls.target = new THREE.Vector3(0, 15, 0);


/* ---------------------- */
// LOAD ASSETS


const loadingManager = new THREE.LoadingManager();

// loaders
const textureLoader = new THREE.TextureLoader(loadingManager);
const fbxLoader = new FBXLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

// load environment map
const environmentMap = cubeTextureLoader.load([
    './static/environment-map/px.png',
    './static/environment-map/nx.png',
    './static/environment-map/py.png',
    './static/environment-map/ny.png',
    './static/environment-map/pz.png',
    './static/environment-map/nz.png'
]);
scene.environment = environmentMap;

// load textures
const colorTexture = textureLoader.load("../../static/models/little-creature-statue/textures/LittleCreatureStatue_BaseColor.png");
const roughnessTexture = textureLoader.load("../../static/models/little-creature-statue/textures/LittleCreatureStatue_Roughness.png");
const normalTexture = textureLoader.load("../../static/models/little-creature-statue/textures/LittleCreatureStatue_Normal.png");
const ambientOcclusionTexture = textureLoader.load("../../static/models/little-creature-statue/textures/LittleCreatureStatue_AmbientOcclusion.png");

// create material using loaded textures
const material = new THREE.MeshStandardMaterial({
    map: colorTexture,
    roughnessMap: roughnessTexture,
    normalMap: normalTexture,
    aoMap: ambientOcclusionTexture,
    envMapIntensity: 1.5
});

// load model
fbxLoader.load("./static/models/little-creature-statue/LittleCreatureStatue.fbx", fbx => {
    fbx.traverse(child => {
        if (child.isMesh) {
            // only mesh with LOD0 is displayed
            if (!child.name.includes("_LOD0")) {
                child.visible = false;
                return;
            }

            // second UV set for ambient occlusion
            child.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(child.geometry.attributes.uv.array, 2));

            child.position.set(0, 0, 0);
            child.material = material;
        }
    });

    // add loaded model to scene
    scene.add(fbx);
});

/* ---------------------- */
// ADD EVENTS FOR LOADING MANAGER

loadingManager.onLoad = () => {
    loadingInfoElement.style.display = "none";

    // start main loop
    renderer.setAnimationLoop(tick);
}

loadingManager.onProgress = (_, itemsLoaded, itemsTotal) => {
    progressBarTrack.style.width = `${itemsLoaded/itemsTotal * 100}%`;
}

/* ---------------------- */
// MAIN LOOP

function tick() {
    orbitControls.update();
    renderer.render(scene, camera);
}