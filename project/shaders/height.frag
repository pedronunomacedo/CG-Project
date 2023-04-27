#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float zOffset;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 altimetry = texture2D(uSampler3, vec2(0, 1.0 - zOffset));

    gl_FragColor = 0.70 * color + 0.30 * altimetry;
}