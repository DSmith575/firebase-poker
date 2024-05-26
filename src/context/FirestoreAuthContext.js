import { createContext, useContext, useEffect, useState } from 'react';
import { signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const UserContext = createContext();

const useUserAuth = () => {
  return useContext(UserContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const signInAnonUser = () => {
    return signInAnonymously(auth);
  };

  // Using logout over signOut as it was causing a recursive loop
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setUser(currentUser.uid) : setUser(null);
    });
  }, []);

  return <UserContext.Provider value={{ signInAnonUser, logout, user }}>{children}</UserContext.Provider>;
};

export { AuthContextProvider, useUserAuth };
