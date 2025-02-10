const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timerDisplay = document.getElementById("timer-display");
const timeInputWrapper = document.getElementById("time-input-wrapper");

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

let timeLeft = 0;
let intervallo;

// 🔹 Function to Update Timer Display
const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.innerHTML = `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
};

// 🔹 Function to Play Beep Sound
const playBeep = () => {
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = context.createOscillator();
  let gainNode = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, context.currentTime);
  gainNode.gain.setValueAtTime(0.2, context.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop();
    context.close();
  }, 1000);
};

// 🔹 Start Timer Function
const startTimer = () => {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  timeLeft = minutes * 60 + seconds;

  if (timeLeft === 0) {
    alert("Please enter a valid time!");
    return;
  }

  // 🛑 Hide Input Fields & Show Timer Display
  timeInputWrapper.style.display = "none";
  timerDisplay.style.display = "block";

  intervallo = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(intervallo);
      playBeep();
      alert("Time is up!");

      // ✅ Show Input Fields Again & Reset Timer
      timeInputWrapper.style.display = "block";
      timerDisplay.style.display = "none";
      minutesInput.value = "";
      secondsInput.value = "";
    }
  }, 1000);
};

// 🔹 Stop Timer Function
const stopTimer = () => clearInterval(intervallo);

// 🔹 Reset Timer Function
const resetTimer = () => {
  clearInterval(intervallo);
  minutesInput.value = "";
  secondsInput.value = "";
  timeLeft = 0;
  updateTimer();

  // ✅ Show Input Fields Again
  timeInputWrapper.style.display = "block";
  timerDisplay.style.display = "none";
};

// Event Listeners
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);


// switch theme functions

let darkMode = localStorage.getItem("darkMode"); 
const themeSwitch = document.getElementById("switch-theme");

const enableDarkMode = () => {
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "active");
  darkMode = "active";
};

const disableDarkMode = () => {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", null); // Corrected
};

if (darkMode === "active") {
  enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "active") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
