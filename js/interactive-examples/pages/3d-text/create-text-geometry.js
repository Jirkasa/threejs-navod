import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 180;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);

    const fontLoader = new FontLoader();
    fontLoader.load(
        "../../static/other/Rubik_Regular.json",
        (font) => {
            const geometry = new TextGeometry( '3D Text', {
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

            const text = new THREE.Mesh(
                geometry,
                new THREE.MeshStandardMaterial({
                    color: 0x78E8FA,
                    roughness: 0.2,
                    metalness: 0.2,
                })
            );
            scene.add(text);
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