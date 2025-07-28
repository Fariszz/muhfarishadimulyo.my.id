import { personalInfo } from '@/content/personal-info';
import { getAllBlogPosts } from './mdx';
import { projects } from '@/content/projects';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export async function generateSitemap(): Promise<string> {
  const baseUrl = personalInfo.website || 'https://muhammadfaris.dev';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Static pages
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/projects`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/experience`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    }
  ];

  // Add blog posts
  try {
    const blogPosts = await getAllBlogPosts();
    blogPosts.forEach(post => {
      if (post.published) {
        urls.push({
          loc: `${baseUrl}/blog/${post.id}`,
          lastmod: post.date,
          changefreq: 'monthly',
          priority: 0.7
        });
      }
    });
  } catch (error) {
    console.error('Error loading blog posts for sitemap:', error);
  }

  // Add projects
  projects.forEach(project => {
    urls.push({
      loc: `${baseUrl}/projects/${project.id}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: project.featured ? 0.8 : 0.6
    });
  });

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export async function generateRobotsTxt(): Promise<string> {
  const baseUrl = personalInfo.website || 'https://muhammadfaris.dev';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin or private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /.env
Disallow: /api/private/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /`;
}