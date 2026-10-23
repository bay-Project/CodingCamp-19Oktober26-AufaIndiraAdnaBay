# Design Document

## Overview
To-Do List Life Dashboard adalah halaman web statis (client-side) dengan
4 bagian: Greeting, Focus Timer, To-Do List, dan Quick Links.
Data disimpan di Local Storage. Tanpa framework dan tanpa backend.

## File Structure
- index.html
- css/style.css   (1 file CSS)
- js/script.js    (1 file JavaScript)

## Layout
Satu halaman dengan 4 kartu: Greeting di atas, lalu Focus Timer,
To-Do List, dan Quick Links. Di layar kecil kartu tersusun ke bawah.

## Local Storage Keys
- userName   : string, nama pengguna untuk greeting
- tasks      : array JSON berisi { id, text, done }
- taskSort   : string, "none" | "status" | "alpha"
- quickLinks : array JSON berisi { id, name, url }

## Components (fungsi di script.js)
- Greeting: updateClock() dijalankan tiap 1 detik, getGreeting(hour),
  saveName(), loadName()
- Focus Timer: startTimer(), stopTimer(), resetTimer(), renderTimer()
  (durasi 25 menit = 1500 detik)
- To-Do List: addTask(), editTask(), toggleTask(), deleteTask(),
  isDuplicate(text), sortTasks(mode), renderTasks()
- Quick Links: addLink(), deleteLink(), renderLinks()
- Storage: save(key, value) dan load(key, fallback)

## Error Handling
- Tugas kosong atau duplikat ditolak dengan pesan peringatan.
- Link kosong ditolak; URL tanpa https:// diberi awalan otomatis.
- Data Local Storage yang rusak diganti nilai bawaan.

## Browser Compatibility
Hanya memakai API standar (localStorage, setInterval, DOM) yang
didukung Chrome, Firefox, Edge, dan Safari.