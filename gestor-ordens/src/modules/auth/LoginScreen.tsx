import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../modules/auth/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert('Logado com sucesso!');
    } catch (err: any) {
      alert('Erro ao logar: ' + err.message);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Senha</Text>
      <TextInput value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
