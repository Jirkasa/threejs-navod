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

let renderer;

const iExample = new InteractiveExample(13, camera);
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

    const canvas = document.createElement("canvas");
    canvas.classList.add("webgl-canvas");
    canvas.style.zIndex = 10;
    iExample.canvasContainer.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(iExample.canvasContainer.clientWidth, iExample.canvasContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.physicallyCorrectLights = true;

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

    renderer.outputEncoding = THREE.sRGBEncoding;

    gui.add(renderer, "outputEncoding", {
        sRGBEncoding: THREE.sRGBEncoding,
        LinearEncoding: THREE.LinearEncoding
    }).onChange(() => {
        renderer.outputEncoding = Number(renderer.outputEncoding);
        if (!playing) renderer.outputEncoding = THREE.LinearEncoding;
    });

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    gui.add(renderer, "toneMapping", {
        "NoToneMapping": THREE.NoToneMapping,
        "LinearToneMapping": THREE.LinearToneMapping,
        "ReinhardToneMapping": THREE.ReinhardToneMapping,
        "CineonToneMapping": THREE.CineonToneMapping,
        "ACESFilmicToneMapping": THREE.ACESFilmicToneMapping
    })
    .onChange(() => {
        renderer.toneMapping = Number(renderer.toneMapping);
        model.traverse(child => {
            if (child.isMesh) {
                child.material.needsUpdate = true;
            }
        });
        if (!playing) renderer.toneMapping = THREE.NoToneMapping;
    });

    gui.add(renderer, "toneMappingExposure")
    .min(0).max(5).step(0.01)
    .onChange(() => {
        if (!playing) renderer.toneMappingExposure = 1;
    });

    renderer.shadowMap.enabled = true;

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

    renderer.setClearColor(new THREE.Color(0x2B2D2E));

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    directionalLight.shadow.camera.right = 1.2;
    directionalLight.shadow.camera.left = -1.2;
    directionalLight.shadow.camera.top = 1.2;
    directionalLight.shadow.camera.bottom = -1.2;
    directionalLight.shadow.camera.updateProjectionMatrix();
}

iExample.onResize = (newWidth, newHeight) => {
    if (!renderer) return;
    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

iExample.onPlay = () => {
    playing = true;
    renderer.domElement.style.display = "block";
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
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

    renderer.domElement.style.display = "none";

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(new THREE.Color(0x2B2D2E));

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
    renderer.render(scene, camera);
}