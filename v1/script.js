/* =========================================================
   SOVRANA — interacciones
   ========================================================= */

/* ---------- Configuración ----------
   FORM_ENDPOINT: URL que recibe los formularios (Formspree, Getform, tu backend…).
   Ejemplo Formspree: "https://formspree.io/f/xxxxxxx"
   Si queda vacío, los formularios funcionan en modo demostración (no envían datos). */
const CONFIG = {
  FORM_ENDPOINT: {
    casting: "",
    aplicacion: "",
  },
  MAX_FOTOS: 5,
};

/* ---------- Catálogo de talento ----------
   cats: kids | baile | musica | moda | ugc
   foto: ruta a la imagen (ej. "img/talento/valentina.jpg"). Vacío = placeholder elegante.
   Para menores: solo nombre de pila, sin ciudad exacta. */
const TALENT = [
  { id: "valentina", nombre: "Valentina", cats: ["moda", "musica"], edad: 24, altura: 176, tags: ["Editorial", "Pasarela"], bio: "Rostro editorial con experiencia en pasarela y campañas de temporada. Cómoda frente a cámara en video y foto.", foto: "" },
  { id: "mateo", nombre: "Mateo", cats: ["kids"], edad: 7, altura: 124, tags: ["Comercial", "Spots"], bio: "Natural, divertido y muy paciente en set. Experiencia en catálogos de ropa infantil y un spot de alimentos.", foto: "" },
  { id: "daniela", nombre: "Daniela", cats: ["baile", "musica"], edad: 22, altura: 165, tags: ["Urbano", "Comercial"], bio: "Bailarina urbana y comercial. Ha participado en giras, videoclips y lanzamientos de marca.", foto: "" },
  { id: "sofia", nombre: "Sofía", cats: ["ugc"], edad: 27, altura: 162, tags: ["Skincare", "Lifestyle"], bio: "Creadora UGC especializada en belleza y bienestar. Guion, grabación y edición en formato vertical.", foto: "" },
  { id: "andres", nombre: "Andrés", cats: ["moda"], edad: 26, altura: 186, tags: ["Comercial", "E‑commerce"], bio: "Modelo comercial con medidas actualizadas. Lookbooks, e‑commerce y campañas de ropa masculina.", foto: "" },
  { id: "emilia", nombre: "Emilia", cats: ["kids"], edad: 5, altura: 110, tags: ["Familia", "Catálogo"], bio: "Sonrisa espontánea y muy sociable. Ideal para campañas de familia y juguetería.", foto: "" },
  { id: "camilo", nombre: "Camilo", cats: ["baile"], edad: 25, altura: 178, tags: ["Contemporáneo", "Coreógrafo"], bio: "Bailarín contemporáneo y coreógrafo. Dirige cuerpos de baile para shows y eventos corporativos.", foto: "" },
  { id: "isabella", nombre: "Isabella", cats: ["musica", "moda"], edad: 23, altura: 170, tags: ["Actuación", "Protagonista"], bio: "Formación en actuación. Protagonista en videoclips de pop y balada; gran manejo de la emoción en cámara.", foto: "" },
  { id: "lucas", nombre: "Lucas", cats: ["ugc", "musica"], edad: 29, altura: 180, tags: ["Tech", "Humor"], bio: "Creador UGC con tono cercano y humor. Tutoriales de apps, tecnología y servicios financieros.", foto: "" },
  { id: "renata", nombre: "Renata", cats: ["moda", "ugc"], edad: 31, altura: 168, tags: ["Curvy", "Lifestyle"], bio: "Modelo curvy y creadora de contenido de moda. Campañas inclusivas y try‑on hauls.", foto: "" },
  { id: "tomas", nombre: "Tomás", cats: ["kids", "baile"], edad: 10, altura: 140, tags: ["Baile infantil", "Spots"], bio: "Baila desde los 6 años. Experiencia en comerciales y coreografías infantiles para marcas.", foto: "" },
  { id: "paula", nombre: "Paula", cats: ["baile", "ugc"], edad: 21, altura: 160, tags: ["Latino", "Reels"], bio: "Bailarina de ritmos latinos y creadora de reels de baile para marcas y lanzamientos musicales.", foto: "" },
  { id: "gabriel", nombre: "Gabriel", cats: ["musica"], edad: 34, altura: 183, tags: ["Carácter", "Actuación"], bio: "Perfil de carácter para videoclips narrativos. Experiencia en cortometrajes y publicidad.", foto: "" },
  { id: "elena", nombre: "Elena", cats: ["moda"], edad: 45, altura: 172, tags: ["Senior", "Editorial"], bio: "Modelo senior con presencia editorial. Campañas de joyería, cosmética y moda atemporal.", foto: "" },
  { id: "martina", nombre: "Martina", cats: ["kids", "ugc"], edad: 9, altura: 132, tags: ["Kids UGC", "Familia"], bio: "Contenido familiar junto a su madre para marcas infantiles. Gestionado siempre por su tutora.", foto: "" },
  { id: "nicolas", nombre: "Nicolás", cats: ["ugc"], edad: 24, altura: 175, tags: ["Fitness", "Food"], bio: "Creador UGC de fitness y gastronomía. Reseñas, unboxings y testimonios con alta retención.", foto: "" },
];

const CAT_LABEL = { kids: "Kids", baile: "Baile", musica: "Videos musicales", moda: "Moda", ugc: "UGC" };
const CAT_TONE = { kids: "tone-kids", baile: "tone-baile", musica: "tone-musica", moda: "tone-moda", ugc: "tone-ugc" };

/* ---------- Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const store = {
  get(k, fallback) { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } },
};
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Carga una imagen dentro de un contenedor .media si el archivo existe */
function loadMedia(el, src, alt = "") {
  if (!src) return;
  const img = new Image();
  img.decoding = "async";
  img.alt = alt;
  img.onload = () => { el.querySelector(":scope > img")?.remove(); el.appendChild(img); requestAnimationFrame(() => el.classList.add("has-img")); };
  img.src = src;
}

/* ---------- Arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  requestAnimationFrame(() => document.body.classList.add("is-loaded"));

  initMedia();
  initHeader();
  initMenu();
  initReveal();
  initRotator();
  initCursorPreview();
  initCatalog();
  initDeepLinks();
  initForms();
  initCounters();
});

/* Imágenes diferidas: solo se piden cuando están cerca del viewport */
function initMedia() {
  const items = $$("[data-img].media");
  if (!("IntersectionObserver" in window)) return items.forEach((el) => loadMedia(el, el.dataset.img));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      loadMedia(e.target, e.target.dataset.img, e.target.dataset.alt || "");
      io.unobserve(e.target);
    });
  }, { rootMargin: "400px 0px" });
  items.forEach((el) => io.observe(el));
}

/* Header: se oculta al bajar, aparece al subir; barra de progreso; link activo */
function initHeader() {
  const header = $(".site-header");
  const bar = $(".progress");
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("is-scrolled", y > 20);
    if (!document.body.classList.contains("menu-open")) {
      header.classList.toggle("is-hidden", y > lastY && y > 400);
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
  update();

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

/* Menú móvil a pantalla completa */
function initMenu() {
  const burger = $(".burger");
  const menu = $("#menu");
  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 700); }
  };
  burger.addEventListener("click", () => setOpen(burger.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) setOpen(false); });
}

/* Aparición al hacer scroll */
function initReveal() {
  const els = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-in"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((el) => io.observe(el));
  window.__observeReveal = (el) => io.observe(el);
}

/* Palabra rotativa del hero */
function initRotator() {
  const rot = $(".rotator");
  if (!rot || reduceMotion) return;
  const words = rot.dataset.words.split("|");
  const word = $(".rotator-word", rot);
  let i = 0;
  setInterval(() => {
    word.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % words.length;
      word.textContent = words[i];
      word.classList.remove("out");
      word.classList.add("in");
      void word.offsetWidth; // reinicia la transición
      word.classList.remove("in");
    }, 600);
  }, 2600);
}

/* Vista previa que sigue al cursor sobre el índice de categorías */
function initCursorPreview() {
  const preview = $(".cursor-preview");
  if (!preview || !finePointer || reduceMotion) return;
  let x = 0, y = 0, cx = 0, cy = 0, raf = null;
  const loop = () => {
    cx += (x - cx) * 0.16;
    cy += (y - cy) * 0.16;
    preview.style.transform = `translate3d(${cx - 120}px, ${cy - 150}px, 0) rotate(${(x - cx) * 0.04}deg)`;
    raf = requestAnimationFrame(loop);
  };
  $$(".index a").forEach((a) => {
    a.addEventListener("mouseenter", (e) => {
      preview.className = `cursor-preview media is-on ${a.dataset.preview}`;
      preview.innerHTML = "";
      loadMedia(preview, a.dataset.img);
      x = cx = e.clientX; y = cy = e.clientY;
      if (!raf) loop();
    });
    a.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    a.addEventListener("mouseleave", () => {
      preview.classList.remove("is-on");
      cancelAnimationFrame(raf); raf = null;
    });
  });
}

/* ---------- Catálogo, filtros, selección y ficha ---------- */
let shortlist = new Set(store.get("sovrana-shortlist", []));
let currentFilter = "todos";

function initCatalog() {
  const grid = $("#grid");
  grid.innerHTML = TALENT.map(cardHTML).join("");
  $$(".card .media", grid).forEach((m) => loadMedia(m, m.dataset.src, m.dataset.alt));
  $$(".card", grid).forEach((c) => { c.classList.add("reveal"); window.__observeReveal ? window.__observeReveal(c) : c.classList.add("is-in"); });

  // Conteo por categoría en los filtros
  $$(".chip").forEach((chip) => {
    const cat = chip.dataset.cat;
    $("sup", chip).textContent = cat === "todos" ? TALENT.length : TALENT.filter((t) => t.cats.includes(cat)).length;
    chip.addEventListener("click", () => applyFilter(cat));
  });

  grid.addEventListener("click", (e) => {
    const add = e.target.closest(".card-add");
    if (add) return toggleShortlist(add.dataset.id);
    const open = e.target.closest(".card-btn");
    if (open) openProfile(open.dataset.id);
  });

  // Ficha
  const dlg = $("#profile");
  $(".profile-close", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $(".profile-add", dlg).addEventListener("click", () => toggleShortlist(dlg.dataset.id));
  $(".profile-request", dlg).addEventListener("click", () => {
    shortlist.add(dlg.dataset.id); syncShortlist(); dlg.close();
  });

  // Selección flotante
  $(".shortlist-clear").addEventListener("click", () => { shortlist.clear(); syncShortlist(); });
  syncShortlist();
}

function cardHTML(t) {
  const name = escapeHTML(t.nombre);
  const info = t.edad < 18 ? `${t.edad} años` : `${(t.altura / 100).toFixed(2).replace(".", ",")} m`;
  return `
  <li class="card" data-cats="${t.cats.join(" ")}">
    <div class="card-wrap">
      <button class="card-btn" type="button" data-id="${t.id}" aria-label="Ver ficha de ${name}">
        <span class="media ${CAT_TONE[t.cats[0]]}" data-src="${escapeHTML(t.foto)}" data-alt="${name}">
          <span class="card-initial" aria-hidden="true">${name.charAt(0)}</span>
          <span class="card-over">${t.tags.map((g) => `<span>${escapeHTML(g)}</span>`).join("")}</span>
        </span>
        <span class="card-meta"><span class="card-name">${name}</span><span class="card-info">${info}</span></span>
        <span class="card-cats">${t.cats.map((c) => CAT_LABEL[c]).join(" · ")}</span>
      </button>
      <button class="card-add" type="button" data-id="${t.id}" aria-pressed="false" aria-label="Añadir a ${name} a mi selección">+</button>
    </div>
  </li>`;
}

function applyFilter(cat) {
  currentFilter = cat;
  $$(".chip").forEach((c) => {
    const on = c.dataset.cat === cat;
    c.classList.toggle("is-active", on);
    c.setAttribute("aria-pressed", on);
  });
  const cards = $$("#grid .card");
  cards.forEach((c) => c.classList.add("is-hiding"));
  setTimeout(() => {
    cards.forEach((c) => {
      const show = cat === "todos" || c.dataset.cats.split(" ").includes(cat);
      c.hidden = !show;
    });
    requestAnimationFrame(() => cards.forEach((c, i) => {
      if (c.hidden) return;
      c.style.transitionDelay = `${Math.min(i, 8) * 40}ms`;
      c.classList.remove("is-hiding");
      c.classList.add("is-in");
      setTimeout(() => (c.style.transitionDelay = ""), 900);
    }));
  }, reduceMotion ? 0 : 280);
}

function openProfile(id) {
  const t = TALENT.find((x) => x.id === id);
  if (!t) return;
  const dlg = $("#profile");
  dlg.dataset.id = id;
  const media = $(".profile-media", dlg);
  media.className = `profile-media media ${CAT_TONE[t.cats[0]]}`;
  media.innerHTML = `<span class="card-initial" aria-hidden="true">${escapeHTML(t.nombre.charAt(0))}</span>`;
  loadMedia(media, t.foto, t.nombre);
  $(".profile-cats", dlg).textContent = t.cats.map((c) => CAT_LABEL[c]).join(" · ");
  $(".profile-name", dlg).textContent = t.nombre;
  const stats = [
    ["Edad", `${t.edad} años`],
    ["Estatura", `${t.altura} cm`],
    ["Perfil", t.tags.join(", ")],
    ["Representación", t.edad < 18 ? "Con tutor legal" : "Exclusiva"],
  ];
  $(".profile-stats", dlg).innerHTML = stats.map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`).join("");
  $(".profile-bio", dlg).textContent = t.bio;
  updateProfileButton();
  if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
}

function updateProfileButton() {
  const dlg = $("#profile");
  if (!dlg.dataset.id) return;
  $(".profile-add", dlg).textContent = shortlist.has(dlg.dataset.id) ? "Quitar de mi selección" : "Añadir a mi selección";
}

function toggleShortlist(id) {
  shortlist.has(id) ? shortlist.delete(id) : shortlist.add(id);
  syncShortlist();
}

function syncShortlist() {
  // Limpia ids que ya no existan en el catálogo
  shortlist = new Set([...shortlist].filter((id) => TALENT.some((t) => t.id === id)));
  store.set("sovrana-shortlist", [...shortlist]);

  $$(".card-add").forEach((b) => {
    const on = shortlist.has(b.dataset.id);
    b.setAttribute("aria-pressed", on);
  });
  const bar = $(".shortlist");
  $(".shortlist-count", bar).textContent = shortlist.size;
  if (shortlist.size) { bar.hidden = false; requestAnimationFrame(() => bar.classList.add("is-on")); }
  else { bar.classList.remove("is-on"); }

  // Refleja la selección en el formulario de casting
  const box = $(".selected-talent");
  const names = [...shortlist].map((id) => TALENT.find((t) => t.id === id));
  box.hidden = !names.length;
  $(".selected-list", box).innerHTML = names.map((t) => `<button type="button" data-id="${t.id}" aria-label="Quitar a ${escapeHTML(t.nombre)}">${escapeHTML(t.nombre)}</button>`).join("");
  $("input[name='talento_seleccionado']", box).value = names.map((t) => t.nombre).join(", ");
  updateProfileButton();
}

/* Links que filtran el catálogo o preseleccionan el tipo de proyecto */
function initDeepLinks() {
  $$("[data-filter]").forEach((a) => a.addEventListener("click", () => applyFilter(a.dataset.filter)));
  $$("[data-project]").forEach((a) => a.addEventListener("click", () => {
    $("#form-casting select[name='proyecto']").value = a.dataset.project;
  }));
  $(".selected-list").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-id]");
    if (b) toggleShortlist(b.dataset.id);
  });
}

/* ---------- Formularios ---------- */
function initForms() {
  $$("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => { e.preventDefault(); submitForm(form); });
    form.addEventListener("input", (e) => clearError(e.target));
    form.addEventListener("change", (e) => clearError(e.target));
  });

  // Menores de edad: mostrar campos del tutor
  const join = $("#form-unete");
  const birth = $("input[name='nacimiento']", join);
  const guardian = $(".guardian", join);
  birth.max = new Date().toISOString().split("T")[0];
  birth.addEventListener("change", () => {
    const minor = birth.value && ageFrom(birth.value) < 18;
    guardian.hidden = !minor;
    $$("input", guardian).forEach((i) => (i.required = !!minor));
  });

  // Fotos: contador y límite
  const file = $(".file", join);
  const input = $("input[type='file']", file);
  const hint = $(".file-hint", file);
  const defaultHint = hint.textContent;
  input.addEventListener("change", () => {
    const n = input.files.length;
    if (n > CONFIG.MAX_FOTOS) {
      hint.textContent = `Máximo ${CONFIG.MAX_FOTOS} fotos. Seleccionaste ${n}.`;
      input.value = "";
    } else {
      hint.textContent = n ? `${n} foto${n > 1 ? "s" : ""} seleccionada${n > 1 ? "s" : ""}` : defaultHint;
    }
  });
  ["dragenter", "dragover"].forEach((ev) => file.addEventListener(ev, () => file.classList.add("is-drag")));
  ["dragleave", "drop"].forEach((ev) => file.addEventListener(ev, () => file.classList.remove("is-drag")));
}

function ageFrom(dateStr) {
  const b = new Date(dateStr), n = new Date();
  let a = n.getFullYear() - b.getFullYear();
  if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--;
  return a;
}

function clearError(el) {
  el.closest(".field, .check")?.classList.remove("is-invalid");
  el.closest(".checks")?.classList.remove("is-invalid");
}

function validate(form) {
  let firstBad = null;
  $$("[required]", form).forEach((el) => {
    const ok = el.type === "checkbox" ? el.checked : el.value.trim() !== "" && el.checkValidity();
    if (!ok) {
      el.closest(".field, .check")?.classList.add("is-invalid");
      firstBad ??= el;
    }
  });
  $$("[data-required-group]", form).forEach((g) => {
    if (!$$("input:checked", g).length) { g.classList.add("is-invalid"); firstBad ??= $("input", g); }
  });
  return firstBad;
}

async function submitForm(form) {
  const status = $(".form-status", form);
  status.className = "form-status";
  const bad = validate(form);
  if (bad) {
    status.classList.add("err");
    status.textContent = "Revisa los campos marcados.";
    bad.focus({ preventScroll: false });
    return;
  }

  const kind = form.dataset.form;
  const endpoint = CONFIG.FORM_ENDPOINT[kind];
  form.classList.add("is-sending");
  status.textContent = "Enviando…";

  try {
    if (endpoint) {
      const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
    } else {
      await new Promise((r) => setTimeout(r, 900)); // modo demostración
      console.info(`[Sovrana] Formulario "${kind}" en modo demo. Configura CONFIG.FORM_ENDPOINT en script.js.`);
    }
    status.classList.add("ok");
    status.textContent = kind === "casting"
      ? "¡Gracias! Recibimos tu solicitud y te responderemos en menos de 24 horas hábiles."
      : "¡Aplicación enviada! Revisaremos tu perfil y te contactaremos si encaja con nuestro roster.";
    form.reset();
    if (kind === "casting") { shortlist.clear(); syncShortlist(); }
    else { $(".guardian", form).hidden = true; $(".file-hint", form).textContent = "Arrastra o haz clic para subir"; }
  } catch {
    status.classList.add("err");
    status.textContent = "No pudimos enviar el formulario. Escríbenos a hola@sovrana.com.";
  } finally {
    form.classList.remove("is-sending");
  }
}

/* Contadores animados */
function initCounters() {
  const els = $$("[data-count]");
  const run = (el) => {
    const end = +el.dataset.count;
    if (reduceMotion) return (el.textContent = end);
    const t0 = performance.now(), dur = 1600;
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
  els.forEach((el) => io.observe(el));
}
