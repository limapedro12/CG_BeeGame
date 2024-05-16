import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyCilinder } from '../Geometric/MyCilinder.js';
import { MyCircle } from '../Geometric/MyCircle.js';

/**
 * MyCover
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCover extends CGFobject {
	constructor(scene) {
		super(scene);

        this.woodTexture = new CGFtexture(this.scene, "images/wood.jpg");
		this.woodAppearance = new CGFappearance(this.scene);
        this.woodAppearance.setAmbient(1, 1, 1, 1.0);
        this.woodAppearance.setDiffuse(1, 1, 1, 1.0);
        this.woodAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.woodAppearance.setTexture(this.woodTexture);
		this.woodAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.log = new MyCilinder(scene, 16, 8, 1);
        this.circle1 = new MyCircle(scene, 16, 1);
        this.circle2 = new MyCircle(scene, 16, 1);

        this.height = 0.1;

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1.3, 1.3, this.height);
        
        this.woodAppearance.apply();
        this.circle1.display();

            this.scene.pushMatrix()
            this.scene.translate(0, 0, 1);
            this.circle2.display();
            this.scene.popMatrix()

        this.log.display();

        this.scene.popMatrix();
    }
}
