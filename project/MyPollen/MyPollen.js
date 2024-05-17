import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyPollenPart } from './MyPollenPart.js';

/**
 * MyPollen
 * 
 * Class representing a single pollen grain
 * The pollen grain is composed of two parts: a bottom part and a top part
 * The top part is an elongated half sphere, while the bottom part is a half sphere
 * 
 * @constructor
 * @param height - Height of the pollen grain
 */
export class MyPollen extends CGFobject {
	constructor(scene, height) {
		super(scene);

		this.bottomPart = new MyPollenPart(scene, 16, 8, height/2.5);
        this.topPart = new MyPollenPart(scene, 16, 8, height/2.5);

		this.initBuffers();
	}

	updateBuffers() {}

    /**
     * Display the pollen grain
     */
    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.topPart.display();
        this.scene.popMatrix();

        this.bottomPart.display();
    }
}
