import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Building } from 'lucide-react';

interface InternshipCardProps {
  id: string;
  company: string;
  logo: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  skills: string[];
  isInterested?: boolean;
  onInterestClick: (id: string, interested: boolean) => void;
}

const InternshipCard = ({
  id,
  company,
  logo,
  role,
  location,
  duration,
  type,
  description,
  skills,
  isInterested = false,
  onInterestClick
}: InternshipCardProps) => {
  return (
    <div className="glass-card p-6 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Company Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            {logo}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">{role}</h3>
            <p className="text-muted-foreground flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {company}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {type}
        </Badge>
      </div>

      {/* Details */}
      <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-3">
        {description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="text-xs bg-background/50"
          >
            {skill}
          </Badge>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant={isInterested ? "default" : "hero"}
          className="flex-1"
          onClick={() => onInterestClick(id, !isInterested)}
        >
          {isInterested ? "✓ Interested" : "I'm Interested"}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onInterestClick(id, false)}
        >
          Not For Me
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;