import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
	apiKey: "AIzaSyBTKb0tgNQwbykTrVVZs0DFOH8Z3RcD8tk",
	authDomain: "housemarket-39ade.firebaseapp.com",
	projectId: "housemarket-39ade",
	storageBucket: "housemarket-39ade.appspot.com",
	messagingSenderId: "389848379356",
	appId: "1:389848379356:web:e4eb4f2b981afbbc52e919",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();