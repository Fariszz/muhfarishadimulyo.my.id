import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { HomePage } from '@/pages/home';
import { BlogPage } from '@/pages/blog';
import { BlogPostPage } from '@/pages/blog-post';
import { ProjectsPage } from '@/pages/projects';
import { ProjectDetailPage } from '@/pages/project-detail';
import { ExperiencePage } from '@/pages/experience';

// MDX components for styling
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mb-2 mt-6" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  img: (props: any) => (
    <img className="rounded-lg shadow-md my-6 w-full image-smooth-load" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary hover:underline transition-colors duration-300" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-border" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props} />
  ),
  td: (props: any) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="personal-website-theme">
        <MDXProvider components={mdxComponents}>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </MDXProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;