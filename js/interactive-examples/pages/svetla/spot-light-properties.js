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
let spotLight;
let helper;

const debugObject = {
    color: 0xffffff
};

const iExample = new InteractiveExample(10, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 15, 15),
        new THREE.MeshStandardMaterial({
            color: 0xcccccc
        })
    );
    plane.position.x = 1.5;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    camera.position.z = 5;
    camera.position.y = 1;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xffffff, 1.5, 5, Math.PI * 0.2);
    spotLight.position.set(0, 2, 0);
    scene.add(spotLight);

    spotLight.target.position.x = 1.5;
    spotLight.target.updateMatrixWorld();
    scene.add(spotLight.target);

    helper = new THREE.SpotLightHelper(spotLight);
    scene.add(helper);

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.addColor(debugObject, "color").onChange(() => {
        spotLight.color.set(debugObject.color);
        helper.update();
    });

    gui.add(spotLight, "intensity").min(0).max(10).step(0.01);
    gui.add(spotLight, "distance").min(0).max(10).step(0.01).onChange(() => helper.update());
    gui.add(spotLight, "angle").min(0).max(Math.PI*0.5).step(0.01).onChange(() => helper.update());
    gui.add(spotLight, "penumbra").min(0).max(1).step(0.01);
    gui.add(spotLight, "decay").min(0).max(10).step(0.01);
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
    debugObject.color = 0xffffff;
    spotLight.color.set(0xffffff);
    spotLight.intensity = 1.5;
    spotLight.distance = 5;
    spotLight.angle = 0.63;
    spotLight.penumbra = 0;
    spotLight.decay = 1;
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