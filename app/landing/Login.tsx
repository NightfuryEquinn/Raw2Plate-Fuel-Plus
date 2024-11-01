import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFirebaseFromContext } from 'context/FirebaseProvider'
import { useFontFromContext } from 'context/FontProvider'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getTheUser } from 'redux/actions/userAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function Login( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )

  const { user, isAuth, authInit } = useFirebaseFromContext()

  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
 
  const toRegister = () => {
    navigation.navigate( "Register" )
  }

  const toReset = () => {
    navigation.navigate( "Reset" )
  }

  // Firebase login
  const firebaseLogin = async ( theEmail: string, thePassword: string ) => {
    await signInWithEmailAndPassword( authInit, theEmail, thePassword )
      .then(() => {
        dispatch( getTheUser( theEmail ) )

        navigation.reset({
          index: 0,
          routes: [{ name: "MainStack" }]
        })
      })
      .catch( error => {
        if ( error.code === "auth/invalid-credential" ) {
          Alert.alert(
            "Invalid credentials!",
            "Email address or password is incorrect or user not exist!",
            [
              { text: "Ok", style: "default" },
            ]
          )
        }

        if ( error.code === "auth/user-not-found" ) {
          Alert.alert(
            "User not found!",
            "No user found with this email, please register a new account!",
            [
              { text: "Ok", style: "default" },
            ]
          )
        }

        if ( error.code === "auth/wrong-password" ) {
          Alert.alert(
            "Incorrect password!",
            "Password doesn't match, please check again!",
            [
              { text: "Ok", style: "default" },
            ]
          )
        }

        if ( error.code === "auth/weak-password" ) {
          Alert.alert(
            "Weak password!",
            "Password should be at least 6 characters!",
            [
              { text: "Ok", style: "default" },
            ]
          )
        }

        // console.log( "Error login: ", error )
        throw error
      })
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    if ( user && isAuth ) {
      dispatch( getTheUser( user.email ) )
    }
  }, [ user, isAuth ])
 
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
              onPress={ () => firebaseLogin( email, password ) }
              icon="MA"
              name="login"
              text="Proceed with Login"
              color={ LightMode.green }
              textColor={ email === "" || password === "" ? LightMode.white : LightMode.black }
              borderRadius={ 10 }
              disabled={ email === "" || password === "" }
            />

            <Spacer size={ 25 } />

            <RoundedBorderButton
              onPress={ () => toRegister() }
              icon="MA"
              name="account-circle"
              text="Create New Account"
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
                    { text: "Ok", style: "default" },
                  ]
                )
              }}
              name="google"
              text="Login with Google"
              color={ LightMode.red }
              textColor={ LightMode.white }
              borderRadius={ 10 }
            />
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
    fontFamily: "fira",
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
    fontFamily: "fira",
    color: LightMode.black
  }
})