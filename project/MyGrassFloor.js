import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyGrass } from './MyGrass.js';
/**
 * MyGrassFloor
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numGrassRow
 * @param receptacleRadius
 */
export class MyGrassFloor extends CGFobject {
	constructor(scene, numGrassRow, numGrassCol) {
		super(scene);

        this.rowSpace = 50/numGrassRow;
        this.colSpace = 50/numGrassCol;

        this.grassList = []
        for(var i = 0; i < 50; i += this.rowSpace){
            let grassListTemp = []
            for(var j = 0; j < 50; j += this.colSpace){
                grassListTemp.push(new MyGrass(scene))
            }
            this.grassList.push(grassListTemp)
        }

        
	}

	updateBuffers() {}

    display() {
        for(var i = 0; i < this.grassList.length; i++) {
            for(var j = 0; j < this.grassList[i].length; j++) {
                this.scene.pushMatrix();
                this.scene.translate(i*this.rowSpace, 0, j*this.colSpace);
                this.scene.scale(0.5, 0.5, 0.5);
                this.grassList[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
