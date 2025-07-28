export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  published: boolean;
  heroImage?: string;
  Component?: React.ComponentType;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
  features?: string[];
  timeline?: string;
  team?: string;
  role?: string;
  responsibilities?: string[];
  metrics?: {
    [key: string]: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}