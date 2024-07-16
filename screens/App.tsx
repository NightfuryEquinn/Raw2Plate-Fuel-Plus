import { useFontFromContext } from 'context/FontProvider';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>Testing on navigation!</Text>
      <Text style={ styles.sub }>Testing on navigation! Jok</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  "container": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "text": {
    fontFamily: "fjalla"
  },
  "sub": {
    fontFamily: "cantarell"
  }
})

