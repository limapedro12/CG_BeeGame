import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius
 */
export class MyPetal extends CGFobject {
	constructor(scene, radius, angle, purpose="petal" /*petal or leaf*/) {
		super(scene);
		this.scene = scene;
		this.radius = radius;
		this.angle = angle;
		this.purpose = purpose;

		this.triangle1 = new MyTriangle(scene);
		this.triangle2 = new MyTriangle(scene);
		
		this.texture = new CGFtexture(this.scene, "images/" + this.purpose + ".jpg");
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	display() {
		this.scene.pushMatrix();

		this.scene.rotate(Math.PI/2, 0, 0, 1);

		this.scene.pushMatrix();
		this.appearance.apply();
		this.scene.scale(this.radius, 1, 1);
		this.triangle1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.appearance.apply();
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(this.radius, 1, 1);
		this.triangle2.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
