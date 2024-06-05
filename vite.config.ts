import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "WeatherAppV1",
        short_name: "WeatherApp",
        description: "This is a weather application",
        theme_color: "#ffffff",
        screenshots: [
          {
            src: "/public/desktopscreenshot.png",
            sizes: "2882x1666",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/public/mobilescreenshot.png",
            sizes: "844x1704",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
