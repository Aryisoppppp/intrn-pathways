import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, GraduationCap, Plus, X, Upload, Loader2 } from 'lucide-react';
import PageLayout from '@/components/Layout/PageLayout';
import { useProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { profile, setProfile, loading, saving, saveProfile, userId } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [originalProfile, setOriginalProfile] = useState(profile);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const success = await saveProfile(profile);
    if (success) setIsEditing(false);
  };

  if (loading) {
    return (
      <PageLayout isAuthenticated={!!userId}>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!userId) {
    return (
      <PageLayout isAuthenticated={false}>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Please sign in to view your profile.</p>
        </div>
      </PageLayout>
    );
  }

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
                  <Button variant="outline" onClick={handleCancel} disabled={saving}>Cancel</Button>
                  <Button variant="hero" onClick={handleSave} disabled={saving}>
                    {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button variant="hero" onClick={handleEdit}>Edit Profile</Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold">
                    {(profile.firstName?.[0] || '?')}{(profile.lastName?.[0] || '')}
                  </div>
                  {isEditing && (
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}`.trim() : 'Your Name'}
                </h2>
                <p className="text-muted-foreground mb-4">{profile.major || 'Add your major'}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.email || 'No email'}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.graduationYear && (
                    <div className="flex items-center justify-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>Class of {profile.graduationYear}</span>
                    </div>
                  )}
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
                    <Input id="firstName" value={profile.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={profile.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Education</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input id="university" value={profile.university} onChange={(e) => handleInputChange('university', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major</Label>
                    <Input id="major" value={profile.major} onChange={(e) => handleInputChange('major', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input id="graduationYear" value={profile.graduationYear} onChange={(e) => handleInputChange('graduationYear', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input id="gpa" value={profile.gpa} onChange={(e) => handleInputChange('gpa', e.target.value)} disabled={!isEditing} className="bg-background/50" />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">About Me</h3>
                <Textarea value={profile.bio} onChange={(e) => handleInputChange('bio', e.target.value)} disabled={!isEditing} className="bg-background/50 min-h-[120px]" placeholder="Tell employers about yourself..." />
              </div>

              {/* Skills */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-6">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary flex items-center space-x-2 px-3 py-1">
                      <span>{skill}</span>
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {profile.skills.length === 0 && <p className="text-muted-foreground text-sm">No skills added yet.</p>}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input placeholder="Add a skill..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="bg-background/50" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
                    <Button onClick={addSkill} size="icon" variant="outline"><Plus className="h-4 w-4" /></Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
