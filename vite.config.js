import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  // Icons use individual ESM imports; avoid scanning the entire icon library.
  optimizeDeps: { exclude: ["lucide-react"] },
});
