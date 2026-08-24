const pad = value => String(value).padStart(2, "0");
const departure = new Date("2027-06-11T08:30:00+02:00").getTime();

function updateCountdown() {
  const remaining = Math.max(0, departure - Date.now());
  const values = {
    "count-days": Math.floor(remaining / 86400000),
    "count-hours": Math.floor((remaining / 3600000) % 24),
    "count-minutes": Math.floor((remaining / 60000) % 60),
    "count-seconds": Math.floor((remaining / 1000) % 60),
  };
  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = pad(value);
  });
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");
menuButton?.addEventListener("click", () => {
  const open = mainNav?.classList.toggle("open") ?? false;
  menuButton.setAttribute("aria-expanded", String(open));
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll("[data-day]").forEach(tab => {
  tab.addEventListener("click", () => {
    const selected = tab.getAttribute("data-day");
    document.querySelectorAll("[data-day]").forEach(item => {
      const active = item.getAttribute("data-day") === selected;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-panel]").forEach(panel => panel.classList.toggle("active", panel.getAttribute("data-panel") === selected));
  });
});

const bingoKey = "dinguerie-demo-bingo-v1";
let checked = [];
try { checked = JSON.parse(localStorage.getItem(bingoKey) || "[]"); } catch { checked = []; }
const bingoButtons = [...document.querySelectorAll("[data-bingo]")];
const bingoCount = document.getElementById("bingo-count");
const bingoBar = document.getElementById("bingo-bar");

function renderBingo() {
  bingoButtons.forEach(button => {
    const active = checked.includes(button.getAttribute("data-bingo"));
    button.classList.toggle("checked", active);
    const marker = button.querySelector("i");
    if (marker) marker.textContent = active ? "✓" : "+";
  });
  if (bingoCount) bingoCount.textContent = `${checked.length}/${bingoButtons.length} validés`;
  if (bingoBar) bingoBar.style.width = `${checked.length / bingoButtons.length * 100}%`;
}

bingoButtons.forEach(button => button.addEventListener("click", () => {
  const value = button.getAttribute("data-bingo");
  if (!value) return;
  checked = checked.includes(value) ? checked.filter(item => item !== value) : [...checked, value];
  localStorage.setItem(bingoKey, JSON.stringify(checked));
  renderBingo();
}));
renderBingo();

const decoys = ["Direction la plage", "Trouver des tapas", "Faire une sieste", "Voir le sunset", "Chercher une glace", "Rentrer raisonnablement", "Prendre une photo de groupe", "Boire de l’eau"];
const finals = ["🍻 Beer pong express", "🥃 Je n’ai jamais", "🃏 La pyramide", "🎯 Action ou gorgée", "🔢 Le jeu du 21", "👑 Le roi de l’apéro"];
const rouletteButton = document.getElementById("roulette-button");
const rouletteResult = document.getElementById("roulette-result");
let rolling = false;

rouletteButton?.addEventListener("click", () => {
  if (rolling || !rouletteResult) return;
  rolling = true;
  rouletteButton.disabled = true;
  rouletteButton.textContent = "🎲 Ça tourne…";
  rouletteResult.classList.add("rolling");
  const label = rouletteResult.querySelector("small");
  const result = rouletteResult.querySelector("strong");
  if (label) label.textContent = "LES BONNES IDÉES DÉFILENT";
  let index = 0;
  const timer = window.setInterval(() => {
    if (result) result.textContent = decoys[index % decoys.length];
    index += 1;
    if (index < 13) return;
    window.clearInterval(timer);
    if (result) result.textContent = finals[Math.floor(Math.random() * finals.length)];
    if (label) label.textContent = "LE DESTIN A CHOISI";
    rouletteResult.classList.remove("rolling");
    rouletteButton.disabled = false;
    rouletteButton.textContent = "🎲 Rejouer";
    rolling = false;
  }, 125);
});

const fictionalParticipants = ["Alex Turbo", "Jade Sunset", "Milo Tempo", "Nina Splash", "Rico Siesta", "Lou Fiesta"];
const payerButton = document.getElementById("payer-button");
const payerWheel = document.getElementById("payer-wheel");
const payerResult = document.getElementById("payer-result");
const payerLabels = [...document.querySelectorAll(".payer-wheel-label span")];
let payerRotation = 0;
let payerSpinning = false;

function randomParticipantIndex(length) {
  if (!window.crypto?.getRandomValues) return Math.floor(Math.random() * length);
  const range = 0x100000000;
  const limit = range - (range % length);
  const values = new Uint32Array(1);
  let value;
  do { window.crypto.getRandomValues(values); value = values[0]; } while (value >= limit);
  return value % length;
}

payerButton?.addEventListener("click", () => {
  if (payerSpinning || !payerWheel || !payerResult) return;
  const winnerIndex = randomParticipantIndex(fictionalParticipants.length);
  const extraTurns = 5 + randomParticipantIndex(3);
  const currentAngle = ((payerRotation % 360) + 360) % 360;
  const targetAngle = (360 - winnerIndex * 60) % 360;
  payerRotation += extraTurns * 360 + ((targetAngle - currentAngle + 360) % 360);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const label = payerResult.querySelector("small");
  const result = payerResult.querySelector("strong");

  payerSpinning = true;
  payerButton.disabled = true;
  payerButton.textContent = "↻ Ça tourne…";
  payerWheel.style.transform = `rotate(${payerRotation}deg)`;
  payerLabels.forEach(item => { item.style.transform = `rotate(${-payerRotation}deg)`; });
  if (label) label.textContent = "SUSPENSE…";
  if (result) result.textContent = "La roue décide…";

  window.setTimeout(() => {
    if (label) label.textContent = "LA TOURNÉE EST POUR";
    if (result) result.textContent = `🍻 ${fictionalParticipants[winnerIndex]} paie sa tournée !`;
    payerButton.disabled = false;
    payerButton.textContent = "↻ Relancer la roulette";
    payerSpinning = false;
  }, reducedMotion ? 120 : 3700);
});

const modal = document.getElementById("survival-modal");
const closeButton = document.getElementById("modal-close");
function openModal() { modal?.classList.add("open"); modal?.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeButton?.focus(); }
function closeModal() { modal?.classList.remove("open"); modal?.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
document.querySelectorAll("[data-open-survival]").forEach(button => button.addEventListener("click", openModal));
closeButton?.addEventListener("click", closeModal);
modal?.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

const copyButton = document.getElementById("copy-address");
const addressText = document.getElementById("address-text");
copyButton?.addEventListener("click", async () => {
  const address = "42 Avenida de la Lune, Cala Estrella — adresse fictive";
  try {
    await navigator.clipboard.writeText(address);
    if (addressText) addressText.textContent = "ADRESSE FICTIVE COPIÉE !";
    window.setTimeout(() => { if (addressText) addressText.textContent = address; }, 1800);
  } catch {
    if (addressText) addressText.textContent = address;
  }
});
