import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;
let effectComposer;

const iExample = new InteractiveExample(7, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);


    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMapTexture = cubeTextureLoader.load([
        '../../static/environment-map/px.png',
        '../../static/environment-map/nx.png',
        '../../static/environment-map/py.png',
        '../../static/environment-map/ny.png',
        '../../static/environment-map/pz.png',
        '../../static/environment-map/nz.png',
    ]);
    scene.environment = environmentMapTexture;
    scene.background = environmentMapTexture;


    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        "../../static/other/DeskModel/glTFBinary/Desk.glb",
        (gltf) => {
            scene.add(gltf.scene);
        }
    );

    
    effectComposer = new EffectComposer(iExample.renderer);
    effectComposer.setSize(iExample.canvasContainer.clientWidth, iExample.canvasContainer.clientHeight);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const renderPass = new RenderPass(scene, camera);
    effectComposer.addPass(renderPass);

    const dotScreenPass = new DotScreenPass();
    effectComposer.addPass(dotScreenPass);
    dotScreenPass.enabled = false;

    const glitchPass = new GlitchPass();
    effectComposer.addPass(glitchPass);
    glitchPass.enabled = false;

    const halftonePass = new HalftonePass();
    effectComposer.addPass(halftonePass);
    halftonePass.enabled = false;

    const vignettePass = new ShaderPass(VignetteShader);
    vignettePass.uniforms.offset.value = 1.5;
    effectComposer.addPass(vignettePass);
}

iExample.onResize = (newWidth, newHeight) => {
    if (effectComposer) {
        effectComposer.setSize(newWidth, newHeight);
        effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
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
    effectComposer.render();
}