
/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
//% groups=['Canvas', 'Drawing', 'Window']
namespace graphics {

    /**
     * Creates a canvas for use in a variable
     */
    //% block="create canvas $width by $height"
    //% group="Canvas"
    //% width.min=1 width.max=1024 width.defl=40
    //% height.min=1 height.max=768 height.defl=30
    //% blockSetVariable=canvas
    export function createCanvas(width: number, height: number): Canvas {
        return new Canvas();
    }

    //%
    export class Canvas {
        /**
         * Create a sprite to be displayed on the canvas.
         * It will initially be blank.  To be displayed it
         * must have something added to it.
         */
        //% block="add sprite to $this"
        //% this.defl=canvas
        //% this.shadow=variables_get
        //% blockSetVariable=sprite
        //% group="Drawing"
        //% weight=8
        public createSprite(): Sprite {
            return new Sprite();
        }
    }

    //%
    export class Sprite {
        _width: number = 0;
        _height: number = 0;

        constructor() {
        }

        //% blockCombine
        get width() { return this._width }

        //% blockCombine
        get height() { return this._height }

        /**
         * Replace the current sprite graphics with a basic image.
         */
        //% block="set $this to image $image"
        //% this.defl=sprite
        //% this.shadow=variables_get
        //% group="Drawing"
        //% weight=6
        public setImage(image: Image): void {
        }
    }

    /**
     * Creates a window to view a section of canvas.
     */
    //% block="create window to view $canvas"
    //% group="Window"
    //% blockSetVariable=window
    //% weight=10
    export function createWindow(canvas: Canvas): Window {
        return new Window();
    }

    //%
    export class Window {
        /**
         * Gets the differences between the last change request and this one.
         */
        //% block="get changes to $this"
        //% this.defl=window
        //% this.shadow=variables_get
        //% group="Window"
        //% weight=6
        public getChanges(): Change[] {
            return []
        }
    }
    
    //%
    export class Change {
        /**
         * Gets the individual pixels that have changed.
         */
        //% block="$this get pixels"
        //% this.defl=change
        //% this.shadow=variables_get
        //% group="Window"
        //% weight=5
        public getPixels(): Pixel[] {
            return []
        }
     }

    //%
    export class Pixel { }

}
