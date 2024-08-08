import { LightMode } from 'assets/colors/LightMode'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'
import Voice from '@wdragon/react-native-voice'

export default function RecipeNarration( { navigation, route }: any ) {
  const { recipeSteps } = route.params

  const [ numberSteps, setNumberSteps ] = useState( 0 )
  const [ isRecord, setIsRecord ] = useState( false )
  const [ vts, setVts ] = useState( "" )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  const onSpeechStart = () => {
    console.log( "Speech Start" )
    setVts( "" )
  }

  const onSpeechEnd = () => {
    setIsRecord( false )
  }

  const onSpeechResults = ( e: any ) => {
    console.log( "Speech Result" )
    console.log( e.value[0] )
    setVts( e.value[0] )
  }

  const onRecord = () => {
    if ( isRecord ) {
      Voice.stop()
    } else {
      Voice.start( "en-US" )
    }

    setIsRecord( !isRecord )
  }

  useEffect(() => {
    // Speech.speak( recipeSteps[ numberSteps ] )
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults

    onRecord()

    return () => {
      Voice.destroy().then( Voice.removeAllListeners )
    }
  }, [])
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <RoundedBorderButton 
          onPress={ () => {
            Speech.stop()
            navigation.goBack() 
          }}
          text="Stop"
          color={ LightMode.red }
          textColor={ LightMode.white }
          borderRadius={ 10 }
          marginHori={ 0 }
        />

        <Spacer size={ 20 } />

        <View style={ s.titleContainer }>
          <Text style={ s.title }>Parmesan Garlic Linguine Pasta</Text>
        </View>

        <Spacer size={ 10 } />

        <Text style={ s.step }>Step { numberSteps + 1 } / { recipeSteps.length }</Text>

        <Spacer size={ 10 } />

        <ScrollView showsVerticalScrollIndicator={ false } style={{ flex: 1 }}>
          <Text style={ s.featured }>{ recipeSteps[ numberSteps ] }</Text>
        </ScrollView>
        
        <Spacer size={ 10 } />

        <View style={ s.buttonContainer }>
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ () => {
              if ( numberSteps !== 0 ) {
                setNumberSteps( numberSteps - 1 )
                Speech.stop()
                Speech.speak( recipeSteps[ numberSteps - 1 ] )
              } else {
                Speech.stop()
                Speech.speak( recipeSteps[ numberSteps ] )
              }
            }}
            style={ s.stepButton }
          >
            <Text style={ s.stepText }>Back</Text>
          </TouchableOpacity>

          { numberSteps + 1 === recipeSteps.length ?
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => console.log( "Done" ) }
              style={[ s.stepButton, { backgroundColor: LightMode.green } ]}
            >
              <Text style={ s.stepText }>Done</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => {
                setNumberSteps( numberSteps + 1 )
                Speech.stop()
                Speech.speak( recipeSteps[ numberSteps + 1 ] )
              }}
              style={ s.stepButton }
            >
              <Text style={ s.stepText }>Next</Text>
            </TouchableOpacity>
          }
        </View>

        <Spacer size={ 20 } />

        <Text style={ s.hint }>You can voice-control for recipe narration.</Text>
        <Text style={ s.hint }>Try saying "Tell", "Stop", "Back", and "Next".</Text>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flex: 1,
    padding: 30,
    backgroundColor: LightMode.white
  },
  "titleContainer": {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: LightMode.darkGrey
  },
  "title": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black,
    textAlign: "center",
  },
  "step": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.lightBlack,
    textAlign: "center"
  },
  "featured": {
    fontFamily: "cantarell",
    fontSize: 24,
    color: LightMode.black,
    textAlign: "center"
  },
  "buttonContainer": {
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  "stepButton": {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: LightMode.blue,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "stepText": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.white,
    textAlign: "center"
  },
  "hint": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "center"
  },
})