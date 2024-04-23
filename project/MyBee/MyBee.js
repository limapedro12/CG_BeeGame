import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyHead } from './Components/MyHead.js';
import { MyTorax } from './Components/MyTorax.js';
import { MyAbdomen } from './Components/MyAbdomen.js';

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

        this.head = new MyHead(scene, height);
		this.torax = new MyTorax(scene, height);
        this.abdomen = new MyAbdomen(scene, height);
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
        
        this.scene.pushMatrix();
        this.scene.translate(0, -this.height/2, -this.height);
        this.scene.rotate(Math.PI/6, -1, 0, 0);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.height/1.5);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        // this.scene.rotate(Math.PI/6, -1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.torax.display();
        this.scene.popMatrix();
    }
}
