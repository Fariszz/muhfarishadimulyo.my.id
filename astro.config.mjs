import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://muhfarishadimulyo.my.id';

export default defineConfig({
  site,
  integrations: [
    sitemap({
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.7,
      serialize(item) {
        const url = new URL(item.url);

        if (url.pathname === '/') {
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 1;
        } else if (url.pathname.startsWith('/blog')) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = url.pathname === '/blog/' ? 0.9 : 0.7;
        } else if (url.pathname.startsWith('/projects')) {
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = url.pathname === '/projects/' ? 0.9 : 0.8;
        }

        return item;
      },
    }),
  ],
});
