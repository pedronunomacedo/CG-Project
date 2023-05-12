import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyBird } from "./objects/MyBird.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MySphere } from "./objects/MySphere.js";
import { MyBirdEgg } from "./objects/MyBirdEgg.js";
import { MyNest } from "./objects/MyNest.js";


/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.selectedTexture = 1;
    this.selectedExampleShader = 0;
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

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.sphere = new MySphere(this, 16, 8, 0);
    this.panorama = new MyPanorama(this, this.textures[this.selectedTexture]);
    this.bird = new MyBird(this, 20, -20, 70, 0, 0, [0, 0.256, 1]); // in the same z as the first egg
    this.nest = new MyNest(this, 20, -51.3, 55); // y = -51.3

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = true;
    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayBird = true;
    this.displayEggs = true;
    this.displayNest = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.enableTextures(true);

    
    // Textures
    this.texture = new CGFtexture(this, "images/terrain.jpg");
		this.texture2 = new CGFtexture(this, "images/heightmap.jpg");
		this.texture3 = new CGFtexture(this, "images/altimetry.png");

    // Appearance
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    // Shaders
    this.testShaders = [
			new CGFshader(this.gl, "shaders/height.vert", "shaders/height.frag"),
		];
    this.testShaders[0].setUniformsValues({ uSampler2: 1 , uSampler3: 2});

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
      1.5,
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
      text += " W ";
      keysPressed=true;
      this.bird.accelerate(0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed=true;
      this.bird.accelerate(-0.01*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed=true;
      this.bird.turn(-0.05*this.speedFactor);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed=true;
      this.bird.turn(0.05*this.speedFactor);
    }

    if (!this.bird.picking) {
      if (this.gui.isKeyPressed("KeyP")) { // bir must go down until it hits the floor
        text += " P ";
        keysPressed = true;
        this.bird.picking = true;
        this.bird.down = true;
        this.bird.getDown();
      }
    }

    if (this.bird.picking) {
      this.bird.getDown();
    }
    
    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      keysPressed=true;
      this.bird.reset();
      this.nest.reset();
    }
    
    if (this.bird.catchedEgg != null) {
      if (this.gui.isKeyPressed("KeyO")) { // let go the catched egg
        text += " O ";
        keysPressed = true;
        console.log("nestCoordinates: [" + this.nest.xPos + ", " + this.nest.yPos + ", " + this.nest.zPos + "]");
        console.log("birdCoordinates: [" + this.bird.xPos + ", " + this.bird.yPos + ", " + this.bird.zPos + "]");
        if ((this.bird.xPos >= this.nest.xPos - 4.7 && this.bird.xPos <= this.nest.xPos + 4.7) && (this.bird.zPos >= this.nest.zPos - 4.7 && this.bird.zPos <= this.nest.zPos + 4.7)) {
          this.bird.picking = false;
          this.bird.dropping = true;
          console.log("Going to dropEgg() function!");
        }
      }
    }

    if (this.bird.dropping) {
      this.dropEgg();
    }
    
    if (keysPressed) {
      console.log(text);
    }
  }

  dropEgg() {
    console.log("On dropEgg() function!");
    console.log("catchedEgg.yPos = " + this.bird.catchedEgg.yPos);
    console.log("nest.yPos = " + this.nest.yPos);
    if (this.bird.catchedEgg.yPos > this.nest.yPos) {
      this.bird.catchedEgg.yPos -= ((-this.bird.terrainY) - (-this.bird.initialY)) / 60;
      this.bird.catchedEgg.display();
    } else { // on the nest
      this.nest.catchedEggs.push(this.bird.catchedEgg);
      this.bird.dropping = false;
      this.bird.catchedEgg = null;
    }
	}

  update(t) {
    this.checkKeys();

    this.bird.move();
    // this.bird.yPos = Math.cos((t*this.speedFactor) / 200) / 5;
    this.bird.wingAngle = (Math.PI/16 + Math.cos((t*this.speedFactor) / 200)) % Math.PI/16;
    this.bird.tailAngle = (Math.PI/16 + Math.cos((t*this.speedFactor) / 200)) % Math.PI/16;
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

    // bind additional texture to textures unit
		this.texture2.bind(1);
		this.texture3.bind(2);

    this.setActiveShader(this.testShaders[0]);
    this.appearance.apply();
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

    this.setActiveShader(this.defaultShader);

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
    
    if (this.displayBird) {
      this.pushMatrix();
      this.bird.display();
      this.popMatrix();
    }

    if (this.displayNest) {
      this.pushMatrix();
      this.nest.display();
      this.popMatrix();
    }


    // ---- END Primitive drawing section
  }
}
