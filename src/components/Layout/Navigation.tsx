import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, User, Settings, LogOut, Menu, X, FileText } from 'lucide-react';
import intrLogo from '@/assets/intrn-logo.png';
import NotificationBell from '@/components/NotificationBell';

interface NavigationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isAuthenticated = false, onLogout }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-card border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={intrLogo} 
              alt="INTRN Logo" 
              className="h-8 w-8 transition-transform group-hover:scale-110"
            />
            <span className="text-gradient text-2xl font-bold tracking-tight">
              INTRN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/internships" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/internships') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Internships</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/applications" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive('/applications') 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Applications</span>
                </Link>
                <Link 
                  to="/profile" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive('/profile') 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/settings" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive('/settings') 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <NotificationBell />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <Link 
                to="/internships" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase className="h-4 w-4" />
                <span>Internships</span>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/applications" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Applications</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      onLogout?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="hero" className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;