import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
let controls;

const iExample = new InteractiveExample(2, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const material = new THREE.MeshStandardMaterial({
        color: 0x78E8FA,
        roughness: 0.5,
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0.5, 2, 0.7);
    scene.add(directionalLight);

    camera.position.z = 3;
    scene.add(camera);

    // BOX GEOMETRY
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const box = new THREE.Mesh(boxGeometry, material);
    scene.add(box);

    // CAPSULE GEOMETRY
    const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 2, 6, 18);
    const capsule = new THREE.Mesh(capsuleGeometry, material);
    capsule.position.x = 1.5;
    scene.add(capsule);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvasContainer);
    controls.reset();
    controls.enableDamping = true;
}

iExample.onReset = () => {
    if (controls) {
        controls.dispose();
        controls = null;
    }
    camera.position.set(0, 0, 3);
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}