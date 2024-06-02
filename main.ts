function runTests () {
    failures = 0
    testInitialChangesWhenBlank()
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
let window: graphics.Window = null
let canvas: graphics.Canvas = null
let failures = 0
runTests()
