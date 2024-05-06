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

        this.scales = []
        for( var i = 0; i < numRocks; i++) {
            this.scales.push(Math.random() * 0.3 + 0.7);
        }

        this.cumulative_heights = []
        for( var i = 0; i < numRocks; i++) {
            this.cumulative_heights.push(this.rocks[i].height())
        }

        var numLevels = 0;
        var sum = 0;
        while (this.numRocks > sum) {
            numLevels++;
            sum += numLevels * numLevels;
        }
        this.numLevels = numLevels;
        this.sum = sum;
	}

	updateBuffers() {}

    enableNormalViz() {}
    disableNormalViz() {}

    display() {
        // var totalHeight = 0;
        // for (var i = 0; i < this.numRocks; i++) {
        //     this.scene.pushMatrix();
        //     this.scene.translate(0, (this.rocks[i].height()*this.scales[i])/2, 0);
        //     this.scene.translate(0, totalHeight, 0);
        //     this.scene.rotate(this.angles[i], this.angles[i], this.angles[i], 0);
        //     this.scene.scale(this.scales[i], this.scales[i], this.scales[i]);
        //     this.rocks[i].display();
        //     this.scene.popMatrix();
        //     totalHeight += this.rocks[i].height()*this.scales[i];
        // }
        var level = this.numLevels;
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.numRocks; i++) {
            let z = (this.numLevels-level)

            let i1 = this.rock_at(x, y, z - 1)
            let i2 = this.rock_at(x + 1, y, z - 1)
            let i3 = this.rock_at(x, y + 1, z - 1)
            let i4 = this.rock_at(x + 1, y + 1, z - 1)
 
            // console.log(i1, i2, i3)
            var angle1; var angle2;
            if(i1 == -1 || i2 == -1 || i3 == -1){
                angle1 = 0
                angle2 = 0
            } else {
                let cumulative_mean = (this.cumulative_heights[i1]+this.cumulative_heights[i2]+ 
                                       this.cumulative_heights[i3]+this.cumulative_heights[i4]) / 4
                let rock_height_mean = (this.rocks[i1].height() + this.rocks[i2].height() +
                                        this.rocks[i3].height() + this.rocks[i4].height())/4
                let bias = 1/((rock_height_mean/this.rocks[i].height() + 1))
                this.cumulative_heights[i] = cumulative_mean + this.rocks[i].height() - bias*(rock_height_mean/2)

                let angle12 = this.angle_from_heights(this.rocks[i1].height(), this.rocks[i2].height())
                let angle13 = this.angle_from_heights(this.rocks[i1].height(), this.rocks[i3].height())
                let angle42 = this.angle_from_heights(this.rocks[i4].height(), this.rocks[i2].height())
                let angle43 = this.angle_from_heights(this.rocks[i4].height(), this.rocks[i3].height())
                if(Math.abs((angle12 + angle13)/2) > Math.abs((angle42 + angle43)/2)){
                    angle1 = (angle12 + angle13)/2   
                    angle2 = Math.PI/4 + (angle12 - angle13)
                } else {
                    angle1 = (angle42 + angle43)/2   
                    angle2 = Math.PI/4 + (angle42 - angle43)
                }
            }

            let x_to_draw = x*this.radius*1.5 + z*(this.radius)*0.75
            let y_to_draw = this.cumulative_heights[i] - this.rocks[i].height()*0.5
            let z_to_draw = y*this.radius*1.5 + z * (this.radius)*0.75

            this.scene.pushMatrix();
            this.scene.translate(-this.numLevels*this.radius*0.5, 0, -this.numLevels*this.radius*0.5)

            this.scene.translate(x_to_draw, y_to_draw, z_to_draw);
            if(level > 1) {
                this.scene.rotate(angle1, angle1, 0, angle2);
            } else {
                this.scene.rotate(angle1/2, angle1/2, 0, angle2);
            }
            this.scene.scale(this.scales[i], this.scales[i], this.scales[i]);
            this.rocks[i].display();
            this.scene.popMatrix();
            x++;
            if(x == level){
                x = 0;
                y++;
            }
            if(y == level){
                x = 0;
                y = 0;
                level--;
            }
        }
    }

    rock_at(x, y, z){
        if(x == -1 || y == -1 || z == -1){
            return -1;
        }
        var index = 0;
        for(var i = this.numLevels; i > this.numLevels-z; i--){
            index += i*i;
        }
        index += y*(this.numLevels-z);
        index += x;
        return index;

    }

    angle_from_heights(height1, height2) {
        return ((height1 - height2)/this.radius) * Math.PI/4;
    }

    get_height() {
        return this.rocks[this.rocks.length-1].height();
    }
}
