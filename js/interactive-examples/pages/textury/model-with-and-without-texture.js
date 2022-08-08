import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.x = 0;
    camera.position.y = 150;
    camera.position.z = 100;
    scene.add(camera);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(45, 193, 132);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -205;
    directionalLight.shadow.camera.right = 205;
    directionalLight.shadow.camera.top = 208;
    directionalLight.shadow.camera.bottom = -192;
    directionalLight.shadow.camera.far = 392;
    directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(directionalLight);

    const groundPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(450, 520),
        new THREE.ShadowMaterial({
            color: 0x262626
        })
    );
    groundPlane.rotation.x = -Math.PI * 0.5;
    groundPlane.rotation.z = Math.PI * 0.1;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);

    const textureLoader = new THREE.TextureLoader();

    const baseColorTexture = textureLoader.load("../../static/models/chair3/textures/dirty-with-scratches/Chair3_BaseColor.png");
    const ambientOcclusionTexture = textureLoader.load("../../static/models/chair3/textures/dirty-with-scratches/Chair3_AmbientOcclusion.png");
    const normalTexture = textureLoader.load("../../static/models/chair3/textures/dirty-with-scratches/Chair3_Normal.png");
    const roughnessTexture = textureLoader.load("../../static/models/chair3/textures/dirty-with-scratches/Chair3_Roughness.png");
    const metallicTexture = textureLoader.load("../../static/models/chair3/textures/dirty-with-scratches/Chair3_Metallic.png");

    const material = new THREE.MeshStandardMaterial({
        map: baseColorTexture,
        aoMap: ambientOcclusionTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallicTexture
    });

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMap = cubeTextureLoader.load([
        '../../static/environment-map/px.png',
        '../../static/environment-map/nx.png',
        '../../static/environment-map/py.png',
        '../../static/environment-map/ny.png',
        '../../static/environment-map/pz.png',
        '../../static/environment-map/nz.png'
    ]);
    scene.environment = environmentMap;

    const fbxLoader = new FBXLoader();
    fbxLoader.load("../../static/models/chair3/Chair3.fbx", (model) => {
        model.position.x = -20;
        model.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        for (const child of model.children) {
            if (child.isMesh) {
                child.position.set(0, 0, 0);
            }
        }

        const texturedModel = model.clone();
        texturedModel.position.x = 20;
        texturedModel.material = material;
        texturedModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        scene.add(model);
        scene.add(texturedModel);
    });
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvasContainer);
    controls.enableDamping = true;

    iExample.renderer.setClearColor(new THREE.Color(0x2B2D2E));
    iExample.renderer.physicallyCorrectLights = true;
    iExample.renderer.shadowMap.enabled = true;
    iExample.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    iExample.renderer.shadowMap.mapSize = new THREE.Vector2(1024, 1024);
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    iExample.renderer.setClearColor(new THREE.Color(0x000000));
    iExample.renderer.physicallyCorrectLights = false;
    iExample.renderer.shadowMap.enabled = false;
    iExample.renderer.shadowMap.type = THREE.PCFShadowMap;
    iExample.renderer.shadowMap.mapSize = new THREE.Vector2(512, 512);
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}