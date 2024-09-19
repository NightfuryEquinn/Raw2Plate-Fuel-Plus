import { auth, storage } from "config/firebaseInstance";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { FirebaseStorage } from "firebase/storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type FirebaseContextType = {
  isAuth: boolean,
  user: any,
  authInit: Auth
  storageInit: FirebaseStorage
}

type FirebaseProviderProps = {
  children: ReactNode
}

const FirebaseContext = createContext<FirebaseContextType | undefined>( undefined )

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [ user, setUser ] = useState<any>( null )
  const [ isAuth, setIsAuth ] = useState<any>( undefined )

  useEffect(() => {
    const unsub = onAuthStateChanged( auth, ( user ) => {
      if ( user ) {
        setIsAuth( true )
        setUser( user )
      } else {
        setIsAuth( false )
        setUser( null )
      }
    })

    return unsub
  }, [])
  
  return (
    <FirebaseContext.Provider value={{ 
      isAuth: isAuth, 
      user: user,
      authInit: auth, 
      storageInit: storage 
    }}>
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