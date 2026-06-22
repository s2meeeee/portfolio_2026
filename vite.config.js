import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "page/about.html",
        work: "page/work.html",
        contact: "page/contact.html",
      },
    },
  },
});