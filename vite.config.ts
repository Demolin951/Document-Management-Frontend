import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
 
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
 
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
 
  const pfxPathValue = env.DEV_HTTPS_PFX_PATH;
  const pfxPassword = env.DEV_HTTPS_PFX_PASSWORD;
 
  if (!pfxPathValue) {
    throw new Error(
      "DEV_HTTPS_PFX_PATH is missing. Run setup-vite-https.ps1 first.",
    );
  }
 
  if (!pfxPassword) {
    throw new Error(
      "DEV_HTTPS_PFX_PASSWORD is missing. Run setup-vite-https.ps1 first.",
    );
  }
 
  const pfxPath = resolve(pfxPathValue);
 
  if (!existsSync(pfxPath)) {
    throw new Error(`HTTPS certificate was not found: ${pfxPath}`);
  }
 
  return {
    plugins: [react(), tailwindcss()],
 
    server: {
      // Accept connections through all network interfaces.
      host: "0.0.0.0",
      allowedHosts: [
      "",
      "",
      ],
 
      // Keep the frontend on a fixed port.
      port: 5174,
      strictPort: true,
 
      // Use the certificate and private key stored in the PFX file.
      https: {
        pfx: readFileSync(pfxPath),
        passphrase: pfxPassword,
        minVersion: "TLSv1.2",
      },
 
      // Forward frontend API calls to the local ASP.NET backend.
      proxy: {
        "/api": {
          target: "http://localhost:5173",
          changeOrigin: true,
        },
      },
    },
  };
});