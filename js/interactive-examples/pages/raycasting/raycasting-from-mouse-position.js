import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

const iExample = new InteractiveExample(5, camera);

let cube, sphere, dodecahedron;
let blueMaterial, orangeMaterial;

let raycaster;

const onMouseMove = (e) => {
    const rect = iExample.canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.x) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.y) / rect.height) * 2 + 1;

    // nastavení paprsku podle pozice myši
    raycaster.setFromCamera(
        new THREE.Vector2(x, y),
        camera
    );
}

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
    iExample.canvas.addEventListener("mousemove", onMouseMove);
}

iExample.onReset = () => {
    sphere.position.y = 0;
    cube.position.y = 0;
    dodecahedron.position.y = 0;

    iExample.canvas.removeEventListener("mousemove", onMouseMove);
}

iExample.onTick = (_, elapsedTime) => {
    sphere.position.y = Math.sin(elapsedTime);
    cube.position.y = Math.sin(elapsedTime * 2);
    dodecahedron.position.y = Math.sin(elapsedTime * 3);

    sphere.material = blueMaterial;
    cube.material = blueMaterial;
    dodecahedron.material = blueMaterial;

    const intersections = raycaster.intersectObjects([sphere, cube, dodecahedron]);

    for (let intersection of intersections) {
        intersection.object.material = orangeMaterial;
    }

    iExample.renderer.render(scene, camera);
}