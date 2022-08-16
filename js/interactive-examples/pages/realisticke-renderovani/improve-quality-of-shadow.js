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

const iExample = new InteractiveExample(10, camera);
let playing = false;

const debugObject = {
    envMapIntensity: 1.2
};
let directionalLight;

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);


    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        "../../static/other/DeskModel/glTFBinary/Desk.glb",
        (gltf) => {
            model = gltf.scene;
            model.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.envMapIntensity = 1.2;
                    child.material.side = THREE.FrontSide;
                }
            });
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

    gui.add(iExample.renderer, "outputEncoding", {
        sRGBEncoding: THREE.sRGBEncoding,
        LinearEncoding: THREE.LinearEncoding
    }).onChange(() => {
        iExample.renderer.outputEncoding = Number(iExample.renderer.outputEncoding);
        if (!playing) iExample.renderer.outputEncoding = THREE.LinearEncoding;
    });

    gui.add(iExample.renderer, "toneMapping", {
        "NoToneMapping": THREE.NoToneMapping,
        "LinearToneMapping": THREE.LinearToneMapping,
        "ReinhardToneMapping": THREE.ReinhardToneMapping,
        "CineonToneMapping": THREE.CineonToneMapping,
        "ACESFilmicToneMapping": THREE.ACESFilmicToneMapping
    })
    .onChange(() => {
        iExample.renderer.toneMapping = Number(iExample.renderer.toneMapping);
        model.traverse(child => {
            if (child.isMesh) {
                child.material.needsUpdate = true;
            }
        });
        if (!playing) iExample.renderer.toneMapping = THREE.NoToneMapping;
    });

    gui.add(iExample.renderer, "toneMappingExposure")
    .min(0).max(5).step(0.01)
    .onChange(() => {
        if (!playing) iExample.renderer.toneMappingExposure = 1;
    });

    directionalLight.castShadow = true;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.ShadowMaterial({
            color: 0x121212
        })
    );
    plane.rotation.x = -Math.PI * 0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
}

iExample.onPlay = () => {
    playing = true;
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;
    iExample.renderer.physicallyCorrectLights = true;
    iExample.renderer.outputEncoding = THREE.sRGBEncoding;
    iExample.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    iExample.renderer.toneMappingExposure = 0.5;
    iExample.renderer.shadowMap.enabled = true;
    iExample.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    iExample.renderer.setClearColor(new THREE.Color(0x2B2D2E));
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
    gui.show();
    gui.open();
}

iExample.onReset = () => {
    playing = false;
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    iExample.renderer.physicallyCorrectLights = false;
    iExample.renderer.outputEncoding = THREE.LinearEncoding;
    iExample.renderer.toneMapping = THREE.NoToneMapping;
    iExample.renderer.toneMappingExposure = 1;
    iExample.renderer.shadowMap.enabled = false;
    iExample.renderer.shadowMap.type = THREE.PCFShadowMap;
    iExample.renderer.setClearColor(new THREE.Color(0x000000));
    gui.hide();

    debugObject.envMapIntensity = 1.2;
    model.traverse(child => {
        if (child.isMesh) {
            child.material.envMapIntensity = debugObject.envMapIntensity;
        }
    });
    directionalLight.intensity = 2;
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}