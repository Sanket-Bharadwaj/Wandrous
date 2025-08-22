import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { 
  User, 
  Globe, 
  Palette, 
  Download, 
  Upload,
  Save,
  Camera,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const languageOptions = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const themeOptions = [
    { value: 'light', label: t('settings.light'), icon: Sun },
    { value: 'dark', label: t('settings.dark'), icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      updateProfile(profileData);
      toast({
        title: t('common.success'),
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    const destinations = localStorage.getItem(`destinations_${user?.id}`) || '[]';
    const userData = {
      user: user,
      destinations: JSON.parse(destinations),
      exportDate: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `travellist-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: t('common.success'),
      description: 'Data exported successfully',
    });
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.destinations && Array.isArray(data.destinations)) {
          localStorage.setItem(`destinations_${user?.id}`, JSON.stringify(data.destinations));
          toast({
            title: t('common.success'),
            description: 'Data imported successfully. Refresh to see changes.',
          });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        toast({
          title: t('common.error'),
          description: 'Invalid file format',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <Navigation />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {t('nav.settings')} ⚙️
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>{t('settings.profile')}</span>
              </CardTitle>
              <CardDescription>
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="bg-primary/20 text-primary text-lg">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <Button 
                onClick={handleProfileUpdate}
                disabled={isLoading}
                className="btn-hero"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? t('common.loading') : t('common.save')}
              </Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-travel-teal" />
                <span>{t('settings.language')}</span>
              </CardTitle>
              <CardDescription>
                Choose your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {languageOptions.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={i18n.language === lang.code ? "default" : "outline"}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className="flex flex-col items-center space-y-2 h-auto p-4"
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-travel-sunset" />
                <span>{t('settings.theme')}</span>
              </CardTitle>
              <CardDescription>
                Customize your visual experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={theme === option.value ? "default" : "outline"}
                    onClick={() => setTheme(option.value as any)}
                    className="flex items-center justify-start space-x-3 h-auto p-4"
                  >
                    <option.icon className="h-5 w-5" />
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5 text-travel-gold" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>
                Export and import your travel data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Download your complete travel data as a JSON file
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Import Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Upload a previously exported JSON file
                  </p>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                    <p className="text-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">User ID</p>
                    <p className="text-foreground font-mono text-sm">
                      {user.id}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Language</p>
                    <p className="text-foreground">
                      {languageOptions.find(lang => lang.code === i18n.language)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Theme Preference</p>
                    <p className="text-foreground capitalize">
                      {theme}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;