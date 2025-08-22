import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  X, 
  Home, 
  Heart, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Globe, 
  Sun, 
  Moon, 
  Monitor,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/components/ThemeProvider';

const languageOptions = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const currentLanguage = languageOptions.find(lang => lang.code === i18n.language) || languageOptions[0];

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/bucket-list', icon: Heart, label: t('nav.bucketList') },
    { path: '/progress', icon: TrendingUp, label: t('nav.progress') },
    { path: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  // User check moved to App.tsx level - component now only renders when user exists

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="nav-premium fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                TravelList
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="space-x-2">
                    <span>{currentLanguage.flag}</span>
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="flex items-center space-x-3"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {theme === 'light' && <Sun className="h-4 w-4" />}
                    {theme === 'dark' && <Moon className="h-4 w-4" />}
                    {theme === 'system' && <Monitor className="h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>{t('settings.light')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>{t('settings.dark')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* GitHub Link */}
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href="https://github.com/Sanket-Bharadwaj" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>

              {/* Logout */}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">TravelList</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="flex-1 p-6 space-y-4">
                {navItems.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}

                <div className="border-t border-border pt-4 mt-6">
                  {/* Mobile Language Selector */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground px-4">
                      {t('settings.language')}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={i18n.language === lang.code ? "default" : "ghost"}
                          size="sm"
                          onClick={() => changeLanguage(lang.code)}
                          className="justify-start space-x-2"
                        >
                          <span>{lang.flag}</span>
                          <span className="text-xs">{lang.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Theme Selector */}
                  <div className="space-y-2 mt-4">
                    <h4 className="font-medium text-sm text-muted-foreground px-4">
                      {t('settings.theme')}
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        variant={theme === 'light' ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setTheme('light')}
                        className="flex-1"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setTheme('dark')}
                        className="flex-1"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-border space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a 
                    href="https://github.com/Sanket-Bharadwaj" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}