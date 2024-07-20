enum GraphicsEventBusSource {
    GRAPHICS_ID_CANVAS = 1234
}

enum GraphicsEventBusValue {
    GRAPHICS_CANVAS_EVT_UPDATED = 1
}

/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
//% groups=['Canvas']
namespace canvas {
    /**
     * Canvas width
     */
    //% block="canvas width"
    //% weight=51
    //% group="Canvas"
    export function width(): number {
        return Canvas.canvas().width
    }

    /**
     * Canvas height
     */
    //% block="canvas height"
    //% group="Canvas"
    export function height(): number {
        return Canvas.canvas().height
    }
}

//% blockNamespace=canvas
class Canvas {
    private static globalCanvas: Canvas = undefined
    _width: number = 0;
    _height: number = 0;
    _sprites: Sprite[] = [];
    _windows: Window[] = [];
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0));

    static canvas(): Canvas {
        if (Canvas.globalCanvas === undefined)
            Canvas.globalCanvas = new Canvas(160, 128)
        return Canvas.globalCanvas
    }

    static forceReset(): void {
        Canvas.globalCanvas = undefined
    }

    constructor(width: number, height: number) {
        this._width = Math.constrain(width, 1, 1024)
        this._height = Math.constrain(height, 1, 768)
    }

    //% block="$this width"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Canvas"
    get width() { return this._width }

    //% block="$this height"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Canvas"
    //% weight=49
    get height() { return this._height }

    public createWindow(): Window {
        let window = new Window(this);
        this._windows.push(window);
        return window;
    }

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
    //% weight=51
    //% deprecated=true
    public createSprite(x?: number, y?: number): Sprite {
        let sprite = new Sprite(this, x !== undefined ? x : 0, y !== undefined ? y : 0);
        this._sprites.push(sprite);
        return sprite;
    }

    //% block="$this pixel x$x y$y"
    //% blockNamespace=graphics
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% group="Pixels"
    //% weight=49
    public pixel(x: number, y: number): Pixel {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return this._background_pixel;
        for (let i = this._sprites.length - 1; i >= 0; i--) {
            let sprite = this._sprites[i]
            if (x >= sprite.x && x < sprite.x + sprite.width &&
                y >= sprite.y && y < sprite.y + sprite.height) {
                return this._sprites[i].pixel(x - sprite.x, y - sprite.y)
            }
        }
        return this._background_pixel
    }

    public change(changelist: { x: number, y: number }[]): void {
        for (let i = 0; i < this._windows.length; i++) {
            this._windows[i].change(changelist)
        }
        control.raiseEvent(GraphicsEventBusSource.GRAPHICS_ID_CANVAS, GraphicsEventBusValue.GRAPHICS_CANVAS_EVT_UPDATED)
        graphics.processingTimer.stop()
        basic.pause(10)
        graphics.processingTimer.start()
    }
}

namespace canvas {
    export function forceReset(): void {
        Canvas.forceReset()
    }
}