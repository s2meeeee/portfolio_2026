import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initHome() {
  if (!document.body.classList.contains("home-page")) return;

      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main",
            start: "top top",
            end: "bottom 30%",
            scrub: 1,
        },
    });

    // 캐릭터 이동
    tl.to(".character", {
        y: 550,
        x: 450,
        scale: 1.3,
        duration: 0.3,
        ease: "none",
    });

    tl.to(
        ".circle",
        {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "none",
        },
        0,
    );

    // about text animation

    gsap.set(".about_textBox p", { opacity: 0, y: -40 });

    ScrollTrigger.create({
        trigger: ".about",
        start: "top 50%",
        onEnter: () => {
            gsap.to(".about_textBox p", {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            });
        },
        onLeaveBack: () => {
            gsap.to(".about_textBox p", {
                opacity: 0,
                y: -40,
                duration: 0.8,
                ease: "power2.out",
            });
        },
        onRefresh(self) {
            if (self.progress === 1) {
                gsap.set(".about_textBox p", { opacity: 1, y: 0 });
            }
        },
    });
    // favoriteBox item 스크롤에 따라 통통거리는 움직임 애니메이션

    const favoriteMotion = gsap.timeline({
        scrollTrigger: {
            trigger: ".aboutcontent",
            start: "20% 50%",
            end: "100% 0%",
            scrub: 1,
        },
    });

    favoriteMotion.from(
        ".favoriteItem_l #l_1",
        { x: "20", y: "-120", rotate: 40, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".favoriteItem_l #l_2",
        { x: "40", y: "-120", rotate: -20, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".favoriteItem_l #l_3",
        { x: "-20", y: "120", rotate: -40, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".favoriteItem_l #l_4",
        { x: "-40", y: "120", rotate: 10, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".favoriteItem_l #l_5",
        { x: "20", y: "120", rotate: 60, ease: "bounce.out", duration: 8 },
        3,
    );

    // right item
    favoriteMotion.from(
        ".favoriteItem_r #r_1",
        { x: "30", y: "-120", rotate: -20, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".favoriteItem_r #r_2",
        { x: "20", y: "100", rotate: 60, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".favoriteItem_r #r_3",
        { x: "-20", y: "120", rotate: -40, ease: "bounce.out", duration: 8 },
        3,
    );
    favoriteMotion.from(
        ".favoriteItem_r #r_4",
        { x: "100", rotate: -80, ease: "bounce.out", duration: 8 },
        2,
    );

    // video

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".video",
                start: "0% 70%",
                end: "80% 100%",
                scrub: 1,
                //markers: true,
            },
        })

        .fromTo(
            ".videoWrap .videoBox",
            { "clip-path": "inset(60% 60% 60% 60% round 30%)" },
            { "clip-path": "inset(0% 0% 0% 0% round 0%)", ease: "none", duration: 10 },
            0,
        )
        .to(
            ".aboutcircle",
            { width: "2500px", height: "1000px", ease: "none", duration: 3 },
            0,
        );

    // work

    function workCircleScrollPin() {
        const work = document.querySelector(".work");
        const c1 = document.querySelector(".circle01");
        const c2 = document.querySelector(".circle02");
        const c3 = document.querySelector(".circle03");
        const c4 = document.querySelector(".circle04");

        if (!work || !c1 || !c2 || !c3 || !c4) return;

        // 처음 상태: circle01만 보이게
        gsap.set([c2, c3, c4], {
            scale: 0,
            opacity: 0,
            transformOrigin: "50% 50%",
        });

        // pin 구간에서 애니메이션 진행
        const workTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".work",
                start: "20% top",
                end: "+=2000", // ✅ 스크롤 길이(가로스크롤처럼 길게): 숫자 늘리면 더 천천히
                scrub: 1,
                pin: true, // ✅ 여기서 멈춘다!
                anticipatePin: 1,
                // markers: true, // 확인용
            },
        });

        // 원들이 순서대로 커지며 나타남
        workTl
            .to(c2, { scale: 1, opacity: 1, ease: "none", duration: 1 }, 0)
            .to(c3, { scale: 1, opacity: 1, ease: "none", duration: 1 }, 0.2)
            .to(c4, { scale: 1, opacity: 1, ease: "none", duration: 1 }, 0.4);
    }

    window.addEventListener("DOMContentLoaded", () => {
        workCircleScrollPin();
    });

}


