import InteractiveExample from "../../InteractiveExample";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene;
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
let controls;

const iExample = new InteractiveExample(15, camera);

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

    // PLANE GEOMETRY
    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.position.x = 13.5;
    scene.add(plane);

    // POLYHEDRON GEOMETRY
    // - vertexy kostky
    const verticesOfCube = [
        -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
    ];
    // - polygony (trojúhelníky) kostky
    const indicesOfFaces = [
        2,1,0,    0,3,2,
        0,4,7,    7,3,0,
        0,1,5,    5,4,0,
        1,2,6,    6,5,1,
        2,3,7,    7,6,2,
        4,5,6,    6,7,4
    ];
    const polyhedronGeometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 0.5, 1 );
    const polyhedron = new THREE.Mesh(polyhedronGeometry, material);
    polyhedron.position.x = 15;
    scene.add(polyhedron);

    // RING GEOMETRY
    const ringGeometry = new THREE.RingGeometry(0.3, 0.5, 16);
    const ring = new THREE.Mesh(ringGeometry, material);
    ring.position.x = 16.5;
    scene.add(ring);

    // SPHERE GEOMETRY
    const sphereGeometry = new THREE.SphereGeometry(0.5, 12, 8);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.x = 18;
    scene.add(sphere);

    // TETRAHEDRON GEOMETRY
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5, 1);
    const tetrahedron = new THREE.Mesh(tetrahedronGeometry, material);
    tetrahedron.position.x = 19.5;
    scene.add(tetrahedron);

    // TORUS GEOMETRY
    const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 8, 16);
    const torus = new THREE.Mesh(torusGeometry, material);
    torus.position.x = 21;
    scene.add(torus);
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