import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAbout() {
  if (!document.body.classList.contains("about-page")) return;


  const aboutScroll = document.querySelector(".about-scroll");

  // 요소없으면 종료하기
  if(!aboutScroll) return;

  // 스크롤 이벤트
  window.addEventListener("scroll", () => {
    if(window.scrollY >50){
      aboutScroll.classList.add("scroll-hide");
    }else{
      aboutScroll.classList.remove("scroll-hide");
    }
  });

  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-detail__timeline",
      pin: true,
      scrub: 1,
      start: "top top",
      end: "+=450%",
      // markers: true,
    },
  });

  // 1. 텍스트 먼저 등장
  aboutTl
    .fromTo(
      ".text--right",
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "none" }
    )
    .fromTo(
      ".text--left",
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "none" },
      "<" // 같은 타이밍에 같이 시작
    )

    // 2. 텍스트가 다 나온 뒤 이미지 등장
    .from(
      ".upBox",
      {
        y: "400%",
        opacity: 0,
        stagger: 0.4,
        duration: 1,
        ease: "none",
      },
      "+=0.1" // 텍스트 끝나고 조금 뒤
    );

  gsap.fromTo(
    ".about-detail__intro-title",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-detail__intro",
        start: "top 90%",
        toggleActions: "play none none reverse",
        //markers: true,
      },
    },
  );

  // about-detail__content 배경색변경

  const colorChange = {
    trigger: ".about-detail__content",
    start: "top bottom",
    end: "30% 50%",
    scrub: true,
    //markers:true,
  }

  gsap.to(".about-detail", {
    backgroundColor: "#0b0b0b",
    scrollTrigger: colorChange,
  })

  gsap.to(".about-detail__intro", {
    color: "#fff",
    scrollTrigger: colorChange,
  });



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
      trigger: ".about-detail__content",
      start: "top 50%",
      end: "80% 80%",
      scrub: 2,
      //markers: true,
    },
  });

  // 짧은 선은 나중에
  gsap.to(path01, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-detail__content",
      start: "60% 50%",
      end: "80% 30%",
      scrub: 1,
      //markers: true,
    },
  });

  const rows = gsap.utils.toArray(".about-detail__card-row");

  rows.forEach((row, index) => {
    gsap.fromTo(row, {
      y: 80,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: row,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
        //markers: true,
      }
    });
  });



  gsap.fromTo(
    ".about-detail__link",
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2, // ⭐ 하나씩 올라오는 핵심
      scrollTrigger: {
        trigger: ".about-detail__links",
        start: "top 100%",
        end: "50% 20%",
        toggleActions: "play none none none",
        scrub: 1,
        //markers: true,
      },
    }
  );
}
