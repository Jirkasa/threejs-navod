import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const iExample = new InteractiveExample(10, camera);

iExample.onInit = () => {
    scene = new THREE.Scene();

    const orangeMaterial = new THREE.MeshStandardMaterial({
        color: 0xFAB278,
        roughness: 0.5
    });
    const blueMaterial = new THREE.MeshStandardMaterial({
        color: 0x78E8FA,
        roughness: 0.5
    });
    const greyMaterial = new THREE.MeshStandardMaterial({
        color: 0xbbbbbb
    });

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 15),
        greyMaterial
    );
    plane.position.y = -0.5;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        orangeMaterial
    );
    scene.add(cube);

    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 10),
        blueMaterial
    );
    sphere.position.x = -1.1;
    sphere.position.z = -0.5;
    scene.add(sphere);

    const dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        blueMaterial
    );
    dodecahedron.position.x = 2;
    dodecahedron.position.z = -0.2;
    scene.add(dodecahedron);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);


    camera.position.z = 3;
    scene.add(camera);

    directionalLight.castShadow = true;
    plane.receiveShadow = true;
    cube.castShadow = true;
    cube.receiveShadow = true;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    dodecahedron.castShadow = true;
    dodecahedron.receiveShadow = true;

    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;

    directionalLight.shadow.camera.right = 2;
    directionalLight.shadow.camera.left = -2;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.far = 3;
    directionalLight.shadow.camera.updateProjectionMatrix();

    directionalLight.shadow.radius = 10;
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;
    iExample.renderer.shadowMap.enabled = true;
    iExample.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }
    iExample.renderer.shadowMap.enabled = false;
    iExample.renderer.shadowMap.type = THREE.PCFShadowMap;
}

iExample.onTick = () => {
    controls.update();
    iExample.renderer.render(scene, camera);
}