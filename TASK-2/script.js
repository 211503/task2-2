let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lap-times');

document.getElementById('start-btn').addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    }
});

document.getElementById('pause-btn').addEventListener('click', function() {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
});

document.getElementById('reset-btn').addEventListener('click', function() {
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    updatedTime = 0;
    running = false;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    lapList.innerHTML = '';
});

document.getElementById('lap-btn').addEventListener('click', function() {
    if (running) {
        const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);

    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
