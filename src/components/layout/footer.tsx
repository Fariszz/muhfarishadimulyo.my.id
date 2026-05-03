import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { personalInfo } from '@/content/personal-info';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left space-y-3">
            <p className="text-sm text-muted-foreground">
              © 2024 {personalInfo.name}. All rights reserved.
            </p>
            <nav aria-label="Footer" className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/projects" className="hover:text-primary transition-colors">
                Software engineering projects
              </Link>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Software engineering blog
              </Link>
              <Link to="/experience" className="hover:text-primary transition-colors">
                Professional engineering experience
              </Link>
            </nav>
          </div>
          
          <div className="flex justify-center space-x-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            {personalInfo.twitter && (
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
