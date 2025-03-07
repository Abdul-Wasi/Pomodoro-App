document.addEventListener("DOMContentLoaded", () => {
    let timerDisplay = document.getElementById("timer");
    let startBtn = document.getElementById("startBtn");
    let resetBtn = document.getElementById("resetBtn");

    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timer;
    let isRunning = false;

    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alert("Pomodoro session completed!");
                    isRunning = false;
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 25 * 60;
        isRunning = false;
        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateDisplay(); // Initialize display
});
