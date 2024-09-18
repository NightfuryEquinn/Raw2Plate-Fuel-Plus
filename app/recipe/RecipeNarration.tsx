import Voice from '@react-native-community/voice'
import { LightMode } from 'assets/colors/LightMode'
import ConfirmationModal from 'components/ConfirmationModal'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import { useFontFromContext } from 'context/FontProvider'
import * as Speech from 'expo-speech'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RecipeNarration( { navigation, route }: any ) {
  const { recipeTitle, recipeSteps } = route.params

  const speechTimeout = useRef<any>( null )

  const [ numberSteps, setNumberSteps ] = useState( 0 )

  const [ modal, setModal ] = useState( false )

  const showModal = () => { 
    setModal( !modal )
  }

  const tellStep = () => {
    Speech.speak( recipeSteps[ numberSteps ], {
      pitch: 0.95,
      rate: 0.95,
      onDone: onRecord
    })
  }

  const backStep = () => {
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
    navigation.goBack() 
  }

  const handleSpeechCommand = ( command: string ) => {
    if ( speechTimeout.current ) clearTimeout( speechTimeout.current )
  
    speechTimeout.current = setTimeout( () => {
      if ( command.includes( "next" ) ) {
        nextStep()
      } 
      
      if ( command.includes( "back" ) ) {
        backStep()
      } 
      if ( [ "stop", "end", "done", "finish" ].some( word => command.includes( word ) ) ) {
        endStep()
      } 
      if ( [ "tell", "again", "repeat" ].some( word => command.includes( word ) ) ) {
        tellStep()
      }
    }, 1000 )
  }
  

  const onSpeechStart = () => {
    console.log( "Speech Start" )
  }

  const onSpeechRecognized = () => {
    console.log( "Speech Recognized" )
  }

  const onSpeechEnd = () => {
    console.log( "Speech End" )
    onRecord()
  }

  const onSpeechPartialResults = ( e: any ) => {
    console.log( "Speech Partials Result: ", e.value[ 0 ] )

    handleSpeechCommand( e.value[ 0 ].toLowerCase() )
  }

  const onSpeechResults = ( e: any ) => {
    console.log( "Speech Result: ", e.value[ 0 ] )

    handleSpeechCommand( e.value[ 0 ].toLowerCase() )
  }

  const onRecord = () => {
    Voice.stop()
    Voice.start( "en-US" )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart
    Voice.onSpeechRecognized = onSpeechRecognized
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechPartialResults = onSpeechPartialResults
    Voice.onSpeechResults = onSpeechResults

    Speech.speak( recipeSteps[ numberSteps ], {
      pitch: 0.95,
      rate: 0.95,
      onDone: onRecord
    } )

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
          <Text style={ s.title }>{ recipeTitle }</Text>
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
        message="Finish cooking?"
        onCancel={ () => {
          console.log( "Cancel" )
          showModal()
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