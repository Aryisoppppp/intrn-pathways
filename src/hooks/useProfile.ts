import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  graduationYear: string;
  gpa: string;
  bio: string;
  skills: string[];
}

const emptyProfile: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  university: '',
  major: '',
  graduationYear: '',
  gpa: '',
  bio: '',
  skills: [],
};

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setUserId(user.id);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setProfile({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          university: data.university || '',
          major: data.major || '',
          graduationYear: data.graduation_year || '',
          gpa: data.gpa || '',
          bio: data.bio || '',
          skills: data.skills || [],
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const saveProfile = async (data: ProfileData) => {
    if (!userId) return false;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        university: data.university,
        major: data.major,
        graduation_year: data.graduationYear,
        gpa: data.gpa,
        bio: data.bio,
        skills: data.skills,
      })
      .eq('id', userId);

    setSaving(false);

    if (error) {
      toast({
        title: 'Error saving profile',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }

    toast({
      title: 'Profile updated!',
      description: 'Your profile has been saved successfully.',
    });
    return true;
  };

  return { profile, setProfile, loading, saving, saveProfile, userId };
};
