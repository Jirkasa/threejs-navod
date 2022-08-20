// matice, které můžeme použít k transformaci vertexu
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// atribut obsahující pozici vertexu
attribute vec3 position;

// funkce main se spouští pro každý vertex geometrie
void main() {
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // posunutí vertexu směrem nahoru
    modelPosition.y += 1.0;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}