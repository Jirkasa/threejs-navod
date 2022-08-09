import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

dat.GUI.TEXT_CLOSED = "ZAVŘÍT";
dat.GUI.TEXT_OPEN = "OTEVŘÍT";

let gui;

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

let parameters = {
    aoOn: true
}

let material;
let ambientOcclusionTexture;

const iExample = new InteractiveExample(19, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);

    // vytvoření Texture Loaderu
    const textureLoader = new THREE.TextureLoader();
    // načtení textur
    const colorTexture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_diffuse_1k.jpg");
    const normalTexture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_nor_gl_1k.png");
    const roughnessTexture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_rough_1k.png");
    ambientOcclusionTexture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_ao_1k.jpg");

    material = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        roughness: roughnessTexture,
        aoMap: ambientOcclusionTexture
    });

    gui = new dat.GUI();
    iExample.canvasContainer.appendChild(gui.domElement);
    gui.domElement.classList.add("dat-gui");

    gui.add(parameters, "aoOn").name("ambient occlusion").onChange(() => {
        if (parameters.aoOn) {
            material.aoMap = ambientOcclusionTexture;
        } else {
            material.aoMap = null;
        }
        material.needsUpdate = true;
    });


    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material
    );
    scene.add(cube);
    cube.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2));

    camera.position.z = 3;
    scene.add(camera);
}

iExample.onPlay = () => {
    gui.show();
    gui.open();
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;
}

iExample.onReset = () => {
    gui.hide();
    if (!parameters.aoOn) {
        parameters.aoOn = true;
        material.aoMap = ambientOcclusionTexture;
        material.needsUpdate = true;
        for (let i in gui.__controllers) {
            gui.__controllers[i].updateDisplay();
        }
    }
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