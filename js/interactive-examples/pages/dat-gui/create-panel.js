import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import * as dat from 'dat.gui';

let scene;
let gui;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

const iExample = new InteractiveExample(2, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshBasicMaterial({ color: 0xdedede })
    );
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x78E8FA })
    );
    cube.position.y = 0.5;
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    sphere.position.y = 0.5;
    sphere.position.z = -1.5;
    sphere.position.x = -1.5;
    scene.add(sphere);

    camera.position.y = 2;
    camera.position.z = 3;
    camera.lookAt(0, 0, -1);
    scene.add(camera);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");
}

iExample.onPlay = () => {
    gui.show();
    gui.open();
}

iExample.onReset = () => {
    gui.hide();
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}