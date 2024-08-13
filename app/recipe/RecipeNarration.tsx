import Voice from '@wdragon/react-native-voice'
import { LightMode } from 'assets/colors/LightMode'
import ConfirmationModal from 'components/ConfirmationModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import * as Speech from 'expo-speech'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RecipeNarration( { navigation, route }: any ) {
  const { recipeSteps } = route.params

  const [ numberSteps, setNumberSteps ] = useState( 0 )
  const [ isRecord, setIsRecord ] = useState( false )
  const [ modal, setModal ] = useState( false )

  const showModal = () => { 
    setModal( !modal )
  }

  const backStep = () => {
    Voice.destroy().then( Voice.removeAllListeners )

    if ( numberSteps !== 0 ) {
      setNumberSteps( numberSteps - 1 )
      Speech.stop()
      Speech.speak( recipeSteps[ numberSteps - 1 ], {
        pitch: 0.95,
        rate: 0.95,
        onDone: onRecord
      })
    } else {
      Speech.stop()
      Speech.speak( recipeSteps[ numberSteps ], {
        pitch: 0.95,
        rate: 0.95,
        onDone: onRecord
      })
    }
  }

  const nextStep = () => {
    Voice.destroy().then( Voice.removeAllListeners )

    setNumberSteps( numberSteps + 1 )
    Speech.stop()
    Speech.speak( recipeSteps[ numberSteps + 1 ], {
      pitch: 0.95,
      rate: 0.95,
      onDone: onRecord
    })
  }

  const endStep = () => {
    Speech.stop()
    Voice.destroy().then( Voice.removeAllListeners )
    navigation.goBack() 
  }

  const onSpeechStart = () => {
    console.log( "Speech Start" )
  }

  const onSpeechRecognized = () => {
    console.log( "Speech Recognizing" )
  }

  const onSpeechEnd = () => {
    console.log( "Speech End" )
    setIsRecord( false )

    // TODO: Auto start if didn't go to next step, avoid recalling onRecord if gone to next step
  }

  const onSpeechResults = ( e: any ) => {
    console.log( "Speech Result" )
    console.log( e.value[ 0 ] )

    const speechText = e.value[ 0 ].toLowerCase()

    if ( speechText.includes( "next" ) ) {
      nextStep()
    } else if ( speechText.includes( "back" ) ) {
      backStep()
    } else if ( speechText.includes( "stop" ) ) {
      endStep()
    }
  }

  const onRecord = () => {
    if ( isRecord ) {
      Voice.destroy().then( Voice.removeAllListeners )
    } else {
      Voice.start( "en-US" )
    }

    setIsRecord( !isRecord )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    Speech.speak( recipeSteps[ numberSteps ], {
      pitch: 0.95,
      rate: 0.95,
      onDone: onRecord
    })

    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechRecognized = onSpeechRecognized
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechResults = onSpeechResults

    return () => {
      Voice.destroy().then( Voice.removeAllListeners )
    }
  }, [])
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <RoundedBorderButton 
          onPress={ endStep }
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
            onPress={ backStep }
            style={ s.stepButton }
          >
            <Text style={ s.stepText }>Back</Text>
          </TouchableOpacity>

          { numberSteps + 1 === recipeSteps.length ?
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={[ s.stepButton, { backgroundColor: LightMode.green } ]}
            >
              <Text style={ s.stepText }>Done</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ nextStep }
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

      <ConfirmationModal 
        modal={ modal }
        showModal={ showModal }
        message="Do you wish to add this recipe to your tracker?"
        onCancel={ () => {
          console.log( "Cancel" )
          showModal()
          endStep()
        }}
        onConfirm={ () => {
          console.log( "Confirm" ) 
          showModal()
          endStep()
        }}
      />
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