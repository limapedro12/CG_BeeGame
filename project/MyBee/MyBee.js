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
	constructor(scene, height, x, y, z, orientation, speed) {
		super(scene);
        this.scene = scene;
        this.height = height;

        this.head = new MyHead(scene, height);
		this.torax = new MyTorax(scene, height);
        this.abdomen = new MyAbdomen(scene, height);

        this.x = x;
        this.y = y;
        this.z = z;
        this.orientation = orientation;
        this.speed = speed;    // [x, z]

		this.initBuffers();
	}

	updateBuffers() {}

    update(t) {
        this.y = 0.5*this.height*Math.sin(t/200);
        this.torax.update(t);
        this.x += this.speed[0];
        this.z += this.speed[1];
    }

    turn(v) {
        this.orientation += v;
        this.orientation %= 2*Math.PI;

        let norm = Math.sqrt(this.speed[0]**2 + this.speed[1]**2);
        this.speed = [norm*Math.sin(this.orientation), norm*Math.cos(this.orientation)];
    }

    accelerate(v) {
        let norm = Math.max(0, Math.sqrt(this.speed[0]**2 + this.speed[1]**2) + v);
        this.speed = [norm*Math.sin(this.orientation), norm*Math.cos(this.orientation)];
    }

    reset() {
        this.x = 0;
        this.z = 0;
        this.orientation = 0;
        this.speed = [0, 0];
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        
        this.scene.pushMatrix();
        this.scene.translate(0, -this.height/3, -this.height/1.5);
        this.scene.rotate(3*Math.PI/4, -1, 0, 0);
        this.abdomen.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.height/2);
        this.scene.rotate(Math.PI/3, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        this.torax.display();
        this.scene.popMatrix();
    }
}
