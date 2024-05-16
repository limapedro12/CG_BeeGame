import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';

/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
	constructor(scene) {
		super(scene);

		this.h = 2;
        this.numTriangles = 10;

        // this.angles = [Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4, Math.PI/4];
        // this.angles = [Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI, Math.PI];
        this.angles = [Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];

        // this.angles = [];
        // for(var i = 1; i < this.numTriangles+1; i++) {
        //     this.angles.push(Math.random() * Math.PI/(4*i) + Math.PI/2 - Math.PI/(8*i));
        // }

        this.texture = new CGFtexture(this.scene, "images/leaf.jpg");
		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(0.2, 0.2, 0.2, 1.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.initBuffers();
	}
	
	get_vertices(){
        var v1 = [this.h, 0, 0];
        var v2 = [0, 0, 0];
        var v3 = [this.h, this.h, 0];

        this.add_triangle(v1, v2, v3, -1);

        for(var i = 0; i < this.numTriangles; i++) {

            v1 = v2;
            v2 = v3;
            v3 = this.transform_vertix(v1, i);

            this.add_triangle(v1, v2, v3, i);
        }
	}

    transform_vertix(v, num_vertex) {
        let signal = -1;
        if(num_vertex % 2 == 0) 
            signal = 1;

        let angle = this.angles[num_vertex];
        let dx = signal*(this.h/this.numTriangles);
        let dy = Math.sin(angle) * 2*this.h + dx;
        let dz = Math.cos(angle) * 2*this.h + dx;
        return [v[0]+dx, v[1] + dy, v[2]+dz];
    }

    add_triangle(v1, v2, v3, num_vertex) {
        this.vertices.push(v1[0], v1[1], v1[2]);
        this.vertices.push(v2[0], v2[1], v2[2]);
        this.vertices.push(v3[0], v3[1], v3[2]);

        this.vertices.push(v1[0], v1[1], v1[2]);
        this.vertices.push(v2[0], v2[1], v2[2]);
        this.vertices.push(v3[0], v3[1], v3[2]);

        let normal_signal = 1;
        if(num_vertex % 2 == 0) 
            normal_signal = -1;

        let angle = Math.PI/2;
        if(num_vertex != -1)
            angle = this.angles[num_vertex];
        

        this.normals.push(0, normal_signal*Math.sin(angle - Math.PI/2), normal_signal*Math.cos(angle - Math.PI/2));
        this.normals.push(0, normal_signal*Math.sin(angle - Math.PI/2), normal_signal*Math.cos(angle - Math.PI/2));
        this.normals.push(0, normal_signal*Math.sin(angle - Math.PI/2), normal_signal*Math.cos(angle - Math.PI/2));

        this.normals.push(0, -normal_signal*Math.sin(angle - Math.PI/2), -normal_signal*Math.cos(angle - Math.PI/2));
        this.normals.push(0, -normal_signal*Math.sin(angle - Math.PI/2), -normal_signal*Math.cos(angle - Math.PI/2));
        this.normals.push(0, -normal_signal*Math.sin(angle - Math.PI/2), -normal_signal*Math.cos(angle - Math.PI/2));

        this.indices.push(this.vertices.length/3 - 3, this.vertices.length/3 - 2, this.vertices.length/3 - 1);
        this.indices.push(this.vertices.length/3 - 4, this.vertices.length/3 - 5, this.vertices.length/3 - 6);

        this.texCoords.push(0, 0);
        this.texCoords.push(1, 0);
        this.texCoords.push(0, 1);
    }

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

    display() {
        // this.appearance.apply();
        super.display();
    }
}

// transform_vertix(v, num_vertex) {
//         // let midle_point = [old_vertices[0][0] + old_vertices[2][0], old_vertices[0][1] + old_vertices[2][1], old_vertices[0][2] + old_vertices[2][2]];
//         // let line_vector = [midle_point[0] - old_vertices[0], midle_point[1] - old_vertices[1], midle_point[2] - v[2]];

//         let signal = -1;
//         if(num_vertex % 2 == 0) 
//             signal = 1;

//         let angle = this.angles[num_vertex];
//         let dx = signal*(this.h/this.numTriangles);
//         let dy = Math.sin(angle) * 2*this.h;
//         let dz = Math.cos(angle) * 2*this.h;

//         // if(line_vector[0] < line_vector[1] && line_vector[0] < line_vector[2]) {
//         return [v[0]+dx, v[1]+dy, v[2]+dz];
//         // } else if(line_vector[1] < line_vector[0] && line_vector[1] < line_vector[2]) {
//         //     return [v[0]+dy, v[1]+dx, v[2]+dz];
//         // } else {
//         //     return [v[0]+dz, v[1]+dy, v[2]+dx];
//         // }
//     }


