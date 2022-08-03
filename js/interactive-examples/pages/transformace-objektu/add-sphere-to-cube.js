import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(75, 1);

const iExample = new InteractiveExample(9, camera);

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

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    sphere.position.y = 1;
    cube.add(sphere);
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}