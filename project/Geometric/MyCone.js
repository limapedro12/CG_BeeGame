import {CGFobject} from '../../lib/CGF.js';
/**
 * MyCone
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices
 * @param radius
 * @param height
 */
export class MyCone extends CGFobject {
	constructor(scene, slices, radius, height) {
		super(scene);

		this.slices = slices;
		this.radius = radius;
		this.height = height;

		this.initBuffers();
	}
	
	get_vertices(slices){
        this.vertices.push(0, 0, this.height);
        this.vertices.push(0, 0, 0);

        for(var i = 0; i <= slices; i++) {
            this.vertices.push(this.radius*Math.cos(i*2*Math.PI/slices), this.radius*Math.sin(i*2*Math.PI/slices), 0);
            this.vertices.push(this.radius*Math.cos(i*2*Math.PI/slices), this.radius*Math.sin(i*2*Math.PI/slices), 0);
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

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.get_vertices(this.slices);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}

