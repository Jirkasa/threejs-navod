import * as THREE from 'three';
import webGLRenderer, { canvas } from "./WebGLRenderer";

class InteractiveExamplesRunner {
    constructor() {
        // determines whether init method was called and examples can be run
        this.initialized = false;
        // stores currently active example
        this._activeExample = null;
        // Three.js Clock to calculate delta time and get time since example started
        this._clock = new THREE.Clock(false);

        // _tick method is called automatically by WebGLRenderer so it needs to be binded
        this._tick = this._tick.bind(this);

        // camera and renderer are resized on window resize
        window.addEventListener("resize", this._resize.bind(this));
    }

    // used to initialize (start) runner
    init() {
        // set method that is going to be called by WebGLRenderer every frame
        webGLRenderer.setAnimationLoop(this._tick);

        // runner is initialized, examples can be run
        this.initialized = true;
    }

    // plays passed example
    playExample(example) {
        if (!this.initialized) return;

        // start Three.js clock to measure time since example started
        this._clock.start();

        // hide play button and display reset button
        example.playButton.style.display = "none";
        example.resetButton.style.display = "flex";
        // place canvas to example canvas container
        example.canvasContainer.appendChild(canvas);

        // reset currently active example
        this.resetExample();

        // set passed example as active example
        this._activeExample = example;
        // update camera and renderer based on new active example canvas dimensions
        this._resize();

        // if init function of example wasn't called yet, call it
        if (!example.initialized) {
            example.initialized = true;
            example.onInit?.();
        }

        // call example onPlay function
        example.onPlay?.();
    }

    // resets active example
    resetExample() {
        if (!this._activeExample) return;

        // stop clock
        this._clock.stop();

        // hide reset button and display play button
        this._activeExample.playButton.style.display = "flex";
        this._activeExample.resetButton.style.display = "none";

        // remove canvas from example canvas container
        this._activeExample.canvasContainer.removeChild(canvas);

        // call example onReset function
        this._activeExample.onReset?.();

        // there is no active example now
        this._activeExample = null;
    }

    // called automatically by WebGLRenderer every frame
    _tick() {
        if (this._activeExample) {
            // get delta time and elapsed time since example started
            const delta = this._clock.getDelta();
            const elapsedTime = this._clock.getElapsedTime();
            // call example onTick function
            this._activeExample.onTick?.(delta, elapsedTime);
        }
    }

    // updates camera and renderer to match dimensions of canvas
    _resize() {
        if (this._activeExample) {
            // update camera
            this._activeExample.camera.aspect = this._activeExample.canvasContainer.clientWidth / this._activeExample.canvasContainer.clientHeight;
            this._activeExample.camera.updateProjectionMatrix();
            // update renderer
            webGLRenderer.setSize(this._activeExample.canvasContainer.clientWidth, this._activeExample.canvasContainer.clientHeight);
            webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
    }
}

export default new InteractiveExamplesRunner();