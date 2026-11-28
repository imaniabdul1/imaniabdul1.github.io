// ===== Typewriter: "And I'm a _____." =====
(function () {
  const el = document.getElementById("typed");
  const words = ["software engineer", "creator", "designer", "developer", "problem solver", "storyteller"];
  if (!el) return;
  // If the device asks for reduced motion, swap whole words instead of typing letter by letter
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let n = 0;
    setInterval(() => { n = (n + 1) % words.length; el.textContent = words[n]; }, 2500);
    return;
  }
  let w = 0, i = words[0].length, deleting = true;
  function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i) || "\u00A0"; // non-breaking space keeps the blank anchored when empty
    let delay = deleting ? 45 : 90;
    if (deleting) {
      i--;
      if (i < 0) { deleting = false; w = (w + 1) % words.length; i = 0; delay = 300; }
    } else {
      i++;
      if (i > words[w].length) { deleting = true; i = words[w].length; delay = 1800; }
    }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 2200);
})();

// ===== Chevrons scroll to next section =====
document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.closest("section").nextElementSibling;
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Active nav link + reveal on scroll =====
const navLinks = [...document.querySelectorAll(".nav a")];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main > section").forEach(s => sectionObserver.observe(s));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

let currentSet = [];

// ===== Modal (images + videos) =====
const modal = document.getElementById("modal");
const stage = document.getElementById("modal-stage");
const caption = document.getElementById("modal-caption");
const prevBtn = document.getElementById("modal-prev");
const nextBtn = document.getElementById("modal-next");
let imgIndex = 0, lastFocus = null;

function showModal(hasNav) {
  lastFocus = document.activeElement;
  prevBtn.hidden = nextBtn.hidden = !hasNav;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close").focus();
}
function closeModal() {
  modal.classList.remove("open");
  stage.innerHTML = "";
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
function drawImage() {
  const item = currentSet[imgIndex];
  stage.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
  caption.innerHTML = `<strong>${item.title}</strong>${item.text ? `<span>${item.text}</span>` : ""}`;
}
function openImage(i) { imgIndex = i; drawImage(); showModal(true); }
function step(d) { imgIndex = (imgIndex + d + currentSet.length) % currentSet.length; drawImage(); }

document.querySelectorAll(".demo-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.youtube) {
      const [id, query] = btn.dataset.youtube.split("?");
      const start = new URLSearchParams(query || "").get("start") || 0;
      stage.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?start=${start}&autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen title="${btn.dataset.title} demo"></iframe>
        <a class="yt-fallback" href="https://www.youtube.com/watch?v=${id}&t=${start}s" target="_blank" rel="noopener">Trouble playing? Watch on YouTube →</a>`;    } else {
      stage.innerHTML = `<video src="${btn.dataset.video}" controls autoplay playsinline></video>`;
    }
    caption.innerHTML = `<strong>${btn.dataset.title}</strong>`;
    showModal(false);
  });
});

prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (!prevBtn.hidden && e.key === "ArrowLeft") step(-1);
  if (!nextBtn.hidden && e.key === "ArrowRight") step(1);
});

// ===== Contact form =====
// GitHub Pages can't process forms, so this opens the visitor's email app with the message filled in.
// To receive messages without email apps, create a free form at formspree.io and set FORM_ENDPOINT.
const FORM_ENDPOINT = "https://formspree.io/f/mdegvadg"; 
const TO = "iabdul@umich.edu";
document.getElementById("contact-form").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, note = document.getElementById("form-note");
  const data = Object.fromEntries(new FormData(f));
  if (!data.name || !data.email || !data.message) { note.textContent = "Please add your name, email, and a message."; return; }
  if (FORM_ENDPOINT) {
    note.textContent = "Sending…";
    try {
      const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
      note.textContent = r.ok ? "Thanks! Your message was sent." : "Something went wrong. Please email me directly.";
      if (r.ok) f.reset();
    } catch { note.textContent = "Something went wrong. Please email me directly."; }
    return;
  }
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  window.location.href = `mailto:${TO}?subject=${encodeURIComponent(data.subject || "Hello from your portfolio")}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app…";
});
