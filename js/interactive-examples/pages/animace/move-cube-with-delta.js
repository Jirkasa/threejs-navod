import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
let cube;
const camera = new THREE.PerspectiveCamera(75, 1);

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x78E8FA })
    );
    scene.add(cube);

    camera.position.z = 3;
    scene.add(camera);
}

iExample.onReset = () => {
    cube.position.x = 0;
}

iExample.onTick = (delta) => {
    cube.position.x += 1.5 * delta;
    iExample.renderer.render(scene, camera);
}