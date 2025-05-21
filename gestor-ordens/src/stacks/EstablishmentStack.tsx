// src/stacks/EstablishmentStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EstablishmentDashboard from '../modules/dashboard/EstablishmentDashboard';
import OrderList from '../modules/orders/OrderList';

const Stack = createNativeStackNavigator();

export default function EstablishmentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Painel" component={EstablishmentDashboard} />
      <Stack.Screen name="Ordens" component={OrderList} />
    </Stack.Navigator>
  );
}
