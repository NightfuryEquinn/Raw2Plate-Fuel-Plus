import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { Image, Text, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Reset() {
  const [ email, setEmail ] = useState( "" )
  const [ timer, setTimer ] = useState( 0 )
  const [ resend, setResend ] = useState( false )

  const sendEmail = () => {
    setTimer( 60 )
    setResend( false )
  }

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
    } else {
      setResend( true )
    }
  }, [ timer ])
  
  return (
    <SafeAreaView style={ s.container }>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View>
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

            <Spacer size={ 100 } />
          </ScrollView>
          
          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
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
                  onPress={ () => sendEmail() }
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
  "subLeft": {
    fontFamily: "cantarell",
    fontSize: 12,
    marginBottom: 20
  },
  "blue": {
    color: LightMode.blue
  }
})