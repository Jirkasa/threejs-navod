import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
const iExample = new InteractiveExample(3, camera);

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
    scene.add(sphere);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 12),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    cone.position.x = 1.5;
    scene.add(cone);

    camera.position.x = 3;
    camera.position.z = 2;
    camera.position.y = 1;
    camera.lookAt(0, 0, 0);

    scene.add(camera);
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}