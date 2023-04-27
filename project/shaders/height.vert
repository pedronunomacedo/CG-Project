#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying float zOffset;

uniform sampler2D uSampler2;

void main() {
    vec4 color = texture2D(uSampler2, aTextureCoord);

    // define the altitude
    zOffset = color.b;
    vec3 newTerrainPos = 0.30 * vec3(0.0, 0.0, zOffset); // 25% of thee zOffset (altitiude of the terrain)

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + newTerrainPos, 1.0);

    vTextureCoord = aTextureCoord;
}

