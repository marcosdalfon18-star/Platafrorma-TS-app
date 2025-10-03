import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, addDoc, setDoc } from 'firebase/firestore';
import { User } from '../types';

export async function getUserByUid(uid: string): Promise<User | null> {
  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return {
      id: uid,
      email: userDoc.data().email ?? '',
      role: userDoc.data().role ?? '',
      name: userDoc.data().name ?? '',
      companyId: userDoc.data().companyId ?? undefined,
    };
  }
  return null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const userByEmailQuery = query(collection(db, 'users'), where('email', '==', email));
  const userByEmailSnapshot = await getDocs(userByEmailQuery);
  if (!userByEmailSnapshot.empty) {
    const docSnap = userByEmailSnapshot.docs[0];
    return {
      id: docSnap.id,
      email: docSnap.data().email ?? '',
      role: docSnap.data().role ?? '',
      name: docSnap.data().name ?? '',
      companyId: docSnap.data().companyId ?? undefined,
    };
  }
  return null;
}

export async function getAllUsers(): Promise<User[]> {
  const usersSnap = await getDocs(collection(db, 'users'));
  return usersSnap.docs.map(doc => ({
    id: doc.id,
    email: doc.data().email ?? '',
    role: doc.data().role ?? '',
    name: doc.data().name ?? '',
    companyId: doc.data().companyId ?? undefined,
  }));
}

export async function addUser(user: Omit<User, 'id'>): Promise<User> {
  const docRef = await addDoc(collection(db, 'users'), user);
  return { ...user, id: docRef.id };
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
  await setDoc(doc(db, 'users', id), data, { merge: true });
}
