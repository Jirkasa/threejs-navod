import * as THREE from 'three';

// create canvas for WebGLRenderer
export const canvas = document.createElement("canvas");
canvas.classList.add("webgl-canvas");

// create WebGLRenderer
const webGLRenderer = new THREE.WebGLRenderer({
    canvas: canvas
});
webGLRenderer.setPixelRatio(window.devicePixelRatio);
export default webGLRenderer;

// todo - později by se renderu mohli předávat nějaké vlastnosti, takže to potom asi budu muset ještě nějak předělat, uvidím