import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Register() {
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ confirm, setConfirm ] = useState( "" )
  const [ username, setUsername ] = useState( "" )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  return (
    <SafeAreaView style={ s.container }>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View>
          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <ScrollView showsVerticalScrollIndicator={ false }>
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

              <LinedTextField 
                name="password" 
                placeholder="Confirm Password" 
                secure={ true } 
                text={ confirm } 
                setText={ setConfirm } 
              />

              <LinedTextField 
                name="alternate-email" 
                placeholder="Username" 
                secure={ true } 
                text={ username } 
                setText={ setUsername } 
              />

              <Spacer size={ 10 } />

              <Text style={ s.subLeft }>You can add more information to your profile later for better recipe suggestion.</Text>

              <Spacer size={ 20 } />
            </ScrollView>
          </KeyboardAvoidingView>

          <RoundedBorderButton
            onPress={ () => console.log( "Pressed" ) }
            text="Start Exploring!"
            color={ LightMode.yellow }
            textColor={ LightMode.white }
            borderRadius={ 10 }
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
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
  "subLeft": {
    fontFamily: "cantarell",
    fontSize: 12,
    marginBottom: 20,
    color: LightMode.black
  }
})