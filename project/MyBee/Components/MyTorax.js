import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../MySphere.js';

/**
 * MyTorax
 * @constructor
 * @param size
 */
export class MyTorax extends CGFobject {
	constructor(scene, height) {
		super(scene);
        this.scene = scene;
        this.height = height;

		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(241/255,194/255,50/255, 1.0);
        this.appearance.setDiffuse(241/255,194/255,50/255, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);

		this.sphere = new MySphere(scene, 16, 8, height/2);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.appearance.apply(); 

        this.sphere.display();
        this.scene.popMatrix();
    }
}
