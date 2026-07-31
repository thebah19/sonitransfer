import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function remitecUpstreamPath(path) {
  const requestUrl = new URL(path, "http://localhost");
  const route = requestUrl.pathname.replace(/^\/api\/remitec/, "");

  if (route === "/home-settings") return "/api/HomeSettings/get";
  if (route === "/currencies-from") return "/api/SendMoney/GetCurrenciesFrom";
  if (route === "/currencies-to") return `/api/SendMoney/GetCurrenciesTo${requestUrl.search}`;

  const deliveryMatch = route.match(/^\/delivery-types\/(\d+)$/);
  if (deliveryMatch) return `/api/SendMoney/GetDeliveryTypes/${deliveryMatch[1]}`;

  const quotationMatch = route.match(/^\/quotation\/(\d+)\/(\d+)$/);
  if (quotationMatch) return `/api/SendMoney/GetBestQuotation/${quotationMatch[1]}/${quotationMatch[2]}`;

  return "/api/unavailable";
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
    proxy: {
      "/api/remitec": {
        target: "https://app.sonitransfer.com",
        changeOrigin: true,
        secure: true,
        rewrite: remitecUpstreamPath,
      },
    },
  },
  plugins: [react()],
});
