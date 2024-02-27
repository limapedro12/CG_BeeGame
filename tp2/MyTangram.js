import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
	this.initBuffers(scene);
  }

  initBuffers(scene) {
    this.scene = scene;
    
    this.diamond = new MyDiamond(scene);

    this.triangleMed = new MyTriangle(scene);
    this.triangleSmall1 = new MyTriangleSmall(scene);
    this.triangleSmall2 = new MyTriangleSmall(scene);
    this.triangleBig1 = new MyTriangleBig(scene);
    this.triangleBig2 = new MyTriangleBig(scene);

    this.parallelogram = new MyParallelogram(scene);
  }

  display() {

    var diamondRotationMatrix = [
      Math.cos(Math.PI/12),  Math.sin(Math.PI/12), 0, 0,
      -Math.sin(Math.PI/12), Math.cos(Math.PI/12), 0, 0,
      0,                     0,                    1, 0,
      0,                     0,                    0, 1
    ];

    var diamondTranslationMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -(Math.sqrt(6)-Math.sqrt(2))/4, 2+((Math.sqrt(6)+Math.sqrt(2))/4), 0, 1
    ];

    this.scene.pushMatrix();
    this.scene.multMatrix(diamondTranslationMatrix);
    this.scene.multMatrix(diamondRotationMatrix);
    this.diamond.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.triangleBig1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
    this.triangleBig2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, 3, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    this.triangleMed.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.75, -1.75, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.triangleSmall1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2), -Math.sqrt(2), 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.5, -2.5*Math.sqrt(2), 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.triangleSmall2.display();
    this.scene.popMatrix();
  }
}
