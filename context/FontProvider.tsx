import React, { createContext, ReactNode, useContext } from "react"
import { useFonts } from 'expo-font';
import { Cantarell_400Regular as cantarell } from '@expo-google-fonts/cantarell';
import { FjallaOne_400Regular as fjalla } from '@expo-google-fonts/fjalla-one';

type FontContextType = {
  fontsLoaded: boolean
}

type FontProviderProps = {
  children: ReactNode
}

const FontContext = createContext<FontContextType | undefined>( undefined )

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [ fontsLoaded ] = useFonts({
    cantarell,
    fjalla
  })

  if ( !fontsLoaded ) {
    return null
  }

  return(
    <FontContext.Provider value={{ fontsLoaded }}>
      { children }
    </FontContext.Provider>
  )
}

export const useFontFromContext = (): FontContextType => {
  const context = useContext( FontContext )

  if ( !context ) {
    throw new Error( "useFont must be used within a FontProvider." )
  }

  return context
}