function testSettingSpriteImage () {
    canvas = graphics.createCanvas(40, 30)
    sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    validateNumber("no changes", 1, 0)
}
function runTests () {
    failures = 0
    testInitialChangesWhenBlank()
    testInitialChangesWhenBlankSprite()
    testSettingSpriteImage()
    if (failures == 0) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
}
function validateNumber (name: string, test: number, expected: number) {
    if (test != expected) {
        fail(name, convertToText(test), convertToText(expected))
    }
}
function testInitialChangesWhenBlank () {
    canvas = graphics.createCanvas(40, 30)
    window = graphics.createWindow(canvas)
    validateNumber("no changes", window.getChanges().length, 0)
}
function fail (name: string, expected: string, actual: string) {
    failures += 1
}
function testInitialChangesWhenBlankSprite () {
    canvas = graphics.createCanvas(40, 30)
    window = graphics.createWindow(canvas)
    sprite = canvas.createSprite()
    validateNumber("no changes", window.getChanges().length, 0)
}
let window: Window = null
let failures = 0
let sprite: Sprite = null
let canvas: Canvas = null
runTests()
