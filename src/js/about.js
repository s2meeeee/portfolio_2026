import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initAbout() {
    if (!document.body.classList.contains(".about-page")) return;
    
    
    
    const upBox = document.querySelectorAll('.upBox')

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about__timeline',
            pin: true,
            scrub: 3,
            start: 'top top',
            end: '+=400%', // 시작부분에서 400%까지 스크롤한 후 종료
            markers: true
        }
    });
}



