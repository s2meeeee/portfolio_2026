import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWork() {
    if (!document.body.classList.contains("work-page")) return;

    const otherItems = document.querySelectorAll(".work__other-item");
    const otherImages = document.querySelectorAll(".work__other-img");

    otherItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
            otherItems.forEach((el) => el.classList.remove("is-active"));
            otherImages.forEach((img) => img.classList.remove("is-active"));

            item.classList.add("is-active");
            otherImages[index].classList.add("is-active");
        });
    });




}