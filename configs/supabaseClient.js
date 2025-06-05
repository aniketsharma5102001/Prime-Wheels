// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
//   authDomain: "prime-wheels.firebaseapp.com",
//   projectId: "prime-wheels",
//   storageBucket: "prime-wheels.firebasestorage.app",
//   messagingSenderId: "211690643844",
//   appId: "1:211690643844:web:dbe0a82fda0a97a6d23dd1",
//   measurementId: "G-6HJ1EWWTLW"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage=getStorage(app);




import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
