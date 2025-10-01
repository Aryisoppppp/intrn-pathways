import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Loader2 } from 'lucide-react';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  internship: {
    id: string;
    company: string;
    role: string;
    description: string;
    requirements: string;
  };
  onSuccess: () => void;
}

const ApplicationDialog = ({ open, onOpenChange, internship, onSuccess }: ApplicationDialogProps) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const generateCoverLetter = async () => {
    setAiLoading(true);
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .single();

      const context = `
        Role: ${internship.role}
        Company: ${internship.company}
        Description: ${internship.description}
        Requirements: ${internship.requirements}
        
        My Background:
        Name: ${profileData?.first_name} ${profileData?.last_name}
        University: ${profileData?.university || 'Not specified'}
        Major: ${profileData?.major || 'Not specified'}
        Skills: ${profileData?.skills?.join(', ') || 'Not specified'}
        Bio: ${profileData?.bio || 'Not specified'}
      `;

      const { data, error } = await supabase.functions.invoke('ai-writing-assistant', {
        body: { type: 'cover_letter', context }
      });

      if (error) throw error;

      setCoverLetter(data.result);
      toast({
        title: "Cover letter generated!",
        description: "AI has created a personalized cover letter for you",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Error",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Cover letter required",
        description: "Please write or generate a cover letter",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('applications').insert({
        user_id: user.id,
        internship_id: internship.id,
        company: internship.company,
        role: internship.role,
        cover_letter: coverLetter,
        additional_notes: additionalNotes,
        status: 'pending'
      });

      if (error) throw error;

      // Create notification
      await supabase.from('notifications').insert({
        user_id: user.id,
        title: 'Application Submitted',
        message: `Your application for ${internship.role} at ${internship.company} has been submitted successfully!`,
        type: 'success',
        link: '/applications'
      });

      toast({
        title: "Application submitted!",
        description: "Your application has been sent successfully",
      });

      onSuccess();
      onOpenChange(false);
      setCoverLetter('');
      setAdditionalNotes('');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Apply for {internship.role}
          </DialogTitle>
          <p className="text-muted-foreground">{internship.company}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="cover-letter">Cover Letter *</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateCoverLetter}
                disabled={aiLoading}
                className="gap-2"
              >
                {aiLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter here..."
              className="min-h-[300px] bg-background/50"
              disabled={aiLoading}
            />
          </div>

          <div>
            <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
            <Textarea
              id="additional-notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any additional information you'd like to share..."
              className="min-h-[100px] bg-background/50"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={handleSubmit}
              disabled={loading || !coverLetter.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;