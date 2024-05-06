import {CGFobject} from '../lib/CGF.js';
/**
 * MyCircle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices
 */
export class MyCircle extends CGFobject {
	constructor(scene, slices, radius) {
		super(scene);

		this.slices = slices;
		this.radius = radius;

		this.initBuffers();
	}
	
	get_vertices(slices){
        this.vertices.push(0, 0, 0);
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

		this.texCoords.push(0.5, 0.5);
		for(var i = 0; i <= slices; i++) {
            this.texCoords.push(0.5*Math.cos(i*2*Math.PI/slices) + 0.5, 0.5*Math.sin(i*2*Math.PI/slices) + 0.5, 0);
            this.texCoords.push(0.5*Math.cos(i*2*Math.PI/slices)+ 0.5, 0.5*Math.sin(i*2*Math.PI/slices) + 0.5, 0);
        }
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		this.get_vertices(this.slices);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}

