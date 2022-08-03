import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(75, 1);

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x78E8FA })
    );
    scene.add(cube);

    camera.position.z = 3;
    scene.add(camera);
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}