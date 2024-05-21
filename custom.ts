
/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
namespace graphics {

    //%
    export class Canvas {
        /**
         * Create a window to view a section of canvas
         */
        //% block="add window to $this"
        //% blockSetVariable=window
        //% weight=10
        public createWindow(): Window {
            return new Window();
        }
    }

    //%
    export class Window { }

    //%
    export class Sprite { }

    //%
    export class Change { }

    //%
    export class Pixel { }

    /**
     * Creates a canvas for use in a variable
     */
    //% block="create canvas $width by $height"
    //% width.min=1 width.max=1024 width.defl=40
    //% height.min=1 height.max=768 height.defl=30
    //% blockSetVariable=canvas
    export function createCanvas(width: number, height: number): Canvas {
        return new Canvas();
    }
}
