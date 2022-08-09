import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(18, camera);

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
    const ambientOcclusionTexture = textureLoader.load("../../static/img/textures/bricks/brick_wall_001_ao_1k.jpg");

    const material = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        roughness: roughnessTexture,
        aoMap: ambientOcclusionTexture
    });


    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material
    );
    scene.add(cube);
    cube.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(cube.geometry.attributes.uv.array, 2));

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 10),
        material
    );
    sphere.position.x = -1.5;
    scene.add(sphere);
    sphere.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(sphere.geometry.attributes.uv.array, 2));

    const dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        material
    );
    dodecahedron.position.x = 1.5;
    scene.add(dodecahedron);
    dodecahedron.geometry.setAttribute("uv2",new THREE.Float32BufferAttribute(dodecahedron.geometry.attributes.uv.array, 2));

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