import InteractiveExample from "../../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(5, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const PARTICLES_COUNT = 100;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(PARTICLES_COUNT * 3);
    const colors = new Float32Array(PARTICLES_COUNT * 3);

    for (let i = 0; i < positions.length; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
    }

    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    const colorAttribute = new THREE.BufferAttribute(colors, 3);

    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", colorAttribute);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("../../static/img/textures/particles/star_particle.png");

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uPixelRatio: {
                value: iExample.renderer.getPixelRatio()
            },
            uTexture: {
                value: texture
            }
        },
        transparent: true,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
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