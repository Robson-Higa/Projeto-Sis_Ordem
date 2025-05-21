// src/modules/dashboard/UserDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { fetchOrders } from '../../services/firestoreService';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        const userOrders = await fetchOrders(user.uid);
        setOrders(userOrders);
      }
    };

    getOrders();
  }, [user]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Minhas Ordens</Text>
      <Text>Total de Ordens: {orders.length}</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Ordem ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Descrição: {item.description}</Text>
          </View>
        )}
      />

      <Button title="Sair" onPress={logout} />
    </View>
  );
}
