import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';

let scene;
let cube;
let xTorus, yTorus, zTorus;
const camera = new THREE.PerspectiveCamera(75, 1);

let currentAxis = "x";
let stepValue = Math.PI * 0.5;

const iExample = new InteractiveExample(8, camera);

iExample.onInit = () => {
    scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x78E8FA
    });
    cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = Math.PI * 0.5;

    scene.add(camera);
    camera.position.z = 3;
    camera.position.x = 1;
    camera.position.y = 1;
    camera.lookAt(cube.position);

    xTorus = new THREE.Mesh(
        new THREE.TorusGeometry(2, 0.02, 8, 35),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    xTorus.rotation.y = Math.PI * 0.5;
    scene.add(xTorus);

    yTorus = new THREE.Mesh(
        new THREE.TorusGeometry(1.9, 0.02, 8, 35),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    yTorus.rotation.x = Math.PI * 0.5;
    xTorus.add(yTorus);

    zTorus = new THREE.Mesh(
        new THREE.TorusGeometry(1.8, 0.02, 8, 35),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    zTorus.rotation.y = Math.PI * 0.5;
    yTorus.add(zTorus);

    zTorus.add(cube);
}

iExample.onPlay = () => {
}

iExample.onReset = () => {
    xTorus.rotation.z = 0;
    yTorus.rotation.z = 0;
    zTorus.rotation.z = 0;
    currentAxis = "x";
}

iExample.onTick = (delta) => {
    if (currentAxis !== "z") {
        switch (currentAxis) {
            case "x":
                xTorus.rotation.z += delta;
                if (xTorus.rotation.z >= stepValue) {
                    xTorus.rotation.z = stepValue;
                    currentAxis = "y";
                }
                break;
            case "y":
                yTorus.rotation.z += delta;
                if (yTorus.rotation.z >= +stepValue) {
                    yTorus.rotation.z = +stepValue;
                    currentAxis = "z";
                }
                break;
        }
    }

    iExample.renderer.render(scene, camera);
}