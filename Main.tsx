import React from 'react'
import { PaperProvider } from 'react-native-paper';
import App from 'screens/App';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { FontProvider } from 'context/FontProvider';
import { store } from 'reducers/store';

export default function Main() {
  return (
    <Provider store={ store }>
      <PaperProvider>
        <FontProvider>
          <App />
        </FontProvider>
      </PaperProvider>
    </Provider>
    
  )
}

registerRootComponent(Main)