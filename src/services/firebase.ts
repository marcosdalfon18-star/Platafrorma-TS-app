

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyD0rGSNBIZNosJA_0WAsoYxe-JbzzjDvz8",
	authDomain: "sosty-d1747.firebaseapp.com",
	databaseURL: "https://sosty-d1747-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "sosty-d1747",
	storageBucket: "sosty-d1747.firebasestorage.app",
	messagingSenderId: "268357868311",
	appId: "1:268357868311:web:06ded6470df7f282b63552",
	measurementId: "G-HFJ7JE13WV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export { onAuthStateChanged };
