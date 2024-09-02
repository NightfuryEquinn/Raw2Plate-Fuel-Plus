import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Reset() {
  const [ email, setEmail ] = useState( "" )
  const [ timer, setTimer ] = useState( 0 )

  const sendEmail = () => {
    setTimer( 15 )
  }

  // TODO: Reset password

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    if ( timer > 0 ) {
      const interval = setInterval(() => {
        setTimer( timer - 1 )
      }, 1000)

      return () => clearInterval( interval )
    }
  }, [ timer ])
  
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

            <Spacer size={ 10 } />

            <Text style={ s.subLeft }>
              A verification link will be sent to your email for resetting your password. Do check your spam and junk email for confirmation.
            </Text>

            <Text style={ s.subLeft }>
              Didn't receive email?
              {
                timer !== 0 ? (
                  <Text style={ s.blue }> Resend in { timer }s.</Text>
                ) : (
                  <Text> Resend now.</Text>
                )
              }
              
            </Text>
          </ScrollView>
          
          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <Spacer size={ 20 } />
            {
              timer !== 0 ? (
                <RoundedBorderButton
                  onPress={ () => console.log( "Cooldown... Do nothing..." ) }
                  disabled={ true }
                  text="Cooldown..."
                  color={ LightMode.lightYellow }
                  textColor={ LightMode.white }
                  borderRadius={ 10 }
                />
              ) : (
                <RoundedBorderButton
                  onPress={ () => null }
                  text="Send Link"
                  color={ LightMode.yellow }
                  textColor={ LightMode.white }
                  borderRadius={ 10 }
                />
              )
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
  "subLeft": {
    fontFamily: "cantarell",
    fontSize: 12,
    marginBottom: 20,
    color: LightMode.black
  },
  "blue": {
    color: LightMode.blue
  }
})