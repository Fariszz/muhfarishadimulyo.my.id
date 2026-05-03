import { Helmet } from 'react-helmet-async';
import { personalInfo } from '@/content/personal-info';

type JsonLd = Record<string, unknown>;

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  preconnectOrigins?: string[];
  schema?: JsonLd | JsonLd[];
}

export function SEOHead({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = personalInfo.name,
  section,
  tags = [],
  preconnectOrigins = [],
  schema
}: SEOHeadProps) {
  const siteTitle = personalInfo.name;
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - ${personalInfo.title}`;
  const siteDescription = description || personalInfo.bio;
  const siteUrl = (personalInfo.website || 'https://farishm.com').replace(/\/$/, '');
  const canonicalPath = url ? (url.startsWith('/') ? url : `/${url}`) : '/';
  const fullUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;
  const imageUrl = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`)
    : `${siteUrl}/og-image.svg`;
  const twitterHandle = personalInfo.twitter
    ? `@${personalInfo.twitter.replace(/\/$/, '').split('/').pop()}`
    : undefined;
  const resolvedPreconnectOrigins = Array.from(
    new Set(
      [
        ...preconnectOrigins,
        image && image.startsWith('http') ? new URL(image).origin : null,
      ].filter((origin): origin is string => Boolean(origin) && origin !== siteUrl)
    )
  );
  
  const allKeywords = [
    'full stack developer',
    'Backend Engineer',
    'Software Engineer',
    'TypeScript',
    'Java',
    'web development',
    'UI/UX design',    
    'Node.js',
    'backend development',
    ...keywords
  ];

  const personSchema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    url: siteUrl,
    image: imageUrl,
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
      ...(personalInfo.twitter ? [personalInfo.twitter] : [])
    ],
    knowsAbout: allKeywords,
    email: personalInfo.email,
  };

  const websiteSchema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteTitle,
    description: personalInfo.bio,
    inLanguage: 'en',
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Projects',
        url: `${siteUrl}/projects`,
      },
      {
        '@type': 'WebPage',
        name: 'Blog',
        url: `${siteUrl}/blog`,
      },
      {
        '@type': 'WebPage',
        name: 'Experience',
        url: `${siteUrl}/experience`,
      },
    ],
  };

  const pageSchema: JsonLd = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${fullUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        },
        headline: title,
        description: siteDescription,
        image: imageUrl,
        author: {
          '@id': `${siteUrl}/#person`
        },
        publisher: {
          '@id': `${siteUrl}/#person`
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        keywords: tags.join(', '),
        articleSection: section
      }
    : {
        '@context': 'https://schema.org',
        '@type': canonicalPath === '/' ? 'ProfilePage' : 'WebPage',
        '@id': fullUrl,
        url: fullUrl,
        name: fullTitle,
        description: siteDescription,
        inLanguage: 'en',
        isPartOf: {
          '@id': `${siteUrl}/#website`
        },
        about: {
          '@id': `${siteUrl}/#person`
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl
        }
      };

  const structuredData = [
    personSchema,
    websiteSchema,
    pageSchema,
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : [])
  ];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      <link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title || personalInfo.name} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title || personalInfo.name} />
      {twitterHandle && (
        <meta name="twitter:site" content={twitterHandle} />
      )}

      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#000000" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preconnect to external origins used on the current page */}
      {resolvedPreconnectOrigins.map((origin) => (
        <link key={origin} rel="preconnect" href={origin} crossOrigin="anonymous" />
      ))}

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
}
