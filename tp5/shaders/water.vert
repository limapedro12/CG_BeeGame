attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 filter = texture2D(uSampler2, aTextureCoord + vec2(0.01*timeFactor, 0.01*timeFactor));
	vec3 offset = vec3(0, 0, 0.06 * filter.b);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}


