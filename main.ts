function Sendtemperature () {
    uartData = "{[2," + convertToText(input.temperature()) + "]}"
    bluetooth.uartWriteLine(uartData)
}
bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
    connected = 1
})
bluetooth.onBluetoothDisconnected(function () {
    connected = 0
    basic.showString("D")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    Rx_Data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    serial.writeLine(Rx_Data)
    if (Rx_Data.compare("R") == 0) {
        basic.showArrow(ArrowNames.East)
    } else if (Rx_Data.compare("L") == 0) {
        basic.showArrow(ArrowNames.West)
    } else if (Rx_Data.compare("U") == 0) {
        basic.showArrow(ArrowNames.North)
    } else if (Rx_Data.compare("D") == 0) {
        basic.showArrow(ArrowNames.South)
    }
})
function SendAccelerometer () {
    uartData = "{[1," + convertToText(input.acceleration(Dimension.X)) + "," + convertToText(input.acceleration(Dimension.Y)) + "," + convertToText(input.acceleration(Dimension.Z)) + "]}"
    bluetooth.uartWriteLine(uartData)
}
let connected = 0
let uartData = ""
let Rx_Data = ""
bluetooth.startUartService()
basic.showString("UART")
Rx_Data = ""
basic.forever(function () {
    if (connected == 1) {
        SendAccelerometer()
        basic.pause(200)
    }
})
