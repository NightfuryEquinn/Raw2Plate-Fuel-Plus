import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Text, Image, StyleSheet, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from 'react-native'
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
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
          <View>
            <Image 
              style={ s.image }
              source={ require( "../../assets/images/white_no_text.png" ) } 
            />

            <Text style={ s.heading }>Explore our Recipes</Text>
            <Text style={ s.sub }>With meal planner, calories tracker, grocery shopping and more!</Text>

            <LinedTextField 
              name="email" 
              placeholder="Email Address" 
              text={ email } 
              setText={ setEmail } 
            />

            <LinedTextField 
              name="password" 
              placeholder="Password" 
              secure={ true } 
              text={ password } 
              setText={ setPassword } 
            />

            <Pressable style={ s.minorWrapper } onPress={ () => console.log( "Pressed" ) }>
              <Text style={ s.minor }>Forgot Password?</Text>
            </Pressable>

            <RoundedBorderButton
              onPress={ () => console.log( "Pressed" ) }
              name="apple"
              text="Login with Apple"
              color={ LightMode.black }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />

            <Spacer size={ 25 } />

            <RoundedBorderButton
              onPress={ () => console.log( "Pressed" ) }
              name="google"
              text="Login with Google"
              color={ LightMode.black }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />

            <Spacer size={ 25 } />

            <RoundedBorderButton
              onPress={ () => console.log( "Pressed" ) }
              icon="MA"
              name="account-circle"
              text="Create New Account"
              color={ LightMode.yellow }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    marginVertical: "auto",
    padding: 30,
    backgroundColor: LightMode.white
  },
  "image": {
    height: 175,
    width: 175,
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
    marginBottom: 40,
  },
  "minor": {
    fontSize: 12,
    fontFamily: "cantarell",
    color: LightMode.black
  }
})