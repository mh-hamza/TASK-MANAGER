import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default app;


const FirebaseContext = createContext()

const auth = getAuth(app);
const db = getFirestore(app)
export const FirebaseProvider = ({children })=>{

  const [currentUser, setCurrentUser] = useState(null);

  const verifyUser = () => {
   onAuthStateChanged(auth,(user) => {
      if (user) {
        setCurrentUser(user); 
        // console.log(user)
      } else {
        setCurrentUser(null); 
      }
    });
  };

  useEffect(()=>{
    verifyUser()
  },[])

 return (
    <FirebaseContext.Provider value={{ auth, currentUser, db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = ()=> useContext(FirebaseContext)