import {CGFobject} from '/lib/CGF.js';

/**
 * MyTriangPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangPrism extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, 0.5, 0.5,	   // 0
			-0.5, -0.5, 0.5,   // 1
			0.5, -0.5, 0.5,    // 2

			0.5, -0.5, -0.5,   // 3
			-0.5, -0.5, -0.5,  // 4
			-0.5, 0.5, -0.5,   // 5
		];

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			// front face
			0, 1, 2,  

			// back face
			3, 4, 5,

			// left side
			4, 1, 0,
			4, 0, 5,

			// bottom side
			2, 1, 4,
			2, 4, 3,

			// upper side
			0, 2, 3,
			3, 5, 0,
		];

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

