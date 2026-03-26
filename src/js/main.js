import "../scss/style.scss";
import "./header.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { initHome } from "./home.js";
import { initAbout } from "./about.js";
import { initWork } from "./work.js";

initHome();
initAbout();
initWork();
