
isPaused = false
time  = new Date(0)

time.setHours(01)
time.setMinutes(00)
time.setSeconds(00)
let interval

function startTimer() {
     if (!isPaused) {
        if (time.getTime() != 0) {
            time.setSeconds(time.getSeconds() - 1)
            console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
        } else {
            clearInterval(interval)
        }   
     }
}


interval = setInterval(startTimer, 1000)
