import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HeroSection } from '@/components/HeroSection';
import { AuthModal } from '@/components/AuthModal';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  // Redirect logic moved to useEffect in individual protected pages
  // No need for useNavigate here since we'll handle this differently

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen">
      {user && <Navigation />}
      <HeroSection onGetStarted={handleGetStarted} />
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        defaultMode="register"
      />
    </div>
  );
};

export default Index;
