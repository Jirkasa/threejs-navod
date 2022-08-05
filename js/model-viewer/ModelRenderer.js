import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';

class ModelRenderer {
    constructor() {
        // get canvas
        const canvas = document.getElementById("WebGLCanvas");
        // store reference to container of canvas (used for resizing of canvas)
        this._modelViewerViewport = document.getElementById("ModelViewerViewport");

        // create WebGL renderer
        this._renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: window.devicePixelRatio < 2 // use antialiasing for screens with pixel ratio below 2
        });
        // set size and pixel ratio of renderer
        this._renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // set clear color of renderer
        this._renderer.setClearColor(new THREE.Color(0x2B2D2E));
        // activate physically correct lights
        this._renderer.physicallyCorrectLights = true;
        // setup shadows
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._renderer.shadowMap.mapSize = new THREE.Vector2(1024, 1024);

        // create scene
        this._scene = new THREE.Scene();

        // create camera
        this._camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);

        // load environment map
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const environmentMap = cubeTextureLoader.load([
            '../static/environment-map/px.png',
            '../static/environment-map/nx.png',
            '../static/environment-map/py.png',
            '../static/environment-map/ny.png',
            '../static/environment-map/pz.png',
            '../static/environment-map/nz.png'
        ]);
        // set environment map to be used for all meshes in scene
        this._scene.environment = environmentMap;

        // create orbit controls
        this._controls = new OrbitControls(this._camera, canvas);
        this._controls.enableDamping = true;

        // setup scene (add light and bottom plane for shadows)
        this._setupScene();

        // add event listener for resizing
        window.addEventListener("resize", this._onResize.bind(this));

        // here is stored currently rendered model
        this._currentModel = null;
    }

    // called when viewport resize occurs
    _onResize() {
        // Update camera
        this._camera.aspect = this._modelViewerViewport.clientWidth / this._modelViewerViewport.clientHeight;
        this._camera.updateProjectionMatrix();
        // Update renderer
        this._renderer.setSize(this._modelViewerViewport.clientWidth, this._modelViewerViewport.clientHeight);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    // setups scene (adds directional light, bottom plane for shadows..)
    _setupScene() {
        // position camera and add it to scene
        this._camera.position.x = 0;
        this._camera.position.y = 150;
        this._camera.position.z = 100;
        this._scene.add(this._camera);

        // create directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // set position of directional light
        directionalLight.position.set(45, 193, 132);
        // setup shadows
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -205;
        directionalLight.shadow.camera.right = 205;
        directionalLight.shadow.camera.top = 208;
        directionalLight.shadow.camera.bottom = -192;
        directionalLight.shadow.camera.far = 392;
        directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        // add directional light to scene
        this._scene.add(directionalLight);

        // create ground plane for shadows
        const groundPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(450, 520),
            new THREE.ShadowMaterial({
                color: 0x262626
            })
        );
        groundPlane.rotation.x = -Math.PI * 0.5;
        groundPlane.rotation.z = Math.PI * 0.1;
        groundPlane.receiveShadow = true;
        // add ground plane to scene
        this._scene.add(groundPlane);
    }

    // updates orbit controls
    update(dt) {
        this._controls.update();
    }

    // renderes scene to canvas
    render() {
        this._renderer.render(this._scene, this._camera);
    }

    // sets model to be rendered
    setModel(model) {
        // add model to scene
        this._scene.add(model);
        // store model as currently rendered model
        this._currentModel = model;
    }

    // changes material of currently rendered model
    setMaterial(material) {
        // traverse currently rendered model
        this._currentModel.traverse(child => {
            // update all meshes of model to use new material
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    }

    // removes currently rendered model from scene
    clean() {
        if (this._currentModel) {
            this._scene.remove(this._currentModel);
            this._currentModel = null;
        }
    }

    // sets rotation of currently rendered model
    setModelRotation(rotation) {
        this._currentModel.rotation.y = rotation;
    }
}

export default ModelRenderer;