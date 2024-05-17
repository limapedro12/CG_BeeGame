import { CGFappearance, CGFobject, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyPollen
 * 
 * Class representing half of a pollen grain
 * The half pollen grain is a half sphere with the pollen texture
 * 
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices around the x and z axis
 * @param stacks - Number of stacks around the y axis
 * @param radius - Radius of the pollen grain
 */
export class MyPollenPart extends CGFobject {
	constructor(scene, slices, stacks, radius) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
        this.radius = radius;

        this.texture = new CGFtexture(this.scene, "images/pollen.jpg");
		this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(0, 0, 0, 1.0);
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');
		this.initBuffers();
	}
	
    /**
     * Generates the vertices, indices, normals and texCoords
     * needed to draw the half pollen grain
     */
	get_vertices() {
        for(var stack = 0; stack <= this.stacks; stack++) {
            let delta_alpha = stack * Math.PI / (this.stacks*2);

            for(var slice = 0; slice <= this.slices; slice++) {
                let delta_beta = slice * 2 * Math.PI / this.slices;

                let x = this.radius * Math.cos(delta_beta) * Math.sin(delta_alpha);
                let y = this.radius * -Math.cos(delta_alpha);
                let z = this.radius * Math.sin(delta_beta) * Math.sin(delta_alpha);

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
    }

    /**
     * Initializes the pollen grain buffers
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
     * Display the half pollen grain
     */
    display() {
        this.appearance.apply();
        super.display();
    }
}
