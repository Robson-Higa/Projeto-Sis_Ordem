// src/stacks/AdminStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../modules/dashboard/AdminDashboard';
import TechnicianDashboard from '../modules/dashboard/TechnicianDashboard';
import UserDashboard from '../modules/dashboard/UserDashboard';
import EstablishmentDashboard from '../modules/dashboard/EstablishmentDashboard';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={AdminDashboard} />
      <Stack.Screen name="Usuários" component={UserDashboard} />
      <Stack.Screen name="Técnicos" component={TechnicianDashboard} />
      <Stack.Screen name="Estabelecimentos" component={EstablishmentDashboard} />
    </Stack.Navigator>
  );
}
