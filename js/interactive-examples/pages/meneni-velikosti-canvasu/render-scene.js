import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10);

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();
    
    const orangeMaterial = new THREE.MeshBasicMaterial({ color: 0xFAB278 });
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x78E8FA });
    const greyMaterial = new THREE.MeshBasicMaterial({ color: 0xdedede })

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        blueMaterial
    );
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 12),
        orangeMaterial
    );
    sphere.position.x = -1.5;
    scene.add(sphere);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 12),
        orangeMaterial
    );
    cone.position.x = 1.5;
    scene.add(cone);

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5),
        greyMaterial
    )
    plane.position.y = -0.5;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);


    camera.position.z = 4;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}