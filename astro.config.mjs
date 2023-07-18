import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import { FontaineTransform, FontaineTransformOptions } from "fontaine"

/** @type FontaineTransformOptions */
const fontaineOptions = {
  fallbacks: [
    "Noto Serif",
    "batang",
    "Times New Roman",
  ],
}

// https://astro.build/config
export default defineConfig({
  site: "https://scarf005.github.io",
  base: "/fanfics",
  integrations: [mdx(), sitemap()],
  vite: { plugins: [FontaineTransform.vite(fontaineOptions)] },
})
