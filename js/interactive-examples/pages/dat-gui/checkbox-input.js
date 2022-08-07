import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import * as dat from 'dat.gui';

let scene;
let gui;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let cube;
let debugObject;

const iExample = new InteractiveExample(5, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshBasicMaterial({ color: 0xdedede })
    );
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    cube = new THREE.Mesh(
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

    gui.add(cube.position, "x").min(-4.5).max(4.5).step(0.01);

    debugObject = {
        cubeColor: 0x78E8FA
    }
    
    gui.addColor(debugObject, "cubeColor").onChange(() => {
        cube.material.color.set(debugObject.cubeColor);
    });
    
    gui.add(cube, "visible");
}

iExample.onPlay = () => {
    gui.show();
    gui.open();
}

iExample.onReset = () => {
    gui.hide();
    cube.position.x = 0;
    cube.material.color.set(0x78E8FA);
    debugObject.cubeColor = 0x78E8FA;
    cube.visible = true;
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}