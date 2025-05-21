// src/modules/auth/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import * as service from './authService';

type UserData = {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'technician' | 'user' | 'establishment';
};

interface AuthContextData {
  user: UserData | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  register(name: string, email: string, password: string, role: UserData['role']): Promise<void>;
  logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        const snap = await getDoc(doc(db, 'users', currentUser.uid));
        if (snap.exists()) {
          const data = snap.data() as UserData;
          setUser({ uid: currentUser.uid, ...data });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const user = await service.login(email, password);
    setUser(user as UserData);
    setLoading(false);
  }

  async function register(name: string, email: string, password: string, role: UserData['role']) {
    setLoading(true);
    const newUser = await service.register(name, email, password, role);
    setUser(newUser as UserData);
    setLoading(false);
  }

  function logout() {
    firebaseSignOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
