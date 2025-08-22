import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { OnboardingTour, useOnboarding } from '@/components/OnboardingTour';
import { 
  MapPin, 
  Plus, 
  TrendingUp, 
  Globe, 
  Calendar,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState([]);
  const { hasSeenOnboarding, completeOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const savedDestinations = localStorage.getItem(`destinations_${user.id}`);
      if (savedDestinations) {
        setDestinations(JSON.parse(savedDestinations));
      }
      
      // Show onboarding for new users with no destinations
      if (!hasSeenOnboarding) {
        const timer = setTimeout(() => setShowOnboarding(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, navigate, hasSeenOnboarding]);

  if (!user) {
    return null;
  }

  // Calculate statistics from actual user data
  const stats = {
    total: destinations.length,
    visited: destinations.filter(d => d.status === 'visited').length,
    planned: destinations.filter(d => d.status === 'planned').length,
    wishlist: destinations.filter(d => d.status === 'wishlist').length,
  };

  const progressPercentage = stats.total > 0 ? Math.round((stats.visited / stats.total) * 100) : 0;

  // Get real recent destinations or empty array
  const recentDestinations = destinations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user.name}! ✈️
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to plan your next adventure?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="card-premium hover:shadow-travel">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-primary" />
                <span>{t('dashboard.quickAdd')}</span>
              </CardTitle>
              <CardDescription>
                Add a new destination to your bucket list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="btn-hero w-full"
                onClick={() => navigate('/bucket-list')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {t('dashboard.addDestination')}
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover:shadow-travel">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-travel-teal" />
                <span>{t('dashboard.stats')}</span>
              </CardTitle>
              <CardDescription>
                Track your travel progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="btn-secondary w-full"
                onClick={() => navigate('/progress')}
              >
                <Target className="h-4 w-4 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t('dashboard.countriesVisited')}
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {stats.visited}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t('dashboard.countriesPlanned')}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stats.planned}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Total Destinations
                  </p>
                  <p className="text-2xl font-bold text-travel-teal">
                    {stats.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-travel-teal/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-travel-teal" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Progress
                  </p>
                  <p className="text-2xl font-bold text-travel-sunset">
                    {progressPercentage}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-travel-sunset/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-travel-sunset" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Destinations */}
        {recentDestinations.length > 0 ? (
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{t('dashboard.recentlyAdded')}</span>
              </CardTitle>
              <CardDescription>
                Your latest travel destinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDestinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        destination.status === 'visited' ? 'bg-success' :
                        destination.status === 'planned' ? 'bg-primary' :
                        'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">
                          {destination.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {destination.country}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium capitalize ${
                        destination.status === 'visited' ? 'text-success' :
                        destination.status === 'planned' ? 'text-primary' :
                        'text-muted-foreground'
                      }`}>
                        {destination.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(destination.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/bucket-list')}
                >
                  View All Destinations
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Welcome to Wondrous!</span>
              </CardTitle>
              <CardDescription>
                Start your travel journey today
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="mb-6">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-float" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Ready to explore the world? 🌍
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add your first destination to start tracking your travel dreams!
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  className="btn-hero w-full"
                  onClick={() => navigate('/bucket-list')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Destination
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowOnboarding(true)}
                  className="w-full"
                >
                  Take a Quick Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Onboarding Tour */}
        <OnboardingTour
          isOpen={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onComplete={() => {
            completeOnboarding();
            setShowOnboarding(false);
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;