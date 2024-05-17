import {CGFobject} from '../../lib/CGF.js';

/**
 * MyCilinder
 * 
 * Class representing a cilinder without top and bottom faces
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the cilinder
 * @param stacks - Number of stacks the cilinder is divided along its height
 * @param radius - Radius of the cilinder base
 */
export class MyCilinder extends CGFobject {
	constructor(scene, slices, stacks, radius, inverted = false) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.radius = radius;
		this.inverted = inverted;

		this.initBuffers();
	}

	/**
	 * Generates the vertices, indices, normals and texCoords
	 * needed to draw the cilinder
	 */
	get_vertices() {
        for (var z = 0; z <= this.stacks; z++) {
            this.vertices.push(this.radius, 0, z / this.stacks);
			if(this.inverted)
				this.normals.push(-1, 0, 0);
			else
            	this.normals.push(1, 0, 0);
        }

        for (var i = 1; i <= this.slices; i++) {

            let angle = 2*Math.PI * i / this.slices;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);

            let size = Math.sqrt(x*x + y*y);
            if (i != this.slices) {    
                this.vertices.push(x, y, 0);
				if(this.inverted)
					this.normals.push(-x/size, -y/size, 0);
				else
                	this.normals.push(x/size, y/size, 0);
            }

            for (var j = 1; j <= this.stacks; j++) {
                
                if (i != this.slices) {

                    let z = j / this.stacks;
                    this.vertices.push(x, y, z);
					if(this.inverted)
						this.normals.push(-x / size, -y / size, 0);
					else
                    	this.normals.push(x / size, y / size, 0);
                    
                    let numVert = this.vertices.length / 3;
                    let i1 = numVert - 2;
                    let i2 = numVert - 1;
                    let i3 = i2 - (this.stacks + 1);
                    let i4 = i3 - 1;

					if(this.inverted)
						this.indices.push(i4, i2, i1, i4, i3, i2);
					else
                    	this.indices.push(i4, i1, i2, i4, i2, i3);

                } else {

                    let numVert = this.vertices.length / 3;
                
                    let i1 = j - 1;
                    let i2 = j;
                    let i3 = numVert - this.stacks - 1 + j;
                    let i4 = i3 - 1;

					if(this.inverted)
						this.indices.push(i4, i2, i1, i4, i3, i2);
					else
                    	this.indices.push(i4, i1, i2, i4, i2, i3);
                }
            }
			
        }

		for (var j = 0; j <= this.slices; j++) {
			for (var i = 0; i <= this.stacks; i++) {
				this.texCoords.push(j / this.slices, i / this.stacks);
			}
		}
    }

	/**
	 * Initializes the cilinder buffers
	 */
    initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		this.get_vertices();

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}
