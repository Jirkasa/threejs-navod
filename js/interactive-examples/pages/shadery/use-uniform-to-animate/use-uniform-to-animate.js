import InteractiveExample from "../../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;
let material;

const iExample = new InteractiveExample(13, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    material = new THREE.RawShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        uniforms: {
            uFrequency: {
                value: 24
            },
            uElapsedTime: {
                value: 0
            }
        }
    });

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 32, 32),
        material
    );
    scene.add(plane);
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

iExample.onTick = (_, elapsedTime) => {
    controls.update();
    material.uniforms.uElapsedTime.value = elapsedTime;
    iExample.renderer.render(scene, camera);
}