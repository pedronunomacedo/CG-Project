import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyBird } from "./objects/MyBird.js";
import { MyDiamond } from "./objects/MyDiamond.js";
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
    this.bird = new MyBird(this, 0, 0, 0, 0, 0);
    //this.diamond = new MyDiamond(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = false;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.setUpdatePeriod(10);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      2.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15), // (50, 10, 15) -> You can change the value here in order to move the position of the camera (observer)
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

  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.bird.accelerate(0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
      this.bird.accelerate(-0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      keysPressed=true;
      this.bird.turn(-0.05*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      keysPressed=true;
      this.bird.turn(0.05*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text+=" R ";
      keysPressed=true;
      this.bird.reset();
    }
    if (keysPressed)
      console.log(text);
  }

  update(t) {
    this.checkKeys();

    this.bird.move();

    this.bird.yPos = Math.cos((t*this.speedFactor) / 200)/10;
    this.bird.wingAngle = (Math.PI/16 + Math.cos((t*this.speedFactor) / 200)) % Math.PI/16;
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
    
    this.pushMatrix();
    this.translate(0, 3, 0);
    this.scale(0.8, 0.8, 0.8);
    this.bird.display();
    this.popMatrix();

    // this.pushMatrix();
		// this.translate(-1.5, 0, 1);
    // this.rotate(1/2*Math.PI, 0, 1, 0);
		// this.diamond.display();
		// this.popMatrix();

		// this.pushMatrix();
		// this.translate(1.5, 0, 1);
    // this.rotate(1/2*Math.PI, 0, 1, 0);
		// this.diamond.display();
		// this.popMatrix();

    // ---- END Primitive drawing section
  }
}
