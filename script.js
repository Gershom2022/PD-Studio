/* =========================================================
   PD STUDIO — Site Scripts
   ⚠️ TO CHANGE PRICES: edit the SERVICES object below only.
   ========================================================= */

const SERVICES = {
  outdoor: [
    { name:"Solo Shoot",   price:2500, includes:["10 high-end edited photos","2 change of outfits"] },
    { name:"Couple Shoot", price:3750, includes:["10 high-end edited photos","2 change of outfits"] },
    { name:"Family Shoot", price:3750, includes:["10 high-end edited photos","2 change of outfits"] }
  ],
  studio: [
    { name:"Solo Shoot",   price:2500, includes:["10 high-end edited photos","2 change of outfits"] },
    { name:"Couple Shoot", price:3750, includes:["10 high-end edited photos","2 change of outfits"] },
    { name:"Family Shoot", price:3750, includes:["10 high-end edited photos","2 change of outfits"] }
  ],
  extraPhoto: 150
};

/* ---- GALLERY ----
   Your photos are listed below. To add more:
   1. Save the photo into images/gallery/<category>/
   2. Add one line below.
   Categories: studio | birthday | graduation | family
------------------------------------------------- */
const GALLERY = [
  // Studio
  { src:"images/gallery/studio/studio-01.jpg", cat:"studio" },
  { src:"images/gallery/studio/studio-02.jpg", cat:"studio" },
  { src:"images/gallery/studio/studio-03.jpg", cat:"studio" },
  { src:"images/gallery/studio/studio-04.jpg", cat:"studio" },
];

/* =========================================================
   DO NOT EDIT BELOW UNLESS YOU KNOW WHAT YOU'RE DOING
   ========================================================= */

function renderPrices(){
  const build = (list, elId) => {
    const el = document.getElementById(elId);
    el.innerHTML = list.map(s => `
      <div class="price-card">
        <h4>${s.name}</h4>
        <ul>${s.includes.map(i => `<li>${i}</li>`).join("")}</ul>
        <div class="price">KES ${s.price.toLocaleString()}<br><small>per session</small></div>
      </div>
    `).join("");
  };
  build(SERVICES.outdoor, "outdoorGrid");
  build(SERVICES.studio,  "studioGrid");
  document.querySelectorAll('[data-price="extra"]').forEach(el => {
    el.textContent = SERVICES.extraPhoto.toLocaleString();
  });
}

function renderGallery(){
  const grid = document.getElementById("galleryGrid");
  const cats = ["studio","birthday","graduation","family"];
  let items = GALLERY;

  if(items.length === 0){
    items = Array.from({length:12}, (_,i) => ({
      src:null,
      cat:cats[i % cats.length],
      label:`${cats[i % cats.length].charAt(0).toUpperCase()+cats[i % cats.length].slice(1)} photo`
    }));
  }

  grid.innerHTML = items.map(it => `
    <div class="gallery-item" data-cat="${it.cat}" ${it.src?`data-src="${it.src}"`:""}>
      ${it.src
        ? `<img src="${it.src}" alt="PD Studio ${it.cat} photo" loading="lazy">`
        : `<span>${it.label}<br><small>(add photo)</small></span>`}
    </div>
  `).join("");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  grid.querySelectorAll(".gallery-item[data-src]").forEach(item => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.dataset.src;
      lightbox.classList.add("open");
    });
  });
  document.getElementById("lightboxClose").onclick = () => lightbox.classList.remove("open");
  lightbox.onclick = e => { if(e.target === lightbox) lightbox.classList.remove("open"); };
}

function initFilters(){
  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".gallery-item").forEach(item => {
        item.classList.toggle("hide", f !== "all" && item.dataset.cat !== f);
      });
    });
  });
}

function initMenu(){
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

function initYear(){
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPrices();
  renderGallery();
  initFilters();
  initMenu();
  initYear();
});