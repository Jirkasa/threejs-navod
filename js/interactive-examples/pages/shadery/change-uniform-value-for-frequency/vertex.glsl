uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

varying float vValue;

// deklarování uniform
uniform float uFrequency;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // získání hodnoty podle pozice vertexu na ose X a Y
    float value = abs(sin(modelPosition.x * uFrequency) * sin(modelPosition.y * uFrequency));
    // nastavení získané hodnoty pro pozici na ose Z
    modelPosition.z = value;

    // uložení získané hodnoty do varying
    vValue = value;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}