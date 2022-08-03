import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(75, 1);

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x78E8FA
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    scene.add(camera);
    camera.position.z = 3;

    cube.position.x = 1;
    cube.position.y = 1;
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}