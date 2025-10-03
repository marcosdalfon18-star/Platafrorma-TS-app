import { db } from './firebase';
import { collection, doc, getDoc, getDocs, addDoc, setDoc, query, where } from 'firebase/firestore';
import { Employee } from '../types';

export async function getEmployeeById(id: string): Promise<Employee | null> {
  const employeeDocRef = doc(db, 'employees', id);
  const employeeDoc = await getDoc(employeeDocRef);
  if (employeeDoc.exists()) {
    return {
      id,
      name: employeeDoc.data().name ?? '',
      positionId: employeeDoc.data().positionId ?? '',
      managerId: employeeDoc.data().managerId ?? null,
      status: employeeDoc.data().status ?? '',
      avatarUrl: employeeDoc.data().avatarUrl ?? '',
      companyId: employeeDoc.data().companyId ?? '',
      email: employeeDoc.data().email ?? '',
    };
  }
  return null;
}

export async function getEmployeesByCompany(companyId: string): Promise<Employee[]> {
  const q = query(collection(db, 'employees'), where('companyId', '==', companyId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name ?? '',
    positionId: doc.data().positionId ?? '',
    managerId: doc.data().managerId ?? null,
    status: doc.data().status ?? '',
    avatarUrl: doc.data().avatarUrl ?? '',
    companyId: doc.data().companyId ?? '',
    email: doc.data().email ?? '',
  }));
}

export async function getAllEmployees(): Promise<Employee[]> {
  const employeesSnap = await getDocs(collection(db, 'employees'));
  return employeesSnap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name ?? '',
    positionId: doc.data().positionId ?? '',
    managerId: doc.data().managerId ?? null,
    status: doc.data().status ?? '',
    avatarUrl: doc.data().avatarUrl ?? '',
    companyId: doc.data().companyId ?? '',
    email: doc.data().email ?? '',
  }));
}

export async function addEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
  const docRef = await addDoc(collection(db, 'employees'), employee);
  return { ...employee, id: docRef.id };
}

export async function updateEmployee(id: string, data: Partial<Employee>): Promise<void> {
  await setDoc(doc(db, 'employees', id), data, { merge: true });
}
