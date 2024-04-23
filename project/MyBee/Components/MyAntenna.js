import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../MySphere.js';

/**
 * MyAntenna
 * @constructor
 * @param size
 */
export class MyAntenna extends CGFobject {
	constructor(scene, height) {
		super(scene);
        this.scene = scene;
        this.height = height;

		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0, 0, 0, 1.0);
        this.appearance.setDiffuse(0, 0, 0, 1.0);
        this.appearance.setSpecular(1, 1, 1, 1.0);

		this.part1 = new MySphere(scene, 16, 8, height);
        this.part2 = new MySphere(scene, 16, 8, height);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();

        this.appearance.apply(); 
        this.scene.scale(0.1, 1, 0.1);
        this.part1.display();

        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.appearance.apply();
        this.scene.translate(0, this.height + this.height*Math.cos(Math.PI/4), this.height*Math.cos(Math.PI/4));
        this.scene.rotate(Math.PI/4, 1, 0, 0);
        this.scene.scale(0.1, 1, 0.1);
        this.part2.display();

        this.scene.popMatrix();
    }
}
