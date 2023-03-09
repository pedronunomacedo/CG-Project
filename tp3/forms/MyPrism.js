import {CGFobject} from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];		
		this.indices = []; // Counter-clockwise reference of vertices (references the one vertices, i.e. vertices indexes)
		this.normals = [];

		var angle = 0;
		var triangleAngle = (2 * Math.PI) / this.slices;
		var zPos = 1 / this.stacks;

		for (var j = 0; j < this.stacks; j++) {

			for (var i = 0; i < this.slices; i++) {
				var red = Math.cos(angle);
				var green = Math.sin(angle);
				var blue = j * zPos;

				this.vertices.push(red, green, blue); // B
				this.vertices.push(red, green, (j + 1) * zPos);
				this.vertices.push(Math.cos(angle + triangleAngle), Math.sin(angle + triangleAngle), blue);
				this.vertices.push(Math.cos(angle + triangleAngle), Math.sin(angle + triangleAngle), (j + 1) * zPos);

				var normal = [red + Math.cos(angle + triangleAngle), green + Math.sin(angle + triangleAngle), 0];


				// normalization
				var nsize=Math.sqrt(
					normal[0]*normal[0]+
					normal[1]*normal[1]+
					normal[2]*normal[2]
				);
				
				normal[0]/=nsize;
				normal[1]/=nsize;
				normal[2]/=nsize;

				// push normal once for each vertex of this triangle
				this.normals.push(...normal);
				this.normals.push(...normal);
				this.normals.push(...normal);
				this.normals.push(...normal);


				this.indices.push(i * 4 + 3 + (j * 4 * this.slices), i * 4 + (j * 4 * this.slices), i * 4 + 2 + (j * 4 * this.slices));
				this.indices.push(i * 4 + (j * 4 * this.slices), i * 4 + 3 + (j * 4 * this.slices), i * 4 + 1 + (j * 4 * this.slices));

				angle += triangleAngle; // next angle
			}
		}

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

