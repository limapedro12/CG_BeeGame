import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../MySphere.js';
import { MyAntennaLegs } from './MyAntennaLegs.js';
import { MyWing } from './MyWing.js';

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

		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(241/255,194/255,50/255, 1.0);
        this.appearance.setDiffuse(241/255,194/255,50/255, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);

		this.sphere = new MySphere(scene, 16, 8, height/2);
        this.leg1 = new MyAntennaLegs(scene, height/2);
        this.leg2 = new MyAntennaLegs(scene, height/2);
        this.leg3 = new MyAntennaLegs(scene, height/2);
        this.leg4 = new MyAntennaLegs(scene, height/2);

        this.leftWing = new MyWing(scene);
        this.rightWing = new MyWing(scene);

		this.initBuffers();
	}

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.appearance.apply(); 
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.cos(Math.PI/4)*this.height/2, -this.height/4, -Math.cos(Math.PI/4)*this.height/3);
        this.scene.rotate(4.5*Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.leg1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.cos(Math.PI/4)*this.height/2, -this.height/4, Math.cos(Math.PI/4)*this.height/3);
        this.scene.rotate(4.5*Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.leg2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.cos(Math.PI/4)*this.height/2, -this.height/4, -Math.cos(Math.PI/4)*this.height/3);
        this.scene.rotate(-4.5*Math.PI/4, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.leg3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.cos(Math.PI/4)*this.height/2, -this.height/4, Math.cos(Math.PI/4)*this.height/3);
        this.scene.rotate(-4.5*Math.PI/4, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.leg4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.8*this.height, this.height/3, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.8*this.height, this.height/3, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.rightWing.display();
        this.scene.popMatrix();
    }
}
