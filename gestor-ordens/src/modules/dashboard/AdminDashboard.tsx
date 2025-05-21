// src/modules/dashboard/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { fetchOrders, fetchTechnicians } from '../../services/firestoreService';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const userOrders = await fetchOrders(user.uid);
        setOrders(userOrders);

        const allTechnicians = await fetchTechnicians();
        setTechnicians(allTechnicians);
      }
    };

    getData();
  }, [user]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Painel do Administrador</Text>
      <Text>Total de Ordens: {orders.length}</Text>
      <Text>Total de Técnicos: {technicians.length}</Text>

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
