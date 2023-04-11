import { CGFobject } from '../../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions in both directions of the surface
 * @param stacks - minimum texture coordinate in S
*/
export class MyBird extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.latitudeSections = stacks * 2; // The number of stacks refer only to an hemisphere. As the globe has 2 hemisphere, we willl have a total number of (stacks * 2) as latitude. 
        this.longitudeSections = slices; // The number of slices a stack has.

		this.initBuffers();
	}

	initBuffers() {
		// Generate vertices, normals, and texCoords
		
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	setFillMode() { 
		this.primitiveType = this.scene.gl.TRIANGLES;
	}

	setLineMode() { 
		this.primitiveType = this.scene.gl.LINE_STRIP;
	};
}


