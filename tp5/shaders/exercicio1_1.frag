#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;

void main() {
	if (coords.y > 0.5)
		gl_FragColor = vec4(1, 1, 0, 1);
	else
		gl_FragColor = vec4(0.6,0.6,0.9, 1.0);
}