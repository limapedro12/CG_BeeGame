import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius
 */
export class MyPetal extends CGFobject {
	constructor(scene, radius, angle) {
		super(scene);
		this.scene = scene;
		this.radius = radius;
		this.angle = angle;

		this.triangle1 = new MyTriangle(scene);
		this.triangle2 = new MyTriangle(scene);
	}
	
	display() {
		this.scene.pushMatrix();

		this.scene.rotate(Math.PI/2, 0, 0, 1);

		this.scene.pushMatrix();
		this.scene.scale(this.radius, 1, 1);
		this.triangle1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(this.radius, 1, 1);
		this.triangle2.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
