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
        this.gui.add(this.scene, 'enableAnimation').name('Enable Animation');

        // Slider element in GUI
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        // Controls garden dimension
        this.gui.add(this.scene, 'gardenLins', [1, 2, 3, 4, 5]).name('Garden lines');
        this.gui.add(this.scene, 'gardenCols', [1, 2, 3, 4, 5]).name('Garden columns');

        this.initKeys();

        return true;
    }

    /**
     * Used to setup key pressing processing.
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {};
        this.activeKeys = {};
    }

    /**
     * Handles events where a key is pressed.
     * @param event - Key pressing event
     */
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    /**
     * Handles events where a key is let go.
     * @param event - Key let go event
     */
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    /**
     * Returns whether a key is pressed at a given moment.
     * @param keyCode - Desired keyCode
     */
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
