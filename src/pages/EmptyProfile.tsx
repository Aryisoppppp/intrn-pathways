import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, User, Briefcase, ArrowRight } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';

const EmptyProfile = () => {
  return (
    <PageLayout isAuthenticated={true}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Background Elements */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl float"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" style={{ animationDelay: '2s' }}></div>
            
            {/* Main Content */}
            <div className="relative z-10 glass-card p-12 rounded-3xl">
              {/* Hello Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <span className="text-2xl mr-2">👋</span>
                HELLO!
              </div>

              {/* Main Message */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                You have got no
                <span className="text-gradient block mt-2">
                  user details saved yet.
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Create your profile to start discovering amazing internship opportunities 
                and connect with top companies looking for talented students like you.
              </p>

              {/* Action Button */}
              <Link to="/profile">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto mb-8">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Profile
                </Button>
              </Link>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="p-6 rounded-xl bg-background/20 border border-border/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 mx-auto">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Add your skills, education, and experience to stand out to employers
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background/20 border border-border/30">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-4 mx-auto">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Find Internships</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse hundreds of internship opportunities from top companies
                  </p>
                </div>
              </div>

              {/* CTA Footer */}
              <div className="mt-12 pt-8 border-t border-border/30">
                <p className="text-muted-foreground mb-4">
                  Ready to take the next step in your career?
                </p>
                <Link 
                  to="/internships" 
                  className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
                >
                  Explore Internships
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmptyProfile;