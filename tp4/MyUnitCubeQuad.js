import {CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, top_tex, front_tex, right_tex, back_tex, left_tex, bottom_tex) {
    super(scene);
	  this.initBuffers(scene);

    this.topTexture = new CGFtexture(scene, top_tex);
    this.frontTexture = new CGFtexture(scene, front_tex);
    this.rightTexture = new CGFtexture(scene, right_tex);
    this.backTexture = new CGFtexture(scene, back_tex);
    this.leftTexture = new CGFtexture(scene, left_tex);
    this.bottomTexture = new CGFtexture(scene, bottom_tex);
  }

  initBuffers(scene) {
    this.scene = scene;
    
    this.quad = new MyQuad(scene);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.frontTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.translate(0, 0, 0.5);
    this.backTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 1, 0, 0);
    this.scene.translate(0, 0, 0.5);
    this.bottomTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.translate(0, 0, 0.5);
    this.topTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.scene.translate(0, 0, 0.5);
    this.leftTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.scene.translate(0, 0, 0.5);
    this.rightTexture.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display();
    this.scene.popMatrix();
  }
}
