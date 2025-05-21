// src/routes/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../modules/auth/AuthContext';
import AdminStack from '../stacks/AdminStack';
import TechnicianStack from '../stacks/TechnicianStck';
import UserStack from '../stacks/UserStack';
import EstablishmentStack from '../stacks/EstablishmentStack';
import AuthStack from '../stacks/AuthStack';

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <AuthStack />;

  switch (user.role) {
    case 'admin':
      return <AdminStack />;
    case 'technician':
      return <TechnicianStack />;
    case 'user':
      return <UserStack />;
    case 'establishment':
      return <EstablishmentStack />;
    default:
      return <AuthStack />;
  }
}
