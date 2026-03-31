import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["gsap"],
          "three-core": ["three"],
          "three-stdlib": ["three-stdlib"],
          r3f: ["@react-three/fiber"],
        },
      },
    },
  },
});
