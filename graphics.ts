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
     * Create a sprite to be displayed on the canvas.
     * It will initially be blank.  To be displayed it
     * must have something added to it.
     */
    //% block="add sprite to $canvas||at x$x y$y"
    //% canvas.defl=canvas
    //% canvas.shadow=variables_get
    //% expandableArgumentMode=toggle
    //% blockSetVariable=sprite
    //% group="Sprites"
    //% weight=51
    //% deprecated=true
    export function createSprite(canvas: Canvas, x?: number, y?: number) {
        return canvas.createSprite(x, y)
    }

    //% block="red$r green$g blue$b"
    //% group="Colours"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    //% deprecated=true
    export function createColourRGB(r: number, g: number, b: number) {
        return Colour.create(r, g, b)
    }

    //% block="$colour"
    //% group="Colours"
    //% colour.shadow="colorNumberPicker"
    //% deprecated=true
    export function createColourHex(colour: number) {
        return Colour.create(5, 5, 5)
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
        canvas.forceReset()
        windows.forceReset()
    }
}
