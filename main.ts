function runTestsInProgress (run: boolean) {
    if (!(run)) {
        return
    }
}
function testSettingSpriteImage () {
    canvas = graphics.createCanvas(40, 30)
    sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    validateNumber("sprite image width", sprite.width, 5)
    validateNumber("sprite image height", sprite.height, 5)
    validateNumber("sprite pixel 0,0", sprite.pixel(0, 0).red, 0)
    validateNumber("sprite pixel 0,0", sprite.pixel(0, 0).green, 0)
    validateNumber("sprite pixel 0,0", sprite.pixel(0, 0).blue, 0)
    validateNumber("sprite pixel 0,1", sprite.pixel(0, 1).red, 255)
    validateNumber("sprite pixel 0,1", sprite.pixel(0, 1).green, 255)
    validateNumber("sprite pixel 0,1", sprite.pixel(0, 1).blue, 255)
    validateNumber("sprite pixel 0,0", sprite.pixel(0, 0).brightness, 0)
    validateNumber("sprite pixel 0,1", sprite.pixel(0, 1).brightness, 255)
    validateNumber("sprite pixel 0,2", sprite.pixel(0, 2).brightness, 255)
    validateNumber("sprite pixel 0,3", sprite.pixel(0, 3).brightness, 0)
    validateNumber("sprite pixel 0,4", sprite.pixel(0, 3).brightness, 0)
    validateNumber("sprite pixel 1,0", sprite.pixel(1, 0).brightness, 255)
    validateNumber("sprite pixel 2,0", sprite.pixel(2, 0).brightness, 0)
    validateNumber("sprite pixel 3,0", sprite.pixel(3, 0).brightness, 255)
    validateNumber("sprite pixel 4,0", sprite.pixel(4, 0).brightness, 0)
}
function runTests () {
    failures = []
    runTestsInProgress(true)
    testInitialChangesWhenBlank()
    testInitialChangesWhenBlankSprite()
    testInitialiseSprite()
    testSettingSpriteImage()
    testCanvasUpdatesWithSpriteChanges()
    if (failures.length == 0) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
}
function validateNumber (name: string, test: number, expected: number) {
    if (test != expected) {
        fail(name, convertToText(expected), convertToText(test))
    }
}
input.onButtonPressed(Button.A, function () {
    for (let value of failures) {
        basic.showString("" + (value))
    }
})
function testInitialChangesWhenBlank () {
    canvas = graphics.createCanvas(40, 30)
    window = graphics.createWindow(canvas)
    validateNumber("no changes", window.getChanges().length, 0)
}
function demo () {
    demo_pause = 1000
    demo_canvas = graphics.createCanvas(5, 5)
    demo_sprite = demo_canvas.createSprite()
    demo_sprite.setImage(images.iconImage(IconNames.Heart))
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.plotBrightness(x, y, demo_canvas.pixel(x, y).brightness)
        }
    }
    basic.pause(demo_pause)
    basic.clearScreen()
    basic.pause(demo_pause)
    demo_window = graphics.createWindow(demo_canvas)
    demo_change = demo_window.changes()
    for (let pixel of demo_change.pixels) {
        led.plotBrightness(pixel.x, pixel.y, pixel.brightness)
    }
    basic.pause(demo_pause)
    basic.clearScreen()
    basic.pause(demo_pause)
    basic.showNumber(demo_window.changes().pixels.length)
    basic.pause(demo_pause)
    basic.clearScreen()
    basic.pause(demo_pause)
    demo_sprite.setImage(images.iconImage(IconNames.Ghost))
    demo_change = demo_window.changes()
    basic.showNumber(demo_change.pixels.length)
    basic.pause(demo_pause)
    basic.clearScreen()
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.plotBrightness(x, y, 80)
        }
    }
    for (let pixel of demo_change.pixels) {
        led.plotBrightness(pixel.x, pixel.y, pixel.brightness)
    }
}
function testCanvasUpdatesWithSpriteChanges () {
    canvas = graphics.createCanvas(40, 30)
    sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    validateNumber("sprite valid 0,0", sprite.pixel(0, 0).brightness, 0)
    validateNumber("sprite valid 0,1", sprite.pixel(0, 1).brightness, 255)
    validateNumber("canvas valid 0,0", canvas.pixel(0, 0).brightness, 0)
    validateNumber("canvas valid 0,1", canvas.pixel(0, 1).brightness, 255)
}
function testInitialiseSprite () {
    canvas = graphics.createCanvas(40, 30)
    sprite = canvas.createSprite()
    validateNumber("sprite width init", sprite.width, 0)
    validateNumber("sprite height init", sprite.height, 0)
}
function fail (name: string, actual: string, expected: string) {
    failures.push("" + name + ": " + actual + "!=" + expected)
}
function testInitialChangesWhenBlankSprite () {
    canvas = graphics.createCanvas(40, 30)
    window = graphics.createWindow(canvas)
    sprite = canvas.createSprite()
    validateNumber("no changes", window.getChanges().length, 0)
}
let demo_change: Change = null
let demo_window: Window = null
let demo_sprite: Sprite = null
let demo_canvas: Canvas = null
let demo_pause = 0
let window: Window = null
let failures: string[] = []
let sprite: Sprite = null
let canvas: Canvas = null
let demo_mode = true
if (demo_mode) {
    demo()
} else {
    runTests()
}
