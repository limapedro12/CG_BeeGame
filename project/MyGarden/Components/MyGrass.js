import {CGFobject, CGFappearance, CGFtexture} from '../../../lib/CGF.js';

/**
 * MyGrass
 * 
 * Class representing a leaf of grass
 * 
 * The grass leaf is a triangle with width h and height numTriangles*h.
 * It is subdivided into numTriangles rectangle triangles.
 * The strategy used is to reuse the last two vertices of the previous triangle, 
 * as the first two vertices of the next triangle. Then we use the transform_vertix
 * function to calculate the third vertex of the triangle, using the first vertex.
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
	constructor(scene) {
		super(scene);

		this.h = 2;
        this.numTriangles = 10;

		this.initBuffers();
	}
	
    /**
     * Generates the vertices, indices, normals and texCoords
     * needed to draw the leaf of grass
     */
	get_vertices(){
        var v1 = [this.h, 0, 0];
        var v2 = [0, 0, 0];
        var v3 = [this.h, this.h, 0];

        this.add_triangle(v1, v2, v3, 0);

        for(var i = 0; i < this.numTriangles; i++) {

            v1 = v2;
            v2 = v3;
            v3 = this.transform_vertix(v1, i);

            this.add_triangle(v1, v2, v3, i+1);
        }
	}

    /**
     * Transforms the first vertex of the triangle into the third one
     * 
     * @param v - vertex to transform, represented as [x, y, z]
     * @param num_vertex - number of the vertex
     * @returns transformed vertex
     */
    transform_vertix(v, num_vertex) {
        let signal = -1;
        if(num_vertex % 2 == 0) 
            signal = 1;
        let dx = signal*(this.h/this.numTriangles);
        let dy = 2*this.h;
        return [v[0]+dx, v[1] + dy, v[2]];
    }

    /**
     * Adds a triangle to the vertices, indices, normals and texCoords
     * 
     * @param v1 - first vertex of the triangle, represented as [x, y, z]
     * @param v2 - second vertex of the triangle, represented as [x, y, z]
     * @param v3 - third vertex of the triangle, represented as [x, y, z]
     * @param num_vertex - number of the first vertex
     */
    add_triangle(v1, v2, v3, numVertex) {
        // let signal = -1;
        // if(num_vertex % 2 == 0) 
        let signal = 1;
        let textCoordX = signal*(1/this.numTriangles);

        this.vertices.push(v1[0], v1[1], v1[2]);
        this.vertices.push(v2[0], v2[1], v2[2]);
        this.vertices.push(v3[0], v3[1], v3[2]);

        this.vertices.push(v1[0], v1[1], v1[2]);
        this.vertices.push(v2[0], v2[1], v2[2]);
        this.vertices.push(v3[0], v3[1], v3[2]);

        this.texCoords.push(1 - textCoordX, numVertex/this.numTriangles);
        this.texCoords.push(textCoordX, (numVertex+1)/this.numTriangles);
        this.texCoords.push(1 -textCoordX, (numVertex+2)/this.numTriangles);
        
        this.texCoords.push(textCoordX, numVertex/this.numTriangles);
        this.texCoords.push(1 - textCoordX, (numVertex+1)/this.numTriangles);
        this.texCoords.push(textCoordX, (numVertex+2)/this.numTriangles);

        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.normals.push(0, 0, 1);

        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, -1);

        this.indices.push(this.vertices.length/3 - 3, this.vertices.length/3 - 2, this.vertices.length/3 - 1);
        this.indices.push(this.vertices.length/3 - 4, this.vertices.length/3 - 5, this.vertices.length/3 - 6);
    }

    /**
     * Initializes the leaf of grass buffers
     */
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
		this.get_vertices();

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers() {}

    /**
     * Display the leaf of grass
     */
    display() {
        super.display();
    }
}



