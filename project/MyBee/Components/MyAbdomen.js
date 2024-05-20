import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../Geometric/MySphere.js';
import { MyCone } from '../../Geometric/MyCone.js';

/**
 * MyAbdomen
 * Represents the abdomen of the bee
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height - height of the bee
 */
export class MyAbdomen extends CGFobject {
	constructor(scene, height) {
		super(scene);
        this.scene = scene;
        this.height = height;

        this.texture = new CGFtexture(this.scene, "images/abdomen.jpg");
		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.stingAppearance = new CGFappearance(this.scene);
        this.stingAppearance.setAmbient(0, 0, 0, 1.0);
        this.stingAppearance.setDiffuse(0, 0, 0, 1.0);
        this.stingAppearance.setSpecular(0, 0, 0, 1.0);

		this.sphere = new MySphere(scene, 16, 8, height/2.3);
        this.sting = new MyCone(scene, 16, height/10, height/3);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.appearance.apply(); 

        this.scene.scale(1, 1.5, 1);

        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.stingAppearance.apply();
        this.scene.translate(0, 1.5*this.height/2.3 - this.height/9, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.sting.display();
        this.scene.popMatrix();
    }
}
