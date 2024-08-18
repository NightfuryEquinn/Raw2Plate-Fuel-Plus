import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login( { navigation }: any ) {
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )

  const toRegister = () => {
    navigation.navigate( "Register" )
  }

  const toReset = () => {
    navigation.navigate( "Reset" )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={ false }>
            <Image 
              style={ s.image }
              source={ require( "../../assets/images/logos/white_no_text.png" ) } 
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

            <Pressable style={ s.minorWrapper } onPress={ () => toReset() }>
              <Text style={ s.minor }>Forgot Password?</Text>
            </Pressable>
          </ScrollView>

          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <Spacer size={ 20 } />

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

            { email ?
              <RoundedBorderButton
                onPress={ () => console.log( "Login" ) }
                icon="MA"
                name="account-circle"
                text="Proceed with Login"
                color={ LightMode.green }
                textColor={ LightMode.black }
                borderRadius={ 10 }
              />
              :
              <RoundedBorderButton
                onPress={ () => toRegister() }
                icon="MA"
                name="account-circle"
                text="Create New Account"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
              />
            }
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
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
    marginBottom: 5,
    color: LightMode.black
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: LightMode.black
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