import InteractiveExample from "../../InteractiveExample";

const iExample = new InteractiveExample(2);

let overlay;

iExample.onInit = () => {
    overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.zIndex = 10;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#2B2D2E";

    iExample.canvasContainer.appendChild(overlay);
}

iExample.onPlay = () => {
    overlay.style.display = "block";
}

iExample.onReset = () => {
    overlay.style.display = "none";
}