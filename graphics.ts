/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
//% groups=['Canvas', 'Sprites', 'Colours']
//% advanced=true
namespace graphics {

    export let processingTimer: Timer = new Timer()

    /**
     * Creates a canvas for use in a variable
     */
    //% block="create canvas $width by $height"
    //% group="Canvas"
    //% width.min=1 width.max=1024 width.defl=40
    //% height.min=1 height.max=768 height.defl=30
    //% blockSetVariable=canvas
    //% weight=52
    //% deprecated=true
    export function createCanvas(width: number, height: number): Canvas {
        return new Canvas(width, height);
    }

    /**
     * Find out how much time has been spent processing graphics activity
     */
    //% block="graphics processing time (ms)"
    //% blockNamespace=graphics
    //% group="Performance"
    export function processingTime() {
        return processingTimer.milliseconds
    }

    export function forceReset(): void {
        canvases.forceReset()
        windows.forceReset()
    }
}

graphics.forceReset()