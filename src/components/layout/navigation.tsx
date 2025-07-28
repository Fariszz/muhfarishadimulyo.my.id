import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-500 ease-out">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
          >
            <Code2 className="h-6 w-6 transition-all duration-300 group-hover:text-primary group-hover:rotate-12" />
            <span className="font-bold text-xl transition-all duration-300 group-hover:text-primary">
              Muhammad Faris
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-primary relative group nav-link",
                  location.pathname === item.href
                    ? "text-primary active"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ease-out",
                    location.pathname === item.href 
                      ? "w-full" 
                      : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <Menu 
                  className={cn(
                    "h-5 w-5 transition-all duration-300 ease-out",
                    isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                  )} 
                />
                <X 
                  className={cn(
                    "h-5 w-5 absolute inset-0 transition-all duration-300 ease-out",
                    isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                  )} 
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-out",
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-primary hover:bg-muted/50 rounded-md transform",
                  location.pathname === item.href
                    ? "text-primary bg-muted/50"
                    : "text-muted-foreground",
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                )}
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}