import {CGFobject} from '../lib/CGF.js';
/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices 
 * @param stacks 
 */
export class MyCilinder extends CGFobject {
	constructor(scene, slices, stacks, radius) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.radius = radius;

		this.initBuffers();
	}
	
	get_vertices(slices, stacks){
		let height = 1/stacks;
		for(var k = 0; k < stacks; k++){
			for(var i = 0; i <= slices; i++){
				this.vertices.push(this.radius*Math.cos(i*2*Math.PI/slices), this.radius*Math.sin(i*2*Math.PI/slices), k*height);
				this.vertices.push(this.radius*Math.cos(i*2*Math.PI/slices), this.radius*Math.sin(i*2*Math.PI/slices), (k+1)*height);
			}
		}

		for(var k = 0; k <= stacks; k++) {
			for(var i = 0; i <= slices; i++) {
				this.indices.push(i*2 + k*2*slices, i*2+2 + k*2*slices, i*2+3 + k*2*slices);
				this.indices.push(i*2+3 + k*2*slices, i*2+1 + k*2*slices, i*2 + k*2*slices);
			}
		}

		for(var k = 0; k < stacks; k++){
			for(var i = 0; i <= slices; i++){
				for(var j = 0; j < 2; j++)
					this.normals.push(Math.cos(i*2*Math.PI/slices), Math.sin(i*2*Math.PI/slices), 0);
			}
		}

		this.texCoords = [];
		for (var i = 0; i <= stacks; i++) {
			for (var j = 0; j <= slices; j++) {
				this.texCoords.push(j / slices, i / stacks);
			}
		}
	}

	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.get_vertices(this.slices, this.stacks);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}
}

