
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float randomFactor;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
	vec3 offset=vec3(0.0,0.0, aVertexPosition[1] * aVertexPosition[1] * 0.1 * (randomFactor*0.1 + sin(timeFactor*0.1)*0.1));

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

