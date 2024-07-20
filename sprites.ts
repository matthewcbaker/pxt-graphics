/**
 * Sprites
 */
//% weight=9 color="#de26a7" icon="\uf2bd"
//% groups=['Create', 'Sprites', 'Interaction', 'Colours']
namespace sprites {
    /**
     * Create a sprite to be displayed on the canvas.
     * It will initially be blank.  To be displayed it
     * must have something added to it.
     */
    //% block="add sprite at x$x y$y"
    //% canvas.defl=canvas
    //% canvas.shadow=variables_get
    //% blockSetVariable=sprite
    //% group="Create"
    //% weight=51
    export function createSprite(x: number, y: number) {
        return Canvas.canvas().createSprite(x, y)
    }

    /**
     * Create a sprite to be displayed on the canvas.
     * It will initially be blank.  To be displayed it
     * must have something added to it.
     */
    //% block="add sprite to $canvas at x$x y$y"
    //% canvas.defl=canvas
    //% canvas.shadow=variables_get
    //% blockSetVariable=sprite
    //% blockNamespace=graphics
    //% group="Sprites"
    //% weight=51
    export function createSpriteOnCanvas(canvas: Canvas, x: number, y: number) {
        return canvas.createSprite(x, y)
    }
}

//% blockNamespace=sprites
class Sprite {
    _x: number = 0
    _y: number = 0
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    private constraint: { [key: string]: number } = undefined
    _pixel_list: { x: number, y: number }[] = []
    _pixel_list_with_offsets: { x: number, y: number }[] = []
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))
    private canvas: Canvas = null

    constructor(canvas: Canvas, x: number, y: number) {
        this._x = x
        this._y = y
        this.canvas = canvas
    }

    //% blockCombine
    //% group="Sprites"
    get x() { return this._x }

    //% blockCombine
    //% group="Sprites"
    set x(x: number) {
        this.setPosition(x, this.y)
    }

    //% blockCombine
    //% group="Sprites"
    get y() { return this._y }

    //% blockCombine
    //% group="Sprites"
    set y(y: number) {
        this.setPosition(this.x, y)
    }

    /**
     * Set the X and Y positions at the same time.
     */
    //% block="set $this position to x$x y$y"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Sprites"
    //% weight=50
    public setPosition(x: number, y: number) {
        if (this.constraint) {
            x = Math.constrain(x, this.constraint.x, this.constraint.x + this.constraint.width - this.width)
            y = Math.constrain(y, this.constraint.y, this.constraint.y + this.constraint.height - this.height)
        }
        if (this._x == x && this._y == y)
            return
        graphics.processingTimer.start()
        let old_offset_list = this._pixel_list_with_offsets
        this._x = x;
        this._y = y;
        this.update(old_offset_list)
        graphics.processingTimer.stop()
    }

    /**
     * Change the X and Y positions at the same time.
     */
    //% block="change $this position by x$x y$y"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Sprites"
    //% weight=50
    public changePosition(x: number, y: number) {
        this.setPosition(this.x + x, this.y + y)
    }

    //% blockCombine
    //% group="Sprites"
    get width() { return this._width }

    //% blockCombine
    //% group="Sprites"
    get height() { return this._height }

    //% block="$this pixel x$x y$y"
    //% blockNamespace=graphics
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

    public pixelList(offsets: boolean): { x: number, y: number }[] {
        if (offsets)
            return this._pixel_list_with_offsets
        else
            return this._pixel_list
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
                    this._pixel_list.push({ 'x': x, 'y': y })
                }
            }
        }
        this.update(old_offset_list)
    }

    setPixel(x: number, y: number, colour: Colour): void {
        if (this._pixels[x] == undefined)
            this._pixels[x] = {}
        this._pixels[x][y] = new Pixel(colour)
    }

    private updatePixelListWithOffsets() {
        this._pixel_list_with_offsets = []
        for (let p of this._pixel_list) {
            this._pixel_list_with_offsets.push({ 'x': this.x + p.x, 'y': this.y + p.y })
        }
    }

    private symmetricDifference(a: { x: number, y: number }[], b: { x: number, y: number }[]): { x: number, y: number }[] {
        const a_not_b = a.filter((element) => b.indexOf(element) == -1)
        const b_not_a = b.filter((element) => a.indexOf(element) == -1)
        return a_not_b.concat(b_not_a)
    }

    private update(old_offset_list: { x: number, y: number }[]) {
        this.updatePixelListWithOffsets()
        this.canvas.change(this.symmetricDifference(old_offset_list, this._pixel_list_with_offsets))
    }

    /**
     * Stop this sprite going outside the given area.
     */
    //% block="constrain $this to canvas"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Sprites"
    //% weight=49
    public constrainToCanvas(): void {
        this.constrainTo(0, 0, this.canvas.width, this.canvas.height)
    }

    /**
     * Stop this sprite going outside the given area.
     */
    //% block="constrain $this to area x$x y$y width$width height$height"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% width.defl=40
    //% height.defl=30
    //% inlineInputMode=inline
    //% group="Sprites"
    //% weight=48
    public constrainTo(x: number, y: number, width: number, height: number): void {
        if (width < 1 || height < 1)
            return
        this.constraint = { x: x, y: y, width: width, height: height }
        if (this.x < x)
            this.x = x
        else if (this.x >= x + width - this.width)
            this.x = x + width - this.width - 1
        if (this.y < y)
            this.y = y
        else if (this.y >= y + height - this.height)
            this.y = y + height - this.height - 1
    }

    /**
     * Do not constain sprite
     */
    //% block="unconstrain $this"
    //% this.defl=sprite
    //% this.shadow=variables_get
    //% group="Sprites"
    //% weight=47
    public unconstrain(): void {
        this.constraint = undefined
    }
}

/**
 * Sprites
 */
namespace sprites {
    /**
     * Called whenever sprites are on top of each other
     */
    //% block="on sprite overlaps othersprite (B)"
    //% group="Interaction"
    //% draggableParameters="reporter"
    export function onSpritesOverlap(handler: () => void) {
    }

    //% block="red$r green$g blue$b"
    //% group="Colours"
    //% r.min=0 r.max=255 r.defl=255
    //% g.min=0 g.max=255 g.defl=255
    //% b.min=0 b.max=255 b.defl=255
    export function createColourRGB(r: number, g: number, b: number) {
        return Colour.create(r, g, b)
    }
}

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