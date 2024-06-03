
/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
//% groups=['Canvas', 'Drawing', 'Window', 'Shapes']
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

    /**
     * Creates a window to view a section of canvas.
     */
    //% block="create window to view $canvas"
    //% group="Window"
    //% blockSetVariable=window
    //% weight=52
    export function createWindow(canvas: Canvas): Window {
        return new Window();
    }
}

//% blockNamespace=graphics
class Canvas {
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
    public createSprite(): Sprite {
        return new Sprite();
    }
}

//% blockNamespace=graphics
class Sprite {
    _width: number = 0;
    _height: number = 0;
    _pixels: {[key: number]: {[key: number]: Pixel}} = {};

    constructor() {
    }

    //% blockCombine
    //% group="Drawing"
    get width() { return this._width }

    //% blockCombine
    //% group="Drawing"
    get height() { return this._height }

    //% block="$this pixel x$x y$y"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Drawing"
    public pixel(x: number, y: number) {
        if (x < 0 || x > this._width || this._pixels[x] == undefined || this._pixels[x][y] == undefined)
            return new Pixel(0, 0, 0)
        return this._pixels[x][y]
    }

    /**
     * Replace the current sprite graphics with a basic image.
     */
    //% block="set $this to image $image"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Drawing"
    public setImage(image: Image): void {
        this._width = image.width()
        this._height = image.height()
        this._pixels = {}
        for (let x = 0; x < image.width(); x++) {
            for (let y = 0; y < image.height(); y++) {
                if (image.pixel(x, y)) {
                    let b = image.pixelBrightness(x, y)
                    this.setPixel(x, y, b, b, b)
                } else {
                    this.setPixel(x, y, 0, 0, 0)
                }
            }
        }
    }

    setPixel(x: number, y: number, r: number, g: number, b: number): void {
        if (this._pixels[x] == undefined)
            this._pixels[x] = {}
        this._pixels[x][y] = new Pixel(r, g, b)
    }
}

//% blockNamespace=graphics
class Window {
    /**
     * Gets the differences between the last change request and this one.
     */
    //% block="get changes to $this"
    //% this.defl=window
    //% this.shadow=variables_get
    //% group="Window"
    //% weight=51
    public getChanges(): Change[] {
        return []
    }
}

//% blockNamespace=graphics
class Change {
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

//% blockNamespace=graphics
class Pixel {
    _r: number
    _g: number
    _b: number

    constructor(r: number, g: number, b: number) {
        this._r = this.constrain(r)
        this._g = this.constrain(g)
        this._b = this.constrain(b)
    }

    //% blockCombine
    //% group="Shapes"
    get red() { return this._r }

    //% blockCombine
    //% group="Shapes"
    get green() { return this._g }

    //% blockCombine
    //% group="Shapes"
    get blue() { return this._b }

    //% blockCombine
    //% group="Shapes"
    get brightness() { return Math.max(this.red, Math.max(this.green, this.blue)) }

    //% blockCombine
    //% group="Shapes"
    get on() { return this.red > 0 || this.green > 0 || this.blue > 0 }

    constrain(value: number) {
        return Math.constrain(value, 0, 255)
    }
}


