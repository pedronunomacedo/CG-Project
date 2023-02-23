import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        // Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'showDiamond').name("Show Diamond");
        this.gui.add(this.scene, 'showTriangle').name("Show Triangle");
        this.gui.add(this.scene, 'showParallelogram').name("Show Parallel");
        this.gui.add(this.scene, 'showTriangleSmall').name("Show Tri Small");
        this.gui.add(this.scene, 'showTriangleBig').name("Show Tri Big");

        // Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}