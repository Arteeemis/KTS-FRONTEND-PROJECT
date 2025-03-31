// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCikTYhNEpkHoyrWkPvqb01EaU8gIiLs1A',
  authDomain: 'kts-frontend-project.firebaseapp.com',
  projectId: 'kts-frontend-project',
  storageBucket: 'kts-frontend-project.firebasestorage.app',
  messagingSenderId: '368221037168',
  appId: '1:368221037168:web:5d9998beac2fc4f3530ab5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
