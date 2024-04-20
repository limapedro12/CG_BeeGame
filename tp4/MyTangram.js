import {CGFappearance, CGFobject} from '../lib/CGF.js';
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
    this.initMaterials();
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

    this.triangleBig1.setTexCoords([0,0, 0.5,0.5, 1,0]);
    this.triangleBig2.setTexCoords([1,0, 0.5,0.5, 1,1]);
    this.triangleSmall1.setTexCoords([0.25,0.75, 0.5,0.5, 0.75,0.75]);
    this.triangleSmall2.setTexCoords([0,0, 0,0.5, 0.25,0.25]);

    this.diamond.initBuffers()
    this.triangleMed.initBuffers();
    this.triangleSmall1.initBuffers();
    this.triangleSmall2.initBuffers();
    this.triangleBig1.initBuffers();
    this.triangleBig2.initBuffers();

    this.parallelogram.initBuffers();
  }

  initMaterials() {
    this.diamondMaterial = new CGFappearance(this.scene);
    this.diamondMaterial.setAmbient(0, 0, 0, 1.0);
    this.diamondMaterial.setDiffuse(0, 1, 0, 1.0);
    this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.diamondMaterial.setShininess(10.0);

    this.triangleMedMaterial = new CGFappearance(this.scene);
    this.triangleMedMaterial.setAmbient(0, 0, 0, 1.0);
    this.triangleMedMaterial.setDiffuse(1, 156/255, 210/255, 1.0);
    this.triangleMedMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleMedMaterial.setShininess(10.0);

    this.triangleSmall1Material = new CGFappearance(this.scene);
    this.triangleSmall1Material.setAmbient(0, 0, 0, 1.0);
    this.triangleSmall1Material.setDiffuse(1, 20/255, 20/255, 1.0);
    this.triangleSmall1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleSmall1Material.setShininess(10.0);

    this.triangleSmall2Material = new CGFappearance(this.scene);
    this.triangleSmall2Material.setAmbient(0, 0, 0, 1.0);
    this.triangleSmall2Material.setDiffuse(170/255, 79/255, 194/255, 1.0);
    this.triangleSmall2Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleSmall2Material.setShininess(10.0);
    
    this.triangleBig1Material = new CGFappearance(this.scene);
    this.triangleBig1Material.setAmbient(0, 0, 0, 1.0);
    this.triangleBig1Material.setDiffuse(0, 156/255, 1, 1.0);
    this.triangleBig1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleBig1Material.setShininess(10.0);
    
    this.triangleBig2Material = new CGFappearance(this.scene);
    this.triangleBig2Material.setAmbient(0, 0, 0, 1.0);
    this.triangleBig2Material.setDiffuse(1, 156/255, 0, 1.0);
    this.triangleBig2Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleBig2Material.setShininess(10.0);
    
    this.parallelogramMaterial = new CGFappearance(this.scene);
    this.parallelogramMaterial.setAmbient(0, 0, 0, 1.0);
    this.parallelogramMaterial.setDiffuse(1, 1, 0, 1.0);
    this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.parallelogramMaterial.setShininess(10.0);
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
    // this.diamondMaterial.apply();
    this.diamond.display();
    this.scene.popMatrix();
    
    this.scene.pushMatrix();
    this.scene.translate(0, 2, 0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    // this.triangleBig1Material.apply();
    this.triangleBig1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
    // this.triangleBig2Material.apply();
    this.triangleBig2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, 3, 0);
    this.scene.rotate(Math.PI/2, 0, 0, 1);
    // this.triangleMedMaterial.apply();
    this.triangleMed.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.75, -1.75, 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    // this.triangleSmall1Material.apply();
    this.triangleSmall1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(Math.sqrt(2), -Math.sqrt(2), 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    // this.parallelogramMaterial.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1.5, -2.5*Math.sqrt(2), 0);
    this.scene.rotate(Math.PI/4, 0, 0, 1);
    // this.triangleSmall2Material.apply();
    this.triangleSmall2.display();
    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.diamond.enableNormalViz();

    this.triangleMed.enableNormalViz();
    this.triangleSmall1.enableNormalViz();
    this.triangleSmall2.enableNormalViz();
    this.triangleBig1.enableNormalViz();
    this.triangleBig2.enableNormalViz();

    this.parallelogram.enableNormalViz();

  }

  disableNormalViz() {
    this.diamond.disableNormalViz();

    this.triangleMed.disableNormalViz();
    this.triangleSmall1.disableNormalViz();
    this.triangleSmall2.disableNormalViz();
    this.triangleBig1.disableNormalViz();
    this.triangleBig2.disableNormalViz();

    this.parallelogram.disableNormalViz();

  }

  updateBuffers() {
  }

}
