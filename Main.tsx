import React from 'react'
import { PaperProvider } from 'react-native-paper';
import App from 'screens/App';
import { registerRootComponent } from 'expo';
import { FontProvider } from 'context/FontProvider';

export default function Main() {
  return (
    <PaperProvider>
      <FontProvider>
        <App />
      </FontProvider>
    </PaperProvider>
  )
}

registerRootComponent(Main)