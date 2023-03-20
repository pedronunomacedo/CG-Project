import {CGFobject} from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	// 0
			0, -1, 0,	// 1
			0, 1, 0,	// 2
			1, 0, 0,    // 3

			-1, 0, 0,	// 4
			0, -1, 0,	// 5
			0, 1, 0,	// 6
			1, 0, 0		// 7
		];

		// Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.indices = [
			// front side
			0, 1, 2,
			1, 3, 2, 

			0, 2, 1, 
			1, 2, 3, 
		];

		this.normals = [
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1, 

			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1, 
		];

		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 0.5, 
			0.25, 0.75,
			
			0.5, 0.5,
			0.25, 0.25, 
		]



		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

