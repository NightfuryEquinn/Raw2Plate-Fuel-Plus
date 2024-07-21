import { LightMode } from 'assets/colors/LightMode'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import IconMA from 'react-native-vector-icons/MaterialIcons'; 

export default function LinedTextField( { name, placeholder, secure, text, setText }: any ) {  
  return (
    <View style={ s.container }>
      <View style={ s.wrapper }>
        <IconMA 
          name={ name }
          color={ LightMode.black }
          size={ 24 }
        />

        <TextInput 
          style={ s.textInput }
          textColor={ LightMode.black }
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          placeholder={ placeholder }
          placeholderTextColor={ LightMode.black }
          dense={ true }
          value={ text }
          onChangeText={ text => setText( text ) }
          secureTextEntry={ secure }
        />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 10,
  },
  "wrapper": {
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: LightMode.black
  },
  "textInput": {
    width: "90%",
    backgroundColor: "transparent",
    textAlign: "auto"
  }
})