attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix; /*matrix that deal with camera position*/
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 coords;
varying vec2 vTextureCoord;

void main() {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vTextureCoord = aTextureCoord;

	coords=vec4(aVertexPosition, 1.0);
}

