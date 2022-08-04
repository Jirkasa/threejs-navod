import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { PerspectiveCamera } from "three";

let scene;

const iExample = new InteractiveExample(1, null);

const camera1 = new PerspectiveCamera(40, 1, 0.1, 10);
camera1.position.y = 4;
camera1.position.x = 5;
camera1.lookAt(0, 0, 0);

const camera2 = new PerspectiveCamera(40, 1, 0.1, 10);
camera2.position.z = 3;
camera2.position.x = 3;
camera2.position.y = 1;
camera2.lookAt(0, 0, 0);

const camera3 = new PerspectiveCamera(40, 1, 0.1, 10);
camera3.position.z = 3;
camera3.position.x = -2;
camera3.lookAt(0, 0, 0);

const camera4 = new PerspectiveCamera(40, 1, 0.1, 10);
camera4.position.z = 3;
camera4.position.y = 2;
camera4.lookAt(0, 0, 0);

const arrayCamera = new THREE.ArrayCamera([camera1, camera2, camera3, camera4]);

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
    sphere.frustumCulled = false;
    scene.add(sphere);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 12),
        new THREE.MeshBasicMaterial({ color: 0xFAB278 })
    );
    cone.position.x = 1.5;
    cone.frustumCulled = false;
    scene.add(cone);

    scene.add(arrayCamera);
}

iExample.onResize = (newWidth, newHeight) => {
    camera1.aspect = newWidth / newHeight;
    camera1.updateProjectionMatrix();
    camera2.aspect = newWidth / newHeight;
    camera2.updateProjectionMatrix();
    camera3.aspect = newWidth / newHeight;
    camera3.updateProjectionMatrix();
    camera4.aspect = newWidth / newHeight;
    camera4.updateProjectionMatrix();

    let WIDTH = ( newWidth / 2 ) * window.devicePixelRatio;
    let HEIGHT = ( newHeight / 2 ) * window.devicePixelRatio;

    camera1.viewport = new THREE.Vector4(0, 0, WIDTH, HEIGHT);
    camera2.viewport = new THREE.Vector4(WIDTH, 0, WIDTH, HEIGHT);
    camera3.viewport = new THREE.Vector4(0, HEIGHT, WIDTH, HEIGHT);
    camera4.viewport = new THREE.Vector4(WIDTH, HEIGHT, WIDTH, HEIGHT);

    camera1.updateMatrixWorld();
    camera2.updateMatrixWorld();
    camera3.updateMatrixWorld();
    camera4.updateMatrixWorld();
}

iExample.onTick = () => {
    iExample.renderer.render(scene, arrayCamera);
}