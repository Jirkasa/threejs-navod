import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);

    // vytvoření loaderů
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    // -------------------------------

    // načtení environment mapy
    const environmentMap = cubeTextureLoader.load([
        '../../static/other/loading-part-files/environment-map/px.png',
        '../../static/other/loading-part-files/environment-map/nx.png',
        '../../static/other/loading-part-files/environment-map/py.png',
        '../../static/other/loading-part-files/environment-map/ny.png',
        '../../static/other/loading-part-files/environment-map/pz.png',
        '../../static/other/loading-part-files/environment-map/nz.png',
    ]);
    // nastavení defaultní environment mapy
    // pro všechny PBR materiály ve scéně
    scene.environment = environmentMap;
    // nastavení pozadí scény
    scene.background = environmentMap;

    // -------------------------------

    // načtení textur
    const colorTexture = textureLoader.load('../../static/other/loading-part-files/textures/Chair_BaseColor.png');
    const roughnessTexture = textureLoader.load('../../static/other/loading-part-files/textures/Chair_Roughness.png');
    const normalTexture = textureLoader.load('../../static/other/loading-part-files/textures/Chair_Normal.png');
    const ambientOcclusionTexture = textureLoader.load('../../static/other/loading-part-files/textures/Chair_AmbientOcclusion.png');

    // aby se na načtený GLTF model textury aplikovaly správně,
    // je nutné jim nastavit vlastnost flipY na false
    // - to jsem si vygoogloval, když mi to nefungovalo
    colorTexture.flipY = false;
    roughnessTexture.flipY = false;
    normalTexture.flipY = false;
    ambientOcclusionTexture.flipY = false;

    // vytvoření materiálu s načtenými texturami
    const material = new THREE.MeshStandardMaterial({
        map: colorTexture,
        roughnessMap: roughnessTexture,
        normalMap: normalTexture,
        aoMap: ambientOcclusionTexture
    });

    // -------------------------------

    // načtení 3D modelu
    gltfLoader.load(
        '../../static/other/loading-part-files/Chair.glb',
        (gltf) => {
            // procházení všech potomků načtené scény
            // (v našem případě má načtený model jen jeden mesh)
            gltf.scene.traverse(child => {
                // pokud se jedná o mesh
                if (child.isMesh) {
                    // vytvoření druhého UV setu aby fungovala Ambient Occlusion textura
                    child.geometry.setAttribute("uv2", new THREE.Float32BufferAttribute(child.geometry.attributes.uv.array, 2));
                    // nastavení materiálu na mesh
                    child.material = material;
                }
            });

            // přidání modelu do scény
            scene.add(gltf.scene);
        }
    );
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