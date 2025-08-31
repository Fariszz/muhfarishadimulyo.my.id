import { writeFileSync } from 'fs';
import { join } from 'path';

// Simple sitemap generation for build process
const baseUrl = 'https://www.muhfarishadimulyo.my.id';
const currentDate = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'always' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/projects', priority: '0.9', changefreq: 'weekly' },
  { url: '/experience', priority: '0.8', changefreq: 'weekly' }
];

// Generate basic sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

Disallow: /admin/
Disallow: /private/
Disallow: /.env`;

// Write files to dist directory
try {
  writeFileSync(join(process.cwd(), 'dist', 'sitemap.xml'), sitemap);
  writeFileSync(join(process.cwd(), 'dist', 'robots.txt'), robotsTxt);
  console.log('✅ Sitemap and robots.txt generated successfully');
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
}