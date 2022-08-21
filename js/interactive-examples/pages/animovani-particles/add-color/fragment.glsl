uniform sampler2D uTexture;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, texture2D(uTexture, gl_PointCoord).g);
}