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
let pointLight;
let helper;

const debugObject = {
    color: 0xffffff
};

const iExample = new InteractiveExample(7, camera);

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

    pointLight = new THREE.PointLight(0xffffff, 1, 3);
    pointLight.position.set(0.7, 1, 1);
    scene.add(pointLight);

    helper = new THREE.PointLightHelper(pointLight, 0.2);
    scene.add(helper);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(pointLight.position, "x").min(-4).max(4).step(0.01).onChange(() => helper.update());
    gui.add(pointLight.position, "y").min(-4).max(4).step(0.01).onChange(() => helper.update());
    gui.add(pointLight.position, "z").min(-4).max(4).step(0.01).onChange(() => helper.update());

    gui.addColor(debugObject, "color").onChange(() => {
        pointLight.color.set(debugObject.color);
        helper.update();
    });

    gui.add(pointLight, "intensity").min(0).max(10).step(0.01);
    gui.add(pointLight, "distance").min(0).max(10).step(0.01);
    gui.add(pointLight, "decay").min(0).max(10).step(0.01);
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
    pointLight.position.set(0.7, 1, 1);
    debugObject.color = 0xffffff;
    pointLight.color.set(0xffffff);
    pointLight.intensity = 1;
    pointLight.distance = 3;
    pointLight.decay = 1;
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