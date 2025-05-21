// src/stacks/UserStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboard from '../modules/dashboard/UserDashboard';
import NewOrderScreen from '../modules/orders/NewOrderScreen';
import FeedbackScreen from '../modules/feedback/FeedbackScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Minhas Ordens" component={UserDashboard} />
      <Stack.Screen name="Nova Ordem" component={NewOrderScreen} />
      <Stack.Screen name="Enviar Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
}
