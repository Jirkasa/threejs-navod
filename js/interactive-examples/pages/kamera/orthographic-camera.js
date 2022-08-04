import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;

const iExample = new InteractiveExample(2, null);

const camera = new THREE.OrthographicCamera(null, null, null, null, 0.1, 10);
camera.position.x = 3;
camera.position.z = 2;
camera.position.y = 1;
camera.lookAt(0, 0, 0);

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

    scene.add(camera);
}

iExample.onResize = (newWidth, newHeight) => {
    const aspectRatio = newWidth / newHeight;

    camera.left = -1 * aspectRatio;
    camera.right = 1 * aspectRatio;
    camera.top = 1;
    camera.bottom = -1;

    camera.updateProjectionMatrix();
}

iExample.onTick = () => {
    iExample.renderer.render(scene, camera);
}