import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Globe as GlobeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-world-map.jpg';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="World Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <div className="w-3 h-3 bg-travel-ocean rounded-full opacity-60" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 bg-travel-teal rounded-full opacity-70" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-4 h-4 bg-travel-sunset rounded-full opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-2xl mb-8">
            <GlobeIcon className="w-8 h-8 text-primary" />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="btn-hero group"
              onClick={onGetStarted}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-travel-ocean" />
              <span>195 Countries Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <GlobeIcon className="w-4 h-4 text-travel-teal" />
              <span>7 Continents to Explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-pulse-travel">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}