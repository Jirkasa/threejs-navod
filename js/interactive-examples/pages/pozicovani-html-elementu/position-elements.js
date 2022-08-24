import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
let controls;

const points = [];

const iExample = new InteractiveExample(3, camera);

iExample.onInit = () => {
    iExample.canvasContainer.style.overflow = "hidden";

    // create point elements
    for (let i = 1; i <= 3; i++) {
        const point = document.createElement("div");
        point.style.width = "3.6rem";
        point.style.height = "3.6rem";
        point.style.position = "absolute";
        point.style.top = "calc(50% - 1.8rem)";
        point.style.left = "calc(50% - 1.8rem)";
        point.style.zIndex = 10;
        point.style.backgroundColor = "#A4B4B7";
        point.style.border = ".2rem solid #429FAD";
        point.style.borderRadius = "50%";
        point.style.fontSize = "1.6rem";
        point.style.fontWeight = "700";
        point.style.textAlign = "center";
        point.style.color = "#2B2D2E";
        point.style.lineHeight = "3.2rem";

        point.innerText = i;

        iExample.canvasContainer.appendChild(point);

        points.push({
            element: point
        });
    }
    points[0].position = new THREE.Vector3(-0.5, -0.5, 0.5);
    points[1].position = new THREE.Vector3(0.5, -0.5, 0.5);
    points[2].position = new THREE.Vector3(0.5, 0.5, -0.5);

    scene = new THREE.Scene();

    camera.position.z = 3;
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(0.5, 1.5, 0.3);
    scene.add(directionalLight);

    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xFAB278,
            roughness: 0.4
        })
    );
    scene.add(cube);
}

iExample.onPlay = () => {
    camera.rotation.set(0, 0, 0);
    controls = new OrbitControls(camera, iExample.canvas);
    controls.enableDamping = true;

    for (let point of points) {
        point.element.style.display = "block";
    }
}

iExample.onReset = () => {
    if (controls) {
        controls.reset();
        controls.dispose();
        controls = null;
    }

    for (let point of points) {
        point.element.style.display = "none";
    }
}

iExample.onTick = () => {
    controls.update();
    for (let point of points) {
        const screenPosition = point.position.clone();
        screenPosition.project(camera);

        const x = screenPosition.x * iExample.canvasContainer.clientWidth * 0.5;
        const y = -screenPosition.y * iExample.canvasContainer.clientHeight * 0.5;

        point.element.style.transform = `translate(${x}px, ${y}px)`;
    }
    iExample.renderer.render(scene, camera);
}