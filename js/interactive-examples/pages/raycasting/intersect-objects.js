import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

const iExample = new InteractiveExample(2, camera);

let cube, sphere, dodecahedron;
let blueMaterial, orangeMaterial;

let timeoutId = null;
let raycaster;

iExample.onInit = () => {
    scene = new THREE.Scene();

    blueMaterial = new THREE.MeshBasicMaterial({ color: 0x78E8FA });
    orangeMaterial = new THREE.MeshBasicMaterial({ color: 0xFAB278 });

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        blueMaterial
    );
    scene.add(cube);

    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 10),
        blueMaterial
    );
    sphere.position.x = -1.5;
    scene.add(sphere);

    dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        blueMaterial
    );
    dodecahedron.position.x = 1.5;
    scene.add(dodecahedron);

    camera.position.z = 5;
    scene.add(camera);

    raycaster = new THREE.Raycaster();

    const rayOrigin = new THREE.Vector3(-3, 0, 0);
    const rayDirection = new THREE.Vector3(1, 0, 0);

    raycaster.set(rayOrigin, rayDirection);
}

iExample.onPlay = () => {
    timeoutId = setTimeout(() => {
        const intersections = raycaster.intersectObjects([cube, sphere, dodecahedron]);

        for (let intersection of intersections) {
            intersection.object.material = orangeMaterial;
        }
    }, 1000);
}

iExample.onReset = () => {
    clearTimeout(timeoutId);
    cube.material = blueMaterial;
    sphere.material = blueMaterial;
    dodecahedron.material = blueMaterial;
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}