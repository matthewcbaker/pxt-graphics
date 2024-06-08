// tests go here; this will not be compiled when this package is used as an extension.
class Assert {
    static _failures: number = 0
    static _current: string = ""

    static _assertionFail(name: string, actual: string, expected: string) {
        Assert._failures += 1
        console.log("" + Assert._current + ":" + name + ": " + actual + " != " + expected)
        
    }

    static setCurrent(current: string) {
        Assert._current = current
    }

    static assertNumber(name: string, actual: number, expected: number) {
        if (actual != expected) {
            Assert._assertionFail(name, convertToText(actual), convertToText(expected))
        }
    }

    static result() {
        if (Assert._failures > 0) {
            basic.showIcon(IconNames.No)
        } else {
            basic.showIcon(IconNames.Yes)
        }
    }
}

function testInitialCanvas() {
    Assert.setCurrent("testInitialCanvas")
    let canvas = graphics.createCanvas(40, 30)
    Assert.assertNumber("width", canvas.width, 40)
    Assert.assertNumber("height", canvas.height, 30)
}
testInitialCanvas()

function testInitialiseSprite() {
    Assert.setCurrent("testInitialiseSprite")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    Assert.assertNumber("sprite width init", sprite.width, 0)
    Assert.assertNumber("sprite height init", sprite.height, 0)
}
testInitialiseSprite()

function testSpriteSetImageSize() {
    Assert.setCurrent("testSpriteSetImageSize")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite image width", sprite.width, 5)
    Assert.assertNumber("sprite image height", sprite.height, 5)
}
testSpriteSetImageSize()

function testSpriteSetImagePixels() {
    Assert.setCurrent("testSpriteSetImagePixels")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite pixel 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite pixel 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("sprite pixel 0,2", sprite.pixel(0, 2).colour.brightness, 255)
    Assert.assertNumber("sprite pixel 0,3", sprite.pixel(0, 3).colour.brightness, 0)
    Assert.assertNumber("sprite pixel 0,4", sprite.pixel(0, 3).colour.brightness, 0)
    Assert.assertNumber("sprite pixel 1,0", sprite.pixel(1, 0).colour.brightness, 255)
    Assert.assertNumber("sprite pixel 2,0", sprite.pixel(2, 0).colour.brightness, 0)
    Assert.assertNumber("sprite pixel 3,0", sprite.pixel(3, 0).colour.brightness, 255)
    Assert.assertNumber("sprite pixel 4,0", sprite.pixel(4, 0).colour.brightness, 0)
}
testSpriteSetImagePixels()

function testSpriteSetImageNoColour() {
    Assert.setCurrent("testSpriteSetImageNoColour")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite pixel 0,0,r", sprite.pixel(0, 0).colour.red, 0)
    Assert.assertNumber("sprite pixel 0,0,g", sprite.pixel(0, 0).colour.green, 0)
    Assert.assertNumber("sprite pixel 0,0,b", sprite.pixel(0, 0).colour.blue, 0)
    Assert.assertNumber("sprite pixel 0,1,r", sprite.pixel(0, 1).colour.red, 255)
    Assert.assertNumber("sprite pixel 0,1,g", sprite.pixel(0, 1).colour.green, 255)
    Assert.assertNumber("sprite pixel 0,1,b", sprite.pixel(0, 1).colour.blue, 255)
}
testSpriteSetImageNoColour()

function testSpriteSetImageWithColour() {
    Assert.setCurrent("testSpriteSetImageWithColour")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart), graphics.createColourRGB(200, 100, 50))
    Assert.assertNumber("sprite pixel 0,0,r", sprite.pixel(0, 0).colour.red, 0)
    Assert.assertNumber("sprite pixel 0,0,g", sprite.pixel(0, 0).colour.green, 0)
    Assert.assertNumber("sprite pixel 0,0,b", sprite.pixel(0, 0).colour.blue, 0)
    Assert.assertNumber("sprite pixel 0,1,r", sprite.pixel(0, 1).colour.red, 200)
    Assert.assertNumber("sprite pixel 0,1,g", sprite.pixel(0, 1).colour.green, 100)
    Assert.assertNumber("sprite pixel 0,1,b", sprite.pixel(0, 1).colour.blue, 50)
}
testSpriteSetImageWithColour()

function testSpriteSetImageCanvasImpact() {
    Assert.setCurrent("testSpriteSetImageCanvasImpact")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    Assert.assertNumber("canvas blank 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas blank 0,1", canvas.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("canvas valid 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas valid 0,1", canvas.pixel(0, 1).colour.brightness, 255)
}
testSpriteSetImageCanvasImpact()

function testInitialWindowFullCanvas() {
    Assert.setCurrent("testInitialWindowFullCanvas")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    Assert.assertNumber("width", window.width, 40)
    Assert.assertNumber("height", window.height, 30)
}
testInitialWindowFullCanvas()

function testInitialChangesWhenBlank() {
    Assert.setCurrent("testInitialChangesWhenBlank")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    Assert.assertNumber("no changes", window.getChanges().length, 0)
}
testInitialChangesWhenBlank()

function testInitialChangesWhenBlankSprite() {
    Assert.setCurrent("testInitialChangesWhenBlankSprite")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("no changes", window.getChanges().length, 0)
}
testInitialChangesWhenBlankSprite()

function testInitialChangesWithRegularSprite() {
    Assert.setCurrent("testInitialChangesWithRegularSprite")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("change count", window.getChanges().length, 16)
}
testInitialChangesWithRegularSprite()

Assert.result()
