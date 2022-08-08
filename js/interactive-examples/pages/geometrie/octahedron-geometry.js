import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
let controls;

const iExample = new InteractiveExample(9, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const material = new THREE.MeshStandardMaterial({
        color: 0x78E8FA,
        roughness: 0.5,
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0.5, 2, 0.7);
    scene.add(directionalLight);

    camera.position.z = 3;
    scene.add(camera);

    // BOX GEOMETRY
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const box = new THREE.Mesh(boxGeometry, material);
    scene.add(box);

    // CAPSULE GEOMETRY
    const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 2, 6, 18);
    const capsule = new THREE.Mesh(capsuleGeometry, material);
    capsule.position.x = 1.5;
    scene.add(capsule);

    // CIRCLE GEOMETRY
    const circleGeometry = new THREE.CircleGeometry(0.5, 16);
    const circle = new THREE.Mesh(circleGeometry, material);
    circle.position.x = 3;
    scene.add(circle);

    // CONE GEOMETRY
    const coneGeometry = new THREE.ConeGeometry(0.5, 1, 12);
    const cone = new THREE.Mesh(coneGeometry, material);
    cone.position.x = 4.5;
    scene.add(cone);

    // CYLINDER GEOMETRY
    const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 12);
    const cylinder = new THREE.Mesh(cylinderGeometry, material);
    cylinder.position.x = 6;
    scene.add(cylinder);

    // DODECAHEDRON GEOMETRY
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.5, 0);
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, material);
    dodecahedron.position.x = 7.5;
    scene.add(dodecahedron);

    // ICOSAHEDRON GEOMETRY
    const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
    icosahedron.position.x = 9;
    scene.add(icosahedron);

    // LATHE GEOMETRY
    const latheGeometry = new THREE.LatheGeometry(
        [
            new THREE.Vector2(0.2, -0.5),
            new THREE.Vector2(0.5, -0.25),
            new THREE.Vector2(0.35, 0.25),
            new THREE.Vector2(0.2, 0.5)
        ],
        12
    );
    const lathe = new THREE.Mesh(latheGeometry, material);
    lathe.position.x = 10.5;
    scene.add(lathe);

    // OCTAHEDRON GEOMETRY
    const octahedronGeometry = new THREE.OctahedronGeometry(0.5, 1);
    const octahedron = new THREE.Mesh(octahedronGeometry, material);
    octahedron.position.x = 12;
    scene.add(octahedron);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvasContainer);
    controls.enableDamping = true;
}

iExample.onReset = () => {
    if (controls) {
        controls.dispose();
        controls = null;
    }
    camera.position.set(0, 0, 3);
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}