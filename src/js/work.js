import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWork() {
    if (!document.body.classList.contains("work-page")) return;

    initPublishingSection();
    initDesignModal();
    const otherItems = document.querySelectorAll(".work-detail__other-item");
    const otherImages = document.querySelectorAll(".work-detail__other-img");

    otherItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
            otherItems.forEach((el) => el.classList.remove("is-active"));
            otherImages.forEach((img) => img.classList.remove("is-active"));

            item.classList.add("is-active");
            otherImages[index].classList.add("is-active");
        });
    });




}

function initDesignModal() {
    const modal = document.querySelector("[data-design-modal]");
    const modalImage = modal?.querySelector("[data-design-modal-image]");
    const modalTitle = modal?.querySelector(".work-detail__design-modal-title");
    const triggers = document.querySelectorAll("[data-design-modal-trigger]");
    const closeButtons = modal?.querySelectorAll("[data-design-modal-close]");

    if (!modal || !modalImage || !modalTitle || !triggers.length) return;

    const openModal = ({ image, title, alt }) => {
        modalImage.setAttribute("src", image);
        modalImage.setAttribute("alt", alt || title || "디자인 상세 이미지");
        modalTitle.textContent = title || "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            event.preventDefault();

            openModal({
                image: trigger.dataset.modalImage || "",
                title: trigger.dataset.modalTitle || "",
                alt: trigger.dataset.modalAlt || "",
            });
        });
    });

    closeButtons?.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
}

function initPublishingSection() {
    const section = document.querySelector(".work-detail-publishing");
    if (!section) return;

    const cards = [...section.querySelectorAll(".work-detail-publishing__image-card")];
    const texts = [...section.querySelectorAll(".work-detail-publishing__text")];

    if (!cards.length || cards.length !== texts.length) return;

    let activeIndex = 0;

    cards.forEach((card, index) => {
        const link = card.querySelector(".work-detail-publishing__image-link");

        gsap.set(card, {
            x: index === activeIndex ? 0 : getCardOffset(index),
            y: index === activeIndex ? -24 : 8,
            rotate: index === activeIndex ? 0 : getCardRotation(index),
            scale: index === activeIndex ? 1 : 0.94,
            zIndex: index === activeIndex ? cards.length + 1 : index + 1,
        });

        gsap.set(texts[index], {
            autoAlpha: index === activeIndex ? 1 : 0,
            y: index === activeIndex ? 0 : 16,
            display: index === activeIndex ? "block" : "none",
        });

        card.style.cursor = "pointer";

        card.addEventListener("click", (event) => {
            event.preventDefault();
            if (index === activeIndex) return;

            updatePublishingState(cards, texts, index);
            activeIndex = index;
        });

        if (link) {
            link.addEventListener("click", (event) => {
                event.preventDefault();
            });
        }
    });
}

function updatePublishingState(cards, texts, activeIndex) {
    cards.forEach((card, index) => {
        const isActive = index === activeIndex;

        gsap.to(card, {
            x: isActive ? 0 : getCardOffset(index),
            y: isActive ? -24 : 8,
            rotate: isActive ? 0 : getCardRotation(index),
            scale: isActive ? 1 : 0.94,
            duration: 0.45,
            ease: "power2.out",
            onStart: () => {
                card.style.zIndex = isActive ? String(cards.length + 1) : String(index + 1);
            },
        });
    });

    texts.forEach((text, index) => {
        const isActive = index === activeIndex;

        gsap.killTweensOf(text);

        if (isActive) {
            gsap.set(text, { display: "block" });
            gsap.fromTo(
                text,
                { autoAlpha: 0, y: 16 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.35,
                    ease: "power2.out",
                }
            );
            return;
        }

        gsap.to(text, {
            autoAlpha: 0,
            y: 12,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
                text.style.display = "none";
            },
        });
    });
}

function getCardOffset(index) {
    return index === 0 ? 10 : -10;
}

function getCardRotation(index) {
    return index === 0 ? -5 : 5;
}
