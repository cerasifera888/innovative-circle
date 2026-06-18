// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Static site (default output). Update `site` to your production URL before deploy.
// https://astro.build/config
export default defineConfig({
  site: 'https://innovative-circle.netlify.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
