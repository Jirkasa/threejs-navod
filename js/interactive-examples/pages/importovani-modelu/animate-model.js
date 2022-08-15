import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;
let animMixer;
let action;

const iExample = new InteractiveExample(5, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
        "../../static/other/DancingAnimation.glb",
        (gltf) => {
            animMixer = new THREE.AnimationMixer(gltf.scene);
            action = animMixer.clipAction(gltf.animations[0]);
            action.play();
            scene.add(gltf.scene);
        }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);
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
    action.reset();
}

iExample.onTick = (delta) => {
    controls.update();
    if (animMixer) {
        animMixer.update(delta);
    }
    iExample.renderer.render(scene, camera);
}