import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Plus, Globe, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: React.ElementType;
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon: Icon = MapPin 
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <Icon className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-float" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      </div>
      <Button 
        className="btn-hero"
        onClick={onAction}
      >
        <Plus className="h-4 w-4 mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
}

export function WelcomeEmptyState({ onAction }: { onAction: () => void }) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-16">
      <div className="mb-8 animate-fade-in">
        <div className="relative inline-block mb-6">
          <Globe className="h-20 w-20 text-primary mx-auto animate-float" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-travel-teal rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✈️</span>
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Welcome to Your Travel Journey! 🌍
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Ready to explore the world? Start by adding your first dream destination. 
          Track where you've been, plan where you're going, and dream about future adventures.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-sm">
          <div className="p-4 bg-muted/30 rounded-xl">
            <MapPin className="h-6 w-6 text-success mx-auto mb-2" />
            <p className="font-medium">Track Visited</p>
            <p className="text-muted-foreground">Mark destinations you've been to</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-medium">Plan Trips</p>
            <p className="text-muted-foreground">Organize your future travels</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl">
            <Globe className="h-6 w-6 text-travel-teal mx-auto mb-2" />
            <p className="font-medium">Dream Big</p>
            <p className="text-muted-foreground">Build your wishlist</p>
          </div>
        </div>
      </div>
      
      <Button 
        size="lg"
        className="btn-hero"
        onClick={onAction}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Your First Destination
      </Button>
    </div>
  );
}