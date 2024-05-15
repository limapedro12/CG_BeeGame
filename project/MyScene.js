import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyGarden } from "./MyGarden.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee/MyBee.js";
import { MyHive } from "./MyHive/MyHive.js";

/*
.setUpdatePedtiod(50)
MyScene.update(t) {
  bee.update(t)
}

MyBee.update(t) {
  dy = v dt;
  ...
  Ltime = t;
}

construtor() {
  variaveiis
  estadoInicial
}

display() {
  translate(posI + Deltapos)
}

*/

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

    this.setUpdatePeriod(50);

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama.jpg"));
    this.garden = new MyGarden(this, 5, 5);
    this.rockset = new MyRockSet(this, 54, 5);
    this.bee = new MyBee(this, 1, 0, 0, 0, 0, [0, 0]);
    this.hive = new MyHive(this);

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.displayNormals = false;
    this.speedFactor = 1;
    this.scaleFactor = 1;
    this.gardenLins = 5;
    this.gardenCols = 5;
    this.enableAnimation = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(1, 1, 1, 1.0);
    this.appearance.setDiffuse(1, 1, 1, 1.0);
    this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
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
      vec3.fromValues(-50, -45, 10),
      vec3.fromValues(0, -55, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
      this.bee.accelerate(this.speedFactor*0.1);
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      this.bee.accelerate(this.speedFactor*(-0.1));
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      keysPressed = true;
      this.bee.turn(this.speedFactor*0.1);
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      keysPressed = true;
      this.bee.turn(this.speedFactor*(-0.1));
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.bee.reset();
    }
  }
  update(t) {
    this.checkKeys();
    if (this.enableAnimation) this.bee.update(t);
    this.grassFloor.update(t);

    this.grassShader.setUniformsValues({ timeFactor: t / 100 % 100 });
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

    // if (this.displayNormals)
    //   this.panorama.enableNormalViz();
    // else
    //   this.panorama.disableNormalViz();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-75,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.panorama.display();

    this.pushMatrix();
    this.translate(25, -75, -50);
    this.rockset.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(40,-75+this.garden.maxHeight,0);
    this.garden.setLines(this.gardenLins);
    this.garden.setCols(this.gardenCols);
    this.garden.display();
    this.popMatrix();

    this.setActiveShader(this.grassShader);
    this.pushMatrix();
    this.translate(0, -75, 0);
    this.grassFloor.display();
    this.popMatrix();
    this.setActiveShader(this.defaultShader);

    // The bee should be the last element to be drawn!
    this.pushMatrix();
    this.translate(0, -47 + this.bee.height/2, 0);
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();

    // ---- END Primitive drawing section

    this.pushMatrix();
    this.translate(28, this.rockset.get_height() - 50, -47);
    this.rotate(Math.PI/2, 0, 1, 0);
    this.hive.display()
    this.popMatrix();
  }
}
