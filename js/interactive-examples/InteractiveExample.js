import InteractiveExamplesRunner from './InteractiveExamplesRunner';
import webGLRenderer, { canvas } from "./WebGLRenderer";

class InteractiveExample {
    constructor(elementId, camera) {
        // determines whether interactive example was initialized (init function was called)
        this.initialized = false;
        // camera is stored for auto resizing
        this.camera = camera;


        // get example element
        const exampleElement = document.querySelector(`[data-example-id="${elementId}"]`);
        if (!exampleElement) throw new Error("Example element wasn't found");
        exampleElement.classList.add("interactive-example");

        // create header
        const header = document.createElement("div");
        header.classList.add("interactive-example__header");
        exampleElement.appendChild(header);

        // create header icon
        const icon = document.createElement("div");
        icon.classList.add("interactive-example__icon");
        icon.innerHTML = `
            <svg>
                <use xlink:href="../../static/img/icon-sprite.svg#icon-embed2"></use>
            </svg>
        `;
        header.appendChild(icon);

        // create play button
        const playButton = document.createElement("button");
        playButton.classList.add("interactive-example__button");
        playButton.innerHTML = `
            <svg>
                <use xlink:href="../../static/img/icon-sprite.svg#icon-play"></use>
            </svg>
            <span>Spustit</span>
        `;
        header.appendChild(playButton);

        // create reset button
        const resetButton = document.createElement("button");
        resetButton.classList.add("interactive-example__button");
        resetButton.innerHTML = `
            <svg>
                <use xlink:href="../../static/img/icon-sprite.svg#icon-spinner11"></use>
            </svg>
            <span>Resetovat</span>
        `;
        resetButton.style.display = "none";
        header.appendChild(resetButton);

        // create canvas container
        const canvasContainer = document.createElement("div");
        canvasContainer.classList.add("interactive-example__canvas-container");
        exampleElement.appendChild(canvasContainer);


        // add event listeners to play/reset interactive example
        playButton.addEventListener("click", () => InteractiveExamplesRunner.playExample(this));
        resetButton.addEventListener("click", () => InteractiveExamplesRunner.resetExample());


        // store references to play button, reset button and canvas container
        this.playButton = playButton;
        this.resetButton = resetButton;
        this.canvasContainer = canvasContainer;
    }

    /**
     * @returns {THREE.WebGLRenderer}
     */
    get renderer() {
        return webGLRenderer;
    }

    /**
     * @returns {HTMLCanvasElement}
     */
    get canvas() {
        return canvas;
    }
}

export default InteractiveExample;