import { FjallaOne_400Regular as fjalla } from '@expo-google-fonts/fjalla-one';
import { FiraSansCondensed_500Medium as fira } from "@expo-google-fonts/fira-sans-condensed"
import { useFonts } from 'expo-font';
import React, { createContext, ReactNode, useContext } from "react";

type FontContextType = {
  fontsLoaded: boolean
}

type FontProviderProps = {
  children: ReactNode
}

const FontContext = createContext<FontContextType | undefined>( undefined )

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [ fontsLoaded ] = useFonts({
    fjalla,
    fira
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
    throw new Error( "useFontFromContext must be used within a FontProvider." )
  }

  return context
}