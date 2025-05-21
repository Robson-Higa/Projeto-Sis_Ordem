// src/modules/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../auth/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'technician' | 'admin' | 'establishment'>('user');

  async function handleRegister() {
    try {
      await register(name, email, password, role);
    } catch (err: any) {
      Alert.alert('Erro ao cadastrar', err.message);
    }
  }

  return (
    <View>
      <Text>Nome:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Senha:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Text>Tipo de Conta:</Text>
      <Picker selectedValue={role} onValueChange={(itemValue) => setRole(itemValue)}>
        <Picker.Item label="Usuário" value="user" />
        <Picker.Item label="Técnico" value="technician" />
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Estabelecimento" value="establishment" />
      </Picker>

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}
