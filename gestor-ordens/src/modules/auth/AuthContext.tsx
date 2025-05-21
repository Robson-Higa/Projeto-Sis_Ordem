// src/modules/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../../services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import * as authService from './authService';

type UserData = {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'user' | 'establishment';
};

interface AuthContextProps {
  user: UserData | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  register(name: string, email: string, password: string, role: UserData['role']): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        if (snap.exists()) {
          setUser({ uid: currentUser.uid, ...snap.data() } as UserData);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    const userData = await authService.login(email, password);
    setUser(userData as UserData);
  }

  async function register(name: string, email: string, password: string, role: UserData['role']) {
    const userData = await authService.register(name, email, password, role);
    setUser(userData as UserData);
  }

  function logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
