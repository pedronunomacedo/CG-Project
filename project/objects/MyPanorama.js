import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {
	constructor(scene, CGFtex) {
		super(scene);

        this.scene = scene;
        this.CGFtex = CGFtex;
        this.sphere = new MySphere(this.scene, 16, 8);
        this.initObjects();
    }

	initObjects() {
        // Material only with ambiental light ("componente emissiva")
        this.tex = new CGFappearance(this.scene);
        this.tex.setAmbient(0.1, 0.1, 0.1, 1);
        // this.tex.setDiffuse(0.9, 0.9, 0.9, 1);
        // this.tex.setSpecular(0.1, 0.1, 0.1, 1);
        this.tex.setShininess(10.0);
        this.tex.setTexture(this.CGFtex);
        this.tex.setTextureWrap('REPEAT', 'REPEAT');
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLES;
	}

	setLineMode() { 
		this.primitiveType=this.scene.gl.LINE_STRIP;
	};

    setTexture(tex) {
        this.tex.setTexture(tex);
    }

    display() {
        this.scene.pushMatrix();
        this.tex.apply();
        this.scene.scale(200, 200, 200); // sphere radius = 200 with center = (0, 0, 0)
        this.sphere.display();
        this.scene.popMatrix();
    }
}


