import React from 'react'
import { configureFonts, DefaultTheme, PaperProvider } from 'react-native-paper';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { FontProvider } from 'context/FontProvider';
import { store } from 'redux/reducers/store';
import AppStack from 'app/AppStack';
import { FirebaseProvider } from 'context/FirebaseProvider';

export default function App() {
  const fontConfig = {
    fontFamily: "cantarell"
  }

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts({ config: fontConfig })
  }

  return (
    <Provider store={ store }>
      <PaperProvider theme={ theme }>
        <FirebaseProvider>
          <FontProvider>
            <AppStack />
          </FontProvider>
        </FirebaseProvider>
      </PaperProvider>
    </Provider>
  )
}

registerRootComponent( App )