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