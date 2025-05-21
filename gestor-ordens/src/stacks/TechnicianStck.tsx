// src/stacks/TechnicianStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TechnicianDashboard from '../modules/dashboard/TechnicianDashboard';
import ServiceDetail from '../modules/orders/ServiceDetail';

const Stack = createNativeStackNavigator();

export default function TechnicianStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Painel" component={TechnicianDashboard} />
      <Stack.Screen name="Detalhes do Serviço" component={ServiceDetail} />
    </Stack.Navigator>
  );
}
