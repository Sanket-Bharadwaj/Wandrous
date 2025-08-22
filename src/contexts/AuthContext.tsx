import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('travellist_user');
    const sessionUser = sessionStorage.getItem('travellist_user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
    
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('travellist_users') || '[]');
      if (existingUsers.find((u: User) => u.email === email)) {
        return false; // User already exists
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials (in real app, hash password)
      const userCredentials = {
        ...newUser,
        password, // In production, this should be hashed
      };

      existingUsers.push(userCredentials);
      localStorage.setItem('travellist_users', JSON.stringify(existingUsers));

      // Log in the user
      setUser(newUser);
      sessionStorage.setItem('travellist_user', JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('travellist_users') || '[]');
      const userCredentials = existingUsers.find((u: any) => u.email === email && u.password === password);

      if (!userCredentials) {
        return false; // Invalid credentials
      }

      const { password: _, ...user } = userCredentials; // Remove password from user object
      setUser(user);

      // Store session based on remember me preference
      if (rememberMe) {
        localStorage.setItem('travellist_user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('travellist_user', JSON.stringify(user));
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travellist_user');
    sessionStorage.removeItem('travellist_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // Update stored user data
    const storedUser = localStorage.getItem('travellist_user');
    const sessionUser = sessionStorage.getItem('travellist_user');
    
    if (storedUser) {
      localStorage.setItem('travellist_user', JSON.stringify(updatedUser));
    }
    if (sessionUser) {
      sessionStorage.setItem('travellist_user', JSON.stringify(updatedUser));
    }

    // Update in users array
    const existingUsers = JSON.parse(localStorage.getItem('travellist_users') || '[]');
    const userIndex = existingUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], ...data };
      localStorage.setItem('travellist_users', JSON.stringify(existingUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateProfile, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}