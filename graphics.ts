/**
 * Graphics assistance
 */
//% weight=10 color="#de26a7" icon="\uf302"
//% groups=['Canvas', 'Sprites', 'Colours']
//% advanced=true
namespace graphics {

    export let processingTimer: Timer = new Timer()

    /**
     * Find out how much time has been spent processing graphics activity
     */
    //% block="graphics processing time (ms)"
    //% blockNamespace=graphics
    //% group="Performance"
    export function processingTime() {
        return processingTimer.milliseconds
    }

    export function forceReset(): void {
        canvases.forceReset()
        windows.forceReset()
    }
}
