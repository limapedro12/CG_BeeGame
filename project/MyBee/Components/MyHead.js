import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../Geometric/MySphere.js';
import { MyAntennaLegs } from './MyAntennaLegs.js';

/**
 * MyHead
 * Models a bee's head
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - height of the bee
 */
export class MyHead extends CGFobject {
	constructor(scene, height) {
		super(scene);
        this.scene = scene;
        this.height = height;

		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(241/255,194/255,50/255, 1.0);
        this.appearance.setDiffuse(241/255,194/255,50/255, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);

        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setAmbient(0, 0, 0, 1.0);
        this.eyeAppearance.setDiffuse(0, 0, 0, 1.0);
        this.eyeAppearance.setSpecular(1, 1, 1, 1.0);

		this.sphere = new MySphere(scene, 16, 8, height/4);
        this.eye1 = new MySphere(scene, 16, 8, height/5);
        this.eye2 = new MySphere(scene, 16, 8, height/5);

        this.antenna1 = new MyAntennaLegs(scene, height);
        this.antenna2 = new MyAntennaLegs(scene, height);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.appearance.apply(); 

        this.scene.scale(1.5, 1, 1.5);

        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.height/3.5, this.height/12, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.eyeAppearance.apply();
        this.eye1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.height/3.5, this.height/12, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.eyeAppearance.apply();
        this.eye2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.translate(0, this.height/3.5, -this.height/6);
        this.scene.scale(0.3, 0.3, 0.3);
        this.antenna1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.translate(0, this.height/3.5, -this.height/6);
        this.scene.scale(0.3, 0.3, 0.3);
        this.antenna2.display();
        this.scene.popMatrix();
    }
}
