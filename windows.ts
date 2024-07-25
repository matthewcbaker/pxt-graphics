/**
 * Windows
 */
//% weight=8 color="#de26a7" icon="\uf108"
//% groups=['Window', 'Changes', 'Pixels', 'Performance']
namespace windows {
    
    let _windows: Window[] = []
    let handlers: ((change: Change) => void)[] = undefined
    let processingTimer: Timer = new Timer()
    let handlerTimer: Timer = new Timer()

    export function forceReset(): void {
        if (handlers !== undefined)
            handlers = []
        _windows = []
        Window.forceReset()
    }

    /**
     * Creates a window to view a section of canvas.
     */
    //% block="create window to view $canvas"
    //% canvas.defl=canvas
    //% canvas.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Windows"
    //% blockSetVariable=window
    //% weight=52
    export function createWindow(canvas: Canvas): Window {
        let window = canvas.createWindow();
        _windows.push(window);
        return window;
    }

    /**
     * Window width
     */
    //% block="window width"
    //% weight=51
    //% group="Window"
    export function width(): number {
        return Window.window().width
    }

    /**
     * Window height
     */
    //% block="window height"
    //% group="Window"
    export function height(): number {
        return Window.window().height
    }

    function canvasUpdatedHandler(): void {
        if (handlers === undefined || handlers.length == 0)
            return
        for (let i = 0; i < _windows.length; i++) {
            processingTimer.start()
            let changes = _windows[i]._changes();
            processingTimer.stop()
            if (changes.pixels.length > 0) {
                handlerTimer.start()
                for (let h = 0; h < handlers.length; h++)
                    handlers[h](changes);
                handlerTimer.stop()
            }
        }
    }

    /**
     * Called whenever there are changes available
     */
    //% block="on window $change"
    //% group="Changes"
    //% weight=60
    //% draggableParameters="reporter"
    export function onWindowChange(handler: (change: Change) => void) {
        Window.window() // Default window must be in place before adding handlers
        if (handlers === undefined) {
            handlers = []
            control.onEvent(GraphicsEventBusSource.GRAPHICS_ID_CANVAS, GraphicsEventBusValue.GRAPHICS_CANVAS_EVT_UPDATED, canvasUpdatedHandler)
        }
        handlers.push(handler)
    }

    /**
     * Find out how much time has been spent processing window activity
     */
    //% block="window processing time (ms)"
    //% blockNamespace=graphics
    //% group="Performance"
    export function processingTime() {
        return processingTimer.milliseconds
    }

    /**
     * Find out how much time has been spent processing handler activity
     */
    //% block="callback handler time (ms)"
    //% blockNamespace=graphics
    //% group="Performance"
    //% weight=20
    export function handlerTime() {
        return handlerTimer.milliseconds
    }
}

//% blockNamespace=windows
class Window {
    private static globalWindow: Window = undefined
    _canvas: Canvas
    _width: number = 0;
    _height: number = 0;
    _pixels: { [key: number]: { [key: number]: Pixel } } = {};
    _background_pixel: Pixel = new Pixel(Colour.create(0, 0, 0))
    _changelist: { x: number, y: number }[] = []
    _no_change: Change = new Change()

    //% block="global window"
    //% blockNamespace=graphics
    //% group="Windows"
    //% weight=80
    static window(): Window {
        if (Window.globalWindow === undefined)
            Window.globalWindow = windows.createWindow(Canvas.canvas())
        return Window.globalWindow
    }

    static forceReset(): void {
        Window.globalWindow = undefined
        let forceGlobalCreation = Window.window()
    }

    constructor(canvas: Canvas) {
        this._canvas = canvas
        this._width = canvas._width
        this._height = canvas._height
    }

    //% block="$this width"
    //% this.defl=window
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Windows"
    get width() { return this._width }

    //% block="$this height"
    //% this.defl=window
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Windows"
    get height() { return this._height }

    //% block="$this pixel x$x y$y"
    //% this.defl=window
    //% this.shadow=variables_get
    //% blockNamespace=graphics
    //% group="Pixels"
    public pixel(x: number, y: number) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height)
            return this._background_pixel
        if (this._pixels[x] == undefined || this._pixels[x][y] == undefined)
            return this._background_pixel
        return this._pixels[x][y]
    }

    public _changes(): Change {
        if (this._changelist.length == 0)
            return this._no_change
        let changes = this._changelist
        this._changelist = []
        return this.calculateChanges(changes)
    }

    private removeDuplicates(changelist: { x: number, y: number }[]): { x: number, y: number }[] {
        let newlist: { x: number, y: number }[] = []
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

    private calculateChanges(changelist: { x: number, y: number }[]) {
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

//% blockNamespace=windows
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

//% blockNamespace=windows
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

    //% blockCombine
    //% group="Pixels"
    get transparent() { return this._colour.transparent }

    get colour() { return this._colour }
}
