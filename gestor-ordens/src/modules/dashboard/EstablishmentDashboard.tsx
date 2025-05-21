// src/modules/dashboard/EstablishmentDashboard.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function EstablishmentDashboard() {
  const { logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Painel do Estabelecimento</Text>
      <Text>Ordens relacionadas: (futuro)</Text>

      <Button title="Sair" onPress={logout} />
    </View>
  );
}
