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
    el.textContent = word.slice(0, i);
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

// ===== Gallery data =====
const PHOTOS = [
  { src: "images/holdHand.jpg", title: "Threads of Time", text: "Two generations of women intertwine hands." },
  { src: "images/concertHug.jpg", title: "In a Crowd, Yet Together", text: "A couple wraps in a quiet embrace as they enjoy a love song." },
  { src: "images/ithaca.jpg", title: "Pathway into Serenity", text: "A winding pathway leads to a still forest." },
  { src: "images/concert.jpg", title: "A Shimmer in the Spotlight", text: "A guitarist glows as he performs his final song." },
  { src: "images/indiana.jpg", title: "Whispers of the Dunes", text: "Tucked away beside the bustling beach, the dunes stand quietly." },
  { src: "images/relax.jpg", title: "Afternoon Drift", text: "An office worker drifts to sleep listening to the splashes of the nearby fountain." },
  { src: "images/childYell.jpg", title: "Boundless Joy", text: "A young girl prances to her mother across a clover-covered hill." },
  { src: "images/momInaya.jpg", title: "A Tale of Two Moods", text: "A mother and daughter: one in peaceful satisfaction, the other lost in thought." },
  { src: "images/mom.jpg", title: "A Battle with the Breeze", text: "A woman wears a grin as the wind wraps around her." },
  { src: "images/cousins.jpg", title: "A Frame in Bloom", text: "A family poses amidst a sea of blooming flowers." },
  { src: "images/surfer.jpg", title: "Gliding on Waves", text: "A surfer completes his first wave after hours of effort." },
  { src: "images/beach.jpg", title: "Evening on the Shore", text: "A family wades into the shallow waters as the sky dims." },
  { src: "images/grandmaYell.jpg", title: "Stepping Through Tradition", text: "A woman gently reprimands her granddaughter." },
  { src: "images/ducks.jpg", title: "Sunrise Swim", text: "Two ducks enjoy a morning swim, bathing in the day's golden glow." },
  { src: "images/town.jpg", title: "A Christmas Town in Summer's Eve", text: "The cozy glows of the lakeside cottages flicker to life." },
  { src: "images/grandmaHug.jpg", title: "Wrapped in Embrace", text: "A grandma holds her grandson as she gives her blessings at his wedding." },
  { src: "images/childrenWater.jpg", title: "Siblings at the Water's Edge", text: "Two siblings stand at the water’s edge, their reflections gliding over the water." },
  { src: "images/sunset.jpg", title: "Sunset Reflections", text: "A mother and son gaze at the peaceful view of a fading sunset." }
];

const RECIPES = [
  ["crepe", "Nutella and Strawberry Crepes"],
  ["pizza1", "Spicy Goat Cheese and Garlic Tomato White Pizza"],
  ["ramenWithSalad", "Coconut Curry Ramen with Salmon Cucumber Salad"],
  ["charcuterie2", "Charcuterie Board"],
  ["lambPasta", "Carbonara Pasta with Lamb and Cucumbers"],
  ["toastAndCrepe", "Feta Salmon Bagel with Crème Fraîche and Strawberry Crepes"],
  ["snapper", "Coconut Curry Thai Red Snapper"],
  ["shrimpPasta", "Italian-Indian Inspired Pasta with Curry Shrimp"],
  ["cake", "The Neapolitan: Chocolate Cake with Vanilla Buttercream and Strawberries"],
  ["pizza2", "Spicy Olive, Beef Sausage, and Tomato Red Pizza"],
  ["friedRice", "Chinese Fried Rice with Beef"],
  ["charcuterie1", "Mini Charcuterie Board"],
  ["seafood", "Cajun Seafood Boil with Ramen"],
  ["shinRamen", "Elevated Shin Ramen"],
  ["biryani", "Goat Biryani with Raita"],
  ["charcuterie3", "Another Charcuterie Board"],
  ["egg", "Pickled Onion and Feta Egg with Cottage Cheese and Fruits"],
  ["ceaser", "Anchovy and Parmesan Caesar Salad"],
  ["poptarts", "Nutella and Strawberry Pop-Tarts"],
  ["steak", "Garlic Butter Steak"],
  ["peachPie", "Peach Cobbler Pie"],
  ["noodles", "Stir-Fry Ramen Noodles"],
  ["jamCookie", "Strawberry Jam Thumbprint Cookies"],
  ["tomatoToast", "Goat Cheese, Cherry Tomato, and Honey Toast with Apples"],
  ["burrata", "Spicy Burrata and Tomato Caprese Salad"],
  ["applePie", "Caramel Apple Pie"],
  ["thanksgiving", "Thanksgiving: Stir-Fried Bok Choy, Pad Thai Glass Noodles, Cumin Lamb, Garlic Mushrooms"],
  ["sausagePasta", "Creamy Cajun Pasta with Chicken Sausage"]
].map(([f, t]) => ({ src: `recipes/${f}.jpg`, title: t, text: "" }));

const BLURBS = {
  photos: "With a camera in hand, I capture fleeting moments: the laughter of children on a sunny afternoon, the quiet grace of a stranger lost in thought. Finding the extraordinary in the ordinary.",
  recipes: "Cooking is where my love of design meets food. These are original recipes I’ve developed over the past few years, inspired by countless cooking shows and videos."
};

// ===== Tabs + gallery =====
const galleryEl = document.getElementById("gallery");
const blurbEl = document.getElementById("tab-blurb");
let currentSet = PHOTOS;

function renderGallery(key) {
  currentSet = key === "photos" ? PHOTOS : RECIPES;
  blurbEl.textContent = BLURBS[key];
  galleryEl.innerHTML = "";
  currentSet.forEach((item, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", item.title);
    b.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy">`;
    b.addEventListener("click", () => openImage(idx));
    galleryEl.appendChild(b);
  });
}
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === tab));
    renderGallery(tab.dataset.tab);
  });
});
renderGallery("photos");

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
      stage.innerHTML = `<iframe src="https://www.youtube.com/embed/${btn.dataset.youtube}&autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="${btn.dataset.title} demo"></iframe>`;
    } else {
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
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/yourid"
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
