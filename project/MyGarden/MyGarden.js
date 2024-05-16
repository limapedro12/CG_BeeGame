import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './Components/MyFlower.js';
/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 */

/*
    scene,
    exteriorRadius, petalsNo, petalsColor, petalsAngleMin, petalsAngleMax,
    receptacleRadius, receptacleColor,
    stemRadius, stemSize, stemColor,
    leavesColor
*/

export class MyGarden extends CGFobject {
	constructor(scene, lines, cols) {
		super(scene);
        this.lines = lines;
        this.cols = cols;
        this.flowers = [];
        this.flowersXTrans = [];
        this.flowersZTrans = [];
        this.flowersRotate = [];
        this.flowersHeight = [];
        this.maxHeight = 0;

        for (var i = 0; i < lines; i++) {
            for (var j = 0; j < cols; j++) {
                let exteriorRadius = (Math.random() * 4 + 3)*0.5;
                let petalsNo = Math.floor(Math.random() * 4 + 4);
                let petalsColor = null;
                let petalsAngleMin = -Math.PI/12;
                let petalsAngleMax = Math.PI/12;
                let receptacleRadius = Math.random() * 0.5 + 1;
                let receptacleColor = null;
                let stemRadius = Math.random() * 0.15 + 0.2;
                let stemSize = Math.random() * 2 + 3;
                let stemColor = null;
                let leavesColor = null;
                let flower = new MyFlower(scene, exteriorRadius, petalsNo, petalsColor, petalsAngleMin, petalsAngleMax, receptacleRadius, receptacleColor, stemRadius, stemSize, stemColor, leavesColor, i, j);
                this.flowers.push(flower);
                this.flowersXTrans.push(i*15 + (Math.random()*-5 + 5));
                this.flowersZTrans.push(j*15 + (Math.random()*-5 + 5));
                this.flowersRotate.push(Math.random()*Math.PI);
                this.flowersHeight.push(flower.stem.height + receptacleRadius);
                if (this.maxHeight < this.flowersHeight[i*cols + j]) {
                    this.maxHeight = this.flowersHeight[i*cols + j];
                }
            }
        }
	}

    updateFlowersPosition() {
        this.flowersXTrans = [];
        this.flowersZTrans = [];
        this.flowersRotate = [];
        this.maxHeight = 0;

        for (var i = 0; i < this.lines; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.flowersXTrans.push(i*10 + (Math.random()*-5 + 5));
                this.flowersZTrans.push(j*10 + (Math.random()*-5 + 5));
                this.flowersRotate.push(Math.random()*Math.PI);
                if (this.maxHeight < this.flowersHeight[i*this.cols + j]) {
                    this.maxHeight = this.flowersHeight[i*this.cols + j];
                }
            }
        }
    }

    setLines(lines) {
        if (lines != this.lines) {
            this.lines = lines;
            this.updateFlowersPosition();
        }
    }

    setCols(cols) {
        if (cols != this.cols) {
            this.cols = cols;
            this.updateFlowersPosition();
        }
    }

	updateBuffers() {}

    enableNormalViz() {}
    disableNormalViz() {}

    display() {
        for (var i = 0; i < this.lines; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.scene.pushMatrix();
                this.scene.translate(this.flowersXTrans[i*this.cols + j], 0, this.flowersZTrans[i*this.cols + j]);
                this.scene.rotate(this.flowersRotate[i*this.cols + j], 0, 1, 0);
                this.scene.translate(0, -this.maxHeight + this.flowersHeight[i*this.cols + j], 0);
                this.flowers[i*this.cols + j].display();
                this.scene.popMatrix();
            }
        }
    }
}
