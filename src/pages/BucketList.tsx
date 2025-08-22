import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  DollarSign,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Check,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const BucketList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [newDestination, setNewDestination] = useState({
    name: '',
    country: '',
    bestTime: '',
    budget: '',
    priority: 'medium',
    notes: '',
    status: 'wishlist',
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      // Load destinations from localStorage
      const savedDestinations = localStorage.getItem(`destinations_${user.id}`);
      if (savedDestinations) {
        setDestinations(JSON.parse(savedDestinations));
      }
      // Removed sample destinations - start completely fresh
    }
  }, [user, navigate]);

  const saveDestinations = (updatedDestinations) => {
    setDestinations(updatedDestinations);
    localStorage.setItem(`destinations_${user.id}`, JSON.stringify(updatedDestinations));
  };

  const handleAddDestination = () => {
    if (!newDestination.name || !newDestination.country) return;

    const destination = {
      ...newDestination,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updatedDestinations = [...destinations, destination];
    saveDestinations(updatedDestinations);
    
    setNewDestination({
      name: '',
      country: '',
      bestTime: '',
      budget: '',
      priority: 'medium',
      notes: '',
      status: 'wishlist',
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateDestination = (id, updates) => {
    const updatedDestinations = destinations.map(dest =>
      dest.id === id ? { ...dest, ...updates } : dest
    );
    saveDestinations(updatedDestinations);
  };

  const handleDeleteDestination = (id) => {
    const updatedDestinations = destinations.filter(dest => dest.id !== id);
    saveDestinations(updatedDestinations);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || dest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'visited': return 'text-success bg-success/20';
      case 'planned': return 'text-primary bg-primary/20';
      default: return 'text-muted-foreground bg-muted/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {t('nav.bucketList')} 🌍
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your travel dreams and adventures
            </p>
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="btn-hero">
                <Plus className="h-4 w-4 mr-2" />
                {t('destination.addNew')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{t('destination.addNew')}</DialogTitle>
                <DialogDescription>
                  Add a new destination to your travel bucket list
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('destination.name')}</Label>
                    <Input
                      id="name"
                      value={newDestination.name}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Tokyo, Paris, Bali..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">{t('destination.country')}</Label>
                    <Input
                      id="country"
                      value={newDestination.country}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="Japan, France, Indonesia..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bestTime">{t('destination.bestTime')}</Label>
                    <Input
                      id="bestTime"
                      value={newDestination.bestTime}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, bestTime: e.target.value }))}
                      placeholder="March-May"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">{t('destination.budget')}</Label>
                    <Input
                      id="budget"
                      value={newDestination.budget}
                      onChange={(e) => setNewDestination(prev => ({ ...prev, budget: e.target.value }))}
                      placeholder="$2000-3000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">{t('destination.priority')}</Label>
                    <Select
                      value={newDestination.priority}
                      onValueChange={(value) => setNewDestination(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newDestination.status}
                      onValueChange={(value) => setNewDestination(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wishlist">Wishlist</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="visited">Visited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">{t('destination.notes')}</Label>
                  <Textarea
                    id="notes"
                    value={newDestination.notes}
                    onChange={(e) => setNewDestination(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Personal notes about this destination..."
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  {t('common.cancel')}
                </Button>
                <Button onClick={handleAddDestination} className="btn-hero">
                  {t('destination.save')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              <SelectItem value="wishlist">Wishlist</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="visited">Visited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="card-destination">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{destination.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{destination.country}</span>
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>
                      {destination.status}
                    </span>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUpdateDestination(destination.id, { status: 'visited' })}>
                          <Check className="h-4 w-4 mr-2" />
                          {t('destination.markVisited')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          {t('destination.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteDestination(destination.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          {t('destination.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {destination.bestTime && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{destination.bestTime}</span>
                  </div>
                )}

                {destination.budget && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>{destination.budget}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className={`h-4 w-4 ${getPriorityColor(destination.priority)}`} />
                    <span className={`capitalize ${getPriorityColor(destination.priority)}`}>
                      {destination.priority} Priority
                    </span>
                  </div>
                </div>

                {destination.notes && (
                  <p className="text-sm text-muted-foreground mt-3 p-3 bg-muted/30 rounded-lg">
                    {destination.notes}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            {searchQuery || filterStatus !== 'all' ? (
              // No results found state
              <>
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No destinations found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
              </>
            ) : destinations.length === 0 ? (
              // Empty state for new users
              <div className="py-8">
                <div className="mb-8 animate-fade-in">
                  <div className="relative inline-block mb-6">
                    <Globe className="h-20 w-20 text-primary mx-auto animate-float" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-travel-teal rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✈️</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Start Your Travel Adventure! 🌍
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Create your personalized travel bucket list. Add destinations you dream of visiting, 
                    plan future trips, and track your incredible journey around the world.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-sm">
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <MapPin className="h-6 w-6 text-success mx-auto mb-2" />
                      <p className="font-medium">Mark as Visited</p>
                      <p className="text-muted-foreground">Celebrate places you've been</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="font-medium">Plan Your Trips</p>
                      <p className="text-muted-foreground">Organize upcoming adventures</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <Globe className="h-6 w-6 text-travel-teal mx-auto mb-2" />
                      <p className="font-medium">Dream & Explore</p>
                      <p className="text-muted-foreground">Build your wishlist</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  size="lg"
                  className="btn-hero"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Your First Destination
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default BucketList;