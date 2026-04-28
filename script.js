// script.js
/* -------------------------------------------------
   Language data (Arabic default, English optional)
------------------------------------------------- */
const translations = {
  ar: {
    heroTitle: "تألّق الفضة الفاخرة",
    heroTagline: "المجوهرات التي تحكي قصة من الفخامة والعبقرية",
    ctaContact: "تواصل معنا",
    ctaCall: "اتصل الآن",
    galleryTitle: "معرض منتجاتنا",
    reviewsTitle: "ماذا يقول عملاؤنا",
    mapTitle: "موقعنا",
    directionsBtn: "احصل على الاتجاهات",
    contactTitle: "اتصل بنا"
  },
  en: {
    heroTitle: "Luxury Silver Elegance",
    heroTagline: "Jewelry that tells a story of opulence and craftsmanship",
    ctaContact: "Contact Us",
    ctaCall: "Call Now",
    galleryTitle: "Our Gallery",
    reviewsTitle: "What Our Clients Say",
    mapTitle: "Our Location",
    directionsBtn: "Get Directions",
    contactTitle: "Contact"
  }
};
let currentLang = "ar";
function applyTranslations() {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.dataset.key;
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}
function setDirection(lang) {
  const html = document.documentElement;
  if (lang === "ar") {
    html.setAttribute("lang", "ar");
    html.setAttribute("dir", "rtl");
  } else {
    html.setAttribute("lang", "en");
    html.setAttribute("dir", "ltr");
  }
}
// Language toggle
document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "ar" ? "en" : "ar";
  setDirection(currentLang);
  applyTranslations();
});
/* -------------------------------------------------
   Simple Lightbox
------------------------------------------------- */
function createLightbox() {
  const lb = document.createElement("div");
  lb.id = "lightbox";
  lb.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.9);
    display:none; align-items:center; justify-content:center; z-index:10000;`;
  const img = document.createElement("img");
  img.style.maxWidth = "90%";
  img.style.maxHeight = "90%";
  lb.appendChild(img);
  document.body.appendChild(lb);
  lb.addEventListener("click", () => (lb.style.display = "none"));
  return {
    show(src) {
      img.src = src;
      lb.style.display = "flex";
    }
  };
}
const lightbox = createLightbox();
document.querySelectorAll(".gallery-item img").forEach(img => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => lightbox.show(img.src));
});
/* -------------------------------------------------
   Init
------------------------------------------------- */
setDirection(currentLang);
applyTranslations();
