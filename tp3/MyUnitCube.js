import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, -0.5,	//0
			0.5, -0.5, -0.5,	//1
			-0.5, 0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, -0.5,		//4
			0.5, -0.5, 0.5,		//5
			-0.5, 0.5, 0.5,		//6
			0.5, 0.5, 0.5		//7

			-0.5, -0.5, -0.5,	//8
			0.5, -0.5, -0.5,	//9
			-0.5, 0.5, -0.5,	//10
			-0.5, -0.5, 0.5,	//11
			0.5, 0.5, -0.5,		//12
			0.5, -0.5, 0.5,		//13
			-0.5, 0.5, 0.5,		//14
			0.5, 0.5, 0.5		//15
			
			-0.5, -0.5, -0.5,	//16
			0.5, -0.5, -0.5,	//17
			-0.5, 0.5, -0.5,	//18
			-0.5, -0.5, 0.5,	//19
			0.5, 0.5, -0.5,		//20
			0.5, -0.5, 0.5,		//21
			-0.5, 0.5, 0.5,		//22
			0.5, 0.5, 0.5		//23
		];

		/*
		faces:
			0, 2, 3, 6
			1, 4, 5, 7
			0, 1, 3, 5
			2, 4, 6, 7
			0, 1, 2, 4
			3, 5, 6, 7
		*/

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 3, 2,
			2, 3, 6,

			1, 4, 5,
			4, 7, 5,

			8, 9, 11,
			9, 13, 11,

			10, 14, 12,
			12, 14, 15,

			16, 18, 17,
			17, 18, 20,

			19, 21, 22,
			21, 23, 22
		];

		/*
		this.normals = [
			-1, 0, 0,   
			1, 0, 0,
			-1, 0, 0, 
			-1, 0, 0, 
			1, 0, 0,
			1, 0, 0,
			-1, 0, 0, 
			1, 0, 0,

			0, -1, 0,
			0, -1, 0,
			0, 1, 0,
			0, -1, 0,
			0, 1, 0,
			0, -1, 0,
			0, 1, 0,
			0, 1, 0,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		*/

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

