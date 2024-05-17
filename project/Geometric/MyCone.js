import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCone
 * 
 * Class representing a cone
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the cone
 * @param radius - Radius of the cone base
 * @param height - Height of the cone
 */
export class MyCone extends CGFobject {
	constructor(scene, slices, radius, height) {
		super(scene);

		this.slices = slices;
		this.radius = radius;
		this.height = height;

		this.initBuffers();
	}
	
	/**
	 * Generates the vertices, indices, normals and texCoords
	 * needed to draw the cone
	 */
	get_vertices(){
        this.vertices.push(0, 0, this.height);
        this.vertices.push(0, 0, 0);

        for(var i = 0; i <= this.slices; i++) {
            this.vertices.push(this.radius*Math.cos(i*2*Math.PI/this.slices), this.radius*Math.sin(i*2*Math.PI/this.slices), 0);
            this.vertices.push(this.radius*Math.cos(i*2*Math.PI/this.slices), this.radius*Math.sin(i*2*Math.PI/this.slices), 0);
        }
        
        for (var i = 2; i < this.vertices.length-2; i++) {
            if (i%2 == 0) this.indices.push(0, i, i+2);
            else this.indices.push(1, i+2, i);
        }
        
        for (var i = 0; i < this.vertices.length/2; i++) {
            this.normals.push(0, 1, 0);
            this.normals.push(0, -1, 0);
        }
	}

	/**
	 * Initializes the cone buffers
	 */
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.get_vertices();

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}

