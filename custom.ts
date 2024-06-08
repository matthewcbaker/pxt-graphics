
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
    //% weight=52
    export function createCanvas(width: number, height: number): Canvas {
        return new Canvas(width, height);
    }

    /**
     * Creates a window to view a section of canvas.
     */
    //% block="create window to view $canvas"
    //% group="Window"
    //% blockSetVariable=window
    //% weight=52
    export function createWindow(canvas: Canvas): Window {
        return new Window(canvas);
    }

    //% block="red$r green$g blue$b"
    //% group="Colours"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    export function createColourRGB(r: number, g: number, b: number) {
        return Colour.create(r, g, b)
    }

    //% block="$colour"
    //% group="Colours"
    //% colour.shadow="colorNumberPicker"
    export function createColourHex(colour: number) {
        return Colour.create(5, 5, 5)
    }
}

//% blockNamespace=graphics
class Canvas {
    _width: number = 0;
    _height: number = 0;
    _sprites: Sprite[] = [];
    _background_colour: Colour = Colour.create(0, 0, 0);

    constructor(width: number, height: number) {
        this._width = Math.constrain(width, 1, 1024)
        this._height = Math.constrain(height, 1, 768)
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
    public createSprite(): Sprite {
        let sprite = new Sprite(0, 0);
        this._sprites.push(sprite);
        return sprite;
    }

    //% block="$this pixel x$x y$y"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% group="Canvas"
    public pixel(x: number, y: number) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return new Pixel(x, y, this._background_colour);
        for (let i = 0; i < this._sprites.length; i++) {
            return this._sprites[i].pixel(x, y)
        }
        return new Pixel(x, y, this._background_colour)
    }
}

//% blockNamespace=graphics
class Sprite {
    _x: number = 0
    _y: number = 0
    _width: number = 0;
    _height: number = 0;
    _pixels: {[key: number]: {[key: number]: Pixel}} = {};

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    //% blockCombine
    //% group="Drawing"
    get x() { return this._x }

    //% blockCombine
    //% group="Drawing"
    get y() { return this._y }

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
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return new Pixel(x, y, Colour.create(0, 0, 0))
        if (this._pixels[x] == undefined || this._pixels[x][y] == undefined)
            return new Pixel(x, y, Colour.create(0, 0, 0))
        return this._pixels[x][y]
    }

    /**
     * Replace the current sprite graphics with a basic image.
     */
    //% block="set $this to image $image||with colour $colour"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% expandableArgumentMode=enabled
    //% group="Drawing"
    public setImage(image: Image, colour?: Colour): void {
        if (colour === undefined) colour = Colour.create(0, 0, 0)
        this._width = image.width()
        this._height = image.height()
        this._pixels = {}
        for (let x = 0; x < image.width(); x++) {
            for (let y = 0; y < image.height(); y++) {
                if (image.pixel(x, y)) {
                    let b = image.pixelBrightness(x, y)
                    this.setPixel(x, y, colour)
                } else {
                    this.setPixel(x, y, Colour.create(0, 0, 0))
                }
            }
        }
    }

    setPixel(x: number, y: number, colour: Colour): void {
        if (this._pixels[x] == undefined)
            this._pixels[x] = {}
        this._pixels[x][y] = new Pixel(x, y, colour)
    }
}

//% blockNamespace=graphics
class Window {
    _canvas: Canvas
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};

    constructor(canvas: Canvas) {
        this._canvas = canvas
        this._width = canvas._width
        this._height = canvas._height
    }

    /**
     * Gets the differences between the last change request and this one.
     */
    //% block="$this changes"
    //% this.defl=window
    //% this.shadow=variables_get
    //% blockSetVariable=change
    //% group="Window"
    //% weight=51
    public changes(): Change {
        let change = new Change()
        let pixel = null
        for (let x = 0; x < this._width; x++) {
            if (this._pixels[x] == undefined)
                this._pixels[x] = {}
            for (let y = 0; y < this._height; y++) {
                pixel = this._canvas.pixel(x, y)
                if (this._pixels[x][y] == undefined) {
                    change.addPixel(pixel)
                } else if (
                    this._pixels[x][y].colour.red != pixel.colour.red ||
                    this._pixels[x][y].colour.green != pixel.colour.green ||
                    this._pixels[x][y].colour.blue != pixel.colour.blue
                    ) {
                    change.addPixel(pixel)
                }
                this._pixels[x][y] = pixel
            }
        }
        return change
    }

    /**
     * Gets the differences between the last change request and this one.
     */
    //% block="get changes to $this"
    //% this.defl=window
    //% this.shadow=variables_get
    //% group="Window"
    //% weight=51
    //% deprecated=true
    public getChanges(): Change[] {
        return []
    }
}

//% blockNamespace=graphics
class Change {
    _pixels: Pixel[] = [];

    constructor() {
    }
    
    //% blockCombine
    //% group="Window"
    get pixels() { return this._pixels }

    addPixel(pixel: Pixel): void {
        this._pixels.push(pixel)
    }

    /**
     * Gets the individual pixels that have changed.
     */
    //% block="$this get pixels"
    //% this.defl=change
    //% this.shadow=variables_get
    //% group="Window"
    //% weight=5
    //% deprecated=true
    public getPixels(): Pixel[] {
        return []
    }
}

//% blockNamespace=graphics
class Pixel {
    _x: number
    _y: number
    _colour: Colour

    constructor(x: number, y: number, colour: Colour) {
        this._x = x
        this._y = y
        this._colour = colour
    }

    //% blockCombine
    //% group="Shapes"
    get x() { return this._x }

    //% blockCombine
    //% group="Shapes"
    get y() { return this._y }

    //% blockCombine
    //% group="Shapes"
    get colour() { return this._colour }
}

//% blockNamespace=graphics
class Colour {
    _r: number
    _g: number
    _b: number

    static create(r: number, g: number, b: number): Colour {
        return new Colour(r, g, b)
    }

    constructor(r: number, g: number, b: number) {
        this._r = this._constrain(r)
        this._g = this._constrain(g)
        this._b = this._constrain(b)
    }

    //% blockCombine
    //% group="Colours"
    get red() { return this._r }

    //% blockCombine
    //% group="Colours"
    get green() { return this._g }

    //% blockCombine
    //% group="Colours"
    get blue() { return this._b }

    //% blockCombine
    //% group="Colours"
    get brightness() { return Math.max(this.red, Math.max(this.green, this.blue)) }

    _constrain(value: number) {
        return Math.constrain(value, 0, 255)
    }
}
