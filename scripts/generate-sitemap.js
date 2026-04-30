import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const baseUrl = (process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://muhfarishadimulyo.my.id').replace(/\/$/, '');
const currentDate = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/projects', priority: '0.9', changefreq: 'monthly' },
  { url: '/experience', priority: '0.8', changefreq: 'monthly' },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function readProjectRoutes() {
  const source = readFileSync(join(process.cwd(), 'src', 'content', 'projects.ts'), 'utf8');

  return [...source.matchAll(/id:\s*["']([^"']+)["']/g)].map(([, id]) => ({
    url: `/projects/${id}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));
}

function readBlogRoutes() {
  const postsDir = join(process.cwd(), 'src', 'content', 'posts');

  return readdirSync(postsDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = readFileSync(join(postsDir, file), 'utf8');
      const published = !/published:\s*false/.test(source);
      const dateMatch = source.match(/date:\s*["']?([^"'\n]+)["']?/);

      if (!published) {
        return undefined;
      }

      return {
        url: `/blog/${file.replace(/\.mdx$/, '')}`,
        lastmod: dateMatch?.[1]?.trim() || currentDate,
        priority: '0.7',
        changefreq: 'monthly',
      };
    })
    .filter(Boolean);
}

const pages = [...staticPages, ...readBlogRoutes(), ...readProjectRoutes()];

const sitemapUrls = pages.map((page) => `  <url>
    <loc>${escapeXml(`${baseUrl}${page.url}`)}</loc>
    <lastmod>${escapeXml(page.lastmod || currentDate)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(`${baseUrl}/sitemap-0.xml`)}</loc>
  </sitemap>
</sitemapindex>`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap-index.xml`;

try {
  writeFileSync(join(process.cwd(), 'dist', 'sitemap.xml'), sitemap);
  writeFileSync(join(process.cwd(), 'dist', 'sitemap-0.xml'), sitemap);
  writeFileSync(join(process.cwd(), 'dist', 'sitemap-index.xml'), sitemapIndex);
  writeFileSync(join(process.cwd(), 'dist', 'robots.txt'), robotsTxt);
  console.log(`Generated ${pages.length} sitemap URLs`);
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exitCode = 1;
}
