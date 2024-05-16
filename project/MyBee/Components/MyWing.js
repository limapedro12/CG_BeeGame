import {CGFobject, CGFtexture, CGFappearance} from '../../../lib/CGF.js';
import { MyCilinder } from '../../Geometric/MyCilinder.js';
import { MyCircle } from '../../Geometric/MyCircle.js';
/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - height of the bee
 */
export class MyWing extends CGFobject {
	constructor(scene, height) {
		super(scene);
		
        this.height = height;

		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 0.1);
        this.appearance.setDiffuse(1, 1, 1, 0.4);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 0.4);
        this.appearance.setEmission(0, 0, 0, 0.1);
        
        this.cilinder = new MyCilinder(scene, 20, 1, height/4);
        this.topCircle = new MyCircle(scene, 20, height/4);
        this.bottomCircle = new MyCircle(scene, 20, height/4);
	}
	
	display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.scale(1, 2, 0.05);

            this.scene.pushMatrix();
            this.cilinder.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, 1);
            this.topCircle.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0);
            this.bottomCircle.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
