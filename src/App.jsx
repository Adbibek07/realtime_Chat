import Button from "./components/Button";
import Channel from "./components/Channel";
// import.meta.env
// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
// import "firebase/auth";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }  
  };
  
  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) { 
      console.error(error);
    }
  };

  if (initializing) return "loading...";
  
return (
  <div className="min-h-screen bg-mist-300 flex items-center justify-center font-sans">
    {user ? (
      <div className="w-full max-w-3xl h-[90vh] max-h-[780px] bg-stone-200 border border-stone-400 rounded-2xl shadow-sm flex flex-col overflow-hidden">

        {/* Topbar */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <div>
              <p className="text-sm font-medium text-stone-800"># general</p>
              <p className="text-[11px] text-gray-600 leading-none mt-0.5">Live chat</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* User pill */}
            <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-full pl-1 pr-3 py-1">
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user.email}`}
                alt={user.displayName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-stone-500 max-w-[120px] truncate">
                {user.displayName || user.email}
              </span>
            </div>

            {/* Sign out */}
            <button
              onClick={signOutUser}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-400 border border-stone-200 bg-white rounded-lg px-3 h-8 hover:bg-stone-50 hover:text-stone-600 transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>

        {/* Chat channel */}
        <Channel user={user} db={db} />
      </div>

    ) : (
      /* Login card */
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-5 w-full max-w-sm">
        <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-medium text-stone-800">Welcome to chat</h1>
          <p className="text-sm text-stone-400 mt-1.5 leading-relaxed">
            Sign in to join the conversation
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2.5 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
        >
          {/* Google icon */}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    )}
  </div>
);
}
export default App;
