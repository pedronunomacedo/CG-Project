#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float ratio;
uniform vec3 color;

void main() {

    if (coords.z >= ratio){
        //Red
        gl_FragColor = vec4(color, 1.0);
    }else{
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
}