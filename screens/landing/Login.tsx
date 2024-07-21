import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Text, Image, StyleSheet, View, Pressable } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login() {
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <Image 
        style={ s.image }
        source={ require( "../../assets/images/white_no_text.png" ) } 
      />

      <Text style={ s.heading }>Explore our Recipes</Text>
      <Text style={ s.sub }>With meal planner, calories tracker, grocery shopping and more!</Text>

      <LinedTextField name="email" placeholder="Email Address" text={ email } setText={ setEmail } />
      <LinedTextField name="password" placeholder="Password" secure={ true } text={ password } setText={ setPassword } />

      <Button style={ s.minorWrapper } onPress={ () => console.log( "Pressed" ) }>
        <Text style={ s.minor }>Forgot Password?</Text>
      </Button>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 30,
    backgroundColor: LightMode.white
  },
  "image": {
    height: 125,
    width: 125,
    margin: 'auto'
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 5
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20
  },
  "minorWrapper": {
    marginLeft: "auto",
  },
  "minor": {
    fontSize: 12,
    fontFamily: "cantarell",
    color: LightMode.black
  }
})