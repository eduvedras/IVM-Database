import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss()],
		},
	},
	server: {
		port: 8080,
		proxy: {
			"/api": {
				target: "https://ivm.onrender.com/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},
});
