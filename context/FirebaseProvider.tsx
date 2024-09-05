import { auth, storage } from "config/firebaseInstance";
import { Auth } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import { createContext, ReactNode, useContext } from "react";

type FirebaseContextType = {
  authInit: Auth
  storageInit: FirebaseStorage
}

type FirebaseProviderProps = {
  children: ReactNode
}

const FirebaseContext = createContext<FirebaseContextType | undefined>( undefined )

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ authInit: auth, storageInit: storage }}>
      { children }
    </FirebaseContext.Provider>
  )
}

export const useFirebaseFromContext = (): FirebaseContextType => {
  const context = useContext( FirebaseContext )

  if ( !context ) {
    throw new Error( "useFirebaseFromContext must be used within a FirebaseProvider." )
  }

  return context
}