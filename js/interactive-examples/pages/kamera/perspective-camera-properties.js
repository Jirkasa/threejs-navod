import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import * as dat from 'dat.gui';

dat.GUI.TEXT_CLOSED = "ZAVŘÍT";
dat.GUI.TEXT_OPEN = "OTEVŘÍT";

let gui;

let scene;

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
const watchCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
camera.position.z = 6;
camera.position.y = 1;
camera.lookAt(0, 0, 0);
watchCamera.position.x = 15;
watchCamera.position.z = 1;
watchCamera.rotation.y = Math.PI * 0.5;
const arrayCamera = new THREE.ArrayCamera([camera, watchCamera]);
let cameraHelper;

const iExample = new InteractiveExample(4, null);

iExample.onInit = () => {
    scene = new THREE.Scene()

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x78E8FA })
    );
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    sphere.position.x = -1.5;
    sphere.frustumCulled = false;
    scene.add(sphere);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 12),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    cone.frustumCulled = false;
    cone.position.x = 1.5;
    scene.add(cone);

    
    cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);

    scene.add(arrayCamera);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(camera, "fov").min(0).max(180).step(0.01).onChange(() => {
        camera.updateProjectionMatrix();
        cameraHelper.update();
    });
    gui.add(camera, "near").min(0.01).max(10).step(0.01).onChange(() => {
        camera.updateProjectionMatrix();
        cameraHelper.update();
    });
    gui.add(camera, "far").min(0).max(10).step(0.01).onChange(() => {
        camera.updateProjectionMatrix();
        cameraHelper.update();
    });
}

iExample.onPlay = () => {
    gui.show();
}

iExample.onReset = () => {
    gui.hide();
    camera.fov = 45;
    camera.near = 0.1;
    camera.far = 10;
    camera.updateProjectionMatrix();
    cameraHelper.update();
    for (let i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
}

iExample.onResize = (newWidth, newHeight) => {
    let WIDTH = ( newWidth / 2 ) * window.devicePixelRatio;
    let HEIGHT = newHeight * window.devicePixelRatio;

    camera.viewport = new THREE.Vector4(WIDTH, 0, WIDTH, HEIGHT);
    watchCamera.viewport = new THREE.Vector4(0, 0, WIDTH, HEIGHT);

    camera.aspect = newWidth / 2 / newHeight;
    camera.updateProjectionMatrix();
    watchCamera.aspect = newWidth / 2 / newHeight;
    watchCamera.updateProjectionMatrix();

    camera.updateMatrixWorld();
    watchCamera.updateMatrixWorld();
}

iExample.onTick = () => {
    iExample.renderer.render(scene, arrayCamera);
}