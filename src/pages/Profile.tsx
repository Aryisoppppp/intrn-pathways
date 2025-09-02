import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Phone, Mail, Plus, X, Upload, GraduationCap } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2025',
    bio: 'Passionate computer science student with experience in full-stack development and machine learning. Looking for internship opportunities to apply my skills in real-world projects.',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'SQL'],
    newSkill: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (profileData.newSkill.trim() && !profileData.skills.includes(profileData.newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data here if needed
  };

  return (
    <PageLayout isAuthenticated={true}>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Your <span className="text-gradient">Profile</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your information and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleSave}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="hero" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </div>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-muted-foreground mb-4">{profileData.major}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Class of {profileData.graduationYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={profileData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major</Label>
                    <Input
                      id="major"
                      value={profileData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      value={profileData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      disabled={!isEditing}
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">About Me</h3>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="bg-background/50 min-h-[120px]"
                  placeholder="Tell employers about yourself, your interests, and career goals..."
                />
              </div>

              {/* Skills */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.skills.map((skill, index) => (
                    <Badge 
                      key={index}
                      variant="secondary" 
                      className="bg-primary/10 text-primary flex items-center space-x-2 px-3 py-1"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button 
                          onClick={() => removeSkill(skill)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a skill..."
                      value={profileData.newSkill}
                      onChange={(e) => handleInputChange('newSkill', e.target.value)}
                      className="bg-background/50"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="icon" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Resume Upload */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Resume & Documents</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Upload your resume and other relevant documents
                  </p>
                  <Button variant="outline" disabled={!isEditing}>
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;