import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';


export class MyBirdEgg extends CGFobject {
	constructor(scene, xPos, yPos, zPos) {
		super(scene);

		// Bird elements
		this.sphere = new MySphere(scene, 100, 100, 1);
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;

		this.initBuffers();
		this.initMaterials();

		this.scene = scene;
	}

	initMaterials() {
		this.bodyTexture = new CGFappearance(this.scene);
		this.bodyTexture.setAmbient(3, 3, 3, 1.0);
		this.bodyTexture.setDiffuse(1, 1, 1, 1.0);
		this.bodyTexture.setSpecular(0, 0, 0, 1.0);
		this.bodyTexture.setShininess(10);
		this.bodyTexture.setTexture(new CGFtexture(this.scene, "images/egg.png"));
        this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
		this.scene.pushMatrix();
        this.bodyTexture.apply();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(0.3, 0.4, 0.3);
        this.sphere.display();
		this.scene.popMatrix();

	}
}