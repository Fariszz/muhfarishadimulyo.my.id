import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/seo-head';
import { personalInfo } from '@/content/personal-info';
import { projects } from '@/content/projects';

export function HomePage() {
  // Get featured projects for the home page
  const featuredProjects = projects.filter(project => project.featured).slice(0, 2);

  return (
    <>
      <SEOHead
        title="Backend Software Engineer Portfolio"
        description="Backend-focused software engineer portfolio featuring scalable systems, selected projects, engineering experience, and technical writing."
        keywords={['backend software engineer', 'software engineer portfolio', 'TypeScript', 'Java', 'web development', 'system design']}
        type="website"
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                {personalInfo.title}
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto btn-animate group">
                <Link to="/projects">
                  View My Work 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </Button>
              <a href="/resume.pdf" download>
                <Button variant="outline" size="lg" className="w-full sm:w-auto btn-animate">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume                  
                </Button>
              </a>
            </div>

            <div className="flex items-center justify-center space-x-6 pt-8">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-110 icon-transition"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-110 icon-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-110 icon-transition"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section className="border-t bg-muted/50">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
                <p className="text-lg text-muted-foreground">
                  A selection of projects that showcase my skills and experience
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 animate-stagger">
                {featuredProjects.map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-800 card-hover h-full">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {project.imageUrl ? (
                            <div className="aspect-video overflow-hidden rounded-lg">
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out image-smooth-load"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-blue-600/30 transition-all duration-800">
                              <span className="text-sm text-muted-foreground">Project Preview</span>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-600">
                                {project.title}
                              </h3>
                              <Badge variant="default" className="text-xs animate-pulse">
                                Featured
                              </Badge>
                            </div>
                            <p className="text-muted-foreground transition-colors duration-600">
                              {project.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((tech, techIndex) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md tech-stack-item"
                                style={{ animationDelay: `${techIndex * 0.15}s` }}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md tech-stack-item">
                                +{project.techStack.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <Badge variant="secondary" className="text-xs">
                              {project.category}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Fallback if no featured projects */}
              {featuredProjects.length === 0 && (
                <div className="grid md:grid-cols-2 gap-6 animate-stagger">
                  {projects.slice(0, 2).map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`}>
                      <Card className="group cursor-pointer hover:shadow-lg transition-all duration-800 card-hover h-full">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {project.imageUrl ? (
                              <div className="aspect-video overflow-hidden rounded-lg">
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out image-smooth-load"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div className="aspect-video bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-blue-600/30 transition-all duration-800">
                                <span className="text-sm text-muted-foreground">Project Preview</span>
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-600">
                                {project.title}
                              </h3>
                              <p className="text-muted-foreground transition-colors duration-600">
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.slice(0, 3).map((tech, techIndex) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md tech-stack-item"
                                  style={{ animationDelay: `${techIndex * 0.15}s` }}
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 3 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md tech-stack-item">
                                  +{project.techStack.length - 3} more
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              <Badge variant="secondary" className="text-xs">
                                {project.category}
                              </Badge>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-600" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              <div className="text-center mt-8">
                <Button asChild variant="outline" className="btn-animate group">
                  <Link to="/projects">
                    View All Projects 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section className="border-t">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Explore the Site</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Browse the most important sections of the site: portfolio projects, engineering articles, and professional experience.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="h-full card-hover">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Browse software engineering projects</h3>
                      <p className="text-muted-foreground">
                        Review selected backend and web application projects, implementation details, and technology stacks.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                      <Link to="/projects">
                        Go to Projects
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full card-hover">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Read the software engineering blog</h3>
                      <p className="text-muted-foreground">
                        Explore technical writing about backend engineering, Java, TypeScript, architecture, and lessons from production work.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                      <Link to="/blog">
                        Go to Blog
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full card-hover">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">View professional engineering experience</h3>
                      <p className="text-muted-foreground">
                        See career history, delivery highlights, and the technologies used across product and engineering roles.
                      </p>
                    </div>
                    <Button asChild variant="outline" className="group">
                      <Link to="/experience">
                        Go to Experience
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
              <p className="text-lg text-muted-foreground">
                I'm always interested in new opportunities and exciting projects. 
                Let's discuss how we can bring your ideas to life.
              </p>
              <Button asChild size="lg" className="btn-animate group">
                <a href={`mailto:${personalInfo.email}`}>
                  Get in Touch 
                  <Mail className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
