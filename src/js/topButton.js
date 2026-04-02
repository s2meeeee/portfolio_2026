export function initTopButton() {
    const body = document.body;
    if (!body) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "top-button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = `
        <span class="top-button__label">TOP</span>
        <span class="top-button__arrow" aria-hidden="true">↑</span>
    `;

    body.appendChild(button);

    const toggleButton = () => {
        const isVisible = window.scrollY > 240;
        button.classList.toggle("is-visible", isVisible);
    };

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", toggleButton, { passive: true });
    toggleButton();
}
