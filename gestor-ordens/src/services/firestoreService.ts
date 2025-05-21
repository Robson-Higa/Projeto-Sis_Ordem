// src/services/firestoreService.ts
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function fetchOrders(userId: string) {
  const ordersCollection = collection(db, 'orders');
  const q = query(ordersCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  const orders = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return orders;
}

export async function fetchTechnicians() {
  const techniciansCollection = collection(db, 'technicians');
  const querySnapshot = await getDocs(techniciansCollection);
  
  const technicians = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return technicians;
}
