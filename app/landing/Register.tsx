import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFirebaseFromContext } from 'context/FirebaseProvider'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from 'redux/actions/userAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function Register( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )

  const { authInit } = useFirebaseFromContext()

  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ confirm, setConfirm ] = useState( "" )
  const [ username, setUsername ] = useState( "" )

  const checkEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return pattern.test( email )
  }

  // Firebase register and save into AWS
  const firebaseRegister = async ( theEmail: string, thePassword: string, theConfirm: string ) => {
    if ( thePassword !== theConfirm ) {
      Alert.alert(
        "Passwords doesn't match!",
        "Please ensure both passwords are correctly typed!",
        [
          { text: "I Understood", style: "default" },
        ]
      )

      return
    }

    await createUserWithEmailAndPassword( authInit, theEmail, thePassword )
      .then(() => {
        dispatch( userRegister(
          {
            userId: 0,
            username: username,
            password: password,
            image: undefined,
            email: email,
            contact: undefined,
            dateOfBirth: undefined,
            height: undefined,
            weight: undefined,
            age: undefined,
            registeredDate: dayjs().toString(),
            isDarkMode: false,
            isAppleAuth: false,
            isGoogleAuth: false
          }
        ))

        Alert.alert(
          "Success!",
          "User account created successfully!",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Proceed to Login", onPress: () => navigation.goBack() }
          ]
        )
      })
      .catch( error => {
        if ( error.code === "auth/email-already-in-use" ) {
          Alert.alert(
            "Existing email address!",
            "That email address is already in use!",
            [
              { text: "I Understood", style: "default" },
            ]
          )
        }

        if ( error.code === "auth/invalid-email" ) {
          Alert.alert(
            "Invalid email address!",
            "That email address is invalid!",
            [
              { text: "I Understood", style: "default" },
            ]
          )
        }

        console.log( "Error registering: ", error )
      })
  }

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
              text={ username } 
              setText={ setUsername } 
            />

            <Spacer size={ 10 } />

            <Text style={ s.subLeft }>You can add more information to your profile later for better recipe suggestion.</Text>
          </ScrollView>

          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <Spacer size={ 20 } />

            <RoundedBorderButton
              onPress={ () => firebaseRegister( email, password, confirm ) }
              text="Start Exploring!"
              color={ LightMode.yellow }
              textColor={ LightMode.white }
              borderRadius={ 10 }
              disabled={ !checkEmail() || email === "" || username === "" || ( password === "" && confirm === "" ) || ( password !== confirm ) }
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