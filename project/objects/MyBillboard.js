import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
        
        this.quad = new MyQuad(scene);
        this.textures = [];
        this.numTextures = 6;
        
        for (var i = 1; i <= this.numTextures; i++) {
            var texture = new CGFappearance(scene);
            texture.setTexture(new CGFtexture(scene, "images/trees/billboard" + i + ".png"))
            texture.setTextureWrap('REPEAT', 'REPEAT');
            texture.setAmbient(1, 1, 1, 1.0);
            texture.setDiffuse(1, 1, 1, 1.0);
            this.textures.push(texture);
        }
	}

    
	display(x, y, z, textureToApply = 0) {
        const toCamera = vec3.sub(vec3.create(), this.scene.camera.position, [x, y, z]);
        vec3.normalize(toCamera, toCamera);

        const rotationAngle = Math.acos(vec3.dot([0, 0, 1], toCamera));

        const rotationAxis = vec3.cross(vec3.create(), [0, 0, 1], toCamera);
        vec3.normalize(rotationAxis, rotationAxis);

        this.textures[textureToApply].apply();

        this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.scene.rotate(rotationAngle, 0, rotationAxis[1], 0);
            this.scene.scale(12, 12, 12);
            this.quad.display();
        this.scene.popMatrix();
	}
}