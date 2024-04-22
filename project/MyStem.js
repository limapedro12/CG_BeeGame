import {CGFobject, CGFtexture, CGFappearance} from '../lib/CGF.js';
import { MyCilinder } from './MyCilinder.js';
import { MyLeaf } from './MyLeaf.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius
 * @param nCilinders
 */
export class MyStem extends CGFobject {
	constructor(scene, radius, nCilinders) {
		super(scene);
		this.scene = scene;
		this.radius = radius;
		this.nCilinders = nCilinders;
        this.height = 0;
		
		this.mainTexture = new CGFtexture(this.scene, "images/stem.png");
		this.mainAppearance = new CGFappearance(this.scene);
		this.mainAppearance.setTexture(this.mainTexture);
		this.mainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.leafTexture = new CGFtexture(this.scene, "images/leaf.jpg");
		this.leafAppearance = new CGFappearance(this.scene);
		this.leafAppearance.setTexture(this.leafTexture);
		this.leafAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.cilinders = [];
        this.cilindersHeights = [];
        this.cilindersXTrans = [];
        this.cilindersYTrans = [];

        for (var i = 0; i < nCilinders; i++) {
            this.cilinders.push(new MyCilinder(scene, 10, 10, radius));
            let height = Math.random() * 4 + 1;
            let xTrans = Math.random() * this.radius/3 - this.radius/3;
            let yTrans = Math.random() * this.radius/3 - this.radius/3;
            this.cilindersHeights.push(height);
            this.height += height;
            this.cilindersXTrans.push(xTrans);
            this.cilindersYTrans.push(yTrans);
        }

        this.leaves = [];
        this.leavesAngles = [];
        for (var i = 0; i < nCilinders-1; i++) {
            let leafStemRadius = Math.random() * 0.1 + 0.1;
            let leafStemSize = this.radius +(Math.random() * 0.4 + 0.4);
            let leafRadius = Math.random() * 0.3 + 0.3;
            let angle = Math.random() * 2*Math.PI; 
            /* This is the angle with which the leaf's diamond rotates around the leaf's stem axis,
            not to be confused with the angle that the entire leaf rotates around the flower's stem axis. */

            let leaf = new MyLeaf(scene, leafStemRadius, leafStemSize, leafRadius, angle);
            let leafAngle = Math.random() * 2*Math.PI;

            this.leaves.push(leaf);
            this.leavesAngles.push(leafAngle);
        }
	}
	
	display() {
        var heightSum = 0;
        for (var i = 0; i < this.nCilinders; i++) {
            let cilinder = this.cilinders[i];
            let height = this.cilindersHeights[i];
            let xTrans = this.cilindersXTrans[i];
            let yTrans = this.cilindersYTrans[i];

            this.scene.pushMatrix();
            this.scene.translate(xTrans, yTrans, heightSum);
            this.scene.scale(1, 1, height);
            this.mainAppearance.apply();
            cilinder.display();
            this.scene.popMatrix();

            heightSum += height;
        }

        heightSum = 0;
        for (var i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];
            let leafAngle = this.leavesAngles[i];
            let upperCilinderHeight = this.cilindersHeights[i];
            heightSum += upperCilinderHeight;

            this.scene.pushMatrix();
            this.scene.translate(0, 0, heightSum);
            this.scene.rotate(leafAngle, 0, 0, 1);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.leafAppearance.apply();
            leaf.display();
            this.scene.popMatrix();
        }
	}
}
