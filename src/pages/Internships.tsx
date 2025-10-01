import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Calendar, Clock, DollarSign, Users, BookOpen } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import InternshipCard from '@/components/Cards/InternshipCard';
import ApplicationDialog from '@/components/ApplicationDialog';
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
    skills: ['JavaScript', 'React', 'Python', 'GCP'],
    requirements: 'Currently pursuing Computer Science degree, 3.0+ GPA, experience with web technologies',
    responsibilities: 'Develop scalable backend services, optimize video streaming infrastructure, collaborate on API design',
    benefits: 'Health insurance, free meals, gym membership, $8000/month stipend',
    applicationDeadline: '2024-03-15',
    startDate: '2024-06-01'
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
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    requirements: 'Design portfolio, experience with design tools, user-centered design principles',
    responsibilities: 'Create wireframes and prototypes, conduct user research, collaborate with product teams',
    benefits: 'Housing stipend, transportation, mentorship program, $7500/month',
    applicationDeadline: '2024-02-28',
    startDate: '2024-05-15'
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
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
    requirements: 'Statistics or Computer Science background, Python proficiency, SQL experience',
    responsibilities: 'Build predictive models, analyze user engagement metrics, present insights to stakeholders',
    benefits: 'Professional development budget, networking events, $8500/month',
    applicationDeadline: '2024-03-01',
    startDate: '2024-06-15'
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
    skills: ['Swift', 'Kotlin', 'React Native', 'Mobile UI'],
    requirements: 'Mobile development experience, iOS or Android knowledge, CS degree in progress',
    responsibilities: 'Implement new features, optimize app performance, participate in code reviews',
    benefits: 'Device allowance, commuter benefits, career coaching, $8000/month',
    applicationDeadline: '2024-03-10',
    startDate: '2024-06-01'
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
    skills: ['Data Analysis', 'Market Research', 'Excel', 'Presentation'],
    requirements: 'Business or Media Studies background, analytical skills, presentation experience',
    responsibilities: 'Research content trends, prepare executive briefings, support acquisition decisions',
    benefits: 'Industry networking, exclusive screenings, mentorship, $6500/month',
    applicationDeadline: '2024-02-20',
    startDate: '2024-05-20'
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
    skills: ['Audio Processing', 'Python', 'Machine Learning', 'DSP'],
    requirements: 'Audio engineering or CS background, signal processing knowledge, Python skills',
    responsibilities: 'Develop audio algorithms, improve recommendation systems, research new technologies',
    benefits: 'Relocation assistance, language lessons, cultural immersion, €4500/month',
    applicationDeadline: '2024-03-05',
    startDate: '2024-06-10'
  },
  {
    id: '7',
    company: 'Apple',
    logo: 'AP',
    role: 'iOS Developer Intern',
    location: 'Cupertino, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Join the iOS team to work on next-generation mobile experiences. Contribute to apps used by millions of users worldwide.',
    skills: ['Swift', 'UIKit', 'SwiftUI', 'Xcode'],
    requirements: 'iOS development experience, Swift proficiency, published apps preferred',
    responsibilities: 'Develop iOS applications, implement new features, optimize user interfaces',
    benefits: 'Employee discounts, wellness programs, career development, $9000/month',
    applicationDeadline: '2024-03-20',
    startDate: '2024-06-05'
  },
  {
    id: '8',
    company: 'Google',
    logo: 'GG',
    role: 'Cloud Infrastructure Intern',
    location: 'Mountain View, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Work with Google Cloud Platform team on large-scale infrastructure projects. Help build the future of cloud computing.',
    skills: ['Kubernetes', 'Docker', 'Go', 'Cloud Architecture'],
    requirements: 'Distributed systems knowledge, container experience, cloud platform familiarity',
    responsibilities: 'Design cloud solutions, improve infrastructure reliability, contribute to open source',
    benefits: 'Free meals, shuttle service, learning stipend, $9500/month',
    applicationDeadline: '2024-03-12',
    startDate: '2024-06-03'
  },
  {
    id: '9',
    company: 'Microsoft',
    logo: 'MS',
    role: 'AI Research Intern',
    location: 'Redmond, WA',
    duration: '3 months',
    type: 'Paid',
    description: 'Join our AI research team to work on cutting-edge machine learning projects. Contribute to research that shapes the future of AI.',
    skills: ['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'],
    requirements: 'ML research experience, PhD student preferred, published papers a plus',
    responsibilities: 'Conduct AI research, publish findings, collaborate with research teams',
    benefits: 'Research publication support, conference attendance, $8800/month',
    applicationDeadline: '2024-02-25',
    startDate: '2024-05-25'
  },
  {
    id: '10',
    company: 'Tesla',
    logo: 'TS',
    role: 'Autonomous Driving Intern',
    location: 'Palo Alto, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Work on self-driving car technology and contribute to the future of transportation. Join our autopilot team.',
    skills: ['Computer Vision', 'Deep Learning', 'C++', 'ROS'],
    requirements: 'Robotics or ML background, computer vision experience, C++ proficiency',
    responsibilities: 'Develop perception algorithms, improve autonomous navigation, test vehicle systems',
    benefits: 'Stock options, vehicle discounts, innovation culture, $8500/month',
    applicationDeadline: '2024-03-08',
    startDate: '2024-06-12'
  },
  {
    id: '11',
    company: 'Airbnb',
    logo: 'AB',
    role: 'Full Stack Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Build features that help millions of travelers find their perfect stays. Work across our entire technology stack.',
    skills: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    requirements: 'Full stack development experience, React knowledge, database familiarity',
    responsibilities: 'Develop web applications, build APIs, improve user experience',
    benefits: 'Travel credits, team retreats, flexible work, $7800/month',
    applicationDeadline: '2024-03-18',
    startDate: '2024-06-08'
  },
  {
    id: '12',
    company: 'Stripe',
    logo: 'ST',
    role: 'Fintech Engineer Intern',
    location: 'Remote',
    duration: '3 months',
    type: 'Paid',
    description: 'Help build the financial infrastructure for the internet. Work on payment systems used by millions of businesses.',
    skills: ['Ruby', 'Go', 'API Design', 'Payments'],
    requirements: 'Backend development experience, API knowledge, financial systems interest',
    responsibilities: 'Build payment features, improve API reliability, enhance security systems',
    benefits: 'Home office setup, learning budget, mentorship, $8200/month',
    applicationDeadline: '2024-03-22',
    startDate: '2024-06-01'
  },
  {
    id: '13',
    company: 'Uber',
    logo: 'UB',
    role: 'Product Management Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Drive product strategy for mobility and delivery platforms. Work with cross-functional teams to launch new features.',
    skills: ['Product Strategy', 'Analytics', 'SQL', 'User Research'],
    requirements: 'Business or Engineering background, analytical thinking, product sense',
    responsibilities: 'Define product requirements, analyze user metrics, coordinate feature launches',
    benefits: 'Ride credits, meal allowances, networking events, $7500/month',
    applicationDeadline: '2024-03-15',
    startDate: '2024-06-05'
  },
  {
    id: '14',
    company: 'Slack',
    logo: 'SL',
    role: 'Frontend Developer Intern',
    location: 'Remote',
    duration: '4 months',
    type: 'Paid',
    description: 'Build user interfaces for the collaboration platform used by millions of teams worldwide.',
    skills: ['React', 'TypeScript', 'CSS', 'Redux'],
    requirements: 'Frontend development experience, React knowledge, design sensibility',
    responsibilities: 'Develop UI components, improve user experience, optimize performance',
    benefits: 'Remote work stipend, learning resources, team events, $7800/month',
    applicationDeadline: '2024-03-20',
    startDate: '2024-06-10'
  },
  {
    id: '15',
    company: 'Salesforce',
    logo: 'SF',
    role: 'Cloud Solutions Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Work on CRM solutions that power businesses globally. Focus on cloud architecture and enterprise software.',
    skills: ['Salesforce', 'Apex', 'Lightning', 'CRM'],
    requirements: 'Business systems knowledge, Salesforce interest, problem-solving skills',
    responsibilities: 'Build custom solutions, integrate third-party systems, support clients',
    benefits: 'Certification training, mentorship program, $8000/month',
    applicationDeadline: '2024-03-18',
    startDate: '2024-06-08'
  },
  {
    id: '16',
    company: 'Adobe',
    logo: 'AD',
    role: 'UX Design Intern',
    location: 'San Jose, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Design creative tools used by millions of artists and designers worldwide. Work on Creative Cloud products.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Testing'],
    requirements: 'Design portfolio, UX principles knowledge, creative software experience',
    responsibilities: 'Create user flows, design interfaces, conduct usability testing',
    benefits: 'Creative software access, portfolio review, $7200/month',
    applicationDeadline: '2024-03-25',
    startDate: '2024-06-15'
  },
  {
    id: '17',
    company: 'Twitch',
    logo: 'TW',
    role: 'Gaming Platform Intern',
    location: 'Seattle, WA',
    duration: '3 months',
    type: 'Paid',
    description: 'Build features for the world\'s leading live streaming platform for gamers and creators.',
    skills: ['Node.js', 'WebRTC', 'Video Streaming', 'React'],
    requirements: 'Full-stack development, streaming technology interest, gaming knowledge',
    responsibilities: 'Develop streaming features, optimize video quality, enhance creator tools',
    benefits: 'Gaming equipment, creator meetups, flexible hours, $8100/month',
    applicationDeadline: '2024-03-12',
    startDate: '2024-06-03'
  },
  {
    id: '18',
    company: 'Shopify',
    logo: 'SH',
    role: 'E-commerce Engineer Intern',
    location: 'Toronto, Canada',
    duration: '4 months',
    type: 'Paid',
    description: 'Help merchants build their online stores. Work on the platform that powers over 1 million businesses.',
    skills: ['Ruby on Rails', 'GraphQL', 'E-commerce', 'APIs'],
    requirements: 'Web development experience, e-commerce interest, Ruby knowledge preferred',
    responsibilities: 'Build merchant tools, improve checkout experience, integrate payment systems',
    benefits: 'Work visa support, health benefits, learning budget, CAD $6500/month',
    applicationDeadline: '2024-03-08',
    startDate: '2024-05-28'
  },
  {
    id: '19',
    company: 'Discord',
    logo: 'DS',
    role: 'Backend Systems Intern',
    location: 'Remote',
    duration: '3 months',
    type: 'Paid',
    description: 'Scale communication infrastructure for millions of users. Work on real-time messaging systems.',
    skills: ['Python', 'Go', 'Redis', 'PostgreSQL'],
    requirements: 'Backend development, distributed systems knowledge, database experience',
    responsibilities: 'Optimize message delivery, improve server performance, build scalable APIs',
    benefits: 'Gaming perks, remote setup, community access, $8300/month',
    applicationDeadline: '2024-03-30',
    startDate: '2024-06-12'
  },
  {
    id: '20',
    company: 'Figma',
    logo: 'FG',
    role: 'Design Tools Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Build the future of collaborative design. Work on tools used by millions of designers worldwide.',
    skills: ['JavaScript', 'WebGL', 'Design Systems', 'Canvas API'],
    requirements: 'Frontend development, design tool experience, graphics programming interest',
    responsibilities: 'Develop design features, optimize canvas performance, build collaboration tools',
    benefits: 'Design conference tickets, portfolio support, $8400/month',
    applicationDeadline: '2024-03-28',
    startDate: '2024-06-18'
  },
  {
    id: '21',
    company: 'TikTok',
    logo: 'TT',
    role: 'Algorithm Engineer Intern',
    location: 'Los Angeles, CA',
    duration: '4 months',
    type: 'Paid',
    description: 'Work on recommendation algorithms that serve content to billions of users globally.',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Big Data'],
    requirements: 'ML background, algorithm knowledge, data structures proficiency',
    responsibilities: 'Improve recommendation systems, analyze user behavior, optimize content delivery',
    benefits: 'Creator fund access, content creation tools, $8600/month',
    applicationDeadline: '2024-03-14',
    startDate: '2024-06-01'
  },
  {
    id: '22',
    company: 'Zoom',
    logo: 'ZM',
    role: 'Video Technology Intern',
    location: 'San Jose, CA',
    duration: '3 months',
    type: 'Paid',
    description: 'Enhance video conferencing technology that connects the world. Work on video quality and performance.',
    skills: ['C++', 'WebRTC', 'Video Codecs', 'Network Protocols'],
    requirements: 'Systems programming, video technology interest, C++ proficiency',
    responsibilities: 'Optimize video quality, reduce latency, implement new features',
    benefits: 'Video equipment, flexible work, professional development, $7900/month',
    applicationDeadline: '2024-03-16',
    startDate: '2024-06-07'
  }
];

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [interestedInternships, setInterestedInternships] = useState<Set<string>>(new Set());
  const [selectedInternship, setSelectedInternship] = useState<typeof mockInternships[0] | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
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
                  {['All', 'Remote', 'San Francisco', 'New York', 'Los Angeles', 'Stockholm', 'Cupertino', 'Mountain View', 'Redmond', 'Palo Alto', 'Menlo Park'].map((location) => (
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
                <div key={internship.id} onClick={() => setSelectedInternship(internship)} className="cursor-pointer">
                  <InternshipCard
                    {...internship}
                    isInterested={interestedInternships.has(internship.id)}
                    onInterestClick={handleInterestClick}
                  />
                </div>
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

          {/* Internship Detail Modal */}
          <Dialog open={!!selectedInternship} onOpenChange={() => setSelectedInternship(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedInternship && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {selectedInternship.logo}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedInternship.role}</h2>
                        <p className="text-lg text-muted-foreground">{selectedInternship.company}</p>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{selectedInternship.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{selectedInternship.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <Badge variant="secondary">{selectedInternship.type}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date:</span>
                            <span>{selectedInternship.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Deadline:</span>
                            <span className="text-red-600 font-medium">{selectedInternship.applicationDeadline}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedInternship.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Benefits & Compensation
                        </h3>
                        <p className="text-sm text-muted-foreground">{selectedInternship.benefits}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">About This Role</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selectedInternship.description}
                        </p>
                      </div>

                      {/* Requirements */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Requirements
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selectedInternship.requirements}
                        </p>
                      </div>

                      {/* Responsibilities */}
                      <div className="glass-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Key Responsibilities
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {selectedInternship.responsibilities}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t">
                    <Button
                      variant={interestedInternships.has(selectedInternship.id) ? "default" : "hero"}
                      className="flex-1"
                      onClick={() => handleInterestClick(selectedInternship.id, !interestedInternships.has(selectedInternship.id))}
                    >
                      {interestedInternships.has(selectedInternship.id) ? "✓ Interested" : "I'm Interested"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setApplicationDialogOpen(true);
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Application Dialog */}
          {selectedInternship && (
            <ApplicationDialog
              open={applicationDialogOpen}
              onOpenChange={setApplicationDialogOpen}
              internship={selectedInternship}
              onSuccess={() => {
                toast({
                  title: "Success!",
                  description: "Your application has been submitted",
                });
              }}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Internships;