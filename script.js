document.addEventListener("DOMContentLoaded", () => {
    let timerDisplay = document.getElementById("timer");
    let progressBar = document.getElementById("progressBar");
    let startBtn = document.getElementById("startBtn");
    let pauseResumeBtn = document.getElementById("pauseResumeBtn");
    let resetBtn = document.getElementById("resetBtn");
    let themeToggle = document.getElementById("themeToggle");
  
    let totalTime = 25 * 60; // 25 minutes in seconds
    let timeLeft = totalTime;
    let timer;
    let isRunning = false;
    let isPaused = false;
  
    function updateDisplay() {
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerDisplay.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      //Update progress bar percentage
      let progressPercentage = (timeLeft / totalTime) * 100;
      progressBar.value = progressPercentage;
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
      timeLeft = totalTime; // Reset to 25 minutes
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
  
    // DARK MODE TOGGLE LOGIC
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      themeToggle.innerText = "☀️ Light Mode";
    }
  
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        themeToggle.innerText = "☀️ Light Mode";
      } else {
        localStorage.setItem("darkMode", "disabled");
        themeToggle.innerText = "🌙 Dark Mode";
      }
    });
  });
  