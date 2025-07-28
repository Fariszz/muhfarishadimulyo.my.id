export interface BlogPostMeta {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  published: boolean;
  heroImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  id: string;
  content: string;
  Component?: React.ComponentType;
}

// Import all MDX files as modules
const mdxFiles = import.meta.glob('/src/content/posts/*.mdx', { 
  eager: true 
});

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  for (const [path, module] of Object.entries(mdxFiles)) {
    const mdxModule = module as any;
    const frontmatter = mdxModule.frontmatter || {};
    const id = path.split('/').pop()?.replace('.mdx', '') || '';
    
    posts.push({
      id,
      content: '', // Will be rendered by MDX component
      Component: mdxModule.default, // MDX component for rendering
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      date: frontmatter.date,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      readTime: frontmatter.readTime || 5,
      published: frontmatter.published !== false,
      heroImage: frontmatter.heroImage,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category === category);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}