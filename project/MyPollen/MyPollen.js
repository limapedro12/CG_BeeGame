import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyPollenPart } from './MyPollenPart.js';

/**
 * MyPollen
 * @constructor
 * @param size
 */
export class MyPollen extends CGFobject {
	constructor(scene, height) {
		super(scene);

		this.bottomPart = new MyPollenPart(scene, 16, 8, height/2.5);
        this.topPart = new MyPollenPart(scene, 16, 8, height/2.5);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 1.5, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.topPart.display();
        this.scene.popMatrix();

        this.bottomPart.display();
    }
}
