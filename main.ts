radio.setGroup(61)
radio.setTransmitSerialNumber(true)

let x = 0
let y = 0
let turn = 0
let speed = 0

function controlServo(xTilt: number, yTilt: number) {
    speed = Math.map(yTilt, -1023, 1023, -200, 200)
    speed = Math.constrain(speed, 0, 200)
    turn = Math.map(xTilt, -1023, 1023, -200, 200)
    turn = Math.constrain(turn, 0, 200)

    if (yTilt < -10) {
        // vpřed
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt + xTilt / 3)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt - xTilt / 3)
    } else if (yTilt > 10) {
        // pozpátku 
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt)
    } else {
        // stop
        PCAmotor.MotorStopAll()
    }
}

radio.onReceivedString(function (receivedString: string) {
    if (receivedString == "Stop") {
        PCAmotor.MotorStopAll()
        basic.pause(1000)
    } else {
        let parts = receivedString.split(",")
        if (parts.length == 2) {
            x = parseInt(parts[0])
            y = parseInt(parts[1])
            controlServo(x, y)
        }
    }
})

