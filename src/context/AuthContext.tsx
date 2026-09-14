import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, UserRole } from "../types";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string; user?: AuthUser; message?: string }>;
  register: (params: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: UserRole;
  }) => Promise<{ success: boolean; error?: string; user?: AuthUser; message?: string }>;
  logout: () => void;
  clearError: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setToken(session.access_token);
        setUser({
          id: session.user.id || `user-${Date.now()}`,
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          role: session.user.user_metadata?.role || "CLIENT",
          company: session.user.user_metadata?.company || "My Company",
          permissions: [],
          token: session.access_token || "",
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setToken(session.access_token);
        setUser({
          id: session.user.id || `user-${Date.now()}`,
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "User",
          email: session.user.email || "",
          role: session.user.user_metadata?.role || "CLIENT",
          company: session.user.user_metadata?.company || "My Company",
          permissions: [],
          token: session.access_token || "",
        });
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["x-auth-token"] = token;
    }
    return headers;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      if (!data?.user) {
        return { success: false, error: "Authentication failed. No user record returned." };
      }
      
      const authUser: AuthUser = {
        id: data.user.id || `user-${Date.now()}`,
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
        email: data.user.email || "",
        role: data.user.user_metadata?.role || "CLIENT",
        company: data.user.user_metadata?.company || "My Company",
        permissions: [],
        token: "",
      };

      return { success: true, user: authUser };
    } catch (err: any) {
      const errorMsg = err.message || "Network connection failed during authentication.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (params: {
    name: string;
    email: string;
    password: string;
    company?: string;
    role?: UserRole;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            name: params.name,
            company: params.company,
            role: params.role || "CLIENT",
          },
        },
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      if (!data?.user) {
        return { success: false, error: "Signup successful but no user returned. Check email for confirmation." };
      }
      
      if (!data.session) {
        return { success: true, user: undefined, message: "Please check your email to verify your account before logging in." };
      }

      const authUser: AuthUser = {
        id: data.user.id || `user-${Date.now()}`,
        name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "User",
        email: data.user.email || "",
        role: data.user.user_metadata?.role || "CLIENT",
        company: data.user.user_metadata?.company || "My Company",
        permissions: [],
        token: "",
      };
      return { success: true, user: authUser };
    } catch (err: any) {
      const errorMsg = err.message || "Network connection failed during registration.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setToken(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
