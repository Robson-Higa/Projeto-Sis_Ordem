import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import AdminStack from './AdminStack';
import TechnicianStack from './TechnicianStack';
import UserStack from './UserStack';
import EstablishmentStack from './EstablishmentStack';
import AuthStack from './AuthStack'; // Tela de login

const Routes = () => {
  const { role } = useAuth();

  if (!role) return <AuthStack />;

  switch (role) {
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
};

export default () => (
  <NavigationContainer>
    <Routes />
  </NavigationContainer>
);
