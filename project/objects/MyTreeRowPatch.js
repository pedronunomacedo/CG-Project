import { CGFobject, CGFappearance, CGFshader, CGFtexture } from '../../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';
import { MyQuad } from './MyQuad.js';

export class MyTreeRowPatch extends CGFobject {
	constructor(scene, terrainY) {
		super(scene);
        
        this.tree = new MyBillboard(scene);
        this.numTrees = 6;
        this.distance = 10;
        this.terrainY = terrainY;

        this.randomTextures = Array.from({length : this.numTrees}, () => Math.floor(Math.random() * this.tree.numTextures));
	}

    
	display() {
        for (var i = 0; i < this.numTrees; i++) {
            this.tree.display(20 + (i * this.distance) + this.randomTextures[i], this.terrainY + 4, 80, this.randomTextures[i]);
        }
	}
}