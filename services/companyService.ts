import { db } from './firebase';
import { collection, doc, getDoc, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { Company } from '../types';

export async function getCompanyById(id: string): Promise<Company | null> {
  const companyDocRef = doc(db, 'companies', id);
  const companyDoc = await getDoc(companyDocRef);
  if (companyDoc.exists()) {
    return {
      id,
      name: companyDoc.data().name ?? '',
      address: companyDoc.data().address ?? '',
      contact: companyDoc.data().contact ?? '',
      planId: companyDoc.data().planId ?? '',
      industry: companyDoc.data().industry ?? '',
      imageUrl: companyDoc.data().imageUrl ?? '',
      logoUrl: companyDoc.data().logoUrl ?? '',
      internalData: companyDoc.data().internalData ?? '',
    };
  }
  return null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const companiesSnap = await getDocs(collection(db, 'companies'));
  return companiesSnap.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name ?? '',
    address: doc.data().address ?? '',
    contact: doc.data().contact ?? '',
    planId: doc.data().planId ?? '',
    industry: doc.data().industry ?? '',
    imageUrl: doc.data().imageUrl ?? '',
    logoUrl: doc.data().logoUrl ?? '',
    internalData: doc.data().internalData ?? '',
  }));
}

export async function addCompany(company: Omit<Company, 'id'>): Promise<Company> {
  const docRef = await addDoc(collection(db, 'companies'), company);
  return { ...company, id: docRef.id };
}

export async function updateCompany(id: string, data: Partial<Company>): Promise<void> {
  await setDoc(doc(db, 'companies', id), data, { merge: true });
}
