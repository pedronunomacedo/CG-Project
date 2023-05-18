import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyHemisphere } from './MyHemisphere.js';

export class MyBirdEgg extends CGFobject {
	constructor(scene, id, xPos, yPos, zPos, index) {
		super(scene);

		// Bird elements
		this.hemisphere = new MyHemisphere(scene, 100, 100);
		this.id = id;

        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
		this.speed = 0;

		this.eggIndex = index;

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
		this.bodyTexture.setTexture(new CGFtexture(this.scene, "images/eggs/egg" + this.eggIndex + ".png"));
        this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
		this.scene.pushMatrix();
			this.bodyTexture.apply();
			this.scene.translate(this.xPos, this.yPos, this.zPos);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.scene.scale(0.5, 0.5, 0.55);
			// this.sphere.display();
			this.hemisphere.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.bodyTexture.apply();
			this.scene.translate(this.xPos, this.yPos, this.zPos);
			this.scene.rotate(Math.PI / 2, 1, 0, 0);
			this.scene.scale(0.5, 0.5, 0.7);
			// this.sphere.display();
			this.hemisphere.display();
		this.scene.popMatrix();
	}

	move() {
		
	}
}