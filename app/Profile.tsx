import auth from '@react-native-firebase/auth'
import { LightMode } from 'assets/colors/LightMode'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile( { navigation }: any ) {
  const [ image, setImage ] = useState( "" )
  const [ email, setEmail ] = useState( "john.doe@gmail.com" )
  const [ contact, setContact ] = useState( "012 892 4254" )
  const [ height, setHeight ] = useState( "177" )
  const [ weight, setWeight ] = useState( "78" )
  const [ age, setAge ] = useState( "22" )

  const pickImage = async () => {
    // Request permission
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if ( permissionResult.granted === false ) {
      alert( "Permission to access photo library is required!" )
      return
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 1, 1 ],
      quality: 1
    })

    if ( !result.canceled ) {
      setImage( result.assets[ 0 ].uri )
    }
  }

  const firebaseLogout = () => {
    auth().signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LandingStack" }]
      })
    })
    .catch(( error ) => {
      console.log( "Error logging out: ", error )
    })
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
        <View style={{ flex: 1 }}>
          <TopBar />

          <Spacer size={ 20 } />

          <Text style={ s.heading }>Profile</Text>

          <Spacer size={ 20 } />

          <ScrollView showsVerticalScrollIndicator={ false }>
            <View style={ s.profileContainer }>
              <TouchableOpacity activeOpacity={ 0.5 } onPress={ pickImage }>
                <Image
                  resizeMode="cover"
                  style={ s.image }
                  source={ 
                    image ? { uri: image } : require( "../assets/images/placeholders/profile_placeholder.jpg" ) }
                />
              </TouchableOpacity>

              <View style={ s.profileWrapper }>
                <Text style={ s.profileHeading }>John Doe</Text>
                <Text style={ s.profileSub }>Joined since 14 July 2024</Text>
              </View>
            </View>

            <Spacer size={ 30 } />

            <View style={ s.detailContainer }>
              <Text style={ s.detailHeading }>Email Address</Text>
              <TextInput 
                style={ s.textInput }
                textColor={ LightMode.black }
                cursorColor={ LightMode.black }
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                dense={ true }
                value={ email }
                onChangeText={ text => setEmail( text ) }
              />
            </View>

            <Spacer size={ 15 } />

            <View style={ s.detailContainer }>
              <Text style={ s.detailHeading }>Contact Number</Text>
              <TextInput 
                style={ s.textInput }
                textColor={ LightMode.black }
                cursorColor={ LightMode.black }
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                dense={ true }
                value={ contact }
                onChangeText={ text => setContact( text ) }
                keyboardType="number-pad"
              />
            </View>

            <Spacer size={ 15 } />

            <View style={ s.detailWrapper }>
              <View style={ s.detailContainer }>
                <Text style={ s.detailHeading }>Height (cm)</Text>
                <TextInput 
                  style={ s.textInput }
                  textColor={ LightMode.black }
                  cursorColor={ LightMode.black }
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  dense={ true }
                  value={ height }
                  onChangeText={ text => setHeight( text ) }
                  keyboardType="number-pad"
                />
              </View>

              <View style={ s.detailContainer }>
                <Text style={ s.detailHeading }>Weight (kg)</Text>
                <TextInput 
                  style={ s.textInput }
                  textColor={ LightMode.black }
                  cursorColor={ LightMode.black }
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  dense={ true }
                  value={ weight }
                  onChangeText={ text => setWeight( text ) }
                  keyboardType="number-pad"
                />
              </View>

              <View style={ s.detailContainer }>
                <Text style={ s.detailHeading }>Age</Text>
                <TextInput 
                  style={ s.textInput }
                  textColor={ LightMode.black }
                  selectionColor={ LightMode.black }
                  cursorColor={ LightMode.black }
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  dense={ true }
                  value={ age }
                  onChangeText={ text => setAge( text ) }
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </ScrollView>

          <Spacer size={ 30 } />

          <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
            <View style={ s.buttonContainer }>
              <RoundedBorderButton 
                onPress={ firebaseLogout }
                text="Log Out"
                color={ LightMode.black }
                textColor={ LightMode.white }
                borderRadius={ 10 }
                marginHori={ 0 }
              />

              <RoundedBorderButton 
                onPress={ () => console.log( "Save Changes" ) }
                text="Save Changes"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
                marginHori={ 0 }
              />
            </View>
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
    backgroundColor: LightMode.white,
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "profileContainer": {
    flexDirection: "row",
    gap: 40
  },
  "profileWrapper": {
    gap: 5
  },
  "profileHeading": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "profileSub": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack
  },
  "image": {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  "detailWrapper": {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  "detailContainer": {
    gap: 5
  },
  "detailHeading": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack
  },
  "textInput": {
    backgroundColor: LightMode.darkGrey,
    textAlign: "auto",
    borderRadius: 5,
  },
  "buttonContainer": {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})