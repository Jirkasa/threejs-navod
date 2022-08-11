import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(9, camera);

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

    const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.4);
    scene.add(hemisphereLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.5, 3, Math.PI * 0.2);
    spotLight.position.y = 2;
    scene.add(spotLight);

    spotLight.target.position.x = 1.5;
    scene.add(spotLight.target);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
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