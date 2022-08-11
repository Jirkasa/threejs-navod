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
let directionalLight;
let helper;

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const material = new THREE.MeshStandardMaterial({
        color: 0xFAB278,
        roughness: 0.5
    });

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material
    );
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 10),
        material
    );
    sphere.position.x = -1.5;
    scene.add(sphere);

    const dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        material
    );
    dodecahedron.position.x = 1.5;
    scene.add(dodecahedron);

    camera.position.z = 3;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);

    helper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(helper);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(directionalLight.position, "x").min(-4).max(4).step(0.01).onChange(() => helper.update());
    gui.add(directionalLight.position, "y").min(-4).max(4).step(0.01).onChange(() => helper.update());
    gui.add(directionalLight.position, "z").min(-4).max(4).step(0.01).onChange(() => helper.update());
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;

    gui.show();
    gui.open();
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    directionalLight.position.set(0.5, 1.5, 0.3);
    helper.parent.updateMatrixWorld();
    helper.update();
    gui.hide();
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}