import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "TekBreed Docs",
	description: "TekBreed Documentation",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Docs", link: "docs/markdown-examples" },
		],

		sidebar: [
			{
				text: "Examples",
				items: [
					{ text: "Markdown Examples", link: "docs/markdown-examples" },
					{ text: "Runtime API Examples", link: "docs/api-examples" },
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/tekbreed" },
			{ icon: "npm", link: "https://github.com/tekbreed" },
		],
	},
})
