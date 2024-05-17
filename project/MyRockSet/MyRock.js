import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';
/**
 * MyRock
 * 
 * Class representing a single rock
 * The rock is a flattened sphere with each vertex randomly displaced
 * Also its height is randomly generated, between 0.2 and 0.7 times the radius
 * In x and z axis the rock has a radius of radius
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices  - Number of slices around the x and z axis
 * @param stacks - Number of stacks around the y axis
 * @param radius - Radius of the rock (in x and z axis)
 */
export class MyRock extends CGFobject {
	constructor(scene, radius) {
		super(scene);

		this.slices = 10;
		this.stacks = 10;
        this.radius = radius;

        this.height_factor = Math.random() * 0.5 + 0.2;

        this.texture = new CGFtexture(this.scene, "images/rock.jpg");
		this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(1, 1, 1, 1.0);
        this.material.setSpecular(1, 1, 1, 1.0);
		this.material.setTexture(this.texture);
		this.material.setTextureWrap('REPEAT', 'REPEAT');

		this.initBuffers();
	}
	
    /**
     * Generates the vertices, indices, normals and texCoords
     * needed to draw the rock
     */
	get_vertices() {
        for(var stack = 0; stack <= this.stacks; stack++) {
            let delta_alpha = stack * Math.PI / this.stacks;

            for(var slice = 0; slice <= this.slices; slice++) {
                let newRadius = this.radius - (Math.random() - 0.5) * this.radius * 0.4;
                let delta_beta = slice * 2 * Math.PI / this.slices;

                let x = newRadius * Math.cos(delta_beta) * Math.sin(delta_alpha);
                let y = newRadius * -Math.cos(delta_alpha);
                let z = newRadius * Math.sin(delta_beta) * Math.sin(delta_alpha);

                this.vertices.push(x, y, z);

                let normal_len = Math.sqrt(x**2 + y**2 + z**2);
                
                this.normals.push(x/normal_len, y/normal_len, z/normal_len);

                this.texCoords.push(-slice / this.slices, -stack / this.stacks);
            }
        }

        for(var stack = 0; stack < this.stacks; stack++) {
            for(var slice = 0; slice < this.slices; slice++) {
                let point1 = (stack * (this.slices + 1)) + slice;
                let point2 = point1 + this.slices + 1;

                this.indices.push(point1, point2, point1 + 1);
                this.indices.push(point2, point2 + 1, point1 + 1);
            }
        }
        for(var stack = 0; stack < this.stacks; stack++) {
            let point1 = (stack * (this.slices + 1));
            let point2 = point1 + this.slices + 1;

            this.indices.push(point1, point1 + this.slices, point2);
            this.indices.push(point2 + this.slices,point2,  point1 + this.slices);
        }
    }

    /**
     * Initializes the rock buffers
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

    /**
     * Returns the height of the rock
     * @returns height of the rock
     */
    height() {
        return (this.vertices[this.vertices.length - 2] - this.vertices[1]) * this.height_factor;
    }

    /**
     * Displays the rock
     */
    display() {
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(1, this.height_factor, 1);
        super.display();
        this.scene.popMatrix();
    }
}
