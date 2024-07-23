import { LightMode } from 'assets/colors/LightMode'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

export default function Register() {
  return (
    <SafeAreaView style={ s.container }>
      <KeyboardAvoidingView behavior={ Platform.OS === "ios" ? "padding" : "height" }>
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
          <View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    marginVertical: "auto",
    padding: 30,
    backgroundColor: LightMode.white
  },
})