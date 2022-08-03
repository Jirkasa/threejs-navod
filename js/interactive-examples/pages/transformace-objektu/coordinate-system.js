import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import * as dat from 'dat.gui';

dat.GUI.TEXT_CLOSED = "ZAVŘÍT";
dat.GUI.TEXT_OPEN = "OTEVŘÍT";

let gui;
let scene;
const camera = new THREE.PerspectiveCamera(75, 1);
let box;

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    camera.position.x = 0.5;
    camera.position.y = 1;
    camera.lookAt(0, 0, 0);

    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    box = new THREE.Mesh(
        new THREE.BoxGeometry(.2, .2, .2),
        new THREE.MeshBasicMaterial({ color: 0x78E8FA })
    );
    scene.add(box);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");
    gui.add(box.position, "x").min(-5).max(5).step(0.01);
    gui.add(box.position, "y").min(-5).max(5).step(0.01);
    gui.add(box.position, "z").min(-5).max(5).step(0.01);
}

iExample.onPlay = () => {
    gui.show();
}

iExample.onReset = () => {
    gui.hide();
    box.position.set(0, 0, 0);
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}