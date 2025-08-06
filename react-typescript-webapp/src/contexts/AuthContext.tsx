/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

// 1. Define interfaces
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// 2. Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 3. Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check session or local storage for user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  });

  // Login function to set user and authentication state
  const login = (userData: User) => {
    setUser(userData);
    // Set token to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function to clear user and authentication state
  const logout = () => {
    setUser(null);
    // Clear token from localStorage
    localStorage.removeItem("user");
  };

  const value = {
    isAuthenticated:!!user,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Create a custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
