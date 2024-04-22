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
				//target: "http://127.0.0.1:5000",
				target: "http://eduvedras.pythonanywhere.com/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, "/api"),
			},
		},
	},
});
