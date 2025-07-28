import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Clock,
  User,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/seo-head';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { projects } from '@/content/projects';
import { Project } from '@/types';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id);
      setProject(foundProject || null);
    }
  }, [id]);

  if (!project) {
    return (
      <>
        <SEOHead
          title="Project Not Found"
          description="The project you're looking for doesn't exist or has been removed."
          url={`/projects/${id}`}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-content-reveal">
            <h1 className="text-4xl font-bold">Project Not Found</h1>
            <p className="text-muted-foreground">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="btn-animate">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title }
  ];

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        keywords={[...project.techStack, project.category.toLowerCase(), 'project', 'portfolio']}
        image={project.imageUrl}
        url={`/projects/${project.id}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-6 animate-slide-in-top" />
          
          {/* Navigation */}
          <div className="mb-8 animate-slide-in-left">
            <Button variant="ghost" asChild className="btn-animate group">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Projects
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="space-y-8">
            <header className="space-y-6 animate-content-reveal">
              {project.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-lg border shadow-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out image-smooth-load"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {project.category}
                      </Badge>
                      {project.featured && (
                        <Badge variant="default" className="text-sm animate-pulse">
                          Featured Project
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <Button asChild className="btn-animate group">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="outline" asChild className="btn-animate group">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </header>

            <Separator className="my-8" />

            {/* Project Info Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 animate-stagger">
              {/* Project Details */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.timeline && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Timeline
                      </h4>
                      <p className="font-semibold">{project.timeline}</p>
                    </div>
                  )}
                  {project.team && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Team Size
                      </h4>
                      <p className="font-semibold">{project.team}</p>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        My Role
                      </h4>
                      <p className="font-semibold">{project.role}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-primary" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="tech-stack-item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              {project.metrics && (
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Key Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(project.metrics).map(([key, value], index) => (
                        <div key={key} className="animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                          <h4 className="font-medium text-sm text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="font-semibold text-primary">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Responsibilities */}
              {project.responsibilities && (
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="h-5 w-5 text-primary" />
                      Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {project.responsibilities.slice(0, 4).map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-2 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Project Overview */}
            {project.overview && (
              <Card className="animate-content-reveal card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {project.overview}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Features Grid */}
            {project.features && project.features.length > 0 && (
              <Card className="animate-content-reveal card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-300 animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Challenges & Solutions */}
            {(project.challenges || project.solutions) && (
              <div className="grid lg:grid-cols-2 gap-6 animate-stagger">
                {project.challenges && (
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertTriangle className="h-5 w-5" />
                        Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3 animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground leading-relaxed">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {project.solutions && (
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        Solutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-3 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground leading-relaxed">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Related Projects */}
            <div className="border-t pt-8 animate-content-reveal">
              <h3 className="text-2xl font-bold mb-6 text-center">Explore More Projects</h3>
              <div className="flex justify-center">
                <Button asChild variant="outline" className="btn-animate group">
                  <Link to="/projects">
                    View All Projects
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}