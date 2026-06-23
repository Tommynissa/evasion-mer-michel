const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const sections = document.querySelectorAll("main section[id]");

function closeMenu() {
  header.classList.remove("menu-active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Ouvrir le menu");
}

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 45);

  let current = "accueil";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const bookingForm = document.querySelector("#booking-form");
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = bookingForm.querySelector(".form-status");
  const firstName = new FormData(bookingForm).get("name").trim().split(" ")[0];
  status.textContent = `Merci ${firstName} ! Votre demande est prête. Nous vous recontactons rapidement.`;
  bookingForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
