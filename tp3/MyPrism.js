import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices 
 * @param stacks 
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}
	
	get_vertices(slices){
		for(var i = 0; i < slices; i++){
			this.vertices.push(Math.cos(i*2*Math.PI/slices), Math.sin(i*2*Math.PI/slices), 0);
			this.vertices.push(Math.cos((i+1)*2*Math.PI/slices), Math.sin((i+1)*2*Math.PI/slices), 0);
			this.vertices.push(Math.cos(i*2*Math.PI/slices), Math.sin(i*2*Math.PI/slices), 1);
			this.vertices.push(Math.cos((i+1)*2*Math.PI/slices), Math.sin((i+1)*2*Math.PI/slices), 1);
		}

		for(var i = 0; i < slices; i++){
			this.indices.push(i*4+2, i*4, i*4+3)
			this.indices.push(i*4+1, i*4+3, i*4)
		}

		console.log(this.vertices);
		console.log(this.indices);
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.get_vertices(this.slices);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}

