document.addEventListener("DOMContentLoaded", () => {
    let timerDisplay = document.getElementById("timer");
    let startBtn = document.getElementById("startBtn");
    let pauseResumeBtn = document.getElementById("pauseResumeBtn");
    let resetBtn = document.getElementById("resetBtn");

    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timer;
    let isRunning = false;
    let isPaused = false;

    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            isPaused = false;
            startBtn.disabled = true; // Disable start after first press
            pauseResumeBtn.innerText = "Pause";

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alert("Pomodoro session completed!");
                    isRunning = false;
                    startBtn.disabled = false; // Re-enable after completion
                    pauseResumeBtn.innerText = "Pause";
                }
            }, 1000);
        }
    }

    function pauseResumeTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            isPaused = true;
            pauseResumeBtn.innerText = "Resume";
        } else if (isPaused) {
            isRunning = true;
            isPaused = false;
            pauseResumeBtn.innerText = "Pause";

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alert("Pomodoro session completed!");
                    isRunning = false;
                    startBtn.disabled = false;
                    pauseResumeBtn.innerText = "Pause";
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 25 * 60; // Reset to 25 minutes
        isRunning = false;
        isPaused = false;
        updateDisplay();
        startBtn.disabled = false;
        pauseResumeBtn.innerText = "Pause";
    }

    startBtn.addEventListener("click", startTimer);
    pauseResumeBtn.addEventListener("click", pauseResumeTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateDisplay(); // Initialize display
});
