import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./forms/MyDiamond.js";
import { MyTriangle } from "./forms/MyTriangle.js";
import { MyParallelogram } from "./forms/MyParallelogram.js";
import { MyTriangleSmall } from "./forms/MyTriangleSmall.js";
import { MyTriangleBig } from "./forms/MyTriangleBig.js";
 
/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.mytrianglesmall = new MyTriangleSmall(this);
    this.mytrianglebig = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.showDiamond = true;
	  this.showTriangle = true;
    this.showParallelogram = true;
    this.showTriangleSmall = true;
    this.showTriangleBig = true;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    var m = [
      1, 0, 0, 0, 
      0, 1, 0, 0, 
      0, 0, 1, 0, 
      0, 1, 0, 1, 
    ];

    this.multMatrix(sca);

    if (this.showDiamond) {
      this.pushMatrix();
      this.multMatrix(m);
      this.diamond.display();
      this.popMatrix();
    }

    if (this.showTriangleSmall) {
      this.pushMatrix();
      this.translate(1, 0, 0)
      this.mytrianglesmall.display();
      this.popMatrix();
    }
    
    if (this.showTriangleBig) {
      this.pushMatrix();
      this.translate(-2, 0, 0)
      this.mytrianglebig.display();
      this.popMatrix();
    }

    if (this.showTriangleBig) {
      this.pushMatrix();
      this.rotate(Math.PI, 0, 0, 1);
      this.mytrianglebig.display();
      this.popMatrix();
    }

    if (this.showTriangle) {
      this.pushMatrix();
      this.translate(2, -Math.sqrt(2), 0);
      this.rotate(5/4*Math.PI, 0, 0, 1);
      this.triangle.display();
      this.popMatrix();
    }

    if (this.showTriangleSmall) {
      this.pushMatrix();
      this.translate(0, -3, 0)
      this.mytrianglesmall.display();
      this.popMatrix();
    }

    if (this.showParallelogram) {
      this.pushMatrix();
      // this.translate(0, 0, 0);
      this.translate(2-Math.sqrt(2), -Math.sqrt(2), 0);
      this.rotate(Math.PI, 1, 0, 0);
      // this.scale(-1, 0, 0);
      this.parallelogram.display();
      this.popMatrix();
    }

    // ---- BEGIN Primitive drawing section

    // if (this.showDiamond) this.diamond.display();
    // if (this.showTriangle) this.triangle.display(); 
    // if (this.showParallelogram) this.parallelogram.display();
    // if (this.showTriangleSmall) this.mytrianglesmall.display();
    // if (this.showTriangleBig) this.mytrianglebig.display();

    // ---- END Primitive drawing section
  }
}
