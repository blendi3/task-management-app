import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  AuthError,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  signup: (
    email: string,
    password: string,
    displayName: string,
    avatar: any
  ) => Promise<UserCredential>;
  login: (
    email: string,
    password: string,
    remember: boolean
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = (
    email: string,
    password: string,
    displayName: string,
    avatar: any
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        return updateProfile(result.user, {
          displayName: displayName,
          photoURL: avatar,
        }).then(() => {
          return result;
        });
      }
    );
  };

  const login = async (
    email: string,
    password: string,
    remember: boolean
  ): Promise<UserCredential> => {
    const persistenceType = remember
      ? browserLocalPersistence
      : browserSessionPersistence;

    try {
      await setPersistence(auth, persistenceType);
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      throw error as AuthError;
    }
  };
  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
