// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static, standalone output only (see CLAUDE.md "Engineering rules").
export default defineConfig({
  site: 'https://verzio.hu',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
