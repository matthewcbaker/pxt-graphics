// tests go here; this will not be compiled when this package is used as an extension.
function assertionFail(name: string, actual: string, expected: string) {
    let message = "" + name + ": " + actual + " != " + expected
    //failures.push(message)
    console.log(message)
}
function assertNumber(name: string, test: number, expected: number) {
    if (test != expected) {
        assertionFail(name, convertToText(expected), convertToText(test))
    }
}

function testInitialiseSprite() {
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    assertNumber("sprite width init", sprite.width, 0)
    assertNumber("sprite height init", sprite.height, 0)
}
testInitialiseSprite()

function testSettingSpriteImage() {
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    assertNumber("sprite image width", sprite.width, 5)
    assertNumber("sprite image height", sprite.height, 5)
    assertNumber("sprite pixel 0,0", sprite.pixel(0, 0).colour.red, 0)
    assertNumber("sprite pixel 0,0", sprite.pixel(0, 0).colour.green, 0)
    assertNumber("sprite pixel 0,0", sprite.pixel(0, 0).colour.blue, 0)
    assertNumber("sprite pixel 0,1", sprite.pixel(0, 1).colour.red, 255)
    assertNumber("sprite pixel 0,1", sprite.pixel(0, 1).colour.green, 255)
    assertNumber("sprite pixel 0,1", sprite.pixel(0, 1).colour.blue, 255)
    assertNumber("sprite pixel 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    assertNumber("sprite pixel 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    assertNumber("sprite pixel 0,2", sprite.pixel(0, 2).colour.brightness, 255)
    assertNumber("sprite pixel 0,3", sprite.pixel(0, 3).colour.brightness, 0)
    assertNumber("sprite pixel 0,4", sprite.pixel(0, 3).colour.brightness, 0)
    assertNumber("sprite pixel 1,0", sprite.pixel(1, 0).colour.brightness, 255)
    assertNumber("sprite pixel 2,0", sprite.pixel(2, 0).colour.brightness, 0)
    assertNumber("sprite pixel 3,0", sprite.pixel(3, 0).colour.brightness, 255)
    assertNumber("sprite pixel 4,0", sprite.pixel(4, 0).colour.brightness, 0)
}
testSettingSpriteImage()

function testSpriteSetImage() {
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    assertNumber("canvas valid 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    assertNumber("canvas valid 0,1", canvas.pixel(0, 1).colour.brightness, 255)
}
testSpriteSetImage()

function testInitialChangesWhenBlank() {
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    assertNumber("no changes", window.getChanges().length, 0)
}
testInitialChangesWhenBlank()

function testInitialChangesWhenBlankSprite() {
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    assertNumber("no changes", window.getChanges().length, 0)
}
testInitialChangesWhenBlankSprite()
