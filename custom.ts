
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
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0));

    constructor(width: number, height: number) {
        this._width = Math.constrain(width, 1, 1024)
        this._height = Math.constrain(height, 1, 768)
    }

    //% blockCombine
    //% group="Canvas"
    get width() { return this._width }

    //% blockCombine
    //% group="Canvas"
    get height() { return this._height }

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
}

//% blockNamespace=graphics
class Sprite {
    _x: number = 0
    _y: number = 0
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    //% blockCombine
    //% group="Drawing"
    get x() { return this._x }

    //% blockCombine
    //% group="Drawing"
    set x(x: number) { this._x = x }

    //% blockCombine
    //% group="Drawing"
    get y() { return this._y }

    //% blockCombine
    //% group="Drawing"
    set y(y: number) { this._y = y }

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
            return this._background_pixel
        if (this._pixels[x] == undefined || this._pixels[x][y] == undefined)
            return this._background_pixel
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
        this._width = image.width()
        this._height = image.height()
        this._pixels = {}
        for (let x = 0; x < image.width(); x++) {
            for (let y = 0; y < image.height(); y++) {
                if (image.pixel(x, y)) {
                    if (colour === undefined) {
                        let b = image.pixelBrightness(x, y)
                        this.setPixel(x, y, Colour.create(b, b, b))
                    } else {
                        this.setPixel(x, y, colour)
                    }
                } else {
                    this.setPixel(x, y, Colour.create(0, 0, 0))
                }
            }
        }
    }

    setPixel(x: number, y: number, colour: Colour): void {
        if (this._pixels[x] == undefined)
            this._pixels[x] = {}
        this._pixels[x][y] = new Pixel(colour)
    }
}

//% blockNamespace=graphics
class Window {
    _canvas: Canvas
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))

    constructor(canvas: Canvas) {
        this._canvas = canvas
        this._width = canvas._width
        this._height = canvas._height
    }

    //% blockCombine
    //% group="Window"
    get width() { return this._width }

    //% blockCombine
    //% group="Window"
    get height() { return this._height }

    //% block="$this pixel x$x y$y"
    //% this.defl=window
    //% this.shadow=variables_get
    //% group="Window"
    public pixel(x: number, y: number) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return this._background_pixel
        if (this._pixels[x] == undefined || this._pixels[x][y] == undefined)
            return this._background_pixel
        return this._pixels[x][y]
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
                    if (pixel.colour.brightness > 0) {
                        change.addPixel(x, y, pixel)
                        this._pixels[x][y] = pixel
                    }
                } else if (
                    this._pixels[x][y].colour.red != pixel.colour.red ||
                    this._pixels[x][y].colour.green != pixel.colour.green ||
                    this._pixels[x][y].colour.blue != pixel.colour.blue
                ) {
                    change.addPixel(x, y, pixel)
                    if (pixel.colour.brightness > 0)
                        this._pixels[x][y] = pixel
                    else
                        delete this._pixels[x][y]
                }
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
    _pixels: PixelChange[] = [];

    constructor() {
    }

    //% blockCombine
    //% group="Window"
    get pixels() { return this._pixels }

    addPixel(x: number, y: number, pixel: Pixel): void {
        this._pixels.push(new PixelChange(x, y, pixel))
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
class PixelChange {
    _x: number
    _y: number
    _pixel: Pixel

    constructor(x: number, y: number, pixel: Pixel) {
        this._x = x
        this._y = y
        this._pixel = pixel
    }

    //% blockCombine
    //% group="Shapes"
    get x() { return this._x }

    //% blockCombine
    //% group="Shapes"
    get y() { return this._y }

    //% blockCombine
    //% group="Shapes"
    get colour() { return this._pixel.colour }
}

//% blockNamespace=graphics
class Pixel {
    //_x: number
    //_y: number
    _colour: Colour

    //constructor(x: number, y: number, colour: Colour) {
    constructor(colour: Colour) {
        //this._x = x
        //this._y = y
        this._colour = colour
    }

    //% blockCombine
    //% group="Shapes"
    //get x() { return this._x }

    //% blockCombine
    //% group="Shapes"
    //get y() { return this._y }

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