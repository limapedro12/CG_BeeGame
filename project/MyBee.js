import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyBee
 * @constructor
 * @param size
 */
export class MyBee extends CGFobject {
	constructor(scene, height) {
		super(scene);
        this.scene = scene;
        this.height = height;

        this.beeTexture = new CGFtexture(this.scene, "images/bee.jpg");
		this.beeAppearance = new CGFappearance(this.scene);
        this.beeAppearance.setAmbient(1, 1, 1, 1.0);
        this.beeAppearance.setDiffuse(1, 1, 1, 1.0);
        this.beeAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.beeAppearance.setTexture(this.beeTexture);
		this.beeAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.body = new MySphere(scene, 16, 8, height/2);

        this.deltaPosZ = 0;

		this.initBuffers();
	}

	updateBuffers() {}

    update(t) {
        this.deltaPosZ = 2*Math.sin(t/200);
    }

    display() {
        this.scene.pushMatrix();
        this.beeAppearance.apply();
        this.body.display();
        this.scene.popMatrix();
    }
}
