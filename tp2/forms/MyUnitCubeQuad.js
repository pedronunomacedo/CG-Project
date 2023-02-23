import {CGFobject} from '/lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.myQuad = new MyQuad(scene);
	}
	
	display() {
        // upper side
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // bottom side
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // left side
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // right side
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // front side
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.myQuad.display();
        this.scene.popMatrix();

        // back side
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}

