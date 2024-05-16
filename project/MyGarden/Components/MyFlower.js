import {CGFappearance, CGFobject, CGFtexture} from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from "../../MyPollen/MyPollen.js";

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param petalsNo
 * @param receptacleRadius
 */

/*
    Raio exterior da flor
    Número de pétalas
    Côr das pétalas

    Raio do círculo do coração da flor
    Côr do círculo do coração da flor

    Raio do cilindro do caule
    Tamanho do caule (número de cilindros do caule)
    Côr do caule

    Côr das folhas
*/
export class MyFlower extends CGFobject {
	constructor(
        scene,
        exteriorRadius, petalsNo, petalsColor, petalsAngleMin, petalsAngleMax,
        receptacleRadius, receptacleColor,
        stemRadius, stemSize, stemColor,
        leavesColor
    ) {
		super(scene);

        this.petalsRadius = (exteriorRadius - receptacleRadius)/2;
        this.petals = [];
        this.petalsAngles = [];
        for (var i = 0; i < petalsNo; i++) {
            let radius = Math.random() * Math.PI - Math.PI/2;
            this.petals.push(new MyPetal(scene, (exteriorRadius - receptacleRadius)/2, radius));
            let angleScope = petalsAngleMax-petalsAngleMin;
            let angle = Math.random() * angleScope - Math.abs(petalsAngleMin);
            this.petalsAngles.push(angle);
        }

        this.receptacleRadius = receptacleRadius;
        this.receptacle = new MyReceptacle(scene, 10, 10, receptacleRadius);

        this.stem = new MyStem(scene, stemRadius, stemSize);

        this.petalTexture = new CGFtexture(this.scene, "images/petal.jpg");
		this.petalAppearance = new CGFappearance(this.scene);
        this.petalAppearance.setAmbient(1, 1, 1, 1.0);
        this.petalAppearance.setDiffuse(1, 1, 1, 1.0);
        this.petalAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.petalAppearance.setTexture(this.petalTexture);
		this.petalAppearance.setTextureWrap('REPEAT', 'REPEAT');
		
		this.receptacleTexture = new CGFtexture(this.scene, "images/receptacle.jpg");
		this.receptacleAppearance = new CGFappearance(this.scene);
        this.receptacleAppearance.setAmbient(1, 1, 1, 1.0);
        this.receptacleAppearance.setDiffuse(1, 1, 1, 1.0);
        this.receptacleAppearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.receptacleAppearance.setTexture(this.receptacleTexture);
		this.receptacleAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.pollen = new MyPollen(scene, 1);
        this.pollenAngle1 = Math.random() * Math.PI/2 - Math.PI/4;
        this.pollenAngle2 = Math.random() * Math.PI/2 - Math.PI/4;
	}

	updateBuffers() {}

    enableNormalViz() {}
    disableNormalViz() {}

    display() {
        for (var i = 0; i < this.petals.length; i++) {
            let petal = this.petals[i];
            let angle = i * 2*Math.PI / this.petals.length;
            if (angle != Math.PI) {
                this.scene.pushMatrix();
                this.scene.rotate(angle, 0, 0, 1);
                this.scene.translate(0, this.receptacleRadius, 0);
                this.scene.rotate(this.petalsAngles[i], 1, 0, 0);
                this.scene.translate(0, this.petalsRadius, 0);
                this.petalAppearance.apply();
                petal.display();
                this.scene.popMatrix();
            }
        }

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.receptacleAppearance.apply();
        this.receptacle.display();

        if (this.pollen != null) {
            this.scene.pushMatrix();
            this.scene.rotate(this.pollenAngle1, 0, 1, 1);
            this.scene.translate(this.receptacleRadius, 0, 0);
            this.scene.rotate(this.pollenAngle2, 1, 0, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.translate(0, 0, this.receptacleRadius-0.5);
        // MyStem is a complex object with many textures, so it will take care of applying them.
        this.stem.display();
        this.scene.popMatrix();
    }
}
