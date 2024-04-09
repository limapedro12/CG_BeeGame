import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 * @param petalsNo
 */
export class MyFlower extends CGFobject {
	constructor(scene, petalsNo) {
		super(scene);

        this.petals = [];
        for (var i = 0; i < petalsNo; i++) {
            this.petals.push(new MyPetal(scene));
        }

        this.receptacle = new MyReceptacle(scene, 10, 10, 1);
        this.stem = new MyStem(scene, 10, 10);
	}

	updateBuffers() {}

    enableNormalViz() {this.sphere.enableNormalViz();}
    disableNormalViz() {this.sphere.disableNormalViz();}

    display() {
        for (var petal of this.petals) {
            petal.display();
        }
        this.receptacle.display();
        this.stem.display();
    }
}
