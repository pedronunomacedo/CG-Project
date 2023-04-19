import {CGFobject} from '/lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
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


		var triangleAngle = (2 * Math.PI) / this.slices;
		var zPos = 1 / this.stacks;

		for (let j = 0; j <= this.stacks; j++){
			for (let i = 0; i < this.slices; i++) {
				this.vertices.push(Math.cos(triangleAngle * i), Math.sin(triangleAngle * i), j * zPos);
				this.normals.push(Math.cos(triangleAngle * i), Math.sin(triangleAngle * i), 0);
			}
		}
		
		var numPontos=this.stacks*this.slices;
		
		for (let i = 0; i < numPontos; i++){
			if((i + 1) % this.slices == 0){
				this.indices.push(i, i + 1 - this.slices, i + 1);
				this.indices.push(i, i + 1, i + this.slices);
			}
			else {
				this.indices.push(i, i + 1, i + 1 + this.slices);
				this.indices.push(i, i + 1 + this.slices, i + this.slices);
			}
		}

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

