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

        this.texture = new CGFtexture(this.scene, "images/bee.jpg");
		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

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
