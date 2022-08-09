import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

dat.GUI.TEXT_CLOSED = "ZAVŘÍT";
dat.GUI.TEXT_OPEN = "OTEVŘÍT";

let gui;

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

let parameters = {
    aoOn: true
}

let material;
let ambientOcclusionTexture;

const iExample = new InteractiveExample(20, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMap = cubeTextureLoader.load([
        '../../static/environment-map/px.png',
        '../../static/environment-map/nx.png',
        '../../static/environment-map/py.png',
        '../../static/environment-map/ny.png',
        '../../static/environment-map/pz.png',
        '../../static/environment-map/nz.png'
    ]);
    scene.background = environmentMap;

    camera.position.z = 3;
    scene.add(camera);
}

iExample.onPlay = () => {
    controls = new OrbitControls(camera, iExample.canvasContainer);
    controls.enableDamping = true;
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}