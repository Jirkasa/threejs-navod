import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CANNON from 'cannon';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let world;
let sphereMesh;
let sphereShape;
let sphereBody;
let controls;

const iExample = new InteractiveExample(1, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    camera.position.z = 5;
    scene.add(camera);

    world = new CANNON.World();

    world.gravity.set(0, -9.82, 0);


    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 24);
    const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x78E8FA });

    sphereShape = new CANNON.Sphere(0.5);

    sphereMesh = new THREE.Mesh(
        sphereGeometry,
        blueMaterial
    );
    scene.add(sphereMesh);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;

    sphereBody = new CANNON.Body({
        shape: sphereShape,
        position: new CANNON.Vec3(0, 4, 0),
        mass: 1
    });
    world.addBody(sphereBody);
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    world.remove(sphereBody);
    sphereBody.position.set(0, 4, 0);
}

iExample.onTick = (delta) => {
    controls.update();

    world.step(1/60, delta, 3);

    sphereMesh.position.copy(sphereBody.position);
    
    iExample.renderer.render(scene, camera);
}