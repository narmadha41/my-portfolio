
const menuButton = document.querySelector(".menu-btn");
const navbar = document.querySelector("#navbar");

// Mobile navigation
menuButton.addEventListener("click", () => {
  const opened = navbar.classList.toggle("open");

  menuButton.textContent = opened ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(opened));
});

// Close menu after selecting a section
document.querySelectorAll("#navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections when scrolling
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

// Highlight the active navigation link
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("#navbar a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      });
    }
  });
}, { rootMargin: "-30% 0px -60% 0px" });

sections.forEach(section => sectionObserver.observe(section));
