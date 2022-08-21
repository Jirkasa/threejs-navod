uniform float uPixelRatio;

attribute vec3 color;

// varying pro předání barvy vertexu do fragment shaderu
varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // nastavení velikosti vertexu
    gl_PointSize = (200.0 * uPixelRatio) / -viewPosition.z;

    // předání barvy vertexu do fragment shaderu
    vColor = color;
}