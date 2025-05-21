// src/modules/dashboard/TechnicianDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { fetchOrders } from '../../services/firestoreService';

export default function TechnicianDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        const technicianOrders = await fetchOrders(user.uid);
        setOrders(technicianOrders);
      }
    };

    getOrders();
  }, [user]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Painel do Técnico</Text>
      <Text>Total de Ordens Atribuídas: {orders.length}</Text>

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
