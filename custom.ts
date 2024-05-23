
/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
namespace graphics {

    //%
    export class Canvas {
        /**
         * Create a sprite to be displayed on the canvas.
         * It will initially be blank.  To be displayed it
         * must have something added to it.
         */
        //% block="add sprite to $this"
        //% blockSetVariable=sprite
        //% weight=8
        public createSprite(): Sprite {
            return new Sprite();
        }
    }

    //%
    export class Window {
        /**
         * Gets the differences between the last change request and this one.
         */
        //% block="get changes to $this"
        //% weight=6
        public getChanges(): void {
        }
    }

    //%
    export class Sprite {
        /**
         * Replace the current sprite graphics with a basic image.
         */
        //% block="replace $this image with $image"
        //% weight=6
        public setImage(image: Image): void {
        }
    }

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

    /**
     * Creates a window to view a section of canvas.
     */
    //% block="create window to view $canvas"
    //% blockSetVariable=window
    //% weight=10
    export function createWindow(canvas: Canvas): Window {
        return new Window();
    }
}
