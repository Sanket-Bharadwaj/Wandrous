import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Plus, 
  Globe,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: string;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingTour({ isOpen, onClose, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslation();

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to TravelList! 🌍',
      description: 'Your premium travel companion for tracking dreams, planning adventures, and celebrating memories.',
      icon: Globe,
    },
    {
      id: 'add-destination',
      title: 'Add Your Dream Destinations',
      description: 'Start by adding places you want to visit. Use the "Add Destination" button to create your first entry.',
      icon: Plus,
      action: 'Try adding a destination now!',
    },
    {
      id: 'track-progress',
      title: 'Track Your Journey',
      description: 'Mark destinations as Wishlist, Planned, or Visited. Watch your travel progress grow over time.',
      icon: TrendingUp,
    },
    {
      id: 'explore-features',
      title: 'Explore Premium Features',
      description: 'Change languages, switch themes, export your data, and customize your experience.',
      icon: Settings,
    },
    {
      id: 'start-journey',
      title: 'Ready to Explore? ✈️',
      description: 'Your travel bucket list awaits! Start planning your next adventure and make your dreams reality.',
      icon: MapPin,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
      <Card className="w-full max-w-lg card-premium animate-scale-in">
        <CardHeader className="text-center relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={skipTour}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>
          
          <CardTitle className="text-xl font-bold">
            {step.title}
          </CardTitle>
          
          <CardDescription className="text-center">
            {step.description}
          </CardDescription>
          
          {step.action && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm font-medium text-primary">
                💡 {step.action}
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep 
                    ? 'bg-primary' 
                    : index < currentStep 
                      ? 'bg-primary/60' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>

            <Button
              className="btn-hero"
              onClick={nextStep}
            >
              {currentStep === steps.length - 1 ? (
                'Get Started!'
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button
              onClick={skipTour}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip tour
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function useOnboarding() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem('travellist_onboarding_completed') === 'true';
  });

  const completeOnboarding = () => {
    localStorage.setItem('travellist_onboarding_completed', 'true');
    setHasSeenOnboarding(true);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('travellist_onboarding_completed');
    setHasSeenOnboarding(false);
  };

  return {
    hasSeenOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
}