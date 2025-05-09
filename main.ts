radio.setGroup(1);

let x: number = 0;
let y: number = 0;

radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value;
    } else if (name == "y") {
        y = value;
    }

    controlServo(x, y);
})
radio.onReceivedString(function (string){
    if (string == "Stop"){
    PCAmotor.MotorStopAll()
    basic.pause(1000)
    }
})

function controlServo(xTilt: number, yTilt: number) {
    let speed = Math.map( yTilt, -1023, 1023, -200, 200)
    speed = Math.constrain(speed, 0, 200);

    let turn = Math.map(xTilt, -1023, 1023, -200, 200)
    turn = Math.constrain(turn, 0, 200);

   
    if (yTilt < -10) {
        //forward
        PCAmotor.MotorRun(PCAmotor.Motors.M4, (yTilt + (xTilt/2)))
        PCAmotor.MotorRun(PCAmotor.Motors.M1, (yTilt - (xTilt/2)))
    } else if (yTilt > 10) {
        //backward
        PCAmotor.MotorRun(PCAmotor.Motors.M1, yTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, yTilt)
    } else {
        //stop
        PCAmotor.MotorStopAll()
    }
/*
    if (xTilt < -10) {
        // Turn Left
        PCAmotor.MotorRun(PCAmotor.Motors.M1, (xTilt - 50))
        PCAmotor.MotorRun(PCAmotor.Motors.M4, xTilt)
    } else if (xTilt > 10) {
        // Turn Right
        PCAmotor.MotorRun(PCAmotor.Motors.M1, xTilt)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, (xTilt - 50))
    }*/
}
