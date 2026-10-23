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
const nameForm = document.getElementById("name-form");
const changeNameBtn = document.getElementById("change-name");

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

function updateNameForm() {
  const hasName = userName !== "";
  nameForm.hidden = hasName;        // sembunyikan form kalau nama sudah ada
  changeNameBtn.hidden = !hasName;  // tampilkan tombol "Ubah nama"
}

function showNameForm() {
  nameForm.hidden = false;
  changeNameBtn.hidden = true;
  nameInput.focus();
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
  updateNameForm();
}

saveNameBtn.addEventListener("click", saveName);
changeNameBtn.addEventListener("click", showNameForm);
nameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") saveName();
});

// Inisialisasi greeting
nameInput.value = userName;
updateClock();
setInterval(updateClock, 1000);
updateNameForm();

// ===== Focus Timer =====
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("timer-start");
const stopBtn = document.getElementById("timer-stop");
const resetBtn = document.getElementById("timer-reset");

const TIMER_DURATION = 25 * 60; // 25 menit dalam detik
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

// ===== To-Do List =====
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskMessage = document.getElementById("task-message");
const sortSelect = document.getElementById("sort-select");

let tasks = load("tasks", []);
if (!Array.isArray(tasks)) tasks = []; // jaga-jaga kalau data rusak

let sortMode = load("taskSort", "none");
if (!["none", "status", "alpha"].includes(sortMode)) sortMode = "none";

function showTaskMessage(text) {
  taskMessage.textContent = text;
}

function saveTasks() {
  save("tasks", tasks);
}

// Cek duplikat tanpa membedakan huruf besar/kecil
function isDuplicate(text, ignoreId) {
  const lower = text.toLowerCase();
  return tasks.some(function (t) {
    return t.id !== ignoreId && t.text.toLowerCase() === lower;
  });
}

// Urutkan salinan daftar, supaya urutan asli tidak berubah
function getSortedTasks() {
  const list = tasks.slice();
  if (sortMode === "status") {
    list.sort(function (a, b) { return Number(a.done) - Number(b.done); });
  } else if (sortMode === "alpha") {
    list.sort(function (a, b) { return a.text.localeCompare(b.text); });
  }
  return list;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    showTaskMessage("Tugas tidak boleh kosong.");
    return;
  }
  if (isDuplicate(text)) {
    showTaskMessage("Tugas ini sudah ada di daftar.");
    return;
  }
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  taskInput.value = "";
  showTaskMessage("");
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (!task) return;
  const newText = prompt("Edit tugas:", task.text);
  if (newText === null) return; // dibatalkan
  const trimmed = newText.trim();
  if (trimmed === "") {
    showTaskMessage("Tugas tidak boleh kosong.");
    return;
  }
  if (isDuplicate(trimmed, id)) {
    showTaskMessage("Tugas ini sudah ada di daftar.");
    return;
  }
  task.text = trimmed;
  saveTasks();
  showTaskMessage("");
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  getSortedTasks().forEach(function (task) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () { toggleTask(task.id); });

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () { editTask(task.id); });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.addEventListener("click", function () { deleteTask(task.id); });

    li.append(checkbox, span, editBtn, deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addTask();
});

sortSelect.value = sortMode;
sortSelect.addEventListener("change", function () {
  sortMode = sortSelect.value;
  save("taskSort", sortMode);
  renderTasks();
});

renderTasks();

// ===== Quick Links =====
const linkNameInput = document.getElementById("link-name");
const linkUrlInput = document.getElementById("link-url");
const addLinkBtn = document.getElementById("add-link");
const linkMessage = document.getElementById("link-message");
const linksContainer = document.getElementById("links-container");

let quickLinks = load("quickLinks", []);
if (!Array.isArray(quickLinks)) quickLinks = []; // jaga-jaga kalau data rusak

function saveLinks() {
  save("quickLinks", quickLinks);
}

// Rapikan URL: tambahkan https:// kalau belum ada, tolak yang tidak valid
function normalizeUrl(raw) {
  let url = raw.trim();
  if (url === "") return null;
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname.includes(".")) return null; // contoh: "abc" bukan situs
    return parsed.href;
  } catch (error) {
    return null;
  }
}

function addLink() {
  const url = normalizeUrl(linkUrlInput.value);
  if (url === null) {
    linkMessage.textContent = "URL tidak valid. Contoh: google.com";
    return;
  }
  const name = linkNameInput.value.trim() || new URL(url).hostname;
  quickLinks.push({ id: Date.now(), name: name, url: url });
  saveLinks();
  linkNameInput.value = "";
  linkUrlInput.value = "";
  linkMessage.textContent = "";
  renderLinks();
}

function deleteLink(id) {
  quickLinks = quickLinks.filter(function (l) { return l.id !== id; });
  saveLinks();
  renderLinks();
}

function renderLinks() {
  linksContainer.innerHTML = "";
  quickLinks.forEach(function (link) {
    const wrapper = document.createElement("div");
    wrapper.className = "link-item";

    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.name;
    anchor.target = "_blank";           // buka di tab baru
    anchor.rel = "noopener noreferrer"; // keamanan

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.title = "Hapus link";
    deleteBtn.addEventListener("click", function () { deleteLink(link.id); });

    wrapper.append(anchor, deleteBtn);
    linksContainer.appendChild(wrapper);
  });
}

addLinkBtn.addEventListener("click", addLink);
linkUrlInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addLink();
});

renderLinks();