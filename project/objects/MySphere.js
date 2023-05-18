import { CGFobject } from '../../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
     * @param  {integer} side - visible side of the sphere (0 -> inside, 1 -> outside)
     */
    constructor(scene, slices, stacks, side) {
      super(scene);
      this.latDivs = stacks * 2;
      this.longDivs = slices;
      this.side = side;
  
      this.initBuffers();
    }
  
    /**
     * @method initBuffers
     * Initializes the sphere buffers
     */
    initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
  
      var phi = 0;
      var theta = 0;
      var phiInc = Math.PI / this.latDivs;
      var thetaInc = (2 * Math.PI) / this.longDivs;
      var latVertices = this.longDivs + 1;
  
      var longD = 1 / this.longDivs;
      var latD = 1 / this.latDivs;
  
      // build an all-around stack at a time, starting on "north pole" and proceeding "south"
      for (let latitude = 0; latitude <= this.latDivs; latitude++) {
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);
  
        // in each stack, build all the slices around, starting on longitude 0
        theta = 0;
        for (let longitude = 0; longitude <= this.longDivs; longitude++) {
          // Vertices coordinates
          var x = Math.cos(theta) * sinPhi;
          var y = cosPhi;
          var z = Math.sin(-theta) * sinPhi;
          this.vertices.push(x, y, z);
  
          // Indices
          if (latitude < this.latDivs && longitude < this.longDivs) {
            var current = latitude * latVertices + longitude;
            var next = current + latVertices; 
  
            this.indices.push(current + 1, current, next);
            this.indices.push(current + 1, next, next + 1);
          }
  
          // Normals
          this.normals.push(x, y, z);
          theta += thetaInc;
  
          // Texture Coordinates
          var tu = 0.25 + longD * longitude;
          var tv = latD * latitude;
          this.texCoords.push(tu, tv);
        }
        
        phi += phiInc;
      }
  
      if (this.side == 0) {
        this.vertices.reverse();
        this.normals.reverse();
        this.normals = this.normals.map(x => x * (-1));
        this.texCoords = this.texCoords.map(x => x * (-1));
      }
  
      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
    }
  }
