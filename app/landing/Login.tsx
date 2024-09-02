import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Login( { navigation }: any ) {
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ loading, setLoading ] = useState( false )

  const toRegister = () => {
    navigation.navigate( "Register" )
  }

  const toReset = () => {
    navigation.navigate( "Reset" )
  }

  // TODO: Login user

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    loading ? <Loading /> :
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
              onPress={ () => {
                Alert.alert(
                  "Not yet available!",
                  "Apple authentication will be integrated in the future. Please use the default email-password sign-in method!",
                  [
                    { text: "I Understood", style: "default" },
                  ]
                )
              }}
              name="apple"
              text="Login with Apple"
              color={ LightMode.black }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />

            <Spacer size={ 25 } />

            <RoundedBorderButton
              onPress={ () => {
                Alert.alert(
                  "Not yet available!",
                  "Google authentication will be integrated in the future. Please use the default email-password sign-in method!",
                  [
                    { text: "I Understood", style: "default" },
                  ]
                )
              }}
              name="google"
              text="Login with Google"
              color={ LightMode.black }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />

            <Spacer size={ 25 } />

            { email ?
              <RoundedBorderButton
                onPress={ () => null }
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