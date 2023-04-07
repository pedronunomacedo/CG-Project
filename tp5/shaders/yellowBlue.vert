#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;
varying vec4 coords;
varying vec4 normal;
uniform float timeFactor;
varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

varying float filterYCord;


void main() {

  // vTextureCoord = aTextureCoord;
  vec3 offset=vec3(0.0,0.0,0.0);

  // if (texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord).b > 0.5)
  // offset=aVertexNormal*normScale*0.1*sin(timeFactor);
  offset.x = normScale * sin(timeFactor);

  vec4 vertex=vec4(aVertexPosition + offset, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

  filterYCord = gl_Position.y;
}
