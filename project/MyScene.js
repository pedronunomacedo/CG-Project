import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 16, 8);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displaySphere = false;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    //------ Applied Material
    this.Material = new CGFappearance(this);
    this.Material.setAmbient(0.1, 0.1, 0.1, 1);
    this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
    this.Material.setSpecular(0.1, 0.1, 0.1, 1);
    this.Material.setShininess(10.0);
    this.Material.loadTexture('images/earth.jpg');  //TODO mudar para earth no fim de testar
    this.Material.setTextureWrap('REPEAT', 'REPEAT');
    //------

    //------ Textures
    this.textures = [
      new CGFtexture(this, 'images/earth.jpg')
    ];
    this.textureList = {
      'Earth' : 0
    };
    //-------
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
      vec3.fromValues(50, 10, 15),
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
    // update wireframe mode when the object changes
    this.Material.setTexture(this.textures[this.selectedTexture]);
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

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    if (this.displaySphere) {
      this.pushMatrix();
      this.Material.apply();
      this.sphere.display();
      this.popMatrix();
    }

    // ---- END Primitive drawing section
  }
}