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
namespace canvases {
    /**
     * Creates a canvas for use in a variable
     */
    //% block="create canvas $width by $height"
    //% blockNamespace=graphics
    //% group="Canvases"
    //% width.min=1 width.max=1024 width.defl=40
    //% height.min=1 height.max=768 height.defl=30
    //% blockSetVariable=canvas
    //% weight=52
    export function createCanvas(width: number, height: number): Canvas {
        return new Canvas(width, height);
    }

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

//% blockNamespace=canvases
class Canvas {
    private static globalCanvas: Canvas = undefined
    _width: number = 0;
    _height: number = 0;
    _sprites: Sprite[] = [];
    _windows: Window[] = [];
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0));

    //% block="global canvas"
    //% blockNamespace=graphics
    //% group="Canvases"
    //% weight=80
    static canvas(): Canvas {
        if (Canvas.globalCanvas === undefined)
            Canvas.globalCanvas = new Canvas(160, 128)
        return Canvas.globalCanvas
    }

    static forceReset(): void {
        Canvas.globalCanvas = undefined
        let forceGlobalCreation = Canvas.canvas()
    }

    constructor(width: number, height: number) {
        this._width = Math.constrain(width, 1, 1024)
        this._height = Math.constrain(height, 1, 768)
    }

    //% block="$this width"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Canvases"
    get width() { return this._width }

    //% block="$this height"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Canvases"
    //% weight=49
    get height() { return this._height }

    public createWindow(): Window {
        let window = new Window(this);
        this._windows.push(window);
        for (let i = 0; i < this._sprites.length; i++) {
            window.change(this._sprites[i].pixelList(true))
        }
        return window;
    }

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
                let current = this._sprites[i].pixel(x - sprite.x, y - sprite.y)
                if (!current.transparent)
                    return current
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

namespace canvases {
    export function forceReset(): void {
        Canvas.forceReset()
    }
}