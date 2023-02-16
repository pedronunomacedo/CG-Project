import { CGFobject } from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	// 0
            1, 0, 0,    // 1
            2, 0, 0,    // 2
			1, 1, 0,	// 3
			3, 1, 0,	// 4
            2, 0, 0,    // 5
		];

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			1, 3, 0, 
            2, 3, 1, 
            2, 4, 3, 
            2, 5, 4, 
		];

		

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

