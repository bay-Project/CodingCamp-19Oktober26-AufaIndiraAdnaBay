// ===== Storage helpers =====
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data === null ? fallback : JSON.parse(data);
  } catch (error) {
    return fallback; // data rusak diganti nilai bawaan
  }
}

// ===== Greeting =====
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");
const greetingEl = document.getElementById("greeting");
const nameInput = document.getElementById("name-input");
const saveNameBtn = document.getElementById("save-name");

let userName = load("userName", "");

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Good night"; // 22:00 sampai 04:59
}

function renderGreeting(now) {
  const text = getGreeting(now.getHours());
  greetingEl.textContent = userName ? text + ", " + userName : text;
}

function updateClock() {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  timeEl.textContent = now.toLocaleTimeString("en-GB"); // format 24 jam
  renderGreeting(now);
}

function saveName() {
  userName = nameInput.value.trim();
  save("userName", userName);
  renderGreeting(new Date());
}

saveNameBtn.addEventListener("click", saveName);
nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") saveName();
});

// ===== Inisialisasi =====
nameInput.value = userName;
updateClock();
setInterval(updateClock, 1000);

// ===== Focus Timer =====
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("timer-start");
const stopBtn = document.getElementById("timer-stop");
const resetBtn = document.getElementById("timer-reset");

const TIMER_DURATION = 1 * 60; // 25 menit dalam detik
let remaining = TIMER_DURATION;
let timerId = null;
let endTime = 0;

function renderTimer() {
  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  timerDisplay.textContent = minutes + ":" + seconds;
}

function tick() {
  remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
  renderTimer();
  if (remaining === 0) {
    stopTimer();
    setTimeout(function () {
      alert("Waktu fokus selesai! Saatnya istirahat.");
    }, 50);
  }
}

function startTimer() {
  if (timerId !== null) return; // sudah berjalan
  if (remaining <= 0) remaining = TIMER_DURATION;
  endTime = Date.now() + remaining * 1000;
  timerId = setInterval(tick, 250);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remaining = TIMER_DURATION;
  renderTimer();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);