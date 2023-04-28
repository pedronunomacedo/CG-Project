import { CGFobject } from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, index) {
		super(scene);
		this.index = index;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		if (this.index == 1) {
			this.vertices = [
				// front side
				0, 0, 0,	// 0
				0, -1, 0,	// 1
				1, -1.5, 0,	// 2
	
				// back side
				0, 0, 0,	// 3
				0, -1, 0,	// 4
				1, -1.5, 0,	// 5
			];
		} else {
			this.vertices = [
				// front side
				0, 0, 0,	// 0
				0, -1, 0,	// 1
				-1, -2, 0,	// 2
	
				// back side
				0, 0, 0,	// 3
				0, -1, 0,	// 4
				-1, -2, 0,	// 5
			];
		}
		

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			// front side
			0, 1, 2,
			
			// back side
			3, 5, 4, 
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
			0, 0.5, 
			0.25, 0.75,
			0.25, 0.75,
			
			0.5, 0.5,
			0.25, 0.25, 
			0.25, 0.25, 
		]

		

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

