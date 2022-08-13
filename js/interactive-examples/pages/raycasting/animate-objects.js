import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

const iExample = new InteractiveExample(3, camera);

let cube, sphere, dodecahedron;
let blueMaterial;

iExample.onInit = () => {
    scene = new THREE.Scene();

    blueMaterial = new THREE.MeshBasicMaterial({ color: 0x78E8FA });

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
}

iExample.onReset = () => {
    sphere.position.y = 0;
    cube.position.y = 0;
    dodecahedron.position.y = 0;
}

iExample.onTick = (_, elapsedTime) => {
    sphere.position.y = Math.sin(elapsedTime);
    cube.position.y = Math.sin(elapsedTime * 2);
    dodecahedron.position.y = Math.sin(elapsedTime * 3);
    
    iExample.renderer.render(scene, camera);
}