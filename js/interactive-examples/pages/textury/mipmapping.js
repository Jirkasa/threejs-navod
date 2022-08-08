import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(8, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const textureWithMipmaps = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_diffuse_1k.jpg");
    const textureWithoutMipmaps = textureWithMipmaps.clone();
    textureWithoutMipmaps.generateMipmaps = false;

    const materialWithMipmaps = new THREE.MeshBasicMaterial({
        map: textureWithMipmaps
    });
    const materialWithoutMipmaps = new THREE.MeshBasicMaterial({
        map: textureWithoutMipmaps
    });

    const cubeWithMipmaps = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materialWithMipmaps
    );
    cubeWithMipmaps.position.x = -1;
    scene.add(cubeWithMipmaps);

    const cubeWithoutMipmaps = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materialWithoutMipmaps
    );
    cubeWithoutMipmaps.position.x = 1;
    scene.add(cubeWithoutMipmaps);

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