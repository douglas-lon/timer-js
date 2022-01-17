
isPaused = false
time  = new Date(0)

let hour = document.querySelector('select#hour')
let minute  = document.querySelector('select#minutes')
let second = document.querySelector('select#seconds')
let show = document.querySelector('div#timer')
let btns = document.querySelector('div#btns')

let interval

function startTimer() {
     if (!isPaused) {
        if (time.getTime() != 0) {
            h = ('0' + time.getHours()).slice(-2)
            m = ('0' + time.getMinutes()).slice(-2)
            s = ('0' + time.getSeconds()).slice(-2)
            show.innerHTML = `<p>${h}:${m}:${s}</p>`
            time.setSeconds(time.getSeconds() - 1)
        } else {
            clearInterval(interval)
            parar()
        }   
     }
}

function createTimer() {
    time.setHours(hour.value)
    time.setMinutes(minute.value)
    time.setSeconds(second.value)

    show.innerHTML = '<p>Iniciando...</p>'
    btns.innerHTML = null

    btnPausar = configBtn('Pausar', function() {isPaused= !isPaused}, btns)
    btnParar = configBtn('Parar', function() {parar()}, btns)
    
    interval = setInterval(startTimer, 1000)
}

function createSelectNumbers() {
    show.innerHTML = null
    show.appendChild(hour)
    show.appendChild(minute)
    show.appendChild(second)

    createOptions(24, hour)
    createOptions(60, minute)
    createOptions(60, second)
}

function parar() {
    clearInterval(interval)
    createSelectNumbers()

    btns.innerHTML = null
    btnStart = configBtn('Start', function() {createTimer()}, btns)

}

function createOptions(maxNum, timeVar) {
    for (let i=0;i <= maxNum;i++) {
        let option = document.createElement('option')
        option.innerText = i
        option.setAttribute('value', `${i}`)
        timeVar.appendChild(option)
    }
}

function configBtn(val, func, parent) {
    let btn = document.createElement('input')
    btn.type = 'button'
    btn.value = val
    btn.onclick = func
    parent.appendChild(btn)
}