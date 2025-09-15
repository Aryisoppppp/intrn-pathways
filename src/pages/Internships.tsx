import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import InternshipCard from '@/components/Cards/InternshipCard';
import { useToast } from '@/hooks/use-toast';

// Mock data for internships
const mockInternships = [
  {
    id: '1',
    company: 'YouTube',
    logo: 'YT',
    role: 'Software Engineer Intern',
    location: 'Remote',
    duration: '3 months',
    type: 'Paid',
    description: 'Join our platform engineering team to work on large-scale distributed systems that serve billions of users worldwide. You\'ll collaborate with senior engineers on critical infrastructure projects.',
    skills: ['JavaScript', 'React', 'Python', 'GCP']
  },
  {
    id: '2',
    company: 'Facebook',
    logo: 'FB',
    role: 'Product Design Intern',
    location: 'Menlo Park, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Work alongside our design team to create user experiences that connect billions of people. Focus on mobile and web interfaces for core Facebook products.',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems']
  },
  {
    id: '3',
    company: 'LinkedIn',
    logo: 'LI',
    role: 'Data Science Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Analyze user behavior data to improve recommendation algorithms and drive product decisions. Work with machine learning models and large datasets.',
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics']
  },
  {
    id: '4',
    company: 'Instagram',
    logo: 'IG',
    role: 'Mobile Engineering Intern',
    location: 'New York, NY',
    duration: '3 months',
    type: 'Paid',
    description: 'Develop features for the Instagram mobile app used by over 2 billion people. Work on iOS and Android platforms with cutting-edge technologies.',
    skills: ['Swift', 'Kotlin', 'React Native', 'Mobile UI']
  },
  {
    id: '5',
    company: 'Netflix',
    logo: 'NF',
    role: 'Content Strategy Intern',
    location: 'Los Angeles, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Support the content acquisition and strategy team in analyzing viewing trends and market opportunities for original and licensed content.',
    skills: ['Data Analysis', 'Market Research', 'Excel', 'Presentation']
  },
  {
    id: '6',
    company: 'Spotify',
    logo: 'SP',
    role: 'Audio Engineering Intern',
    location: 'Stockholm, Sweden',
    duration: '6 months',
    type: 'Paid',
    description: 'Work on audio processing algorithms and music recommendation systems. Contribute to the technology that powers music discovery for millions of users.',
    skills: ['Audio Processing', 'Python', 'Machine Learning', 'DSP']
  }
];

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [interestedInternships, setInterestedInternships] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleInterestClick = (id: string, interested: boolean) => {
    const newInterested = new Set(interestedInternships);
    if (interested) {
      newInterested.add(id);
      toast({
        title: "Interest marked!",
        description: "We've noted your interest in this internship.",
      });
    } else {
      newInterested.delete(id);
      toast({
        title: "Interest removed",
        description: "You can always change your mind later.",
      });
    }
    setInterestedInternships(newInterested);
  };

  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch = internship.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || locationFilter === 'all' || internship.location.includes(locationFilter);
    const matchesType = !typeFilter || typeFilter === 'all' || internship.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <PageLayout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Discover <span className="text-gradient">Internships</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find opportunities that match your skills and career goals
            </p>
          </div>

          {/* Search Bar */}
          <div className="glass-card p-6 rounded-xl mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search internships, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 text-lg h-12"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Location:</span>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Remote', 'San Francisco', 'New York', 'Los Angeles', 'Stockholm'].map((location) => (
                    <Button
                      key={location}
                      variant={locationFilter === (location === 'All' ? 'all' : location) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setLocationFilter(location === 'All' ? 'all' : location)}
                      className="h-8 px-3 text-xs"
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Type:</span>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Paid', 'Unpaid', 'Academic Credit'].map((type) => (
                    <Button
                      key={type}
                      variant={typeFilter === (type === 'All' ? 'all' : type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTypeFilter(type === 'All' ? 'all' : type)}
                      className="h-8 px-3 text-xs"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select defaultValue="relevant">
                <SelectTrigger className="w-32 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="company">Company Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Internship Grid */}
          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredInternships.map((internship) => (
                <InternshipCard
                  key={internship.id}
                  {...internship}
                  isInterested={interestedInternships.has(internship.id)}
                  onInterestClick={handleInterestClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">No internships found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setTypeFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Internships;