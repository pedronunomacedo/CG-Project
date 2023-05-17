import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
import { MyQuad } from './MyQuad.js';

export class MyTreeGroupPatch extends CGFobject {
	constructor(scene, terrainY) {
		super(scene);
        
        this.tree = new MyBillboard(scene);
        this.numTrees = 9;
        this.distance = 15;
        this.terrainY = terrainY;

        this.randomTextures = Array.from({length : this.numTrees}, () => Math.floor(Math.random() * (this.tree.numTextures - 1)));
	}

    
	display() {
        var texIndex = 0;
        for (var i = 0; i < Math.sqrt(this.numTrees); i++) {
            for (var j = 0; j < Math.sqrt(this.numTrees); j++) {
                this.tree.display(-25 + (j * this.distance) + this.randomTextures[texIndex], this.terrainY + 4, 50 + (i * this.distance) + this.randomTextures[texIndex], this.randomTextures[texIndex]);
                texIndex++;
            } 
        }
	}
}