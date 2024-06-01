import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBwqgURUytaLCKtJafZCU96gUhtO4ZF2L8',
  authDomain: 'slex-24459.firebaseapp.com',
  projectId: 'slex-24459',
  storageBucket: 'slex-24459.appspot.com',
  messagingSenderId: '307297616571',
  appId: '1:307297616571:web:ee25fe5cc030dbf8fc1f9e',
  measurementId: 'G-FMZKHXNJZH',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const analytics = getAnalytics(app);
