import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Briefcase } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';

const Home = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Launch Your Career
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Perfect
            <span className="text-gradient block mt-2">
              Internship
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies, gain real-world experience, and kickstart your career with INTRN - 
            the platform that bridges students and opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/internships">
              <Button variant="glass" size="lg" className="text-lg px-8 py-4 h-auto">
                Browse Internships
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1000+ Students</h3>
              <p className="text-muted-foreground">Connected with opportunities</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 text-accent mb-4">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">500+ Internships</h3>
              <p className="text-muted-foreground">Across all industries</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">95% Success Rate</h3>
              <p className="text-muted-foreground">Students finding placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">INTRN</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make finding internships simple, efficient, and rewarding for students everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Matching",
                description: "Our algorithm matches you with internships that fit your skills and career goals.",
                icon: "🎯"
              },
              {
                title: "Top Companies",
                description: "Work with industry leaders from tech, finance, healthcare, and more.",
                icon: "🏢"
              },
              {
                title: "Easy Applications",
                description: "Apply to multiple internships with just a few clicks using your profile.",
                icon: "⚡"
              },
              {
                title: "Career Growth",
                description: "Build your professional network and gain valuable work experience.",
                icon: "📈"
              },
              {
                title: "Mentorship",
                description: "Get guidance from industry professionals and experienced mentors.",
                icon: "👥"
              },
              {
                title: "Success Stories",
                description: "Join thousands of students who launched their careers through INTRN.",
                icon: "⭐"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-8 text-center rounded-2xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join INTRN today and take the first step towards your dream career.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="lg" className="text-lg px-12 py-4 h-auto">
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;