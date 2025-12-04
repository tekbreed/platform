/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"


const MODE = process.env.NODE_ENV

export default defineConfig({
	server: {
		port: Number(process.env.PORT),
	},
	build: {
		target: "es2022",
		cssMinify: MODE === "production",
		rollupOptions: {
			external: [/node:.*/],
		},
		// sourcemap: true,
	},
	plugins: [tailwindcss(), tsconfigPaths(), reactRouter()],
	
})
