// uniform pro texturu
uniform sampler2D uTexture;

// UV souřadnice
varying vec2 vUv;

void main() {
    // // použití barvy z textury pro fragment podle UV souřadnic
    // gl_FragColor = texture2D(uTexture, vUv);

    float strength = mod(vUv.y * 10.0, 1.0);
    gl_FragColor = vec4(vec3(strength), 1.0);
}