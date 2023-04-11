import { CGFobject } from '../../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions in both directions of the surface
 * @param stacks - minimum texture coordinate in S
*/
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        // 1) One common way to define the vertices of a sphere is to use latitude and longitude values to create points on a sphere.
        // 2) Create indices for the vertices in order to create triangles (you can use the indexing technique).
        // 3) Create buffer. After defining the vertices and indices, you need to create buffers to hold this data.
        // 4) Set up shaders.
        // 5) Render the sphere.

        this.latitudeSections = stacks * 2; // The number of stacks refer only to an hemisphere. As the globe has 2 hemisphere, we willl have a total number of (stacks * 2) as latitude. 
        this.longitudeSections = slices; // The number of slices a stack has.

		this.initBuffers();
	}

	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

        var currentMapLat = 0;
        var currentMapLong = 0;
        var mapLatConst = 1 / this.latitudeSections;
        var mapLongConst = 1 / this.longitudeSections;

        for (let lat = 0; lat <= this.latitudeSections; lat++) {
            // Angle of the stack
            let alpha = lat * (Math.PI / this.latitudeSections); // angle of the stacks
            let sinAlpha = Math.sin(alpha);
            let cosAlpha = Math.cos(alpha);
            
            currentMapLong = 0;
            for (let long = 0; long <= this.longitudeSections; long++) {
                // Angle of the slice on the stack
                let theta = long * ((2 * Math.PI) / this.longitudeSections); // angle of the slice on the stack (Remove the "*2" in order to get a hemisphere)
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                // Vertice coordinates
                let x = sinAlpha * cosTheta;
                let y = cosAlpha;
                let z = sinAlpha * ((-1) * Math.sin(theta));
                this.vertices.push(x, y, z);
                
                // Texture coordinates
                this.texCoords.push(currentMapLong, currentMapLat);

                // Indices (the last latitude and ongitude is not done)
                var currentPoint = lat * (this.longitudeSections + 1) + long; // next point on the same stack
                var nextPoint = currentPoint + (this.longitudeSections + 1); // point on the other stack
                if (lat < this.latitudeSections && long < this.longitudeSections + 1) {
                    this.indices.push(nextPoint, currentPoint, currentPoint + 1);
                    this.indices.push(nextPoint, nextPoint + 1, currentPoint + 1);
                }

                // Normals
                this.normals.push(-x, -y, -z);

                currentMapLong += mapLongConst;
            }

            currentMapLat += mapLatConst;
        }

        // Adicionar os polos da esfera (últimos vértices)
        let poleNorthIndex = this.vertices.length / 3;
        let poleSouthIndex = poleNorthIndex + 1;
        this.vertices.push(0, 1, 0); // polo norte
        this.vertices.push(0, -1, 0); // polo sul
        this.normals.push(0, 1, 0); // normal do polo norte
        this.normals.push(0, -1, 0); // normal do polo sul
        this.texCoords.push(0, 0); // coordenadas de textura do polo norte
        this.texCoords.push(0, 1); // coordenadas de textura do polo sul

		
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


