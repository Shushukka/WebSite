// CALENDAR
const calendar = document.getElementById("calendar");
for (let i = 1; i <= 31; i++) {
    let day = document.createElement("div");
    day.innerText = i;
    if (i === 29) day.classList.add("active");
    calendar.appendChild(day);
}

// COUNTDOWN

const targetDate = new Date("2026-05-29T00:00:00");

function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    render("days", days);
    render("hours", hours);
    render("minutes", minutes);
    render("seconds", seconds);
}

function render(id, value) {
    const container = document.getElementById(id);
    container.innerHTML = "";

    const digits = value.toString().padStart(2, "0").split("");

    digits.forEach(num => {
        const box = document.createElement("span");
        box.textContent = num;
        container.appendChild(box);
    });
}

updateTimer();
setInterval(updateTimer, 1000);

// SLIDER
let current = 0;
const slides = document.querySelectorAll('.slide');

document.getElementById('totalSlides').textContent = slides.length;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');

    document.getElementById('currentSlide').textContent = index + 1;
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

showSlide(current);

// TELEGRAM
async function sendTelegram() {
    const name = prompt("Введите имена гостей:");

    if (!name || name.trim() === "") {
        alert("Данные введены неверно");
        return;
    }

    await fetch("https://damp-bread-bab1.daniil-maslovski04.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    alert("Спасибо! Мы получили подтверждение 💌");
}