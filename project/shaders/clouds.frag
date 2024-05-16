#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
    vec4 color;

	vec4 panorama = texture2D(uSampler, vTextureCoord);
	vec4 clouds = texture2D(uSampler2, vTextureCoord+vec2(0.0025*timeFactor, 0.0));

    float cloudAlpha = clouds[3];

    color = (1.0 - cloudAlpha)*panorama + cloudAlpha*clouds;

	gl_FragColor = color;
}
