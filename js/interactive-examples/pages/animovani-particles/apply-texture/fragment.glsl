uniform sampler2D uTexture;

void main() {
    gl_FragColor = vec4(0, 1, 0, texture2D(uTexture, gl_PointCoord).g);
}