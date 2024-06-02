function testSettingSpriteImage () {
    canvas = graphics.createCanvas(40, 30)
    sprite = canvas.createSprite()
    sprite.setImage(images.iconImage(IconNames.Heart))
    validateNumber("sprite image width", sprite.width, 5)
    validateNumber("sprite image height", sprite.height, 5)
}
function runTests () {
    failures = []
    testInitialChangesWhenBlank()
    testInitialChangesWhenBlankSprite()
    testInitialiseSprite()
    runFailingTests(false)
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
function runFailingTests (run: boolean) {
    if (!(run)) {
        return
    }
    testSettingSpriteImage()
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
let window: Window = null
let failures: string[] = []
let sprite: Sprite = null
let canvas: Canvas = null
runTests()
