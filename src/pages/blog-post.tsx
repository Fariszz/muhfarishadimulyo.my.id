import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/seo-head';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { getBlogPost, BlogPost } from '@/utils/mdx';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) return;
      
      try {
        const blogPost = await getBlogPost(id);
        setPost(blogPost);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead
          title="Loading..."
          description="Loading blog post..."
          url={`/blog/${id}`}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="aspect-video bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <SEOHead
          title="Post Not Found"
          description="The blog post you're looking for doesn't exist or has been removed."
          url={`/blog/${id}`}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-content-reveal">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <p className="text-muted-foreground">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="btn-animate">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        image={post.heroImage}
        url={`/blog/${post.id}`}
        type="article"
        publishedTime={post.date}
        section={post.category}
        tags={post.tags}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6 animate-slide-in-top" />
          
          {/* Navigation */}
          <div className="mb-8 animate-slide-in-left">
            <Button variant="ghost" asChild className="btn-animate group">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <article className="space-y-8">
            {/* Hero Image */}
            {post.heroImage && (
              <div className="aspect-video overflow-hidden rounded-lg border shadow-lg animate-scale-in">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out image-smooth-load"
                  loading="eager"
                />
              </div>
            )}

            <header className="space-y-6 animate-content-reveal">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min read
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <Button variant="outline" size="sm" onClick={handleShare} className="btn-animate">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="tech-stack-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <Card className="card-hover animate-content-reveal">
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-8">
                {post.Component ? (
                  <post.Component />
                ) : (
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">
                      This blog post content is loaded from the MDX file. The actual content would be rendered here using the MDX component.
                    </p>
                    
                    <div className="my-8">
                      <img
                        src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Development workspace"
                        className="w-full rounded-lg shadow-md image-smooth-load"
                        loading="lazy"
                      />
                      <p className="text-sm text-muted-foreground text-center mt-2 italic">
                        A modern development workspace showcasing the tools and environment used in web development.
                      </p>
                    </div>

                    <p>
                      The content includes rich formatting, code blocks, images, and other elements that make for engaging technical writing. Each blog post has its own unique content loaded from the corresponding MDX file, with proper image optimization and lazy loading for better performance.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Visual Content Strategy</h2>
                    
                    <div className="my-8">
                      <img
                        src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Code on screen"
                        className="w-full rounded-lg shadow-md image-smooth-load"
                        loading="lazy"
                      />
                      <p className="text-sm text-muted-foreground text-center mt-2 italic">
                        Clean, readable code is essential for maintainable applications.
                      </p>
                    </div>

                    <ul className="space-y-2">
                      <li>Use high-quality, relevant images that support the content</li>
                      <li>Optimize images for web performance with proper compression</li>
                      <li>Include descriptive alt text for accessibility</li>
                      <li>Add captions to provide context and additional information</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Implementation Details</h2>
                    
                    <p>
                      Images are sourced from Pexels to ensure high quality and proper licensing. Each image is optimized for web delivery with appropriate compression settings and responsive sizing.
                    </p>

                    <div className="my-8">
                      <img
                        src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="Team collaboration"
                        className="w-full rounded-lg shadow-md image-smooth-load"
                        loading="lazy"
                      />
                      <p className="text-sm text-muted-foreground text-center mt-2 italic">
                        Effective collaboration is key to successful project delivery.
                      </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                    <p>
                      This demonstrates how blog post content can be enhanced with visual elements while maintaining excellent performance and accessibility standards. The combination of hero images, inline content images, and proper optimization creates an engaging reading experience.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Posts */}
            <div className="border-t pt-8 animate-content-reveal">
              <h3 className="text-2xl font-bold mb-6 text-center">Continue Reading</h3>
              <div className="flex justify-center">
                <Button asChild variant="outline" className="btn-animate">
                  <Link to="/blog">
                    View All Posts
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}