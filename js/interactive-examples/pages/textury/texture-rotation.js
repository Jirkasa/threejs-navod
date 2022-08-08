import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(7, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_diffuse_1k.jpg");
    texture.offset.x = 0.5;
    texture.offset.y = 0.5;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.rotation = Math.PI * 0.25;

    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material
    );
    cube.position.x = 1;
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 8),
        material
    );
    sphere.position.x = -1;
    scene.add(sphere);

    camera.position.z = 3;
    scene.add(camera);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvasContainer);
    controls.enableDamping = true;
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}