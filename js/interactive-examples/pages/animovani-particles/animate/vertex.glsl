uniform float uPixelRatio;

attribute vec3 color;

varying vec3 vColor;

// uběhnutý čas od startu aplikace
uniform float uElapsedTime;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;

    // změna pozice na ose X podle uběhnutého
    // času a pozice částice na ose Y
    viewPosition.x += sin(uElapsedTime+modelPosition.y);

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    gl_PointSize = (200.0 * uPixelRatio) / -viewPosition.z;

    vColor = color;
}