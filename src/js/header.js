const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  // 현재 스크롤값 확인용 (문제 해결되면 지워도 됨)
  // console.log(window.scrollY);

  if (window.scrollY === 0) {
    header.classList.remove("scrolled");
  } else if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    // 1~50 구간에서는 너 취향대로:
    // 맨 위처럼 보이게 하고 싶으면 remove
    header.classList.remove("scrolled");
  }
});

// 새로고침 했을 때도 상태 맞추기
window.dispatchEvent(new Event("scroll"));