
// character animation
gsap.registerPlugin(ScrollTrigger);


const tl = gsap.timeline({
  scrollTrigger:{
    trigger:'.main',
    start:"top top",
    end:"bottom top",
    scrub:1,
    markers:true
  }
});

// 캐릭터 이동
tl.to(".character", {
  y:1000,
  x:500,
  scale:1.2,
  duration: 0.7,
  ease:"none"
},0.3);

tl.to(".circle",{
  scale:0,
  opacity: 0,
  duration: 0.3,
  ease:"none" 
},0)

