// character animation
gsap.registerPlugin(ScrollTrigger);

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
      start: "20% 80%",
      end: "100% 100%",
      scrub: 1,
      markers: true,
    },
  })

  .fromTo(
    ".videoWrap .videoBox",
    { "clip-path": "inset(60% 60% 60% 60% round 30%)" },
    { "clip-path": "inset(0% 0% 0% 0% round 0%)", ease: "none", duration: 10 },
    0,
  );
