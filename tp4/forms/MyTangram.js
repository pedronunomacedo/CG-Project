import { CGFobject, CGFappearance, CGFtexture } from '/lib/CGF.js';
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
        
    }

    display() {
        var m = [
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            0, 1, 0, 1, 
        ];

        
        this.scene.myTrangramMaterial.apply();
        
        this.scene.pushMatrix();
        this.scene.multMatrix(m);
        // this.scene.customMaterial.apply(); // apply of color
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1, 0, 0)
        this.mytrianglesmall.
            updateTexCoords([
                0, 0,
                0.25, 0.25,
                0, 0.5,

                0, 0,
                0.25, 0.25,
                0, 0.5]
            )
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.mytrianglebig.
            updateTexCoords([
                1, 1, 
                0.5, 0.5, 
                1, 0, 

                1, 1, 
                0.5, 0.5, 
                1, 0]
            )
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.mytrianglebig.
            updateTexCoords([
                0, 0, 
                1, 0, 
                0.5, 0.5, 

                0, 0, 
                1, 0, 
                0.5, 0.5]
            )
        this.mytrianglebig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -Math.sqrt(2), 0);
        this.scene.rotate(5/4*Math.PI, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0)
        this.mytrianglesmall.
            updateTexCoords([
                0.25, 0.75, 
                0.75, 0.75, 
                0.5, 0.5, 

                0.25, 0.75, 
                0.75, 0.75, 
                0.5, 0.5]
            )
        this.mytrianglesmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
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

