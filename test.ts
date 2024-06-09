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

    static assertTrue(name: string, actual: boolean) {
        if (!actual) {
            Assert._assertionFail(name, "false", "true")
        }
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

function testSpriteSetImageNoWindowImpact() {
    Assert.setCurrent("testSpriteSetImageNoWindowImpact")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("window blank 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window blank 0,1", window.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("window valid 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window valid 0,1", window.pixel(0, 1).colour.brightness, 0)
}
testSpriteSetImageNoWindowImpact()

function testInitialChangesWhenBlank() {
    Assert.setCurrent("testInitialChangesWhenBlank")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    Assert.assertNumber("no changes", window.changes().pixels.length, 0)
}
testInitialChangesWhenBlank()

function testInitialChangesWhenBlankSprite() {
    Assert.setCurrent("testInitialChangesWhenBlankSprite")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("no changes", window.changes().pixels.length, 0)
}
testInitialChangesWhenBlankSprite()

function testInitialChangesWithRegularSprite() {
    Assert.setCurrent("testInitialChangesWithRegularSprite")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("change count", window.changes().pixels.length, 16)
}
testInitialChangesWithRegularSprite()

function testSubsequentChangesWithRegularSprite() {
    Assert.setCurrent("testSubsequentChangesWithRegularSprite")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    window.changes()
    Assert.assertNumber("no changes", window.changes().pixels.length, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("same image", window.changes().pixels.length, 0)
    sprite.setImage(images.iconImage(IconNames.Ghost))
    Assert.assertNumber("new image", window.changes().pixels.length, 7)
}
testSubsequentChangesWithRegularSprite()

function testChangeContent() {
    Assert.setCurrent("testChangeContent")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    let pixels = window.changes().pixels
    for (let pixel of pixels) {
        Assert.assertTrue("x range", pixel.x >= 0 && pixel.x <= 4)
        Assert.assertTrue("y range", pixel.y >= 0 && pixel.y <= 4)
        Assert.assertNumber("brightness", pixel.colour.brightness, 255)
    }
}
testChangeContent()

function testSpriteSetImageWindowImpactAfterChange() {
    Assert.setCurrent("testSpriteSetImageWindowImpactAfterChange")
    let canvas = graphics.createCanvas(40, 30)
    let window = graphics.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("window blank 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window blank 0,1", window.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    window.changes()
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("window valid 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window valid 0,1", window.pixel(0, 1).colour.brightness, 255)
}
testSpriteSetImageWindowImpactAfterChange()

function testSpriteMoveX() {
    Assert.setCurrent("testSpriteMoveX")
    let canvas = graphics.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("canvas initial 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas initial 1,0", canvas.pixel(1, 0).colour.brightness, 255)
    Assert.assertNumber("canvas initial 2,0", canvas.pixel(2, 0).colour.brightness, 0)
    Assert.assertNumber("canvas initial 3,0", canvas.pixel(3, 0).colour.brightness, 255)
    Assert.assertNumber("canvas initial 4,0", canvas.pixel(4, 0).colour.brightness, 0)
    Assert.assertNumber("canvas initial 5,0", canvas.pixel(5, 0).colour.brightness, 0)
    Assert.assertNumber("canvas initial 6,0", canvas.pixel(6, 0).colour.brightness, 0)
    sprite.x = 1
    Assert.assertNumber("canvas 1 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 1 1,0", canvas.pixel(1, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 1 2,0", canvas.pixel(2, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 1 3,0", canvas.pixel(3, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 1 4,0", canvas.pixel(4, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 1 5,0", canvas.pixel(5, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 1 6,0", canvas.pixel(6, 0).colour.brightness, 0)
    sprite.x = 2
    Assert.assertNumber("canvas 2 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 2 1,0", canvas.pixel(1, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 2 2,0", canvas.pixel(2, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 2 3,0", canvas.pixel(3, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 2 4,0", canvas.pixel(4, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 2 5,0", canvas.pixel(5, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 2 6,0", canvas.pixel(6, 0).colour.brightness, 0)
    sprite.x = 0
    Assert.assertNumber("canvas 0 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 0 1,0", canvas.pixel(1, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 0 2,0", canvas.pixel(2, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 0 3,0", canvas.pixel(3, 0).colour.brightness, 255)
    Assert.assertNumber("canvas 0 4,0", canvas.pixel(4, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 0 5,0", canvas.pixel(5, 0).colour.brightness, 0)
    Assert.assertNumber("canvas 0 6,0", canvas.pixel(6, 0).colour.brightness, 0)
}
testSpriteMoveX()

Assert.result()
