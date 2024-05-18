import {CGFappearance, CGFobject, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MySphere } from './Geometric/MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyPanorama object
 * @param texture - Texture to be used
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.sphere = new MySphere(scene, 10, 10, 200, true);

        this.texture = texture;
        this.material = new CGFappearance(scene);
        this.material.setAmbient(0, 0, 0, 1);
        this.material.setDiffuse(0, 0, 0, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.cloudTexture = new CGFtexture(this.scene, "images/clouds.png");
        this.cloudsShader = new CGFshader(this.scene.gl, "shaders/clouds.vert", "shaders/clouds.frag");

        this.cloudsShader.setUniformsValues({ uSampler2: 1 });
	}

	updateBuffers() {}

    enableNormalViz() {this.sphere.enableNormalViz();}
    disableNormalViz() {this.sphere.disableNormalViz();}

    /**
     * Passes the given time factor to the clouds shader, in order to update their position.
     * @param t - Time factor
     */
    update(t) {
        this.cloudsShader.setUniformsValues({ timeFactor: t/1000 % 1000 });
    }

    display() {
        this.scene.setActiveShader(this.cloudsShader);
        this.cloudTexture.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.material.apply();
        this.sphere.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
