import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param petalsNo
 * @param receptacleRadius
 */
export class MyRockSet extends CGFobject {
	constructor(scene, numRocks, radius) {
		super(scene);
        this.rocks = []
        this.numRocks = numRocks;
        this.radius = radius;
        for (var i = 0; i < numRocks; i++) {
            this.rocks.push(new MyRock(scene, radius));
        }

        this.angles = []
        for( var i = 0; i < numRocks; i++) {
            this.angles.push(Math.random() * (Math.PI/3) - Math.PI/6);
        }
        this.scales = []
        for( var i = 0; i < numRocks; i++) {
            this.scales.push(Math.random() * 1.5 + 0.5);
        }
	}

	updateBuffers() {}

    enableNormalViz() {}
    disableNormalViz() {}

    display() {
        var totalHeight = 0;
        for (var i = 0; i < this.numRocks; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, (this.rocks[i].height()*this.scales[i])/2, 0);
            this.scene.translate(0, totalHeight, 0);
            this.scene.rotate(this.angles[i], this.angles[i], this.angles[i], 0);
            this.scene.scale(this.scales[i], this.scales[i], this.scales[i]);
            this.rocks[i].display();
            this.scene.popMatrix();
            totalHeight += this.rocks[i].height()*this.scales[i];
        }
    }
}
