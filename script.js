let alarmSound = new Audio("alarm.mp3"); // Load the alarm sound

document.addEventListener("DOMContentLoaded", () => {
  let timerDisplay = document.getElementById("timer");
  let progressBar = document.getElementById("progressBar");
  let startBtn = document.getElementById("startBtn");
  let pauseResumeBtn = document.getElementById("pauseResumeBtn");
  let resetBtn = document.getElementById("resetBtn");
  let customTimeInput = document.getElementById("customTime");
  let setTimeBtn = document.getElementById("setTimeBtn"); // New Set Time Button
  let blueThemeBtn = document.getElementById("blueTheme");
  let greenThemeBtn = document.getElementById("greenTheme");
  let darkThemeBtn = document.getElementById("darkTheme");

  let totalTime = 25 * 60; // Default: 25 minutes in seconds
  let timeLeft = totalTime;
  let timer;
  let isRunning = false;
  let isPaused = false;

  function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    // Update progress bar percentage
    let progressPercentage = (timeLeft / totalTime) * 100;
    progressBar.value = progressPercentage;
  }

  function setTime() {
    let customMinutes = parseInt(customTimeInput.value);
    if (!isNaN(customMinutes) && customMinutes > 0) {
      totalTime = customMinutes * 60; // Convert minutes to seconds
      timeLeft = totalTime;
      updateDisplay();
    } else {
      alert("Please enter a valid time (at least 1 minute).");
    }
  }

  function startTimer() {
    if (!isRunning) {
        isRunning = true;
        isPaused = false;
        startBtn.disabled = true; // Disable start after first press
        pauseResumeBtn.innerText = "Pause";

        // Show spinner for 1 second before starting
        let spinner = document.getElementById("loadingSpinner");
        spinner.classList.add("show-spinner");

        setTimeout(() => {
            spinner.classList.remove("show-spinner");

            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    alarmSound.play();
                    alert("Pomodoro session completed!");
                    isRunning = false;
                    startBtn.disabled = false;
                    pauseResumeBtn.innerText = "Pause";
                }
            }, 1000);
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
          alarmSound.play();
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
    timeLeft = totalTime; // Reset to selected/custom time
    isRunning = false;
    isPaused = false;
    updateDisplay();
    startBtn.disabled = false;
    pauseResumeBtn.innerText = "Pause";
  }

  setTimeBtn.addEventListener("click", setTime); // Event listener for setting time
  startBtn.addEventListener("click", startTimer);
  pauseResumeBtn.addEventListener("click", pauseResumeTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateDisplay(); // Initialize display

  // THEME SWITCHING LOGIC
  function applyTheme(theme) {
    document.body.classList.remove("blue-theme", "green-theme", "dark-mode");
    document.body.classList.add(theme);
    localStorage.setItem("selectedTheme", theme);
  }

  // Load saved theme from localStorage
  let savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Theme switch button event listeners
  blueThemeBtn.addEventListener("click", () => applyTheme("blue-theme"));
  greenThemeBtn.addEventListener("click", () => applyTheme("green-theme"));
  darkThemeBtn.addEventListener("click", () => applyTheme("dark-mode"));
});
