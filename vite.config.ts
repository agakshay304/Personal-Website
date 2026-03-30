import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf("node_modules") === -1) {
            return undefined;
          }

          if (
            id.indexOf("react-dom") !== -1 ||
            id.indexOf("react/jsx-runtime") !== -1 ||
            id.indexOf("/react/") !== -1 ||
            id.indexOf("/scheduler/") !== -1
          ) {
            return "react";
          }

          if (id.indexOf("gsap") !== -1) {
            return "gsap";
          }

          if (id.indexOf("@react-three/fiber") !== -1) {
            return "r3f";
          }

          if (id.indexOf("three-stdlib") !== -1) {
            return "three-stdlib";
          }

          if (id.indexOf("/three/") !== -1) {
            return "three-core";
          }

          return undefined;
        },
      },
    },
  },
});
