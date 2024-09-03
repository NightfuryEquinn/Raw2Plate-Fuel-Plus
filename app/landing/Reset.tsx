import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import LinedTextField from 'components/LinedTextField'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordFailure, resetPasswordLoading, resetPasswordSuccess } from 'redux/actions/userAction'
import { AppDispatch, RootState } from 'redux/reducers/store'
import { resetPassword } from 'redux/services/userServices'

export default function Reset( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.user )
  
  const [ email, setEmail ] = useState( "" )
  const [ password, setPassword ] = useState( "" )
  const [ confirm, setConfirm ] = useState( "" )

  const checkEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return pattern.test( email )
  }

  // Reset password with email, ignore security
  const awsReset = async () => {
    dispatch( resetPasswordLoading() )

    try {
      const res = await resetPassword( email, password )

      dispatch( resetPasswordSuccess( res ) )

      Alert.alert(
        "Success!",
        "Your password has been reset successfully!",
        [
          { text: "I Understood", style: "default" },
        ]
      )
    } catch ( error: any ) {
      dispatch( resetPasswordFailure( error.message ) )
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
          </ScrollView>
          
          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <Spacer size={ 20 } />
              <RoundedBorderButton
                onPress={ () => {
                  awsReset()
                  navigation.goBack()
                }}
                text="Reset Password"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
                disabled={ !checkEmail() || email === "" || ( password === "" && confirm === "" ) || ( password !== confirm ) }
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
  },
  "blue": {
    color: LightMode.blue
  }
})