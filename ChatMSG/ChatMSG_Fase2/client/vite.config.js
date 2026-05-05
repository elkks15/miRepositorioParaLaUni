import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    /** Sin esto, Vite bloquea `Host: 10.x.x.x` desde Firefox en otra PC (DNS rebinding). */
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:3051",
        changeOrigin: true,
        secure: false,
        credentials: true
      },
      "/socket.io": {
        target: "http://localhost:3051",
        ws: true,
        secure: false,
        credentials: true
      }
    }
  }
});
