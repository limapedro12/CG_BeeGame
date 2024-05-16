import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
import { MyCilinder } from '../Geometric/MyCilinder.js';
import { MyCircle } from '../Geometric/MyCircle.js';
import { MyCover } from './MyCover.js';

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);

        this.logTexture = new CGFtexture(this.scene, "images/log.png");
		this.outsideAppearance = new CGFappearance(this.scene);
        this.outsideAppearance.setAmbient(1, 1, 1, 1.0);
        this.outsideAppearance.setDiffuse(1, 1, 1, 1.0);
        this.outsideAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.outsideAppearance.setTexture(this.logTexture);
		this.outsideAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.insideAppearance = new CGFappearance(this.scene);
        this.insideAppearance.setAmbient(0.3, 0.3, 0.3, 1.0);
        this.insideAppearance.setDiffuse(0.3, 0.3, 0.3, 1.0);
        this.insideAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
        this.insideAppearance.setTexture(this.logTexture);
		this.insideAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.woodTexture = new CGFtexture(this.scene, "images/wood.jpg");
		this.woodAppearance = new CGFappearance(this.scene);
        this.woodAppearance.setAmbient(1, 1, 1, 1.0);
        this.woodAppearance.setDiffuse(1, 1, 1, 1.0);
        this.woodAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.woodAppearance.setTexture(this.woodTexture);
		this.woodAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.logOutside = new MyCilinder(scene, 16, 8, 1);
        this.circle1 = new MyCircle(scene, 16, 1);
        this.circle2 = new MyCircle(scene, 16, 1);

        this.logInside = new MyCilinder(scene, 16, 8, 1, true);

        this.cover = new MyCover(scene);
        
        this.pollens = [];

		this.initBuffers();

        this.dx = 0;
        this.dz = 0;
	}

    collideWith(obj, speed_vector) {
        // console.log((obj.x - this.dx)*(obj.x - this.dx) + (obj.z - this.dz)*(obj.z - this.dz));
        let new_x = obj.x + speed_vector[0];
        let new_z = obj.z + speed_vector[1];

        if(new_x < this.dx + 1 && new_x > this.dx - 1 && new_z > this.dz) {
            return false;
        }

        let calc = (new_x - this.dx)*(new_x - this.dx) + (new_z - this.dz)*(new_z - this.dz);

        if (calc < 36 && calc > 16) {
            return true;
        }
        return false;
    }

    updatePos(x, z) {
        this.dx += x;
        this.dz += z;
    }

	updateBuffers() {}

    display() {
        this.scene.pushMatrix();
        this.scene.scale(5, 20, 5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.insideAppearance.apply();
        this.logInside.display();
        
        this.woodAppearance.apply();
        this.circle1.display();

        this.scene.pushMatrix()
            this.scene.translate(0, 0, 1);
            this.circle2.display();
        this.scene.popMatrix()
        
        this.outsideAppearance.apply();
        this.logOutside.display();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, -this.cover.height);
            this.cover.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }

    addPollen(pollen) {
        this.pollens.push(pollen);
    }
}
