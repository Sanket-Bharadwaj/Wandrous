import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { 
  TrendingUp, 
  MapPin, 
  Globe, 
  Award,
  Target,
  Calendar,
  Trophy
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      const savedDestinations = localStorage.getItem(`destinations_${user.id}`);
      if (savedDestinations) {
        setDestinations(JSON.parse(savedDestinations));
      }
    }
  }, [user, navigate]);

  if (!user) return null;

  // Calculate statistics
  const stats = {
    total: destinations.length,
    visited: destinations.filter(d => d.status === 'visited').length,
    planned: destinations.filter(d => d.status === 'planned').length,
    wishlist: destinations.filter(d => d.status === 'wishlist').length,
  };

  const visitedCountries = [...new Set(destinations.filter(d => d.status === 'visited').map(d => d.country))];
  const plannedCountries = [...new Set(destinations.filter(d => d.status === 'planned').map(d => d.country))];
  
  // Mock continent data (in real app, this would be calculated from country data)
  const continentStats = [
    { name: 'Asia', visited: 3, total: 48, color: 'bg-travel-ocean' },
    { name: 'Europe', visited: 2, total: 44, color: 'bg-travel-teal' },
    { name: 'North America', visited: 1, total: 23, color: 'bg-travel-sage' },
    { name: 'South America', visited: 0, total: 12, color: 'bg-travel-sunset' },
    { name: 'Africa', visited: 0, total: 54, color: 'bg-travel-gold' },
    { name: 'Oceania', visited: 0, total: 14, color: 'bg-primary' },
    { name: 'Antarctica', visited: 0, total: 1, color: 'bg-secondary' },
  ];

  const totalCountriesInWorld = 195;
  const overallProgress = Math.round((visitedCountries.length / totalCountriesInWorld) * 100);
  const continentsVisited = continentStats.filter(c => c.visited > 0).length;

  // Achievement system
  const achievements = [
    {
      id: 'first-country',
      title: t('progress.firstCountry'),
      description: 'Visit your first country',
      unlocked: visitedCountries.length >= 1,
      icon: MapPin,
      color: 'text-success bg-success/20',
    },
    {
      id: 'continent-explorer',
      title: t('progress.continentExplorer'),
      description: 'Visit 3 different continents',
      unlocked: continentsVisited >= 3,
      icon: Globe,
      color: 'text-primary bg-primary/20',
    },
    {
      id: 'world-traveler',
      title: t('progress.worldTraveler'),
      description: 'Visit 25 countries',
      unlocked: visitedCountries.length >= 25,
      icon: Trophy,
      color: 'text-travel-gold bg-travel-gold/20',
    },
    {
      id: 'planning-master',
      title: 'Planning Master',
      description: 'Have 10 planned destinations',
      unlocked: stats.planned >= 10,
      icon: Target,
      color: 'text-travel-teal bg-travel-teal/20',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {t('progress.overall')} 📊
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your travel achievements and milestones
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="card-premium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>{t('progress.overall')}</span>
            </CardTitle>
            <CardDescription>
              Your journey across the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {visitedCountries.length} / {totalCountriesInWorld}
                </div>
                <p className="text-muted-foreground">Countries Visited</p>
                <ProgressBar value={overallProgress} className="mt-4" />
                <p className="text-sm text-muted-foreground mt-2">
                  {overallProgress}% of the world explored
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-success">
                    {stats.visited}
                  </div>
                  <p className="text-sm text-muted-foreground">Visited</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-primary">
                    {stats.planned}
                  </div>
                  <p className="text-sm text-muted-foreground">Planned</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {stats.wishlist}
                  </div>
                  <p className="text-sm text-muted-foreground">Wishlist</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-xl">
                  <div className="text-2xl font-bold text-travel-teal">
                    {continentsVisited}
                  </div>
                  <p className="text-sm text-muted-foreground">Continents</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress by Continent */}
        <Card className="card-premium mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-travel-teal" />
              <span>{t('progress.byContinent')}</span>
            </CardTitle>
            <CardDescription>
              Explore each continent of our planet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {continentStats.map((continent) => (
                <div key={continent.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${continent.color}`} />
                      <span className="font-medium">{continent.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {continent.visited} / {continent.total}
                    </span>
                  </div>
                  <ProgressBar 
                    value={(continent.visited / continent.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-travel-gold" />
              <span>{t('progress.achievements')}</span>
            </CardTitle>
            <CardDescription>
              Milestones and accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    achievement.unlocked
                      ? 'bg-muted/30 border-border'
                      : 'bg-muted/10 border-muted opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.unlocked ? achievement.color : 'bg-muted/30 text-muted-foreground'
                    }`}>
                      <achievement.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {achievement.title}
                        </h4>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="text-xs">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {achievements.filter(a => a.unlocked).length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No achievements yet
                </h3>
                <p className="text-muted-foreground">
                  Start traveling to unlock your first achievements!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {destinations.length > 0 && (
          <Card className="card-premium mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-travel-sunset" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your latest travel updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destinations
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((destination) => (
                    <div key={destination.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        destination.status === 'visited' ? 'bg-success' :
                        destination.status === 'planned' ? 'bg-primary' :
                        'bg-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {destination.status === 'visited' ? 'Visited' :
                           destination.status === 'planned' ? 'Planned trip to' :
                           'Added to wishlist'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {destination.name}, {destination.country}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(destination.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Progress;