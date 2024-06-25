document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startStopButton = document.getElementById('startStop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapsContainer = document.getElementById('laps');

    let timer;
    let isRunning = false;
    let elapsedTime = 0;
    let startTime;

    function formatTime(time) {
        const date = new Date(time);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startStopButton.textContent = 'Pause';
        startStopButton.style.backgroundColor = '#ffc107';
        isRunning = true;
    }

    function stopTimer() {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = '#28a745';
        isRunning = false;
    }

    startStopButton.addEventListener('click', function() {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    resetButton.addEventListener('click', function() {
        stopTimer();
        elapsedTime = 0;
        updateDisplay();
        lapsContainer.innerHTML = '';
    });

    lapButton.addEventListener('click', function() {
        if (isRunning) {
            const lapTime = formatTime(elapsedTime);
            const lapElement = document.createElement('li');
            lapElement.textContent = lapTime;
            lapsContainer.appendChild(lapElement);
        }
    });
});