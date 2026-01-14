# Attendance Risk Predictor

Attendance Risk Predictor is a lightweight web tool that helps students understand their **attendance status** and **predict future risk** based on current attendance and minimum percentage requirements.

The project is built with **plain HTML, CSS, and vanilla JavaScript**, focusing on **correct logic**, **clean UX**, and a **modern, premium UI** with smooth animations.

---

## Features

- Calculates current attendance percentage in real time
- Predicts how many future classes you can safely miss
- Clearly indicates status: **Safe**, **At Risk**, or **Unsafe**
- Animated light and dark mode with theme persistence
- Smooth micro-interactions and transitions
- Fully responsive, card-based layout
- No frameworks, no backend, no external libraries

---

## How It Works

**Inputs**
- Total classes conducted  
- Classes attended  
- Required attendance percentage  

**Logic**
- Current Attendance  
(attended / total) × 100

- Maximum Classes You Can Miss  
floor((attended × 100) / requiredPercentage − total)


**Status Rules**
- **Unsafe** → Already below required attendance  
- **At Risk** → Can miss 2 or fewer classes  
- **Safe** → Comfortable buffer remains  

All validation and calculations are handled entirely in JavaScript.

---

## UI / UX Highlights

- Light mode uses soft neutral tones (not pure white)
- Dark mode uses deep slate shades (not pure black)
- Animated theme toggle with smooth transitions
- Elevated card layout with depth and shadows
- Clean typography and spacing inspired by modern SaaS dashboards

---

## Tech Stack

- HTML5
- CSS3 (custom properties, animations, transitions)
- Vanilla JavaScript
- LocalStorage (theme persistence)

---

## Run Locally

Simply open `index.html` in your browser.  
No installation or server setup required.