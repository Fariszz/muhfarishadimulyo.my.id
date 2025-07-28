import { Helmet } from 'react-helmet-async';
import { personalInfo } from '@/content/personal-info';

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
  tags = []
}: SEOHeadProps) {
  const siteTitle = personalInfo.name;
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - ${personalInfo.title}`;
  const siteDescription = description || personalInfo.bio;
  const siteUrl = personalInfo.website || 'https://muhfarishalyo.my.id';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image || `${siteUrl}/og-image.jpg`;
  
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Person',
    ...(type === 'article' ? {
      headline: title,
      description: siteDescription,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: author,
        url: siteUrl
      },
      publisher: {
        '@type': 'Person',
        name: personalInfo.name,
        url: siteUrl
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      },
      keywords: tags.join(', '),
      articleSection: section
    } : {
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
      email: personalInfo.email
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title || personalInfo.name} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title || personalInfo.name} />
      {personalInfo.twitter && (
        <meta name="twitter:site" content={personalInfo.twitter.replace('https://twitter.com/', '@')} />
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

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
}