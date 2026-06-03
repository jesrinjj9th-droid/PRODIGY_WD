// 1. Grab all the HTML elements we need to interact with
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

// 2. Variables to hold time values and interval state
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

// 3. Function to format time numbers so they always have leading zeros (e.g., "05" instead of "5")
function formatTime(time, digits = 2) {
    return time.toString().padStart(digits, '0');
}

// 4. The core function that updates the numbers on the screen
function updateTime() {
    elapsedTime = Date.now() - startTime;

    // Calculate time chunks
    let ms = Math.floor((elapsedTime % 1000) / 10); // get 2 digits for milliseconds
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let sec = totalSeconds % 60;
    let totalMinutes = Math.floor(totalSeconds / 60);
    let min = totalMinutes % 60;
    let hr = Math.floor(totalMinutes / 60);

    // Update the visual display numbers
    hoursDisplay.textContent = formatTime(hr);
    minutesDisplay.textContent = formatTime(min);
    secondsDisplay.textContent = formatTime(sec);
    millisecondsDisplay.textContent = formatTime(ms);
}

// 5. Button Logic: START
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        // Set the start point (accounting for any previously paused time)
        startTime = Date.now() - elapsedTime;
        // Run updateTime every 10 milliseconds
        timerInterval = setInterval(updateTime, 10);
        
        // Toggle running states and button displays
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// 6. Button Logic: PAUSE
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        // Clear the interval to freeze the timer
        clearInterval(timerInterval);
        
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true;
    }
});

// 7. Button Logic: RESET
resetBtn.addEventListener('click', () => {
    // Clear everything
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;

    // Reset visual text back to zeroes
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    // Wipe out any recorded lap rows from the screen
    lapsList.innerHTML = '';

    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

// 8. Button Logic: RECORD LAP
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCount++;
        
        // Grab the exact current text from the visual display right now
        const currentLapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}.${millisecondsDisplay.textContent}`;
        
        // Dynamically create a new list item (li) element
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCount}</span> <span>${currentLapTime}</span>`;
        
        // Add it to the top of our lap box list
        lapsList.prepend(li);
    }
});