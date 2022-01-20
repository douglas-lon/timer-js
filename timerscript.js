let isPaused = false
const time  = new Date(0)

const show = document.querySelector('div#timer')
const btns = document.querySelector('div#btns')

function startTimer(interval) {
    console.log(interval)
    if (!isPaused) {
       if (time.getTime() != 0) {
            min = ('0' + time.getMinutes()).slice(-2)
            sec = ('0' + time.getSeconds()).slice(-2)
            show.innerHTML = `<p>${min}:${sec}</p>`
            time.setSeconds(time.getSeconds() - 1)
       } else {
            stopTimer(interval)
       }   
    }
}

const createTimer = function(timeInputs) {
    time.setMinutes(Number(timeInputs[0].value))
    time.setSeconds(Number(timeInputs[1].value))
    show.innerHTML = '<p>Iniciando...</p>'
    btns.innerHTML = null
    

    let interval
    interval = setInterval( function() { startTimer(interval) }, 1000)

    createButton('Pause', function() {isPaused = !isPaused}, null, btns)
    createButton('Stop', stopTimer, interval, btns)
}

const createHome = function() {

    createInputs('timer-numbers', '00', show)
    let colon = document.createElement('span')
    colon.innerText = ':'
    show.appendChild(colon)
    createInputs('timer-numbers', '00', show)

    let timeInputs = document.querySelectorAll('.timer-numbers')

    createButton('Start', createTimer, timeInputs, btns)

}

const stopTimer = function(interval) {
    show.innerHTML = null
    btns.innerHTML = null

    clearInterval(interval)

    if (isPaused) {
        isPaused = false
    }

    createHome()
}

const verifyNumber = function(n) {
    let nCode = n.charCode

    if (nCode >= 48 && nCode <= 57) {
        
    } else {
        n.preventDefault()
    }
}

const createInputs = function(clas, value, parent ) {
    let newInput = document.createElement('input')
    newInput.setAttribute('class', clas)
    newInput.setAttribute('value', value)
    newInput.setAttribute('maxlength','2')
    newInput.addEventListener('keypress', verifyNumber)
    parent.appendChild(newInput)
}

const createButton = function(txt, fn, fnPar, parent) {
    let btn = document.createElement('button')
    btn.innerText = txt
    btn.onclick = function() {fn(fnPar)}
    parent.appendChild(btn)

}

window.addEventListener('load', createHome)

