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

			-2, 0, 0,	// 3
			2, 0, 0,    // 4
			0, 2, 0,    // 5
		];

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			// front side
			0, 1, 2, 

			// back side
			5, 4, 3, 
		];

		this.normals = [
			// front side
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1, 

			// back side
			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1, 
		];

		this.texCoords = [
			0, 0,
			0.25, 0.25,
			0, 0.5,

			0, 0,
			0.25, 0.25,
			0, 0.5
		]
		

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

