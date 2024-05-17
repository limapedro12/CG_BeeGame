import {CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';
/**
 * MyRockSet
 * 
 * Class representing a set of rocks in a pyramid shape
 * It tries to do a pyramid with the given number of rocks,
 * but if it can't do a perfect pyramid, it will do the best it can
 * 
 * Possible numbers of rocks to achieve a perfect pyramid:
 * 1, 5, 14, 30, 55, 91, ...
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numRocks - Number of rocks in the set
 * @param radius - Radius of the rocks (in x and z axis)
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

    /**
     * Displays the set of rock set in a pyramid shape
     */
    display() {
        var level = this.numLevels;
        var x = 0;
        var y = 0;
        for (var i = 0; i < this.numRocks; i++) {
            let z = (this.numLevels-level)

            let i1 = this.rock_at(x, y, z - 1)
            let i2 = this.rock_at(x + 1, y, z - 1)
            let i3 = this.rock_at(x, y + 1, z - 1)
            let i4 = this.rock_at(x + 1, y + 1, z - 1)
 
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


    /**
     * Returns the index of the rock at position (x, y, z)
     * @param x - x position
     * @param y - y position
     * @param z - z position
     * 
     * @return index of the rock at position (x, y, z)
     */
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

    /**
     * Returns the angle between two rocks with different heights
     * @param height1 - height of the first rock
     * @param height2 - height of the second rock
     * 
     * @return angle between the two rocks in radians
     */
    angle_from_heights(height1, height2) {
        return ((height1 - height2)/this.radius) * Math.PI/4;
    }

    /**
     * Returns the height of the rock set
     * 
     * @return height of the rock set
     */
    get_height() {
        return this.rocks[this.rocks.length-1].height();
    }
}
