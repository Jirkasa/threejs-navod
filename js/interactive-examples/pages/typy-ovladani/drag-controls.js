import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

let scene;
const objects = [];
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const orangeMaterial = new THREE.MeshBasicMaterial({ color: 0xFAB278 });
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x78E8FA });
    const greyMaterial = new THREE.MeshBasicMaterial({ color: 0xdedede });

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        greyMaterial
    );
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        blueMaterial
    );
    cube.position.y = 0.5;
    scene.add(cube);
    objects.push(cube);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 1, 4),
        orangeMaterial
    );
    cone.position.y = 1.5;
    scene.add(cone);
    objects.push(cone);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 8, 6),
        orangeMaterial
    );
    sphere.position.y = 0.75;
    sphere.position.x = -2;
    sphere.position.z = 2;
    scene.add(sphere);
    objects.push(sphere);

    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(0.6, 0.2, 8, 8),
        blueMaterial
    )
    torus.rotation.x = Math.PI * 0.5;
    torus.position.y = 0.1;
    torus.position.x = 4;
    torus.position.z = -2.5;
    scene.add(torus);
    objects.push(torus);

    camera.position.z = 5;
    camera.position.y = 1;
    scene.add(camera);
}

iExample.onPlay = () => {
    controls = new DragControls(objects, camera, iExample.canvas);
}

iExample.onReset = () => {
    if (controls) {
        controls.dispose();
        controls = null;
    }
    
    objects[0].position.set(0, 0.5, 0);
    objects[1].position.set(0, 1.5, 0);
    objects[2].position.set(-2, 0.75, 2);
    objects[3].position.set(4, 0.1, -2.5);
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}