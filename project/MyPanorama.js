import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyPanorama object
 * @param texture
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.sphere = new MySphere(scene, 10, 10, 200, true);

        this.material = new CGFappearance(scene);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}

	updateBuffers() {}

    enableNormalViz() {this.sphere.enableNormalViz();}
    disableNormalViz() {this.sphere.disableNormalViz();}

    display() {
        this.scene.pushMatrix();
        
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}
