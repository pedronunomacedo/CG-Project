import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyDiamond } from './MyDiamond.js';
import { MySphere } from './MySphere.js';
import { MyTriangPrism } from './MyTriangPrism.js';



export class MyBird extends CGFobject {
	constructor(scene, xPos, yPos, zPos, direction, speed) {
		super(scene);

		//this.cilinder = new MyCylinder(scene, 100, 100);
		this.sphere1 = new MySphere(scene, 8, 8);
		this.sphere2 = new MySphere(scene, 8, 8);
		this.sphere3 = new MySphere(scene, 100, 100);
		this.sphere4 = new MySphere(scene, 100, 100);
		this.cone1 = new MyCone(scene, 100, 100);
		this.cone2 = new MyCone(scene, 100, 100);
		this.diamond = new MyDiamond(scene);
		this.triangPrism = new MyTriangPrism(scene);

		this.initBuffers();

		this.color = new CGFappearance(scene);
        this.color.setAmbient(1, 1, 1, 1.0);
        this.color.setDiffuse(0.8, 0.6, 0.5, 1.0);
        this.color.setSpecular(0, 0, 0, 1.0);
        this.color.setShininess(10.0);

		this.wingAngle = Math.PI/8;

		this.xPos = 0;
		this.yPos = 0;
		this.zPos = 0;
		this.speed = speed;
		this.direction = direction;
	}

	display() {
		this.color.apply();

		// CORPO
		this.scene.pushMatrix();
		this.scene.rotate(1/4*Math.PI, 1, 0, 0);
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

		// OLHO-1
		this.scene.pushMatrix();
		this.scene.translate(-0.1, 1.6, 0.9);
		this.scene.scale(0.05, 0.05, 0.05);
		this.sphere3.display();
		this.scene.popMatrix();

		// OLHO-2
		this.scene.pushMatrix();
		this.scene.translate(0.1, 1.6, 0.9);
		this.scene.scale(0.05, 0.05, 0.05);
		this.sphere4.display();
		this.scene.popMatrix();

		// BICO
		this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0.9);
		this.scene.rotate(-1/2*Math.PI, 1, 0, 0);
		this.scene.scale(0.08, 0.4, 0.08);
		this.cone1.display();
		this.scene.popMatrix();

		// CAUDA
		this.scene.pushMatrix();
		this.scene.translate(0, 0.4, 2);
		this.scene.rotate(3/5*Math.PI, 1, 0, 0);
		this.scene.scale(0.4, 1, 0.45);
		this.cone2.display();
		this.scene.popMatrix();

		// ASA-1
		this.scene.pushMatrix();
		this.scene.translate(0.6, 0.8, 1.7);
		this.scene.rotate(1/4*Math.PI, 1, 0, 0);
		this.scene.scale(0.9, 0.2, 0.9);
		this.scene.rotate(1/2*Math.PI, 1, 0, 0);
		this.triangPrism.display();
		this.scene.popMatrix();

		// ASA-2
		this.scene.pushMatrix();
		this.scene.translate(-0.6, 0.8, 1.7);
		this.scene.rotate(1/4*Math.PI, 1, 0, 0);
		this.scene.scale(0.9, 0.2, 0.9);
		this.scene.rotate(-1/2*Math.PI, 0, 1, 0);
		this.scene.rotate(1/2*Math.PI, 1, 0, 0);
		this.triangPrism.display();
		this.scene.popMatrix();

		// ASA-1-2
		this.scene.pushMatrix();
		this.scene.translate(1.2, 0.65, 1.9);
		this.scene.rotate(1/4*Math.PI, 1, 0, 0);
		this.scene.rotate(1/4*Math.PI, 0, 1, 0);
		this.scene.scale(-0.6, 0.2, 1.2);
		this.scene.rotate(1/2*Math.PI, 1, 0, 0);
		this.triangPrism.display();
		this.scene.popMatrix();

		// ASA-2-2
		this.scene.pushMatrix();
		this.scene.scale(-1, 1, 1);
		this.scene.translate(1.2, 0.65, 1.9);
		this.scene.rotate(1/4*Math.PI, 1, 0, 0);
		this.scene.rotate(1/4*Math.PI, 0, 1, 0);
		this.scene.scale(-0.6, 0.2, 1.2);
		this.scene.rotate(1/2*Math.PI, 1, 0, 0);
		this.triangPrism.display();
		this.scene.popMatrix();

	}

	turn(angle) {
		this.direction = (this.direction + angle) % ( 2 * Math.PI);
	}

	accelerate(speed) {
		this.speed += speed;
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


