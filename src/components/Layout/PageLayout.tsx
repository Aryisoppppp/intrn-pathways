import { ReactNode } from 'react';
import Navigation from './Navigation';

interface PageLayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const PageLayout = ({ children, isAuthenticated = false, onLogout }: PageLayoutProps) => {
  return (
    <div className="min-h-screen animated-bg">
      <Navigation isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;