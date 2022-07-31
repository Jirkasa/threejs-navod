import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
let scene;
let controls;

const iExample = new InteractiveExample(1, camera);


iExample.onInit = () => {
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const environmentMap = cubeTextureLoader.load([
        '../../static/environment-map/px.png',
        '../../static/environment-map/nx.png',
        '../../static/environment-map/py.png',
        '../../static/environment-map/ny.png',
        '../../static/environment-map/pz.png',
        '../../static/environment-map/nz.png'
    ]);

    scene = new THREE.Scene();
    scene.environment = environmentMap;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(45, 193, 132);
    scene.add(directionalLight);

    const fontLoader = new FontLoader();

    fontLoader.load("../../static/other/Rubik_Regular.json", (font) => {
        const geometry = new TextGeometry( 'Three.js', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 4,
            bevelOffset: 0,
            bevelSegments: 3
        });

        geometry.center();

        const text = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0x78E8FA,
                roughness: .2,
                metalness: 1,
            })
        );

        scene.add(text);
    });

    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;


    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 180;
    scene.add(camera);
}

iExample.onPlay = () => {
    controls.saveState();
}

iExample.onTick = (delta, elapsedTime) => {
    controls.update();
    iExample.renderer.render(scene, camera);
}

iExample.onReset = () => {
    controls.reset();
}