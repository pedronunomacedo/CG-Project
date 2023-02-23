import { CGFobject } from '/lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.mytrianglesmall = new MyTriangleSmall(scene);
        this.mytrianglebig = new MyTriangleBig(scene);
	}

    display() {
        var m = [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            0, 1, 0, 1, 
        ];

        
        this.scene.pushMatrix();
        this.scene.multMatrix(m);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0)
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0)
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -Math.sqrt(2), 0);
        this.scene.rotate(5/4*Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0)
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}

