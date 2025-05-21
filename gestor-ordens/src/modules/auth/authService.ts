// src/modules/auth/authService.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

export async function register(
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'technician' | 'user' | 'establishment'
) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Salva dados no Firestore
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
