import {CGFobject} from '/lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, tex1, tex2, tex3, tex4, tex5, tex6) {
		super(scene);
        this.myQuad = new MyQuad(scene);
        this.tex1 = tex1;
        this.tex2 = tex2;
        this.tex3 = tex3;
        this.tex4 = tex4;
        this.tex5 = tex5;
        this.tex6 = tex6;
	}
	
	display() {
        // upper side
        this.scene.quadMaterial.setTexture(this.tex1);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // bottom side
        this.scene.quadMaterial.setTexture(this.tex2);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // left side
        this.scene.quadMaterial.setTexture(this.tex3);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // right side
        this.scene.quadMaterial.setTexture(this.tex4);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // front side
        this.scene.quadMaterial.setTexture(this.tex5);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.myQuad.display();
        this.scene.popMatrix();

        // back side
        this.scene.quadMaterial.setTexture(this.tex6);
        this.scene.quadMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}

