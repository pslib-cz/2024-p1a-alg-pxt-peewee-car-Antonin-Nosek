radio.setGroup(11)
radio.setTransmitSerialNumber(true)
let y = 0
let x = 0
let turn = 0
let speed = 0

function controlServo(xTilt: number, yTilt: number) {
    speed = Math.map(yTilt, -1023, 1023, -200, 200)
    speed = Math.constrain(speed, 0, 200)
    turn = Math.map(xTilt, -1023, 1023, -200, 200)
    turn = Math.constrain(turn, 0, 200)
    if (yTilt < -10) {
        // vpřed
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt + xTilt / 3)// cim vetsi cislo, tim presnejsi zataceni
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
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    } else if (name == "y") {
        y = value
    }
    controlServo(x, y)
})
radio.onReceivedString(function (string) {
    if (string == "Stop") {
        PCAmotor.MotorStopAll()
        basic.pause(1000)
    }
})

// if (xTilt < -10) {
// // zatočit do leva
// PCAmotor.MotorRun(PCAmotor.Motors.M1, (xTilt - 50))
// PCAmotor.MotorRun(PCAmotor.Motors.M4, xTilt)
// } else if (xTilt > 10) {
// // zatočit do prava
// PCAmotor.MotorRun(PCAmotor.Motors.M1, xTilt)
// PCAmotor.MotorRun(PCAmotor.Motors.M4, (xTilt - 50))
// }
