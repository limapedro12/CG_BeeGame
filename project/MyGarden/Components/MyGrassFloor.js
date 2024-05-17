import {CGFappearance, CGFobject, CGFshader, CGFtexture} from '../../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';
/**
 * MyGrassFloor
 * 
 * Class representing a grass floor with 50x50 units covered with grass, that moves with the wind
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numGras, in the z axissRow - Number of grass leaves in a row
 * @param numGrassCol - Number of grass leaves in a column
 */
export class MyGrassFloor extends CGFobject {
	constructor(scene, numGrassRow, numGrassCol) {
		super(scene);

        this.rowSpace = 50/numGrassRow;
        this.colSpace = 50/numGrassCol;

        this.grassList = []
        this.randomFactorList = []
        this.oldRandomFactorList = []
        this.newRandomFactorList = []
        for(var i = 0; i < 50; i += this.rowSpace){
            let grassListTemp = [];
            let randomFactorListTemp = [];
            for(var j = 0; j < 50; j += this.colSpace){
                grassListTemp.push(new MyGrass(scene))
                randomFactorListTemp.push(Math.random()-0.5)
            }
            this.grassList.push(grassListTemp)
            this.randomFactorList.push(randomFactorListTemp)
        }

        this.grassShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
        this.grassShader.setUniformsValues({ uSampler: 0 });

        this.texture = new CGFtexture(this.scene, "images/grass.jpg");
	}

    /**
     * This function is called 50 times per second
     * It updates the random factor of each grass leaf
     * 
     * @param t - time since the application started (integer incressed 50 times per second)
     */
    update(t) {
        for(var i = 0; i < this.grassList.length; i++) {
            for(var j = 0; j < this.grassList[i].length; j++) {
                let len = 2;
                if(t%len == 0)
                    this.randomFactorList[i][j] = Math.random()-0.5;
            }
        }

        this.grassShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

	updateBuffers() {}

    /**
     * Displays the grass floor
     */
    display() {
        this.scene.setActiveShader(this.grassShader);
        this.texture.bind(0);
        for(var i = 0; i < this.grassList.length; i++) {
            for(var j = 0; j < this.grassList[i].length; j++) {
                this.grassShader.setUniformsValues({ randomFactor: this.randomFactorList[i][j] });

                this.scene.pushMatrix();
                this.scene.translate(i*this.rowSpace, 0, j*this.colSpace);
                this.scene.scale(0.5, 0.3, 0.5);
                this.grassList[i][j].display();
                this.scene.popMatrix();
            }
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
