const timer = function() {

    let isPaused = false
    let time  = new Date(0)

    let show = document.querySelector('div#timer')
    let btns = document.querySelector('div#btns')

    let createMyElements = {

        inputs: function(keyfn) {
            
            let newInput = document.createElement('input')
            newInput.setAttribute('class', 'timer-numbers')
            newInput.setAttribute('value', '00')
            newInput.setAttribute('maxlength','2')
            newInput.addEventListener('keypress', keyfn)
            show.appendChild(newInput)
        },
        button: function(txt, fn, fnPar) {
            let btn = document.createElement('button')
            btn.innerText = txt
            btn.onclick = function() {fn(fnPar)}
            btns.appendChild(btn)
        },
        span: function() {
            let colon = document.createElement('span')
            colon.innerText = ':'
            colon.setAttribute('id','col')
            show.appendChild(colon)
        }
    }



    function createInputPage() {

        function verifyNumber(n) {
            let nCode = n.charCode
        
            if (nCode >= 48 && nCode <= 57) {
                
            } else {
                n.preventDefault()
            }
        }

        createMyElements['inputs'](verifyNumber)
        createMyElements['span']()
        createMyElements['inputs'](verifyNumber)
        
        let timeInputs = document.querySelectorAll('.timer-numbers')
        
        createMyElements['button']('Start', createTimer, timeInputs)
        
    }

    function createTimer(timeInputs) {

        time.setMinutes(Number(timeInputs[0].value))
        time.setSeconds(Number(timeInputs[1].value))

        show.innerHTML = '<p>Starting...</p>'
        btns.innerHTML = null
        
        function startTimer(interval) {
            
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

        let interval
        interval = setInterval( function() { startTimer(interval) }, 1000)

        createMyElements['button']('Pause', function() {isPaused = !isPaused}, null)
        createMyElements['button']('Stop', stopTimer, interval)
    }

    function stopTimer(interval) {
        show.innerHTML = null
        btns.innerHTML = null

        clearInterval(interval)

        if (isPaused) {
            isPaused = false
        }

        createInputPage()
    }

    window.addEventListener('load', createInputPage)

}

timer()
