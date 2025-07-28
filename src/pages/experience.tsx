import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEOHead } from '@/components/seo/seo-head';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { experience } from '@/content/experience';
import { format, parseISO } from 'date-fns';

export function ExperiencePage() {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM yyyy');
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : new Date();
    
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                        (end.getMonth() - start.getMonth());
    
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
    }
  };

  return (
    <>
      <SEOHead
        title="Experience"
        description="My professional journey and the companies I've had the privilege to work with. Showcasing career progression and key achievements."
        keywords={['experience', 'career', 'professional', 'full stack developer', 'work history']}
        url="/experience"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6" />
          
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Experience</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the companies I've had the privilege to work with.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:transform md:-translate-x-px"></div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-1/2 md:transform md:-translate-x-1/2"></div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{exp.role}</h3>
                              <h4 className="text-lg text-primary font-medium">{exp.company}</h4>
                            </div>
                            {!exp.endDate && (
                              <Badge variant="default">Current</Badge>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>

                          <div>
                            <h5 className="font-medium mb-2">Key Achievements:</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium mb-2">Technologies:</h5>
                            <div className="flex flex-wrap gap-1">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className="mt-16 pt-8 border-t">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Technical Skills</h2>
              <p className="text-muted-foreground">
                Technologies and tools I've worked with throughout my career
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-3">
                  <h3 className="font-semibold">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'JavaScript', 'CSS', 'Tailwind CSS', 'Sass'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Tools & Cloud</h3>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'Git', 'Jest', 'Cypress', 'Storybook', 'Figma'].map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}