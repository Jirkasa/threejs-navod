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
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;
let effectComposer;

const iExample = new InteractiveExample(9, camera);

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

    const renderTarget = new THREE.WebGLRenderTarget(
        1, 1,
        {
            encoding: THREE.sRGBEncoding
        }
    );
    
    effectComposer = new EffectComposer(iExample.renderer, renderTarget);
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

    const MyShader = {
        uniforms: {
            tDiffuse: {
                value: null
            }
        },
        vertexShader: `
            varying vec2 vUv;

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                // předání UV souřadnic do fragment shaderu pomocí varying
                vUv = uv;
            }
        `,
        fragmentShader: `
            // definování konstanty pro PI (glsl ji neobsahuje)
            #define M_PI 3.1415926535897932384626433832795

            // obrázek z minulého passu
            uniform sampler2D tDiffuse;

            varying vec2 vUv;

            void main() {
                gl_FragColor = texture2D(
                    tDiffuse,
                    vec2(
                        vUv.x - sin((vUv.x-0.5) * 2.0 * M_PI) * 0.09
                        , vUv.y - sin((vUv.y-0.5) * 2.0 * M_PI) * 0.09
                    )
                );
            }
        `
    }

    const myPass = new ShaderPass(MyShader);
    effectComposer.addPass(myPass);

    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
    effectComposer.addPass(gammaCorrectionPass);
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
    iExample.renderer.outputEncoding = THREE.sRGBEncoding;
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    iExample.renderer.outputEncoding = THREE.LinearEncoding;
}

iExample.onTick = () => {
    controls.update();
    effectComposer.render();
}