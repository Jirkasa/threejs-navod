import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CANNON from 'cannon';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let world;
let sphereMesh, cubeMesh;
let sphereShape, cubeShape;
let sphereBody, cubeBody;
let controls;
let plasticMaterial;

const iExample = new InteractiveExample(6, camera);

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

    const floorShape = new CANNON.Plane();

    const floorBody = new CANNON.Body({
        shape: floorShape,
        position: new CANNON.Vec3(0, 0, 0),
        mass: 0
    });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.25);
    world.addBody(floorBody);

    const greyMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });

    const floorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        greyMaterial
    );
    floorMesh.quaternion.copy(floorBody.quaternion);
    scene.add(floorMesh);

    const iceMaterial = new CANNON.Material("ice");
    plasticMaterial = new CANNON.Material("plastic");

    floorBody.material = iceMaterial;

    const icePlasticContactMaterial = new CANNON.ContactMaterial(
        iceMaterial,
        plasticMaterial,
        {
            friction: 0.05,
            restitution: 0.8
        }
    );
    world.addContactMaterial(icePlasticContactMaterial);

    cubeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        blueMaterial
    );
    // přidání meshe do scény
    scene.add(cubeMesh);


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
    sphereBody.material = plasticMaterial;
    world.addBody(sphereBody);

    cubeBody = new CANNON.Body({
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        position: new CANNON.Vec3(2, 3, 0),
        mass: 5,
        material: plasticMaterial
    });
    world.addBody(cubeBody);
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    world.remove(sphereBody);
    sphereBody.position.set(0, 4, 0);
    world.remove(cubeBody);
    cubeBody.position.set(2, 3, 0);
}

iExample.onTick = (delta) => {
    controls.update();

    world.step(1/60, delta, 3);

    sphereMesh.position.copy(sphereBody.position);

    cubeMesh.position.copy(cubeBody.position);
    cubeMesh.quaternion.copy(cubeBody.quaternion);
    
    iExample.renderer.render(scene, camera);
}