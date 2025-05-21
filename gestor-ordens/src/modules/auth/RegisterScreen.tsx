// src/modules/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, Alert } from 'react-native';
import { useAuth } from './AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'technician' | 'user' | 'establishment'>('user');

  const handleRegister = async () => {
    try {
      await register(name, email, password, role);
      Alert.alert('Cadastro realizado com sucesso!');
    } catch (err: any) {
      Alert.alert('Erro ao cadastrar', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />

      <Text>Senha:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Text>Tipo de usuário:</Text>
      <Picker selectedValue={role} onValueChange={(value) => setRole(value)}>
        <Picker.Item label="Usuário" value="user" />
        <Picker.Item label="Técnico" value="technician" />
        <Picker.Item label="Estabelecimento" value="establishment" />
        <Picker.Item label="Administrador" value="admin" />
      </Picker>

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}
