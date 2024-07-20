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
        graphics.forceReset()
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
    let canvas = canvases.createCanvas(40, 30)
    Assert.assertNumber("width", canvas.width, 40)
    Assert.assertNumber("height", canvas.height, 30)
}
testInitialCanvas()

function testInitialiseSprite() {
    Assert.setCurrent("testInitialiseSprite")
    let canvas = canvases.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    Assert.assertNumber("sprite width init", sprite.width, 0)
    Assert.assertNumber("sprite height init", sprite.height, 0)
}
testInitialiseSprite()

function testSpriteSetImageSize() {
    Assert.setCurrent("testSpriteSetImageSize")
    let canvas = canvases.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite image width", sprite.width, 5)
    Assert.assertNumber("sprite image height", sprite.height, 5)
}
testSpriteSetImageSize()

function testSpriteSetImagePixels() {
    Assert.setCurrent("testSpriteSetImagePixels")
    let canvas = canvases.createCanvas(40, 30)
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
    let canvas = canvases.createCanvas(40, 30)
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
    let canvas = canvases.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart), sprites.createColourRGB(200, 100, 50))
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
    let canvas = canvases.createCanvas(40, 30)
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
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    Assert.assertNumber("width", window.width, 40)
    Assert.assertNumber("height", window.height, 30)
}
testInitialWindowFullCanvas()

function testSpriteSetImageNoWindowImpact() {
    Assert.setCurrent("testSpriteSetImageNoWindowImpact")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
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
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    Assert.assertNumber("no changes", window._changes().pixels.length, 0)
}
testInitialChangesWhenBlank()

function testInitialChangesWhenBlankSprite() {
    Assert.setCurrent("testInitialChangesWhenBlankSprite")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("no changes", window._changes().pixels.length, 0)
}
testInitialChangesWhenBlankSprite()

function testInitialChangesWithRegularSprite() {
    Assert.setCurrent("testInitialChangesWithRegularSprite")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("change count", window._changes().pixels.length, 16)
}
testInitialChangesWithRegularSprite()

function testSubsequentChangesWithRegularSprite() {
    Assert.setCurrent("testSubsequentChangesWithRegularSprite")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    window._changes()
    Assert.assertNumber("no changes", window._changes().pixels.length, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("same image", window._changes().pixels.length, 0)
    sprite.setImage(images.iconImage(IconNames.Ghost))
    Assert.assertNumber("new image", window._changes().pixels.length, 7)
}
testSubsequentChangesWithRegularSprite()

function testChangeContent() {
    Assert.setCurrent("testChangeContent")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    let pixels = window._changes().pixels
    for (let pixel of pixels) {
        Assert.assertTrue("x range", pixel.x >= 0 && pixel.x <= 4)
        Assert.assertTrue("y range", pixel.y >= 0 && pixel.y <= 4)
        Assert.assertNumber("brightness", pixel.colour.brightness, 255)
    }
}
testChangeContent()

function testInitialChangesWithRegularSpriteWindowLater() {
    Assert.setCurrent("testInitialChangesWithRegularSpriteWindowLater")
    let canvas = canvases.createCanvas(40, 30)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    let window = windows.createWindow(canvas)
    Assert.assertNumber("change count", window._changes().pixels.length, 16)
}
testInitialChangesWithRegularSpriteWindowLater()

function testSpriteSetImageWindowImpactAfterChange() {
    Assert.setCurrent("testSpriteSetImageWindowImpactAfterChange")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    Assert.assertNumber("window blank 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window blank 0,1", window.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    window._changes()
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("window valid 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window valid 0,1", window.pixel(0, 1).colour.brightness, 255)
}
testSpriteSetImageWindowImpactAfterChange()

function testSpriteMoveX() {
    Assert.setCurrent("testSpriteMoveX")
    let canvas = canvases.createCanvas(40, 30)
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
    sprite.x += 1
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

function testSpriteMoveWindow() {
    Assert.setCurrent("testSpriteMoveWindow")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    sprite.x = 1
    window._changes()
    Assert.assertNumber("window 1 0,0", window.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("window 1 1,0", window.pixel(1, 0).colour.brightness, 0)
    Assert.assertNumber("window 1 2,0", window.pixel(2, 0).colour.brightness, 255)
    Assert.assertNumber("window 1 3,0", window.pixel(3, 0).colour.brightness, 0)
    Assert.assertNumber("window 1 4,0", window.pixel(4, 0).colour.brightness, 255)
    Assert.assertNumber("window 1 5,0", window.pixel(5, 0).colour.brightness, 0)
    Assert.assertNumber("window 1 6,0", window.pixel(6, 0).colour.brightness, 0)
}
testSpriteMoveWindow()

function testSpriteMoveChanges() {
    Assert.setCurrent("testSpriteMoveChanges")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("change count before", window._changes().pixels.length, 16)
    sprite.x = 1
    Assert.assertNumber("change count after", window._changes().pixels.length, 12)
    sprite.x = 11
    window._changes()
    sprite.x = 12
    for (let change of window._changes().pixels) {
        Assert.assertTrue("change values", change.x > 10)
    }
}
testSpriteMoveChanges()

function testInitialChangesOnWindowChange() {
    Assert.setCurrent("testInitialChangesOnWindowChange")
    let canvas = canvases.createCanvas(40, 30)
    let window = windows.createWindow(canvas)
    let sprite = canvas.createSprite()
    let changecount = 0
    windows.onWindowChange(function(change: Change) {
        changecount = change.pixels.length
    })
    sprite.setImage(images.iconImage(IconNames.Heart))
    basic.pause(1)
    Assert.assertNumber("change count", changecount, 16)
}
testInitialChangesOnWindowChange()

function testConstrainToCanvasOff() {
    Assert.setCurrent("testConstrainToCanvasOff")
    let canvas = canvases.createCanvas(7, 7)
    let sprite = canvas.createSprite(1, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("initial pixel 0,2", canvas.pixel(0, 2).brightness, 0)
    Assert.assertNumber("initial pixel 1,2", canvas.pixel(1, 2).brightness, 255)
    Assert.assertNumber("initial pixel 5,2", canvas.pixel(5, 2).brightness, 255)
    Assert.assertNumber("initial pixel 6,2", canvas.pixel(6, 2).brightness, 0)
    sprite.x = -1
    Assert.assertNumber("left pixel 0,2", canvas.pixel(0, 2).brightness, 255)
    Assert.assertNumber("left pixel 1,2", canvas.pixel(1, 2).brightness, 255)
    Assert.assertNumber("left pixel 3,2", canvas.pixel(3, 2).brightness, 255)
    Assert.assertNumber("left pixel 4,2", canvas.pixel(4, 2).brightness, 0)
    sprite.x = 3
    Assert.assertNumber("right pixel 2,2", canvas.pixel(2, 2).brightness, 0)
    Assert.assertNumber("right pixel 3,2", canvas.pixel(3, 2).brightness, 255)
    Assert.assertNumber("right pixel 5,2", canvas.pixel(5, 2).brightness, 255)
    Assert.assertNumber("right pixel 6,2", canvas.pixel(6, 2).brightness, 255)
}
testConstrainToCanvasOff()

function testConstrainToCanvasOn() {
    Assert.setCurrent("testConstrainToCanvasOn")
    let canvas = canvases.createCanvas(7, 7)
    let sprite = canvas.createSprite(1, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("initial pixel 0,2", canvas.pixel(0, 2).brightness, 0)
    Assert.assertNumber("initial pixel 1,2", canvas.pixel(1, 2).brightness, 255)
    Assert.assertNumber("initial pixel 5,2", canvas.pixel(5, 2).brightness, 255)
    Assert.assertNumber("initial pixel 6,2", canvas.pixel(6, 2).brightness, 0)
    sprite.constrainToCanvas()
    sprite.x = -1
    Assert.assertNumber("left pixel 0,2", canvas.pixel(0, 2).brightness, 255)
    Assert.assertNumber("left pixel 1,2", canvas.pixel(1, 2).brightness, 255)
    Assert.assertNumber("left pixel 4,2", canvas.pixel(4, 2).brightness, 255)
    Assert.assertNumber("left pixel 5,2", canvas.pixel(5, 2).brightness, 0)
    sprite.x = 3
    Assert.assertNumber("right pixel 1,2", canvas.pixel(1, 2).brightness, 0)
    Assert.assertNumber("right pixel 2,2", canvas.pixel(2, 2).brightness, 255)
    Assert.assertNumber("right pixel 5,2", canvas.pixel(5, 2).brightness, 255)
    Assert.assertNumber("right pixel 6,2", canvas.pixel(6, 2).brightness, 255)
}
testConstrainToCanvasOn()

// ===========================================================================================
// Default Canvas
// ===========================================================================================

function testDefaultCanvasInitialCanvas() {
    Assert.setCurrent("testDefaultCanvasInitialCanvas")
    let canvas = Canvas.canvas()
    Assert.assertNumber("width", canvas.width, 160)
    Assert.assertNumber("height", canvas.height, 128)
}
testDefaultCanvasInitialCanvas()

function testDefaultCanvasInitialiseSprite() {
    Assert.setCurrent("testDefaultCanvasInitialiseSprite")
    let canvas = Canvas.canvas()
    let sprite = sprites.createSprite(0, 0)
    Assert.assertNumber("sprite width init", sprite.width, 0)
    Assert.assertNumber("sprite height init", sprite.height, 0)
}
testDefaultCanvasInitialiseSprite()

function testDefaultCanvasSpriteSetImageSize() {
    Assert.setCurrent("testDefaultCanvasSpriteSetImageSize")
    let canvas = Canvas.canvas()
    let sprite = sprites.createSprite(0, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite image width", sprite.width, 5)
    Assert.assertNumber("sprite image height", sprite.height, 5)
}
testDefaultCanvasSpriteSetImageSize()

function testDefaultCanvasSpriteAddToCanvasSetImageCanvasImpact() {
    Assert.setCurrent("testDefaultCanvasSpriteAddToCanvasSetImageCanvasImpact")
    let canvas = Canvas.canvas()
    let sprite = canvas.createSprite()
    Assert.assertNumber("canvas blank 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas blank 0,1", canvas.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("canvas valid 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas valid 0,1", canvas.pixel(0, 1).colour.brightness, 255)
}
testDefaultCanvasSpriteAddToCanvasSetImageCanvasImpact()

function testDefaultCanvasSpriteSetImageCanvasImpact() {
    Assert.setCurrent("testDefaultCanvasSpriteSetImageCanvasImpact")
    let canvas = Canvas.canvas()
    let sprite = sprites.createSprite(0, 0)
    Assert.assertNumber("canvas blank 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas blank 0,1", canvas.pixel(0, 1).colour.brightness, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("sprite valid 0,0", sprite.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("sprite valid 0,1", sprite.pixel(0, 1).colour.brightness, 255)
    Assert.assertNumber("canvas valid 0,0", canvas.pixel(0, 0).colour.brightness, 0)
    Assert.assertNumber("canvas valid 0,1", canvas.pixel(0, 1).colour.brightness, 255)
}
testDefaultCanvasSpriteSetImageCanvasImpact()

// ===========================================================================================
// Latest tests
// ===========================================================================================

function testDefaultCanvasInitialChangesWithRegularSprite() {
    Assert.setCurrent("testDefaultCanvasInitialChangesWithRegularSprite")
    let canvas = Canvas.canvas()
    let window = Window.window()
    let sprite = sprites.createSprite(0, 0)
    sprite.setImage(images.iconImage(IconNames.Heart))
    Assert.assertNumber("change count", window._changes().pixels.length, 16)
}
testDefaultCanvasInitialChangesWithRegularSprite()

function testDefaultCanvasInitialChangesOnWindowChange() {
    Assert.setCurrent("testDefaultCanvasInitialChangesOnWindowChange")
    let canvas = Canvas.canvas()
    let window = Window.window()
    let sprite = sprites.createSprite(0, 0)
    let changecount = 0
    windows.onWindowChange(function (change: Change) {
        changecount = change.pixels.length
    })
    sprite.setImage(images.iconImage(IconNames.Heart))
    basic.pause(1)
    Assert.assertNumber("change count", changecount, 16)
}
testDefaultCanvasInitialChangesOnWindowChange()

// ===========================================================================================
// Check minimum
// ===========================================================================================

function testMinimumCanvasInitialChangesOnWindowChange() {
    Assert.setCurrent("testMinimumCanvasInitialChangesOnWindowChange")
    let sprite = sprites.createSprite(0, 0)
    let changecount = 0
    windows.onWindowChange(function (change: Change) {
        changecount = change.pixels.length
    })
    sprite.setImage(images.iconImage(IconNames.Heart))
    basic.pause(1)
    Assert.assertNumber("change count", changecount, 16)
}
testMinimumCanvasInitialChangesOnWindowChange()

Assert.result()
