const header = document.querySelector("header");

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
    window.addEventListener("scroll", updateHeaderScroll);
    updateHeaderScroll();
  } else {
    window.removeEventListener("scroll", updateHeaderScroll);
    header.classList.remove("scrolled");
  }
};

if (typeof mediaQuery.addEventListener === "function") {
  mediaQuery.addEventListener("change", handleResize);
} else if (typeof mediaQuery.addListener === "function") {
  mediaQuery.addListener(handleResize);
}

handleResize(mediaQuery);