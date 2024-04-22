import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyCilinder } from './MyCilinder.js';
/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 * @param stemRadius
 * @param stemSize
 * @param leafRadius
 * @param leafAngle
 */
export class MyLeaf extends CGFobject {
	constructor(scene, stemRadius, stemSize, leafRadius, leafAngle) {
		super(scene);
		this.scene = scene;
        this.stemRadius = stemRadius;
        this.stemSize = stemSize;
        this.leafRadius = leafRadius;
        this.leafAngle = leafAngle;
        
        this.stem = new MyCilinder(scene, 10, 10, stemRadius);
        this.leaf = new MyPetal(scene, leafRadius, 0);
	}
	
	display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.stemSize);
        this.scene.rotate(this.leafAngle, 0, 0, 1);
        this.leaf.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.scale(1, 1, this.stemSize);
        this.stem.display();
		this.scene.popMatrix();
	}
}
