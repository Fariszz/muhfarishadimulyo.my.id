// @ts-check
import { defineConfig } from "astro/config";
import Unocss from "unocss/astro";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import Icons from "unplugin-icons/vite";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
// @ts-ignore
import path from "node:path";

// https://astro.build/config
export default defineConfig({
	integrations: [
		Unocss({
			injectReset: true,
		}),
		svelte(),
		mdx(),
		sitemap(),
		robotsTxt({
			host: 'muhfarishadimulyo.my.id',
			sitemap: 'https://muhfarishadimulyo.my.id/sitemap-index.xml',
			policy: [
				{
					userAgent: "*",
					allow: "/",
				},
			],
		}),
	],
	site: "https://muhfarishadimulyo.my.id",
	vite: {
		plugins: [Icons({ compiler: "svelte" })],
		resolve: {
			alias: {
				"~/*": path.resolve("src"),
			},
		},
		ssr: {
			external: ["svgo"],
		},
	},
});
