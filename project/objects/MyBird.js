import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyDiamond } from './MyDiamond.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';


export class MyBird extends CGFobject {
	constructor(scene, xPos, yPos, zPos, direction, speed) {
		super(scene);

		// Bird elements
		this.sphere1 = new MySphere(scene, 8, 8, 1);
		this.sphere2 = new MySphere(scene, 8, 8, 1);
		this.sphere3 = new MySphere(scene, 100, 100, 1);
		this.sphere4 = new MySphere(scene, 100, 100, 1);
		this.cone1 = new MyCone(scene, 100, 100);
		//this.cone2 = new MyCone(scene, 100, 100);
		this.triangleObtuse1 = new MyTriangle(scene, 1);
		this.triangleObtuse2 = new MyTriangle(scene, 2);
		this.diamond = new MyDiamond(scene);
		this.wing = new MySphere(scene, 10, 10, 1);

		this.initBuffers();
		this.initMaterials();

		// Animation properties
		this.wingAngle = Math.PI/2;
		this.tailAngle = Math.PI/4;
		this.xPos = xPos;
		this.yPos = yPos;
		this.zPos = zPos;
		this.speed = speed;
		this.direction = direction;
		this.scene = scene;
	}

	initMaterials() {
		this.bodyTexture = new CGFappearance(this.scene);
		this.bodyTexture.setAmbient(3, 3, 3, 1.0);
		this.bodyTexture.setDiffuse(1, 1, 1, 1.0);
		this.bodyTexture.setSpecular(0, 0, 0, 1.0);
		this.bodyTexture.setShininess(10);
		this.bodyTexture.setTexture(new CGFtexture(this.scene, "images/bird/birdBody.jpg"));
		this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

		this.beakTexture = new CGFappearance(this.scene);
		this.beakTexture.setAmbient(3, 3, 3, 1.0);
		this.beakTexture.setDiffuse(1, 1, 1, 1.0);
		this.beakTexture.setSpecular(0, 0, 0, 1.0);
		this.beakTexture.setShininess(10);
		this.beakTexture.setTexture(new CGFtexture(this.scene, "images/bird/birdBeak.jpg"));
		this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

		this.eyeTexture = new CGFappearance(this.scene);
		this.eyeTexture.setAmbient(3, 3, 3, 1.0);
		this.eyeTexture.setDiffuse(1, 1, 1, 1.0);
		this.eyeTexture.setSpecular(0, 0, 0, 1.0);
		this.eyeTexture.setShininess(10);
		this.eyeTexture.setTexture(new CGFtexture(this.scene, "images/bird/birdEye.jpg"));
		this.bodyTexture.setTextureWrap('REPEAT', 'REPEAT');

		this.tailTexture = new CGFappearance(this.scene);
		this.tailTexture.setAmbient(3, 3, 3, 1.0);
		this.tailTexture.setDiffuse(1, 1, 1, 1.0);
		this.tailTexture.setSpecular(0, 0, 0, 1.0);
		this.tailTexture.setShininess(10);
		this.tailTexture.setTexture(new CGFtexture(this.scene, "images/bird/birdTail.jpg"));
	}

	display() {
		this.scene.pushMatrix();

			this.scene.translate(this.xPos, this.yPos, this.zPos);
			this.scene.rotate(-this.direction, 0, 1, 0);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.scene.rotate(-Math.PI * 0.1, 1, 0, 0);
			this.bodyTexture.apply();

			// CORPO
			this.scene.pushMatrix();
				this.scene.rotate(1/4 * Math.PI, 1, 0, 0);
				this.scene.translate(0, 1.7, 0.8);
				this.scene.scale(0.5, 0.5, 1);
				this.sphere1.display();
			this.scene.popMatrix();

			// CABECA
			this.scene.pushMatrix();
				this.scene.translate(0, 1.5, 1.2);
				this.scene.rotate(1/4*Math.PI, 1, 0, 0);
				this.scene.scale(0.3, 0.3, 0.4);
				this.sphere2.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(0.5, 0.8, 1.7);
				this.scene.rotate(Math.PI * 1/5, 1, 0, 0);
				this.scene.rotate(this.wingAngle * 7, 0, 0, 1);

				// ASA-1
				this.scene.pushMatrix();
					this.scene.scale(0.6, 0.1, 0.4);
					this.scene.rotate(Math.PI * 1/4, 1, 0, 0);
					this.wing.display();
				this.scene.popMatrix();	

				// ASA-1-2
				this.scene.pushMatrix();
					this.scene.translate(0.5, 0, 0.15);
					this.scene.rotate(-1/4 * Math.PI, 0, 1, 0);
					this.scene.scale(0.4, 0.05, 0.25);
					this.scene.rotate(Math.PI * 1/4, 1, 0, 0);
					this.wing.display();
				this.scene.popMatrix();
			this.scene.popMatrix();



			this.scene.pushMatrix();
				this.scene.translate(-0.5, 0.8, 1.7);
				this.scene.rotate(Math.PI * 1/5, 1, 0, 0);
				this.scene.rotate(-this.wingAngle * 7, 0, 0, 1);

				// ASA-1
				this.scene.pushMatrix();
					this.scene.scale(0.6, 0.1, 0.4);
					this.scene.rotate(-Math.PI * 1/4, 1, 0, 0);
					this.wing.display();
				this.scene.popMatrix();	

				// ASA-1-2
				this.scene.pushMatrix();
					this.scene.translate(-0.5, 0, 0.15);
					this.scene.rotate(1/4 * Math.PI, 0, 1, 0);
					this.scene.scale(0.4, 0.05, 0.25);
					this.scene.rotate(-Math.PI * 1/4, 1, 0, 0);
					this.wing.display();
				this.scene.popMatrix();
			this.scene.popMatrix();

			// BICO
			this.beakTexture.apply();
			this.scene.pushMatrix();
				this.scene.translate(0, 1.5, 0.9);
				this.scene.rotate(-1/2*Math.PI, 1, 0, 0);
				this.scene.scale(0.08, 0.4, 0.08);
				this.cone1.display();
			this.scene.popMatrix();

			// OLHO-1
			this.eyeTexture.apply();
			this.scene.pushMatrix();
				this.scene.translate(-0.1, 1.6, 0.9);
				//this.scene.rotate(-1/2*Math.PI, 0, 1, 0);
				this.scene.scale(0.05, 0.05, 0.05);
				this.sphere3.display();
			this.scene.popMatrix();

			// OLHO-2
			this.scene.pushMatrix();
				this.scene.translate(0.1, 1.6, 0.9);
				//this.scene.rotate(-1/2*Math.PI, 0, 1, 0);
				this.scene.scale(0.05, 0.05, 0.05);
				this.sphere4.display();
			this.scene.popMatrix();

			// CAUDA
			this.tailTexture.apply();
			this.scene.translate(0, 0.25, 2.1);
			this.scene.rotate(-1/3 * Math.PI, 1, 0, 0);
			this.scene.pushMatrix();
				// this.scene.rotate(-this.tailAngle * 7, 0, 1, 0);
				this.scene.scale(0.6, 0.6, 0.6);
				this.triangleObtuse1.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				// this.scene.rotate(this.tailAngle * 7, 0, 1, 0);
				this.scene.scale(0.6, 0.6, 0.6);
				this.triangleObtuse2.display();
			this.scene.popMatrix();

		this.scene.popMatrix();

	}

	turn(angle) {
		this.direction = (this.direction + angle) % ( 2 * Math.PI);
	}

	accelerate(speed) {
		this.speed += speed;
		if (this.speed < 0) this.speed = 0;
	}

	move() {
		this.xPos += this.speed * Math.cos(this.direction);
		this.zPos += this.speed * Math.sin(this.direction);
	}

	reset() {
		this.xPos = 0;
		this.zPos = 0;
		this.direction = 0;
		this.speed = 0;
	}
}