import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import * as dat from 'dat.gui';

dat.GUI.TEXT_CLOSED = "ZAVŘÍT";
dat.GUI.TEXT_OPEN = "OTEVŘÍT";

let gui;
let scene;
let cube;
const camera = new THREE.PerspectiveCamera(75, 1);

const iExample = new InteractiveExample(6, camera);

iExample.onInit = () => {
    scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x78E8FA
    });
    cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    scene.add(camera);
    camera.position.z = 3;
    camera.position.x = 1;
    camera.position.y = 1;
    camera.lookAt(cube.position);

    const axesHelper = new THREE.AxesHelper(1.5);
    cube.add(axesHelper);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(cube.rotation, "x").min(0).max(Math.PI*2).step(0.01);
    gui.add(cube.rotation, "y").min(0).max(Math.PI*2).step(0.01);
    gui.add(cube.rotation, "z").min(0).max(Math.PI*2).step(0.01);

    gui.add(cube.rotation, "order", ["XYZ", "XZY", "YXZ", "YZX", "ZXY", "ZYX"]);

    // cube.rotation.x = Math.PI * 0.5;

}

iExample.onPlay = () => {
    gui.show();
}

iExample.onReset = () => {
    gui.hide();
    cube.rotation.set(0, 0, 0);
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}