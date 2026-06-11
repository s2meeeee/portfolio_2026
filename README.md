# Seonmi Portfolio 2026

GSAP 기반의 동적인 인터랙션을 중심으로 제작한 개인 포트폴리오 프로젝트입니다.  
단순히 작업물을 나열하는 페이지가 아닌 스크롤과 마우스 움직임에 반응하는 애니메이션으로 퍼블리셔와 디자이너로서의 작업 감각을 보여주는 데 중점을 두었습니다.

## 프로젝트 소개

이 포트폴리오는 퍼블리싱과 디자인의 역량을 한 화면 안에서 자연스럽게 전달하기 위해 제작되었습니다.

메인 페이지에서는 GSAP ScrollTrigger를 활용해 동적인 캐릭터의 움직임과 소개 문구 등장, favorite item 스크롤 모션, 작업 리스트 마우스 프리뷰 등을 구성했습니다. About 페이지는 스크롤에 따라 타임라인 이미지와 svg애니메이션을 추가하여 좀 더 입체적으로 텍스트가 등장하는 느낌을 구사하였습니다.
Work 페이지는 퍼블리싱/디자인/기타 작업물을 분리해 상세하게 확인할 수 있도록 구성했습니다.

Vite는 빠른 개발 서버와 번들링 환경을 위해 사용했으며, SCSS는 페이지와 컴포넌트별 스타일을 분리해 유지보수와 수정이 편하도록 설계했습니다.

## 주요 기능

- GSAP과 ScrollTrigger를 활용한 스크롤 기반 애니메이션
- 메인 비주얼 캐릭터 모션 및 텍스트 전환 애니메이션
- About 페이지의 pinned timeline, SVG line drawing, 카드 등장 모션
- Work 페이지의 퍼블리싱 카드 전환 인터랙션
- 디자인 작업물 상세 이미지를 확인할 수 있는 모달 UI
- 마우스 호버에 따라 변경되는 작업물 프리뷰 이미지
- 반응형 레이아웃과 모바일 햄버거 메뉴
- TOP 버튼을 통한 부드러운 상단 이동

## 기술 스택

- HTML
- SCSS
- JavaScript ES Module
- GSAP
- GSAP ScrollTrigger
- Vite

## 페이지 구성

| Page | Description |
| Home | 포트폴리오의 첫인상, 자기소개,주요 작업물 프리뷰 |
| About | 성장 과정, 경험, 자격증, 프로젝트, 관련 링크 소개 |
| Work | 퍼블리싱 작업, 디자인 작업, 기타 작업 상세 소개 |
| Contact | 연락처와 소셜 링크 안내 |

## 폴더 구조

```text
portfolio_2026/
├── index.html
├── page/
│   ├── about.html
│   ├── contact.html
│   └── work.html
├── src/
│   ├── img/
│   ├── js/
│   │   ├── about.js
│   │   ├── header.js
│   │   ├── home.js
│   │   ├── main.js
│   │   ├── topButton.js
│   │   └── work.js
│   └── scss/
│       ├── base/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       └── style.scss
├── package.json
└── vite.config.js
```

## 제작 의도

이번 포트폴리오에서는 정적인 소개보다 사용자가 스크롤하고 이동하는 과정 자체가 하나의 경험처럼 느껴지도록 만드는 것에 집중했습니다.

GSAP을 사용해 화면의 흐름에 맞는 움직임을 만들고, Vite와 SCSS 구조를 통해 작업 중 빠르게 확인하고 수정할 수 있는 환경을 구성했습니다.
또한 페이지별 JavaScript와 SCSS를 나누어 이후 작업물 추가, 스타일 수정, 인터랙션 보완이 쉽도록 유지보수성등을 고려하여 작업하였습니다.

## 작업 포인트

- `src/js/main.js`에서 공통 스타일과 페이지별 스크립트를 모듈 방식으로 관리
- `src/js/home.js`에서 메인 페이지 전용 GSAP 인터랙션 처리
- `src/js/about.js`에서 About 페이지의 timeline, SVG, card animation 처리
- `src/js/work.js`에서 Work 페이지의 이미지 에셋 매핑, 모달, 카드 전환 처리
- `src/scss/style.scss`에서 base, layout, components, pages 스타일을 통합 관리

