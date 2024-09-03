import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterFailure, userRegisterLoading, userRegisterSuccess } from 'redux/actions/userAction'
import { AppDispatch, RootState } from 'redux/reducers/store'
import { postUser } from 'redux/services/userServices'

export default function Register( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )

  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ confirm, setConfirm ] = useState( "" )
  const [ username, setUsername ] = useState( "" )

  const checkEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return pattern.test( email )
  }

  const awsRegister = async () => {
    dispatch( userRegisterLoading() )

    try {
      const res = await postUser(
        {
          UserId: 0,
          Username: username,
          Password: password,
          Image: undefined,
          Email: email,
          Contact: undefined,
          DateOfBirth: undefined,
          Height: undefined,
          Weight: undefined,
          Age: undefined,
          RegisteredDate: dayjs().toString(),
          IsDarkMode: false,
          IsAppleAuth: false,
          IsGoogleAuth: false
        }
      )

      dispatch( userRegisterSuccess( res ) )

      Alert.alert(
        "New user created!",
        "Please proceed to login!",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Proceed to Login", onPress: () => navigation.goBack() }
        ]
      )
    } catch ( error: any ) {
      dispatch( userRegisterFailure( error.message ) )

      Alert.alert(
        "Failed to create new user!",
        "Ensure that your email is correctly written and not already in use! Both passwords must also be matching!",
        [
          { text: "I Understood", style: "default" },
        ]
      )
    }
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
              onPress={ awsRegister }
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