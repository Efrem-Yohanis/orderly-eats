import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types/restaurant';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  waiter: { id: 'w1', name: 'Sarah Johnson', role: 'waiter' },
  kitchen: { id: 'k1', name: 'Kitchen Display', role: 'kitchen' },
  chef: { id: 'c1', name: 'Marco Rossi', role: 'chef' },
  manager: { id: 'm1', name: 'Alex Thompson', role: 'manager' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
