// src/modules/auth/authService.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function register(name: string, email: string, password: string, role: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email,
    role,
    createdAt: new Date(),
  });

  return {
    uid: user.uid,
    name,
    email,
    role,
  };
}

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const snap = await getDoc(doc(db, 'users', user.uid));
  if (!snap.exists()) throw new Error('Usuário não encontrado no Firestore');

  return {
    uid: user.uid,
    ...snap.data(),
  };
}
