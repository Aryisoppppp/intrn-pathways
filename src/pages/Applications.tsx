import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/Layout/PageLayout';
import { Briefcase, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  applied_at: string;
  cover_letter?: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }
    setUser(user);
    fetchApplications();
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'interview':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-500/10 text-yellow-500',
      reviewing: 'bg-blue-500/10 text-blue-500',
      interview: 'bg-purple-500/10 text-purple-500',
      accepted: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    };
    return variants[status] || variants.pending;
  };

  const filterApplications = (status?: string) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  if (loading) {
    return (
      <PageLayout isAuthenticated={true}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading applications...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isAuthenticated={true}>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              My <span className="text-gradient">Applications</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Track all your internship applications in one place
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{applications.length}</div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">
                  {filterApplications('pending').length}
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500">
                  {filterApplications('interview').length}
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {filterApplications('accepted').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="glass-card mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            {['all', 'pending', 'reviewing', 'interview', 'accepted', 'rejected'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-4">
                  {filterApplications(tab === 'all' ? undefined : tab).length === 0 ? (
                    <Card className="glass-card">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No applications found</h3>
                        <p className="text-muted-foreground mb-4">
                          Start applying to internships to see them here
                        </p>
                        <Button variant="hero" onClick={() => navigate('/internships')}>
                          Browse Internships
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    filterApplications(tab === 'all' ? undefined : tab).map((app) => (
                      <Card key={app.id} className="glass-card hover:shadow-2xl transition-all">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="mt-1">{getStatusIcon(app.status)}</div>
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold mb-1">{app.role}</h3>
                                <p className="text-muted-foreground mb-3">{app.company}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Applied {new Date(app.applied_at).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge className={getStatusBadge(app.status)}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Applications;