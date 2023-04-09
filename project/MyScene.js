import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MySphere } from "./objects/MySphere.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.selectedTexture = 0;
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.enableTextures(true);

    //------ Textures
    this.textures = [
      new CGFtexture(this, 'images/earth.jpg'), 
      new CGFtexture(this, 'images/panorama.jpg')
    ];
    this.textureList = {
      'Earth' : 0, 
      'Panorama' : 1
    };
    //-------

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 16, 8);
    this.panorama = new MyPanorama(this, this.textures[this.selectedTexture]);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = false;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(110, 110, 110), // (50, 10, 15) -> You can change the value here in order to move the position of the camera (observer)
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  onSelectedTextureChanged(v) {
    this.panorama.setTexture(this.textures[this.selectedTexture]);
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
    this.setDefaultAppearance();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0,-100,0);
      this.scale(400,400,400);
      this.rotate(-Math.PI/2.0,1,0,0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displaySphere) {
      this.pushMatrix();
      this.appearance.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      this.pushMatrix();
      this.panorama.display();
      this.popMatrix();
    }

    // ---- END Primitive drawing section
  }
}
