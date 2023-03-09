import { CGFobject, CGFappearance } from '/lib/CGF.js';
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
        this.initMaterials(this.scene);
		this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.mytrianglesmall = new MyTriangleSmall(scene);
        this.mytrianglebig = new MyTriangleBig(scene);
	}

    initMaterials(scene) {
        // Green color
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0, 1.0, 0, 1.0);
        this.green.setDiffuse(0, 1.0, 0, 1.0);
        this.green.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.green.setShininess(10.0);

        // Pink color
        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1*0.7, 0.714*0.7, 0.757*0.7, 1.0);
        this.pink.setDiffuse(1*0.7, 0.714*0.7, 0.757*0.7, 1.0);
        this.pink.setSpecular(1, 1, 1, 0);
        this.pink.setShininess(10.0);

        // yellow color
        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1*0.7, 1*0.7, 0, 1.0);
        this.yellow.setDiffuse(1*0.7, 1*0.7, 0, 1.0);
        this.yellow.setSpecular(1, 1, 1, 0);
        this.yellow.setShininess(10.0);

        // red color
        this.red = new CGFappearance(scene);
        this.red.setAmbient(1*0.7, 0, 0, 1.0);
        this.red.setDiffuse(1*0.7, 0, 0, 1.0);
        this.red.setSpecular(1, 1, 1, 0);
        this.red.setShininess(10.0);

        // purple color
        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(0.58*0.7, 0, 0.827*0.7, 1.0);
        this.purple.setDiffuse(0.58*0.7, 0, 0.827*0.7, 1.0);
        this.purple.setSpecular(1, 1, 1, 1.0);
        this.purple.setShininess(10.0);

        // Blue color
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0, 0.749*0.7, 1*0.7, 1.0);
        this.blue.setDiffuse(0, 0.749*0.7, 1*0.7, 1.0);
        this.blue.setSpecular(1, 1, 1, 1.0);
        this.blue.setShininess(10.0);

        // orange color
        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(1*0.7, 0.647*0.7, 0, 1.0);
        this.orange.setDiffuse(1*0.7, 0.647*0.7, 0, 1.0);
        this.orange.setSpecular(1, 1, 1, 0);
        this.orange.setShininess(10.0);
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
        this.scene.customMaterial.apply(); // apply of color
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0)
        this.purple.apply(); // apply of color
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.orange.apply(); // apply of color
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.blue.apply(); // apply of color
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -Math.sqrt(2), 0);
        this.scene.rotate(5/4*Math.PI, 0, 0, 1);
        this.pink.apply(); // apply of color
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0)
        this.red.apply(); // apply of color
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.yellow.apply(); // apply of color
        this.parallelogram.display();
        this.scene.popMatrix();
    }

    initBuffers() {
        this.diamond.initBuffers();
        this.triangle.initBuffers();
        this.parallelogram.initBuffers();
        this.mytrianglesmall.initBuffers();
        this.mytrianglebig.initBuffers();
    }

    initNormalVizBuffers() {
        this.diamond.initNormalVizBuffers();
        this.triangle.initNormalVizBuffers();
        this.parallelogram.initNormalVizBuffers();
        this.mytrianglesmall.initNormalVizBuffers();
        this.mytrianglebig.initNormalVizBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.mytrianglesmall.enableNormalViz();
        this.mytrianglebig.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.mytrianglesmall.disableNormalViz();
        this.mytrianglebig.disableNormalViz();
    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

