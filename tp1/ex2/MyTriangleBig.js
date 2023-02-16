import { CGFobject } from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-2, 0, 0,	// 0
			2, 0, 0,    // 1
			0, 2, 0,    // 2
		];

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			0, 1, 2, 
		];

		

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

