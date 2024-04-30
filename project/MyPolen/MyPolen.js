import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyPolenPart } from './MyPolenPart.js';

/**
 * MyPolen
 * @constructor
 * @param size
 */
export class MyPolen extends CGFobject {
	constructor(scene, height) {
		super(scene);

		this.bottomPart = new MyPolenPart(scene, 16, 8, height/2.5);
        this.topPart = new MyPolenPart(scene, 16, 8, height/2.5);

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
