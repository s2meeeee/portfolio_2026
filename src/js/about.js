import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAbout() {
  if (!document.body.classList.contains("about-page")) return;

  const upBox = document.querySelectorAll(".upBox");

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about__timeline",
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=600%",
      //markers: true,
    },
  });

  aboutTl.from(upBox, {
    y: "400%",
    ease: "none",
    stagger: 0.6,
    opacity: 0,
  });

  gsap.fromTo(
    ".about__intro-title",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".about__intro",
        start: "top 90%",
        toggleActions: "play none none reverse",
        //markers: true,
      },
    },
  );

  //svg 애니메이션
  const path01 = document.querySelector("#svgAni01");
  const path02 = document.querySelector("#svgAni02");

  const len01 = path01.getTotalLength();
  const len02 = path02.getTotalLength();

  gsap.set(path01, {
    strokeDasharray: len01,
    strokeDashoffset: len01,
  });

  gsap.set(path02, {
    strokeDasharray: len02,
    strokeDashoffset: len02,
  });

  // 긴 선 먼저
  gsap.to(path02, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".about__content",
      start: "top 50%",
      end: "80% 80%",
      scrub: 2,
      markers: true,
    },
  });

  // 짧은 선은 나중에
  gsap.to(path01, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".about__content",
      start: "60% 50%",
      end: "80% 30%",
      scrub: 1,
      //markers: true,
    },
  });
}
