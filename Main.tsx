import React from 'react'
import { PaperProvider } from 'react-native-paper';
import App from 'screens/App';
import { registerRootComponent } from 'expo';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  )
}

registerRootComponent(Main)