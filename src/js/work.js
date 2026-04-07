import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const workImageModules = import.meta.glob("../img/work/*", {
    eager: true,
    import: "default",
});

const workImageAssetMap = Object.entries(workImageModules).reduce((map, [filePath, assetUrl]) => {
    const fileName = filePath.split("/").pop();

    if (!fileName || typeof assetUrl !== "string") return map;

    map.set(fileName.normalize("NFC"), assetUrl);
    map.set(fileName.normalize("NFD"), assetUrl);

    return map;
}, new Map());

export function initWork() {
    if (!document.body.classList.contains("work-page")) return;

    hydrateWorkImageSources();
    initPublishingSection();
    const modalControls = initDesignModal();
    initOtherSection(modalControls);
}

function hydrateWorkImageSources() {
    const images = document.querySelectorAll("img[src]");

    images.forEach((image) => {
        const resolvedSrc = resolveWorkImagePath(image.getAttribute("src"));

        if (resolvedSrc) {
            image.setAttribute("src", resolvedSrc);
        }
    });
}

function resolveWorkImagePath(rawPath) {
    if (!rawPath || !rawPath.includes("src/img/work/")) return "";

    const fileName = rawPath.split("/").pop();
    if (!fileName) return "";

    return (
        workImageAssetMap.get(fileName.normalize("NFC")) ||
        workImageAssetMap.get(fileName.normalize("NFD")) ||
        ""
    );
}

function initDesignModal() {
    const modal = document.querySelector("[data-design-modal]");
    const modalImage = modal?.querySelector("[data-design-modal-image]");
    const modalTitle = modal?.querySelector(".work-detail__design-modal-title");
    const triggers = document.querySelectorAll("[data-design-modal-trigger]");
    const closeButtons = modal?.querySelectorAll("[data-design-modal-close]");
    let pendingImageRequest = 0;

    if (!modal || !modalImage || !modalTitle) return null;

    const openModal = ({ image, title, alt }) => {
        const nextImageSrc = resolveWorkImagePath(image) || image;
        const nextAlt = alt || title || "디자인 상세 이미지";
        const requestId = ++pendingImageRequest;

        modalTitle.textContent = title || "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modal.classList.add("is-loading");
        modalImage.classList.remove("is-visible");
        modalImage.removeAttribute("src");
        modalImage.setAttribute("alt", nextAlt);

        if (!nextImageSrc) {
            modal.classList.remove("is-loading");
            return;
        }

        const preloadImage = new Image();

        preloadImage.addEventListener("load", () => {
            if (requestId !== pendingImageRequest) return;

            modalImage.setAttribute("src", nextImageSrc);
            modalImage.setAttribute("alt", nextAlt);
            modal.classList.remove("is-loading");
            modalImage.classList.add("is-visible");
        });

        preloadImage.addEventListener("error", () => {
            if (requestId !== pendingImageRequest) return;

            modal.classList.remove("is-loading");
            modalImage.classList.remove("is-visible");
        });

        preloadImage.src = nextImageSrc;
    };

    const closeModal = () => {
        pendingImageRequest += 1;
        modal.classList.remove("is-open");
        modal.classList.remove("is-loading");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        modalImage.classList.remove("is-visible");
    };

    if (triggers.length) {
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
    }

    closeButtons?.forEach((button) => {
        button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    return { openModal, closeModal };
}

function initOtherSection(modalControls) {
    const otherItems = document.querySelectorAll(".work-detail__other-item");
    const otherImages = document.querySelectorAll(".work-detail__other-img");

    if (!otherItems.length || otherItems.length !== otherImages.length) return;

    const setActiveItem = (activeIndex) => {
        otherItems.forEach((item, index) => {
            item.classList.toggle("is-active", index === activeIndex);
        });

        otherImages.forEach((image, index) => {
            image.classList.toggle("is-active", index === activeIndex);
        });
    };

    otherItems.forEach((item, index) => {
        const previewImage = otherImages[index]?.querySelector("img");
        const previewButton = otherImages[index]?.querySelector("button");
        const title = item.querySelector(".work-detail__other-name")?.textContent?.trim() || "";

        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `${title} preview open`);

        item.addEventListener("mouseenter", () => {
            setActiveItem(index);
        });

        item.addEventListener("click", () => {
            setActiveItem(index);

            if (!modalControls?.openModal || !previewImage) return;

            modalControls.openModal({
                image: previewButton?.dataset.modalImage || previewImage.getAttribute("src") || "",
                title,
                alt: previewButton?.dataset.modalAlt || previewImage.getAttribute("alt") || title,
            });
        });

        item.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();
            item.click();
        });
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
