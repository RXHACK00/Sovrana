/* =========================================================
   SOVRANA · interacciones
   ========================================================= */

/* ---------- Configuración ----------
   FORM_ENDPOINT: URL que recibe cada formulario (Formspree, Getform, tu backend…).
   Si queda vacío, el formulario funciona en modo demostración (no envía datos). */
const CONFIG = {
  FORM_ENDPOINT: {
    casting: "",
    aplicacion: "",
  },
  WHATSAPP: "000000000000", // solo números, con código de país
  MAX_FOTOS: 5,

  /* Cotizador (USD). Son valores de referencia: ajústalos a tus tarifas reales. */
  PRECIOS: {
    base: { moda: 280, musica: 240, baile: 200, kids: 160, ugc: 150 }, // por talento y jornada (UGC: por video)
    medio: { redes: 0, pauta: 0.4, tv: 1.0, ooh: 0.6 },                // recargo de uso que se suma
    territorio: { local: 1, nacional: 1.25, internacional: 1.8 },
    duracion: { 3: 1, 6: 1.2, 12: 1.5, perpetuo: 2.4 },
    urgencia: 0.2,   // +20 %
    agencia: 0.2,    // gestión de agencia 20 %
    margen: 0.12,    // ± del rango mostrado
  },
};

/* ---------- Talento ----------
   cats: kids | baile | musica | moda | ugc
   foto: ruta a la imagen (ej. "img/talento/valentina.jpg"). Vacío = placeholder.
   disponible: true si puede trabajar esta semana.
   Para menores: solo nombre de pila. */
const TALENT = [
  { id: "valentina", nombre: "Valentina", cats: ["moda", "musica"], edad: 24, altura: 176, tags: ["Editorial", "Pasarela"], idiomas: "Español, inglés", disponible: true, bio: "Rostro editorial con experiencia en pasarela y campañas de temporada. Cómoda frente a cámara en video y foto.", foto: "" },
  { id: "mateo", nombre: "Mateo", cats: ["kids"], edad: 7, altura: 124, tags: ["Comercial", "Spots"], idiomas: "Español", disponible: true, bio: "Natural, divertido y muy paciente en set. Experiencia en catálogos de ropa infantil y un spot de alimentos.", foto: "" },
  { id: "daniela", nombre: "Daniela", cats: ["baile", "musica"], edad: 22, altura: 165, tags: ["Urbano", "Comercial"], idiomas: "Español", disponible: false, bio: "Bailarina urbana y comercial. Ha participado en giras, videoclips y lanzamientos de marca.", foto: "" },
  { id: "sofia", nombre: "Sofía", cats: ["ugc"], edad: 27, altura: 162, tags: ["Skincare", "Lifestyle"], idiomas: "Español, inglés", disponible: true, bio: "Creadora UGC especializada en belleza y bienestar. Guion, grabación y edición en formato vertical.", foto: "" },
  { id: "andres", nombre: "Andrés", cats: ["moda"], edad: 26, altura: 186, tags: ["Comercial", "E‑commerce"], idiomas: "Español, portugués", disponible: true, bio: "Modelo comercial con medidas actualizadas. Lookbooks, e‑commerce y campañas de ropa masculina.", foto: "" },
  { id: "emilia", nombre: "Emilia", cats: ["kids"], edad: 5, altura: 110, tags: ["Familia", "Catálogo"], idiomas: "Español", disponible: false, bio: "Sonrisa espontánea y muy sociable. Ideal para campañas de familia y juguetería.", foto: "" },
  { id: "camilo", nombre: "Camilo", cats: ["baile"], edad: 25, altura: 178, tags: ["Contemporáneo", "Coreógrafo"], idiomas: "Español, inglés", disponible: true, bio: "Bailarín contemporáneo y coreógrafo. Dirige cuerpos de baile para shows y eventos corporativos.", foto: "" },
  { id: "isabella", nombre: "Isabella", cats: ["musica", "moda"], edad: 23, altura: 170, tags: ["Actuación", "Protagonista"], idiomas: "Español, inglés", disponible: true, bio: "Formación en actuación. Protagonista en videoclips de pop y balada; gran manejo de la emoción en cámara.", foto: "" },
  { id: "lucas", nombre: "Lucas", cats: ["ugc", "musica"], edad: 29, altura: 180, tags: ["Tech", "Humor"], idiomas: "Español", disponible: false, bio: "Creador UGC con tono cercano y humor. Tutoriales de apps, tecnología y servicios financieros.", foto: "" },
  { id: "renata", nombre: "Renata", cats: ["moda", "ugc"], edad: 31, altura: 168, tags: ["Curvy", "Lifestyle"], idiomas: "Español, inglés", disponible: true, bio: "Modelo curvy y creadora de contenido de moda. Campañas inclusivas y try‑on hauls.", foto: "" },
  { id: "tomas", nombre: "Tomás", cats: ["kids", "baile"], edad: 10, altura: 140, tags: ["Baile infantil", "Spots"], idiomas: "Español", disponible: true, bio: "Baila desde los 6 años. Experiencia en comerciales y coreografías infantiles para marcas.", foto: "" },
  { id: "paula", nombre: "Paula", cats: ["baile", "ugc"], edad: 21, altura: 160, tags: ["Latino", "Reels"], idiomas: "Español", disponible: true, bio: "Bailarina de ritmos latinos y creadora de reels de baile para marcas y lanzamientos musicales.", foto: "" },
  { id: "gabriel", nombre: "Gabriel", cats: ["musica"], edad: 34, altura: 183, tags: ["Carácter", "Actuación"], idiomas: "Español, inglés", disponible: false, bio: "Perfil de carácter para videoclips narrativos. Experiencia en cortometrajes y publicidad.", foto: "" },
  { id: "elena", nombre: "Elena", cats: ["moda"], edad: 45, altura: 172, tags: ["Senior", "Editorial"], idiomas: "Español, francés", disponible: true, bio: "Modelo senior con presencia editorial. Campañas de joyería, cosmética y moda atemporal.", foto: "" },
  { id: "martina", nombre: "Martina", cats: ["kids", "ugc"], edad: 9, altura: 132, tags: ["Kids UGC", "Familia"], idiomas: "Español", disponible: true, bio: "Contenido familiar junto a su madre para marcas infantiles. Gestionado siempre por su tutora.", foto: "" },
  { id: "nicolas", nombre: "Nicolás", cats: ["ugc"], edad: 24, altura: 175, tags: ["Fitness", "Food"], idiomas: "Español, inglés", disponible: true, bio: "Creador UGC de fitness y gastronomía. Reseñas, unboxings y testimonios con alta retención.", foto: "" },
];

/* ---------- Castings abiertos ----------
   cierra: fecha AAAA-MM-DD. Los vencidos se ocultan solos. */
const CASTINGS = [
  { cat: "musica", tag: "Videoclip", titulo: "Protagonista · Pop urbano", meta: "Mujer 18–28 · Rodaje de 2 días", cierra: "2026-10-24" },
  { cat: "moda", tag: "Moda", titulo: "Lookbook cápsula de invierno", meta: "Hombres y mujeres 20–35 · Estudio", cierra: "2026-10-30" },
  { cat: "kids", tag: "Kids", titulo: "Hermanos para campaña escolar", meta: "Niños 6–10 · Con tutor · 1 jornada", cierra: "2026-10-17" },
  { cat: "ugc", tag: "UGC", titulo: "Creadores para app de finanzas", meta: "22–40 · Tono cercano · 3 videos", cierra: "2026-11-08" },
  { cat: "baile", tag: "Baile", titulo: "Cuerpo de baile para lanzamiento", meta: "8 bailarines · Urbano / comercial", cierra: "2026-11-02" },
];

const CAT_LABEL = { kids: "Kids", baile: "Baile", musica: "Videos musicales", moda: "Moda", ugc: "UGC" };
const CAT_TONE = { kids: "tone-kids", baile: "tone-baile", musica: "tone-musica", moda: "tone-moda", ugc: "tone-ugc" };

/* Textos según quién visita (hero) */
const AUDIENCE = {
  marca: {
    pre: "Modelos, bailarines y creadores para",
    words: ["campañas infantiles", "coreografías en vivo", "videos musicales", "moda editorial", "contenido UGC que vende"],
    primary: ["Explorar talento", "#talento"],
    secondary: ["Cotizar en 30 segundos", "#cotizador"],
  },
  talento: {
    pre: "Tu talento merece llegar a",
    words: ["campañas nacionales", "videoclips", "pasarelas", "sets de moda", "marcas que pagan a tiempo"],
    primary: ["Aplicar al roster", "#unete"],
    secondary: ["Ver castings abiertos", "#calls"],
  },
};

/* ---------- Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const store = {
  get(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
};
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const money = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const baseURL = () => location.href.split(/[?#]/)[0];
const HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.8 8.2 3 4 6.8 4c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3C21 4 23.2 8.2 21.6 11.8 19.5 16.4 12 21 12 21z"/></svg>`;

function loadMedia(el, src, alt = "") {
  if (!src) return;
  const img = new Image();
  img.decoding = "async";
  img.alt = alt;
  img.onload = () => { el.querySelector(":scope > img")?.remove(); el.appendChild(img); requestAnimationFrame(() => el.classList.add("has-img")); };
  img.src = src;
}

let toastTimer;
function toast(msg) {
  const t = $(".toast");
  t.textContent = msg;
  t.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-on"), 3200);
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy"); ta.remove();
    return ok;
  }
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  initLoader();
  initMedia();
  initHeader();
  initMenu();
  initCursor();
  initMagnetic();
  initAurora();
  initHeroParallax();
  initAudience();
  initLive();
  initReveal();
  initMarquee();
  initManifesto();
  initDisciplines();
  initCounters();
  initCatalog();
  initDrawer();
  initDeepLinks();
  initEstimator();
  initForms();
  initCastings();
  initQuotes();
  initFaq();
  initFooter();
  initScrollLoop();
});

/* ---------- Preloader ---------- */
function initLoader() {
  const count = $(".loader-count span");
  const skip = new URLSearchParams(location.search).get("intro") === "0";
  const quick = reduceMotion || sessionStorage.getItem("sv-seen");
  const minTime = skip ? 0 : quick ? 500 : 2100;
  const t0 = performance.now();
  let loaded = document.readyState === "complete";
  window.addEventListener("load", () => (loaded = true));

  const tick = (t) => {
    const p = clamp((t - t0) / minTime);
    count.textContent = Math.round(p * 100);
    if (!skip && (p < 1 || (!loaded && t - t0 < 4000))) return requestAnimationFrame(tick);
    try { sessionStorage.setItem("sv-seen", "1"); } catch { /* */ }
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
    setTimeout(() => document.body.classList.add("is-gone"), 1300);
    document.dispatchEvent(new Event("sovrana:ready"));
  };
  requestAnimationFrame(tick);
}

/* Imágenes diferidas */
function initMedia() {
  const items = $$("[data-img].media");
  if (!("IntersectionObserver" in window)) return items.forEach((el) => loadMedia(el, el.dataset.img));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      loadMedia(e.target, e.target.dataset.img, e.target.dataset.alt || "");
      io.unobserve(e.target);
    });
  }, { rootMargin: "600px" });
  items.forEach((el) => io.observe(el));
}

/* ---------- Header y menú ---------- */
function initHeader() {
  const links = $$(".nav a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
}

function initMenu() {
  const burger = $(".burger");
  const menu = $("#menu");
  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
    if (open) { $(".site-header").classList.remove("is-hidden"); menu.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("is-open"))); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 800); }
  };
  burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) setOpen(false); });
}

/* ---------- Cursor personalizado ---------- */
function initCursor() {
  if (!finePointer || reduceMotion) return;
  document.documentElement.classList.add("has-cursor");
  const cur = $(".cursor"), dot = $(".cursor-dot"), ring = $(".cursor-ring"), label = $("em", ring);
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; cur.classList.remove("is-hidden"); }, { passive: true });
  document.addEventListener("pointerleave", () => cur.classList.add("is-hidden"));
  const loop = () => {
    rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.addEventListener("pointerover", (e) => {
    const lab = e.target.closest("[data-cursor]");
    const hov = e.target.closest("a, button, label, summary, select, input[type=range]");
    cur.classList.toggle("is-label", !!lab);
    cur.classList.toggle("is-hover", !lab && !!hov);
    if (lab) label.textContent = lab.dataset.cursor;
  });
}

/* Botones magnéticos */
function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  $$(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });
}

/* ---------- Hero: aurora en canvas ---------- */
function initAurora() {
  const cv = $(".hero-aurora");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const hero = $(".hero");
  const blobs = [
    { c: "247,234,208", r: 0.32, sx: 0.00021, sy: 0.00017, ox: 0.72, oy: 0.30, a: 0.55 },
    { c: "224,180,122", r: 0.38, sx: 0.00016, sy: 0.00023, ox: 0.82, oy: 0.65, a: 0.55 },
    { c: "200,115,217", r: 0.42, sx: 0.00013, sy: 0.00019, ox: 0.55, oy: 0.55, a: 0.6 },
    { c: "116,132,255", r: 0.40, sx: 0.00019, sy: 0.00012, ox: 0.30, oy: 0.80, a: 0.5 },
  ];
  let w, h, mx = 0.7, my = 0.4, tmx = mx, tmy = my, visible = true;
  const resize = () => { w = cv.width = Math.ceil(hero.offsetWidth / 6); h = cv.height = Math.ceil(hero.offsetHeight / 6); };
  resize(); addEventListener("resize", resize);
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    tmx = (e.clientX - r.left) / r.width; tmy = (e.clientY - r.top) / r.height;
    hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
    hero.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

  const draw = (t) => {
    if (visible) {
      mx += (tmx - mx) * 0.03; my += (tmy - my) * 0.03;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b, i) => {
        const pull = i === 2 ? 0.45 : 0.18;
        const x = (b.ox + Math.sin(t * b.sx + i) * 0.12 + (mx - 0.5) * pull) * w;
        const y = (b.oy + Math.cos(t * b.sy + i * 2) * 0.12 + (my - 0.5) * pull) * h;
        const r = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c},${b.a})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}

/* Tarjetas flotantes con profundidad */
function initHeroParallax() {
  if (!finePointer || reduceMotion) return;
  const hero = $(".hero");
  const cards = $$(".float-card");
  hero.addEventListener("pointermove", (e) => {
    const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
    cards.forEach((c) => {
      const d = +c.dataset.depth;
      c.style.setProperty("--px", `${-nx * 60 * d}px`);
      c.style.setProperty("--py", `${-ny * 50 * d}px`);
    });
  });
}

/* ---------- Selector "Soy marca / Soy talento" ---------- */
let rotatorWords = AUDIENCE.marca.words;
let rotatorIndex = 0;

function initAudience() {
  const box = $(".audience");
  const glider = $(".audience-glider", box);
  const btns = $$("button", box);
  const place = (b) => { glider.style.width = `${b.offsetWidth}px`; glider.style.transform = `translateX(${b.offsetLeft - 5}px)`; };

  const set = (aud, animate = true) => {
    const cfg = AUDIENCE[aud];
    btns.forEach((b) => b.setAttribute("aria-selected", b.dataset.aud === aud));
    place(btns.find((b) => b.dataset.aud === aud));
    const sub = $(".hero-sub");
    sub.firstChild.textContent = cfg.pre + " ";
    rotatorWords = cfg.words; rotatorIndex = 0;
    $(".rotator-word").textContent = cfg.words[0];
    const [p, s] = [$("[data-aud-cta=primary]"), $("[data-aud-cta=secondary]")];
    p.innerHTML = `${cfg.primary[0]} <span class="arr">→</span>`; p.href = cfg.primary[1];
    s.textContent = cfg.secondary[0]; s.href = cfg.secondary[1];
    if (animate) [sub, p, s].forEach((el) => { el.classList.remove("aud-fade"); void el.offsetWidth; el.classList.add("aud-fade"); });
    store.set("sovrana-aud", aud);
    const faqBtn = $(`[data-faq="${aud}"]`); if (faqBtn) faqBtn.click();
  };
  btns.forEach((b) => b.addEventListener("click", () => set(b.dataset.aud)));
  set(store.get("sovrana-aud", "marca"), false);
  addEventListener("resize", () => place(btns.find((b) => b.getAttribute("aria-selected") === "true")));
  document.fonts?.ready.then(() => place(btns.find((b) => b.getAttribute("aria-selected") === "true")));

  // Palabra rotativa
  if (reduceMotion) return;
  const word = $(".rotator-word");
  setInterval(() => {
    word.classList.add("out");
    setTimeout(() => {
      rotatorIndex = (rotatorIndex + 1) % rotatorWords.length;
      word.textContent = rotatorWords[rotatorIndex];
      word.classList.remove("out");
      word.classList.add("in");
      void word.offsetWidth;
      word.classList.remove("in");
    }, 600);
  }, 2800);
}

/* Cinta "En vivo": se arma con los datos reales de castings y talento */
function initLive() {
  const el = $(".live-text");
  const open = activeCastings();
  const avail = TALENT.filter((t) => t.disponible).length;
  const msgs = [
    `${avail} talentos disponibles esta semana`,
    ...open.map((c) => `Casting abierto · ${c.titulo} · ${dueText(c.days).toLowerCase()}`),
    "Shortlist curada en 48 h hábiles",
  ];
  let i = 0;
  el.textContent = msgs[0];
  if (reduceMotion || msgs.length < 2) return;
  setInterval(() => {
    el.style.opacity = 0;
    setTimeout(() => { i = (i + 1) % msgs.length; el.textContent = msgs[i]; el.style.opacity = 1; }, 400);
  }, 4200);
}

/* ---------- Aparición al hacer scroll ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-in"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));
}

/* Marquee que acelera con la velocidad del scroll */
let scrollVelocity = 0;
function initMarquee() {
  const track = $(".marquee-track");
  if (!track || reduceMotion) return;
  let x = 0;
  const loop = () => {
    const half = track.scrollWidth / 2;
    x -= 0.6 + Math.min(Math.abs(scrollVelocity) * 0.25, 18);
    if (x <= -half) x += half;
    track.style.transform = `translate3d(${x}px,0,0)`;
    scrollVelocity *= 0.9;
    requestAnimationFrame(loop);
  };
  loop();
}

/* Manifiesto: las palabras se encienden al hacer scroll */
let manifestoUpdate = () => {};
function initManifesto() {
  const el = $("[data-scrub]");
  if (!el) return;
  const HL = ["presencia:", "suyo.", "48", "horas."];
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w${HL.includes(w) ? " hl" : ""}">${escapeHTML(w)}</span>`).join(" ");
  const spans = $$(".w", el);
  if (reduceMotion) return spans.forEach((s) => s.classList.add("on"));
  manifestoUpdate = () => {
    const r = el.getBoundingClientRect();
    const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.3));
    const n = Math.floor(p * spans.length * 1.05);
    spans.forEach((s, i) => s.classList.toggle("on", i < n));
  };
}

/* Disciplinas: scroll vertical → desplazamiento horizontal */
let disciplinesUpdate = () => {};
function initDisciplines() {
  const sec = $(".disciplines"), track = $(".disc-track"), bar = $(".disc-progress");
  const mq = matchMedia("(min-width: 961px) and (hover: hover)");
  let dist = 0;
  const setup = () => {
    if (!mq.matches) { sec.style.height = ""; track.style.transform = ""; dist = 0; return; }
    dist = Math.max(0, track.scrollWidth - innerWidth);
    sec.style.height = `${innerHeight + dist}px`;
  };
  disciplinesUpdate = () => {
    if (!dist) return;
    const p = clamp(-sec.getBoundingClientRect().top / (sec.offsetHeight - innerHeight));
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
    bar.style.setProperty("--p", p);
  };
  setup();
  addEventListener("resize", () => { setup(); disciplinesUpdate(); });
  addEventListener("load", setup);
  mq.addEventListener?.("change", setup);
}

/* Bucle único de scroll */
function initScrollLoop() {
  const header = $(".site-header"), bar = $(".progress");
  const tl = $(".timeline"), tlLine = $(".tl-line"), tlSteps = $$(".tl-step");
  let lastY = scrollY, ticking = false;
  const update = () => {
    const y = scrollY;
    scrollVelocity += y - lastY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("is-scrolled", y > 20);
    if (!document.body.classList.contains("menu-open")) header.classList.toggle("is-hidden", y > lastY && y > 500);
    lastY = y;

    manifestoUpdate();
    disciplinesUpdate();
    if (tl) {
      const r = tl.getBoundingClientRect();
      const p = clamp((innerHeight * 0.8 - r.top) / (r.height + innerHeight * 0.2));
      tlLine.style.setProperty("--p", p);
      tlSteps.forEach((s, i) => s.classList.toggle("lit", p >= (i / tlSteps.length) * 0.95 + 0.02));
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();
}

/* Contadores animados */
function initCounters() {
  const run = (el) => {
    const end = +el.dataset.count;
    if (reduceMotion) return (el.textContent = end);
    const t0 = performance.now(), dur = 1800;
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => io.observe(el));
}

/* ---------- Roster: filtros, búsqueda, orden, selección y ficha ---------- */
let shortlist = new Set(store.get("sovrana-shortlist", []));
const state = { cat: "todos", q: "", available: false, sort: "destacado" };
let visibleList = TALENT;

function filtered() {
  const q = norm(state.q.trim());
  let list = TALENT.filter((t) =>
    (state.cat === "todos" || t.cats.includes(state.cat)) &&
    (!state.available || t.disponible) &&
    (!q || norm([t.nombre, t.bio, ...t.tags, ...t.cats.map((c) => CAT_LABEL[c])].join(" ")).includes(q)));
  if (state.sort === "az") list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  if (state.sort === "alto") list = [...list].sort((a, b) => b.altura - a.altura);
  if (state.sort === "joven") list = [...list].sort((a, b) => a.edad - b.edad);
  return list;
}

function initCatalog() {
  const grid = $("#grid");
  renderGrid(false);

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { grid.classList.add("grid-live"); io.disconnect(); } }, { threshold: 0.05 });
    io.observe(grid);
  } else grid.classList.add("grid-live");

  $$(".chip").forEach((chip) => {
    const cat = chip.dataset.cat;
    $("sup", chip).textContent = cat === "todos" ? TALENT.length : TALENT.filter((t) => t.cats.includes(cat)).length;
    chip.addEventListener("click", () => applyFilter(cat));
  });
  let qTimer;
  $("#q").addEventListener("input", (e) => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value; renderGrid(); }, 180); });
  $("#only-available").addEventListener("change", (e) => { state.available = e.target.checked; renderGrid(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("[data-reset-filters]").addEventListener("click", () => {
    state.q = ""; state.available = false; state.sort = "destacado";
    $("#q").value = ""; $("#only-available").checked = false; $("#sort").value = "destacado";
    applyFilter("todos");
  });

  grid.addEventListener("click", (e) => {
    const add = e.target.closest(".card-add");
    if (add) { add.classList.remove("pop"); void add.offsetWidth; add.classList.add("pop"); return toggleShortlist(add.dataset.id); }
    const open = e.target.closest(".card-btn");
    if (open) openProfile(open.dataset.id);
  });

  // Inclinación 3D con reflejo
  if (finePointer && !reduceMotion) {
    grid.addEventListener("pointermove", (e) => {
      const w = e.target.closest(".card-wrap"); if (!w) return;
      const r = w.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      w.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
      w.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
      w.style.setProperty("--gx", `${px * 100}%`);
      w.style.setProperty("--gy", `${py * 100}%`);
    });
    grid.addEventListener("pointerout", (e) => {
      const w = e.target.closest(".card-wrap");
      if (w && !w.contains(e.relatedTarget)) { w.style.setProperty("--rx", "0deg"); w.style.setProperty("--ry", "0deg"); }
    });
  }

  // Ficha
  const dlg = $("#profile");
  $(".profile-close", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $$("[data-step]", dlg).forEach((b) => b.addEventListener("click", () => stepProfile(+b.dataset.step)));
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") stepProfile(1);
    if (e.key === "ArrowLeft") stepProfile(-1);
  });
  $(".profile-add", dlg).addEventListener("click", () => toggleShortlist(dlg.dataset.id));
  $(".profile-share", dlg).addEventListener("click", async () => {
    const t = TALENT.find((x) => x.id === dlg.dataset.id);
    const url = `${baseURL()}?perfil=${t.id}`;
    if (navigator.share) { try { await navigator.share({ title: `${t.nombre} · Sovrana`, url }); return; } catch { /* cancelado */ } }
    toast((await copyText(url)) ? "Link de la ficha copiado" : url);
  });

  syncShortlist();
}

function applyFilter(cat) {
  state.cat = cat;
  $$(".chip").forEach((c) => { const on = c.dataset.cat === cat; c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", on); });
  renderGrid();
}

function renderGrid(animate = true) {
  const grid = $("#grid");
  const draw = () => {
    visibleList = filtered();
    grid.innerHTML = visibleList.map((t, i) => cardHTML(t, i)).join("");
    $$(".card .media", grid).forEach((m) => loadMedia(m, m.dataset.src, m.dataset.alt));
    $(".empty").hidden = visibleList.length > 0;
    syncShortlist();
  };
  if (!animate || reduceMotion) return draw();
  $$(".card", grid).forEach((c) => c.classList.add("is-hiding"));
  setTimeout(draw, 260);
}

function cardHTML(t, i) {
  const name = escapeHTML(t.nombre);
  const info = t.edad < 18 ? `${t.edad} años` : `${(t.altura / 100).toFixed(2).replace(".", ",")} m`;
  const on = shortlist.has(t.id);
  return `
  <li class="card" style="animation-delay:${Math.min(i, 10) * 60}ms">
    <div class="card-wrap">
      <button class="card-btn" type="button" data-id="${t.id}" data-cursor="Ver" aria-label="Ver ficha de ${name}">
        <span class="media ${CAT_TONE[t.cats[0]]}" data-src="${escapeHTML(t.foto)}" data-alt="${name}">
          <span class="card-initial" aria-hidden="true">${name.charAt(0)}</span>
        </span>
        <span class="card-shade"></span>
        <span class="card-tags">${t.disponible ? `<span class="av">● Disponible</span>` : ""}${t.tags.map((g) => `<span>${escapeHTML(g)}</span>`).join("")}</span>
        <span class="card-info">
          <span class="card-name">${name}</span>
          <span class="card-meta"><span>${t.cats.map((c) => CAT_LABEL[c]).join(" · ")}</span><span>${info}</span></span>
        </span>
        <span class="card-glare"></span>
      </button>
      <button class="card-add" type="button" data-id="${t.id}" aria-pressed="${on}" aria-label="Añadir a ${name} a mi selección">${HEART}</button>
    </div>
  </li>`;
}

function openProfile(id) {
  const t = TALENT.find((x) => x.id === id);
  if (!t) return;
  const dlg = $("#profile");
  dlg.dataset.id = id;
  const list = visibleList.some((x) => x.id === id) ? visibleList : TALENT;
  const pos = list.findIndex((x) => x.id === id);
  $(".profile-pos", dlg).textContent = `${pos + 1} / ${list.length}`;

  const media = $(".profile-media", dlg);
  media.className = `profile-media media ${CAT_TONE[t.cats[0]]}`;
  media.innerHTML = `<span class="card-initial" aria-hidden="true">${escapeHTML(t.nombre.charAt(0))}</span>`;
  loadMedia(media, t.foto, t.nombre);
  $(".profile-cats", dlg).textContent = t.cats.map((c) => CAT_LABEL[c]).join(" · ");
  $(".profile-name", dlg).textContent = t.nombre;
  const av = $(".profile-avail", dlg);
  av.textContent = t.disponible ? "Disponible esta semana" : "Consultar disponibilidad";
  av.classList.toggle("on", t.disponible);
  const stats = [
    ["Edad", `${t.edad} años`],
    ["Estatura", `${t.altura} cm`],
    ["Idiomas", t.idiomas],
    ["Representación", t.edad < 18 ? "Con tutor legal" : "Exclusiva"],
  ];
  $(".profile-stats", dlg).innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join("");
  $(".profile-bio", dlg).textContent = t.bio;
  $(".profile-tags", dlg).innerHTML = t.tags.map((g) => `<span>${escapeHTML(g)}</span>`).join("");
  updateProfileButton();
  if (!dlg.open) { if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", ""); }
}

function stepProfile(dir) {
  const dlg = $("#profile");
  const list = visibleList.some((x) => x.id === dlg.dataset.id) ? visibleList : TALENT;
  const i = list.findIndex((x) => x.id === dlg.dataset.id);
  openProfile(list[(i + dir + list.length) % list.length].id);
}

function updateProfileButton() {
  const dlg = $("#profile");
  if (!dlg.dataset.id) return;
  $(".profile-add", dlg).textContent = shortlist.has(dlg.dataset.id) ? "♥ En tu selección" : "♡ Añadir a mi selección";
}

function toggleShortlist(id) {
  const t = TALENT.find((x) => x.id === id);
  if (shortlist.has(id)) { shortlist.delete(id); toast(`${t.nombre} salió de tu selección`); }
  else { shortlist.add(id); toast(`${t.nombre} está en tu selección ♥`); }
  syncShortlist(true);
}

function syncShortlist(bump = false) {
  shortlist = new Set([...shortlist].filter((id) => TALENT.some((t) => t.id === id)));
  store.set("sovrana-shortlist", [...shortlist]);
  const items = [...shortlist].map((id) => TALENT.find((t) => t.id === id));

  $$(".card-add").forEach((b) => b.setAttribute("aria-pressed", shortlist.has(b.dataset.id)));
  const pill = $(".shortlist-pill");
  $(".shortlist-num", pill).textContent = items.length;
  pill.classList.toggle("has-items", items.length > 0);
  if (bump) { pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump"); }

  // Cajón
  $(".drawer-count").textContent = items.length;
  $(".drawer-empty").hidden = items.length > 0;
  $$(".drawer-foot [data-copy-link], .drawer-foot [data-wa-share], .drawer-foot [data-goto-brief], .drawer-clear").forEach((b) => (b.hidden = !items.length));
  $(".drawer-list").innerHTML = items.map((t, i) => `
    <li style="animation-delay:${i * 50}ms">
      <span class="media ${CAT_TONE[t.cats[0]]}" data-src="${escapeHTML(t.foto)}"><span class="card-initial" aria-hidden="true">${escapeHTML(t.nombre.charAt(0))}</span></span>
      <div><b>${escapeHTML(t.nombre)}</b><small>${t.cats.map((c) => CAT_LABEL[c]).join(" · ")}</small></div>
      <button type="button" class="icon-btn" data-remove="${t.id}" aria-label="Quitar a ${escapeHTML(t.nombre)}">✕</button>
    </li>`).join("");
  $$(".drawer-list .media").forEach((m) => loadMedia(m, m.dataset.src));
  const wa = $("[data-wa-share]");
  wa.href = `https://wa.me/?text=${encodeURIComponent(`Mi selección de talento en Sovrana: ${items.map((t) => t.nombre).join(", ")}\n${shareURL()}`)}`;

  // Formulario de casting
  const box = $(".selected-talent");
  box.hidden = !items.length;
  $(".selected-list", box).innerHTML = items.map((t) => `<button type="button" data-id="${t.id}" aria-label="Quitar a ${escapeHTML(t.nombre)}">${escapeHTML(t.nombre)}</button>`).join("");
  $("input[name='talento_seleccionado']", box).value = items.map((t) => t.nombre).join(", ");
  updateProfileButton();
}

const shareURL = () => `${baseURL()}?seleccion=${[...shortlist].join(",")}`;

function initDrawer() {
  const drawer = $("#drawer");
  const open = () => {
    drawer.hidden = false;
    document.body.classList.add("drawer-open");
    requestAnimationFrame(() => requestAnimationFrame(() => drawer.classList.add("is-open")));
  };
  const close = () => {
    drawer.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
    setTimeout(() => { if (!drawer.classList.contains("is-open")) drawer.hidden = true; }, 700);
  };
  $$("[data-open-drawer]").forEach((b) => b.addEventListener("click", open));
  $$("[data-close-drawer]", drawer).forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) close(); });
  $(".drawer-list").addEventListener("click", (e) => { const b = e.target.closest("[data-remove]"); if (b) toggleShortlist(b.dataset.remove); });
  $("[data-clear-shortlist]").addEventListener("click", () => { shortlist.clear(); syncShortlist(); toast("Selección vaciada"); });
  $("[data-copy-link]").addEventListener("click", async () => toast((await copyText(shareURL())) ? "Link copiado: compártelo con tu equipo" : shareURL()));
  $("[data-goto-brief]").addEventListener("click", () => {
    const r = $("#form-casting input[name=proyecto]:checked");
    if (!r) { const first = TALENT.find((t) => shortlist.has(t.id)); const radio = first && $(`#form-casting input[name=proyecto][value=${first.cats[0]}]`); if (radio) radio.checked = true; }
  });
  window.__openDrawer = open;
}

/* Links que filtran el roster, preseleccionan proyecto o vienen en la URL */
function initDeepLinks() {
  $$("[data-filter]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.filter)));
  $$("[data-project]").forEach((a) => a.addEventListener("click", () => {
    const v = a.dataset.project;
    const est = $(`#estimator input[name=tipo][value=${v}]`); if (est) { est.checked = true; est.dispatchEvent(new Event("input", { bubbles: true })); }
    const br = $(`#form-casting input[name=proyecto][value=${v}]`); if (br) br.checked = true;
  }));
  $(".selected-list").addEventListener("click", (e) => { const b = e.target.closest("button[data-id]"); if (b) toggleShortlist(b.dataset.id); });

  const params = new URLSearchParams(location.search);
  document.addEventListener("sovrana:ready", () => {
    const sel = params.get("seleccion");
    if (sel) {
      sel.split(",").forEach((id) => TALENT.some((t) => t.id === id) && shortlist.add(id));
      syncShortlist();
      toast("Abriste una selección compartida");
      setTimeout(window.__openDrawer, 600);
    }
    const perfil = params.get("perfil");
    if (perfil) setTimeout(() => openProfile(perfil), 600);
  });
}

/* ---------- Cotizador ---------- */
let lastEstimate = null;
function initEstimator() {
  const form = $("#estimator");
  if (!form) return;
  const P = CONFIG.PRECIOS;
  const minEl = $(".est-min"), maxEl = $(".est-max"), brk = $(".est-break");
  let shown = [0, 0];

  const animateTo = (a, b) => {
    const from = [...shown], t0 = performance.now(), dur = reduceMotion ? 1 : 700;
    const step = (t) => {
      const p = clamp((t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      shown = [from[0] + (a - from[0]) * e, from[1] + (b - from[1]) * e];
      minEl.textContent = money(shown[0]); maxEl.textContent = money(shown[1]);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const calc = () => {
    const fd = new FormData(form);
    const tipo = fd.get("tipo"), n = +fd.get("talentos"), j = +fd.get("jornadas");
    const medios = fd.getAll("medio");
    const usoMult = (1 + medios.reduce((s, m) => s + (P.medio[m] || 0), 0)) * P.territorio[fd.get("territorio")] * P.duracion[fd.get("duracion")];
    const honorarios = P.base[tipo] * n * j;
    const uso = honorarios * (usoMult - 1);
    const urg = fd.get("urgente") ? (honorarios + uso) * P.urgencia : 0;
    const gestion = (honorarios + uso + urg) * P.agencia;
    const total = honorarios + uso + urg + gestion;
    const round = (v) => Math.round(v / 50) * 50;
    const lo = round(total * (1 - P.margen)), hi = round(total * (1 + P.margen));

    // Rellenos de las barras y etiquetas
    $$("input[type=range]", form).forEach((r) => {
      r.style.setProperty("--p", `${((r.value - r.min) / (r.max - r.min)) * 100}%`);
      $(`output[data-for=${r.name}]`, form).textContent = r.value;
    });
    $("[data-unit-label]", form).textContent = tipo === "ugc" ? "Videos por creador" : "Jornadas";

    brk.innerHTML = [
      [`Honorarios (${n} × ${j} ${tipo === "ugc" ? "video" : "jornada"}${j > 1 ? "s" : ""})`, honorarios],
      ["Uso de imagen", uso],
      ...(urg ? [["Urgencia < 72 h", urg]] : []),
      ["Gestión Sovrana", gestion],
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${money(v)}</dd></div>`).join("");
    animateTo(lo, hi);

    const medTxt = medios.length ? medios.map((m) => ({ redes: "redes", pauta: "pauta digital", tv: "TV/cine", ooh: "impreso/OOH" }[m])).join(", ") : "sin uso pagado";
    lastEstimate = { tipo, lo, hi, total, text: `${CAT_LABEL[tipo]} · ${n} talento${n > 1 ? "s" : ""} · ${j} ${tipo === "ugc" ? "video" : "jornada"}${j > 1 ? "s" : ""} · ${medTxt} · ${fd.get("territorio")} · ${fd.get("duracion") === "perpetuo" ? "perpetuo" : fd.get("duracion") + " meses"}${fd.get("urgente") ? " · urgente" : ""} → ${money(lo)}–${money(hi)} USD` };
  };
  form.addEventListener("input", calc);
  form.addEventListener("change", calc);
  calc();

  $("[data-use-estimate]").addEventListener("click", () => {
    if (!lastEstimate) return;
    const chip = $(".estimate-chip");
    chip.hidden = false;
    $("p", chip).textContent = lastEstimate.text;
    $("input", chip).value = lastEstimate.text;
    const r = $(`#form-casting input[name=proyecto][value=${lastEstimate.tipo}]`); if (r) r.checked = true;
    const sel = $("#form-casting select[name=presupuesto]");
    const t = lastEstimate.total;
    sel.selectedIndex = t < 500 ? 1 : t < 2000 ? 2 : t < 10000 ? 3 : 4;
    toast("Cotización adjuntada a tu brief");
  });
}

/* ---------- Formularios por pasos ---------- */
function initForms() {
  $$("form[data-form]").forEach(setupStepForm);

  // Menores: datos del tutor
  const join = $("#form-unete");
  const birth = $("input[name='nacimiento']", join);
  const guardian = $(".guardian", join);
  birth.max = new Date().toISOString().split("T")[0];
  birth.addEventListener("change", () => {
    const minor = birth.value && ageFrom(birth.value) < 18;
    guardian.hidden = !minor;
    $$("input", guardian).forEach((i) => (i.required = !!minor));
  });

  // Fotos con miniaturas
  const zone = $(".dropzone", join), input = $("input[type=file]", zone), hint = $(".file-hint", zone), thumbs = $(".thumbs", join);
  const defaultHint = hint.textContent;
  input.addEventListener("change", () => {
    const files = [...input.files];
    thumbs.innerHTML = "";
    if (files.length > CONFIG.MAX_FOTOS) { hint.textContent = `Máximo ${CONFIG.MAX_FOTOS} fotos. Elegiste ${files.length}.`; input.value = ""; return; }
    hint.textContent = files.length ? `${files.length} foto${files.length > 1 ? "s" : ""} lista${files.length > 1 ? "s" : ""}` : defaultHint;
    files.forEach((f, i) => {
      const img = new Image();
      img.src = URL.createObjectURL(f);
      img.alt = f.name;
      img.style.animationDelay = `${i * 70}ms`;
      thumbs.appendChild(img);
    });
  });
  ["dragenter", "dragover"].forEach((ev) => zone.addEventListener(ev, () => zone.classList.add("is-drag")));
  ["dragleave", "drop"].forEach((ev) => zone.addEventListener(ev, () => zone.classList.remove("is-drag")));
}

function setupStepForm(form) {
  const panels = $$(".step-panel", form), dots = $$(".stepper li", form);
  const prev = $("[data-prev]", form), next = $("[data-next]", form), submit = $("[type=submit]", form);
  let i = 0;
  const go = (n) => {
    const back = n < i;
    i = n;
    panels.forEach((p, k) => { p.classList.toggle("is-on", k === i); p.classList.toggle("back", back); });
    dots.forEach((d, k) => { d.classList.toggle("is-on", k === i); d.classList.toggle("is-done", k < i); });
    prev.hidden = i === 0;
    next.hidden = i === panels.length - 1;
    submit.hidden = i !== panels.length - 1;
    $(".form-status", form).textContent = "";
  };
  form.__go = go;
  next.addEventListener("click", () => {
    if (showErrors(form, panels[i])) return;
    go(i + 1);
    const r = form.getBoundingClientRect();
    if (r.top < 0) form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
  prev.addEventListener("click", () => go(i - 1));
  form.addEventListener("submit", (e) => { e.preventDefault(); submitForm(form); });
  form.addEventListener("input", (e) => clearError(e.target));
  form.addEventListener("change", (e) => clearError(e.target));
  go(0);
}

function ageFrom(dateStr) {
  const b = new Date(dateStr), n = new Date();
  let a = n.getFullYear() - b.getFullYear();
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
}

function clearError(el) {
  el.closest(".field, .check")?.classList.remove("is-invalid");
  el.closest("[data-required-group]")?.classList.remove("is-invalid");
}

function validate(scope) {
  let firstBad = null;
  $$("[required]", scope).forEach((el) => {
    if (el.closest("[hidden]")) return;
    const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "" && el.checkValidity();
    if (!ok) { el.closest(".field, .check")?.classList.add("is-invalid"); firstBad ??= el; }
  });
  $$("[data-required-group]", scope).forEach((g) => {
    if (!$$("input:checked", g).length) { g.classList.add("is-invalid"); firstBad ??= $("input", g); }
  });
  return firstBad;
}

function showErrors(form, scope) {
  const bad = validate(scope);
  const status = $(".form-status", form);
  status.className = "form-status";
  if (!bad) return false;
  status.classList.add("err");
  status.textContent = "Revisa los campos marcados.";
  bad.focus({ preventScroll: false });
  return true;
}

async function submitForm(form) {
  // Revisa todos los pasos; si alguno falla, vuelve a él
  const panels = $$(".step-panel", form);
  for (let k = 0; k < panels.length; k++) {
    if (validate(panels[k])) { form.__go(k); showErrors(form, panels[k]); return; }
  }
  const status = $(".form-status", form);
  const kind = form.dataset.form;
  const endpoint = CONFIG.FORM_ENDPOINT[kind];
  form.classList.add("is-sending");
  status.className = "form-status";
  status.textContent = "Enviando…";

  try {
    if (endpoint) {
      const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
    } else {
      await new Promise((r) => setTimeout(r, 900));
      console.info(`[Sovrana] Formulario "${kind}" en modo demo. Configura CONFIG.FORM_ENDPOINT en script.js.`);
    }
    showDone(form, kind);
  } catch {
    status.classList.add("err");
    status.textContent = "No pudimos enviar el formulario. Escríbenos a hola@sovrana.com.";
  } finally {
    form.classList.remove("is-sending");
  }
}

function showDone(form, kind) {
  const casting = kind === "casting";
  [...form.children].forEach((c) => (c.hidden = true));
  const done = document.createElement("div");
  done.className = "form-done";
  done.innerHTML = `
    <svg><use href="#mark"/></svg>
    <h4>${casting ? "Brief recibido." : "¡Aplicación enviada!"}</h4>
    <p>${casting ? "Te respondemos en menos de 24 horas hábiles con una propuesta y disponibilidad." : "Revisaremos tu perfil y te escribiremos en 7–10 días si encaja con el roster."}</p>
    <button type="button" class="btn btn-line btn-sm">${casting ? "Enviar otro brief" : "Enviar otra aplicación"}</button>`;
  form.appendChild(done);
  $("button", done).addEventListener("click", () => {
    done.remove();
    form.reset();
    [...form.children].forEach((c) => (c.hidden = false));
    if (casting) { shortlist.clear(); syncShortlist(); $(".estimate-chip").hidden = true; }
    else { $(".guardian", form).hidden = true; $(".thumbs", form).innerHTML = ""; $(".file-hint", form).textContent = `Hasta ${CONFIG.MAX_FOTOS} · JPG, PNG o WebP`; $(".casting-chip", form).hidden = true; }
    $$("[data-required-group]", form).forEach((g) => g.classList.remove("is-invalid"));
    form.__go(0);
  });
  if (casting) { shortlist.clear(); syncShortlist(); }
}

/* ---------- Castings abiertos ---------- */
function activeCastings() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return CASTINGS
    .map((c) => ({ ...c, days: Math.round((new Date(c.cierra + "T00:00:00") - today) / 864e5) }))
    .filter((c) => c.days >= 0)
    .sort((a, b) => a.days - b.days);
}
const dueText = (d) => (d === 0 ? "Cierra hoy" : d === 1 ? "Cierra mañana" : `Cierra en ${d} días`);

function initCastings() {
  const ul = $("#calls");
  const list = activeCastings();
  if (!list.length) { ul.innerHTML = `<li class="call"><span class="call-meta">No hay castings abiertos en este momento. Aplica al roster y te avisamos.</span></li>`; return; }
  ul.innerHTML = list.map((c, i) => `
    <li class="call reveal is-in">
      <span class="call-tag">${escapeHTML(c.tag)}</span>
      <span class="call-title">${escapeHTML(c.titulo)}</span>
      <span class="call-meta">${escapeHTML(c.meta)}</span>
      <span class="call-due${c.days <= 3 ? " hot" : ""}">${dueText(c.days)}</span>
      <a href="#form-unete" class="btn btn-sm btn-line" data-apply="${i}">Postularme</a>
    </li>`).join("");
  ul.addEventListener("click", (e) => {
    const a = e.target.closest("[data-apply]"); if (!a) return;
    const c = list[+a.dataset.apply];
    const form = $("#form-unete");
    $("input[name=casting_interes]", form).value = c.titulo;
    const chip = $(".casting-chip", form);
    chip.hidden = false;
    chip.textContent = `Te postulas a: ${c.titulo}`;
    const box = $(`input[name=categorias][value=${c.cat}]`, form); if (box) box.checked = true;
    form.__go(0);
  });
}

/* ---------- Testimonios ---------- */
function initQuotes() {
  const quotes = $$(".quote"), dots = $(".quotes-dots");
  if (!quotes.length) return;
  dots.innerHTML = quotes.map((_, i) => `<button type="button" role="tab" aria-label="Testimonio ${i + 1}"></button>`).join("");
  const btns = $$("button", dots);
  let i = 0, timer;
  const show = (n) => {
    i = n;
    quotes.forEach((q, k) => q.classList.toggle("is-on", k === i));
    btns.forEach((b, k) => { b.classList.remove("is-on"); if (k === i) { void b.offsetWidth; b.classList.add("is-on"); } b.setAttribute("aria-selected", k === i); });
    clearTimeout(timer);
    if (!reduceMotion) timer = setTimeout(() => show((i + 1) % quotes.length), 6000);
  };
  btns.forEach((b, k) => b.addEventListener("click", () => show(k)));
  show(0);
}

/* ---------- FAQ ---------- */
function initFaq() {
  const tabs = $$("[data-faq]");
  tabs.forEach((t) => t.addEventListener("click", () => {
    tabs.forEach((x) => x.setAttribute("aria-selected", x === t));
    $$("[data-faq-list]").forEach((l) => l.classList.toggle("is-on", l.dataset.faqList === t.dataset.faq));
  }));
  // Un solo detalle abierto a la vez
  $$(".faq details").forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) $$("details", d.parentElement).forEach((o) => o !== d && (o.open = false));
  }));
}

/* Brillo que sigue al cursor en el logo gigante del footer */
function initFooter() {
  const word = $(".footer-word");
  if (!word || !finePointer) return;
  $(".footer").addEventListener("pointermove", (e) => {
    const r = word.getBoundingClientRect();
    word.style.setProperty("--fx", `${e.clientX - r.left}px`);
    word.style.setProperty("--fy", `${e.clientY - r.top}px`);
  });
}
