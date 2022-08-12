import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const PARTICLES_COUNT = 100;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(PARTICLES_COUNT * 3);

    for (let i = 0; i < positions.length; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    const positionAtribute = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute("position", positionAtribute);


    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load("../../static/img/textures/particles/star_particle.png");

    const material = new THREE.PointsMaterial({
        color: 0x78E8FA,
        alphaMap: particleTexture,
        transparent: true,
        alphaTest: 0.001
    });


    const particles = new THREE.Points(
        geometry,
        material
    );
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