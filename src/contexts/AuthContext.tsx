import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getUserByEmail, guruData } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  guruName: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guruName, setGuruName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'guru') {
        const guru = guruData.find(g => g.id_user === parsedUser.id_user);
        setGuruName(guru?.nama_guru || parsedUser.name);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = getUserByEmail(email);
    
    if (foundUser && foundUser.password === password) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      
      if (foundUser.role === 'guru') {
        const guru = guruData.find(g => g.id_user === foundUser.id_user);
        setGuruName(guru?.nama_guru || foundUser.name);
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setGuruName(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      guruName,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
