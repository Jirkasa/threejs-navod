precision mediump float;

// nadeklarování varyingu
varying float vValue;

void main() {
    // hodnotu varyingu používáme pro modrý kanál barvy
    gl_FragColor = vec4(0, 0, vValue, 1);
}