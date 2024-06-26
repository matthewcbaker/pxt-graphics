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
//% groups=['Canvas', 'Window', 'Changes', 'Sprites', 'Colours', 'Pixels']
namespace graphics {

    let _windows: Window[] = []

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
    //% canvas.defl=canvas
    //% canvas.shadow=variables_get
    //% group="Window"
    //% blockSetVariable=window
    //% weight=52
    export function createWindow(canvas: Canvas): Window {
        let window = canvas.createWindow();
        _windows.push(window);
        return window;
    }

    /**
     * Called whenever there are changes available
     */
    //% block="on window $change"
    //% group="Changes"
    //% weight=60
    //% draggableParameters="reporter"
    export function onWindowChange(handler: (change: Change) => void) {
        control.onEvent(GraphicsEventBusSource.GRAPHICS_ID_CANVAS, GraphicsEventBusValue.GRAPHICS_CANVAS_EVT_UPDATED, function () {
            for (let i = 0; i < _windows.length; i++) {
                let changes = _windows[i].changes();
                if (changes.pixels.length > 0)
                    handler(changes);
            }
            basic.pause(10)
        }, EventFlags.DropIfBusy)
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
    export function createSprite(canvas: Canvas, x?: number, y?: number) {
        return canvas.createSprite(x, y)
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
    _windows: Window[]  = [];
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
        let sprite = new Sprite(this, x !== undefined ? x : 0, y !== undefined ? x : 0);
        this._sprites.push(sprite);
        return sprite;
    }

    //% block="$this pixel x$x y$y"
    //% this.defl=canvas
    //% this.shadow=variables_get
    //% group="Pixels"
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
    }
}

//% blockNamespace=graphics
class Sprite {
    _x: number = 0
    _y: number = 0
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    _pixel_list: { x: number, y: number }[] = []
    _pixel_list_with_offsets: { x: number, y: number }[] = []
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))
    _callback: Canvas = null

    constructor(callback: Canvas, x: number, y: number) {
        this._x = x
        this._y = y
        this._callback = callback
    }

    //% blockCombine
    //% group="Sprites"
    get x() { return this._x }

    //% blockCombine
    //% group="Sprites"
    set x(x: number) {
        let old_offset_list = this._pixel_list_with_offsets
        this._x = x;
        this.updatePixelListWithOffsets()
        this._callback.change(old_offset_list.concat(this._pixel_list_with_offsets))
    }

    //% blockCombine
    //% group="Sprites"
    get y() { return this._y }

    //% blockCombine
    //% group="Sprites"
    set y(y: number) {
        let old_offset_list = this._pixel_list_with_offsets
        this._y = y;
        this.updatePixelListWithOffsets()
        this._callback.change(old_offset_list.concat(this._pixel_list_with_offsets))
    }

    //% blockCombine
    //% group="Sprites"
    get width() { return this._width }

    //% blockCombine
    //% group="Sprites"
    get height() { return this._height }

    //% block="$this pixel x$x y$y"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Pixels"
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
    //% group="Sprites"
    public setImage(image: Image, colour?: Colour): void {
        this._width = image.width()
        this._height = image.height()
        this._pixels = {}
        this._pixel_list = []
        let old_offset_list = this._pixel_list_with_offsets
        for (let x = 0; x < image.width(); x++) {
            for (let y = 0; y < image.height(); y++) {
                if (image.pixel(x, y)) {
                    if (colour === undefined) {
                        let b = image.pixelBrightness(x, y)
                        this.setPixel(x, y, Colour.create(b, b, b))
                    } else {
                        this.setPixel(x, y, colour)
                    }
                    this._pixel_list.push({'x': x, 'y': y})
                }
            }
        }
        this.updatePixelListWithOffsets()
        this._callback.change(old_offset_list.concat(this._pixel_list_with_offsets))
    }

    setPixel(x: number, y: number, colour: Colour): void {
        if (this._pixels[x] == undefined)
            this._pixels[x] = {}
        this._pixels[x][y] = new Pixel(colour)
    }
    
    private updatePixelListWithOffsets() {
        this._pixel_list_with_offsets = []
        for (let p of this._pixel_list) {
            this._pixel_list_with_offsets.push({'x': this.x + p.x, 'y': this.y + p.y})
        }
    }
}

//% blockNamespace=graphics
class Window {
    _canvas: Canvas
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))
    _changelist: { x: number, y: number }[] = []
    _no_change: Change = new Change()

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
    //% group="Pixels"
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
    //% group="Changes"
    //% weight=51
    //% deprecated=true
    public changes(): Change {
        if (this._changelist.length == 0)
            return this._no_change
        let changes = this._changelist
        this._changelist = []
        return this.calculateChanges(changes)
    }

    private removeDuplicates(changelist: {x: number, y: number}[]): {x: number, y: number}[] {
        let newlist: {x: number, y: number}[] = []
        let contains: { [key: number]: { [key: number]: boolean } } = {}
        for (let ch of changelist) {
            if (contains[ch.x] == undefined)
                contains[ch.x] = {}
            if (contains[ch.x][ch.y] == undefined) {
                contains[ch.x][ch.y] = true
                newlist.push(ch)
            }
        }
        return newlist
    }

    private calculateChanges(changelist: {x: number, y: number}[]) {
        let change = new Change()
        let pixel = null
        changelist = this.removeDuplicates(changelist)
        for (let ch of changelist) {
            let x = ch.x
            let y = ch.y
            if (this._pixels[x] == undefined)
                this._pixels[x] = {}
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
        return change
    }

    public change(changelist: { x: number, y: number }[]): void {
        for (let change of changelist)
            this._changelist.push(change)
    }
}

//% blockNamespace=graphics
class Change {
    _pixels: PixelChange[] = [];

    constructor() {
    }

    //% blockCombine
    //% group="Changes"
    get pixels() { return this._pixels }

    addPixel(x: number, y: number, pixel: Pixel): void {
        this._pixels.push(new PixelChange(x, y, pixel))
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
    //% group="Changes"
    get x() { return this._x }

    //% blockCombine
    //% group="Changes"
    get y() { return this._y }

    //% blockCombine
    //% group="Changes"
    get red() { return this._pixel.red }

    //% blockCombine
    //% group="Changes"
    get green() { return this._pixel.green }

    //% blockCombine
    //% group="Changes"
    get blue() { return this._pixel.blue }

    //% blockCombine
    //% group="Changes"
    get brightness() { return this._pixel.brightness }

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
    //% group="Pixels"
    get red() { return this._colour.red }

    //% blockCombine
    //% group="Pixels"
    get green() { return this._colour.green }

    //% blockCombine
    //% group="Pixels"
    get blue() { return this._colour.blue }

    //% blockCombine
    //% group="Pixels"
    get brightness() { return this._colour.brightness }

    get colour() { return this._colour }
}

//% blockNamespace=graphics
class Colour {
    private static cache: { [key: number]: { [key: number]: { [key: number]: Colour } } } = {}
    _r: number
    _g: number
    _b: number

    static create(r: number, g: number, b: number): Colour {
        if (Colour.cache[r] == undefined)
            Colour.cache[r] = {}
        if (Colour.cache[r][g] == undefined)
            Colour.cache[r][g] = {}
        if (Colour.cache[r][g][b] == undefined)
            Colour.cache[r][g][b] = new Colour(r, g, b)
        return Colour.cache[r][g][b]
    }

    constructor(r: number, g: number, b: number) {
        this._r = this._constrain(r)
        this._g = this._constrain(g)
        this._b = this._constrain(b)
    }

    get red() { return this._r }

    get green() { return this._g }

    get blue() { return this._b }

    get brightness() { return Math.max(this.red, Math.max(this.green, this.blue)) }

    _constrain(value: number) {
        return Math.constrain(value, 0, 255)
    }
}