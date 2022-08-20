precision mediump float;

// uniform pro texturu
uniform sampler2D uTexture;

// UV souřadnice
varying vec2 vUv;

void main() {
    // použití barvy z textury pro fragment podle UV souřadnic
    gl_FragColor = texture2D(uTexture, vUv);
}