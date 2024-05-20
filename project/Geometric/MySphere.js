import {CGFobject} from '../../lib/CGF.js';
/**
 * MySphere
 * Represents a sphere, with the possibility of specifying if it is to be seen from the inside or the outside
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices around the sphere
 * @param stacks - number of stacks along the sphere
 * @param radius - radius of the sphere
 * @param inverted - boolean that specifies whether the sphere is to be seen from the inside
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, radius, inverted = false) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
        this.radius = radius;

        this.inverted = inverted;

		this.initBuffers();
	}
	
	get_vertices() {
        for(var stack = 0; stack <= this.stacks; stack++) {
            let delta_alpha = stack * Math.PI / this.stacks;

            for(var slice = 0; slice <= this.slices; slice++) {
                let delta_beta = slice * 2 * Math.PI / this.slices;

                let x = this.radius * Math.cos(delta_beta) * Math.sin(delta_alpha);
                let y = this.radius * -Math.cos(delta_alpha);
                let z = this.radius * Math.sin(delta_beta) * Math.sin(delta_alpha);

                this.vertices.push(x, y, z);

                let normal_len = Math.sqrt(x**2 + y**2 + z**2);
                
                if (this.inverted) this.normals.push(-x/normal_len, -y/normal_len, -z/normal_len);
                else this.normals.push(x/normal_len, y/normal_len, z/normal_len);

                this.texCoords.push(-slice / this.slices, -stack / this.stacks);
            }
        }

        for(var stack = 0; stack < this.stacks; stack++) {
            for(var slice = 0; slice < this.slices; slice++) {
                let point1 = (stack * (this.slices + 1)) + slice;
                let point2 = point1 + this.slices + 1;

                if (this.inverted) {
                    this.indices.push(point2, point1, point1 + 1);
                    this.indices.push(point2 + 1, point2, point1 + 1);
                } else {
                    this.indices.push(point1, point2, point1 + 1);
                    this.indices.push(point2, point2 + 1, point1 + 1);
                }
            }
        }
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
}
