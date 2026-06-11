const header = document.querySelector("header");
const menuButton = document.querySelector(".navHamburg");
const fullNav = document.querySelector(".nav--full");
const fullNavLinks = document.querySelectorAll(".nav--full a");

if (fullNav && !fullNav.querySelector(".nav--full__close")) {
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "nav--full__close";
  closeButton.setAttribute("aria-label", "Close menu");
  closeButton.innerHTML = `
    <span></span>
    <span></span>
  `;

  fullNav.prepend(closeButton);
}

const closeMenu = () => {
  if (!menuButton || !fullNav) return;

  fullNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
  document.body.style.overflow = "";
};

const openMenu = () => {
  if (!menuButton || !fullNav) return;

  fullNav.classList.add("is-open");
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close menu");
  document.body.style.overflow = "hidden";
};

const toggleMenu = () => {
  if (!fullNav) return;

  if (fullNav.classList.contains("is-open")) {
    closeMenu();
  } else {
    openMenu();
  }
};

const updateHeaderScroll = () => {
  if (window.scrollY === 0) {
    header.classList.remove("scrolled");
  } else if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};

const mediaQuery = window.matchMedia("(min-width: 751px)");

const handleResize = (event) => {
  if (event.matches) {
    closeMenu();
    window.addEventListener("scroll", updateHeaderScroll);
    updateHeaderScroll();
  } else {
    window.removeEventListener("scroll", updateHeaderScroll);
    header.classList.remove("scrolled");
  }
};

if (menuButton && fullNav) {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "full-nav");
  fullNav.id = "full-nav";

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".navHamburg");
    const closeButton = event.target.closest(".nav--full__close");
    const nav = event.target.closest(".nav--full");

    if (button) {
      toggleMenu();
      return;
    }

    if (closeButton) {
      closeMenu();
      return;
    }

    if (fullNav.classList.contains("is-open") && !nav) {
      closeMenu();
    }
  });

  fullNavLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

if (typeof mediaQuery.addEventListener === "function") {
  mediaQuery.addEventListener("change", handleResize);
} else if (typeof mediaQuery.addListener === "function") {
  mediaQuery.addListener(handleResize);
}

handleResize(mediaQuery);
