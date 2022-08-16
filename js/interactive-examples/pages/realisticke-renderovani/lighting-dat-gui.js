import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

let gui;
let model;

const iExample = new InteractiveExample(3, camera);

const debugObject = {
    envMapIntensity: 1
};
let directionalLight;

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);


    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        "../../static/other/DeskModel/glTFBinary/Desk.glb",
        (gltf) => {
            model = gltf.scene;
            scene.add(gltf.scene);
        }
    );

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMapTexture = cubeTextureLoader.load([
        '../../static/environment-map/px.png',
        '../../static/environment-map/nx.png',
        '../../static/environment-map/py.png',
        '../../static/environment-map/ny.png',
        '../../static/environment-map/pz.png',
        '../../static/environment-map/nz.png',
    ]);
    scene.environment = environmentMapTexture;

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(debugObject, "envMapIntensity")
    .min(0).max(10).step(0.01)
    .onChange(val => {
        model.traverse(child => {
            if (child.isMesh) {
                child.material.envMapIntensity = val;
            }
        });
    });

    gui.add(directionalLight, "intensity")
    .min(0).max(5).step(0.01)
    .name("directional light intensity");
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;
    iExample.renderer.physicallyCorrectLights = true;
    gui.show();
    gui.open();
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    iExample.renderer.physicallyCorrectLights = false;
    gui.hide();

    debugObject.envMapIntensity = 1;
    model.traverse(child => {
        if (child.isMesh) {
            child.material.envMapIntensity = debugObject.envMapIntensity;
        }
    });
    directionalLight.intensity = 0.7;
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}