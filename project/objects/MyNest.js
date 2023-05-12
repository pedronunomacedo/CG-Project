import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyHemisphere } from './MyHemisphere.js';

export class MyNest extends CGFobject {
	constructor(scene, xPos, yPos, zPos) {
		super(scene);

		// Bird elements
		this.hemisphere = new MyHemisphere(scene, 100, 100);

        this.xPos = xPos; // 20
        this.yPos = yPos; // -51.3
        this.zPos = zPos; // 55
		this.catchedEggs = [];
		this.eggsPositions = [[this.xPos, this.yPos, this.zPos], [this.xPos - 6, this.yPos - 2, this.zPos - 6], [this.xPos - 4, this.yPos - 2, this.zPos], [this.xPos - 2, this.yPos - 2, this.zPos - 1]];

		this.initBuffers();
		this.initMaterials();

		this.scene = scene;
	}

	initMaterials() {
		this.texture = new CGFappearance(this.scene);
		this.texture.setAmbient(3, 3, 3, 1.0);
		this.texture.setDiffuse(1, 1, 1, 1.0);
		this.texture.setSpecular(0, 0, 0, 1.0);
		this.texture.setShininess(10);
		this.texture.setTexture(new CGFtexture(this.scene, "images/nest.png"));
        this.texture.setTextureWrap('REPEAT', 'REPEAT');
	}

	display() {
		this.scene.pushMatrix();
			this.texture.apply();
			this.scene.translate(this.xPos, this.yPos, this.zPos);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(5, 5, 3);
			this.hemisphere.display();
		this.scene.popMatrix();
	}

	reset() {
		this.catchedEggs = [];
	}
}