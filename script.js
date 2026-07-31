function dayIndexFromDate(date, total) {
  const start = new Date("2020-01-01T00:00:00Z");
  const diffDays = Math.floor((date - start) / 86400000);
  return ((diffDays % total) + total) % total;
}

async function loadWotd() {
  const res = await fetch("words.json");
  if (!res.ok) throw new Error("Failed to load words.json");

  const words = await res.json();
  if (!Array.isArray(words) || words.length === 0) return;

  const today = new Date(); // uses user's local time
  const idx = dayIndexFromDate(today, words.length);

  const word = words[idx];
  document.getElementById("wotd-norwegian").textContent = word.norwegian;
  document.getElementById("wotd-english").textContent = word.english;
}

loadWotd().catch(console.error);

const navWrap = document.querySelector('.nav-wrap');
const btn = document.querySelector('.nav-toggle');

btn.addEventListener('click', () => {
  const isOpen = navWrap.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
});