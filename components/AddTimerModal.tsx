import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import WheelPicker from 'react-native-wheely'
import LinedTextField from './LinedTextField'
import RoundedBorderButton from './RoundedBorderButton'
import Spacer from './Spacer'
import dayjs from 'dayjs'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AddTimerModal( { modal, showModal, loadTimers, hour, min, sec, purpose, active, setHour, setMin, setSec, setPurpose, setActive }: any ) {
  const options: any[] = [
    { 
      purpose: "Baking",
      icon: require( "../assets/images/icons/baking.png" ),
    },
    {
      purpose: "Boiling",
      icon: require( "../assets/images/icons/boiling.png" ),
    },
    {
      purpose: "Simmering",
      icon: require( "../assets/images/icons/simmering.png" ),
    },
    {
      purpose: "Marinating",
      icon: require( "../assets/images/icons/marinating.png" ),
    },
    {
      purpose: "Proofing",
      icon: require( "../assets/images/icons/proofing.png" ),
    },
    {
      purpose: "Resting",
      icon: require( "../assets/images/icons/resting.png" )
    },
    {
      purpose: "Others",
      icon: null
    }
  ]

  const timeOptions = ( range: number ) => {
    return Array.from( { length: range }, ( _, i ) => String( i ).padStart( 2, '0' ) )
  }

  const addTimer = async ( purpose: string, hour: number, min: number, sec: number ) => {
    try {
      const currentTime = dayjs()
      const totalSeconds = hour * 3600 + min * 60 + sec

      const newTimer = {
        purpose,
        startTime: dayjs().valueOf(),
        duration: totalSeconds * 1000,
        endTime: dayjs().add( totalSeconds, "second" ).valueOf()
      }

      const storedTimers = await AsyncStorage.getItem( "@timers" )
      const timers = storedTimers ? JSON.parse( storedTimers ) : []

      // Filter expired timers and trigger notifications
      const activeTimers = timers.filter(( timer: any ) => {
        if ( currentTime >= timer.endTime ) {
          return false
        }

        return true
      })

      activeTimers.push( newTimer )
      loadTimers( activeTimers )

      await AsyncStorage.setItem( "@timers", JSON.stringify( activeTimers ) )
      
      Alert.alert(
        "Timer added!",
        "Bao will notify you later when the timer is up!",
        [
          { text: "I Understood", style: "default" },
        ]
      )
    } catch ( error ) {
      console.error( "Error adding timer: ", error )

      Alert.alert(
        "Failed!",
        "Unknown error occured, please try again!",
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
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ modal }
      onRequestClose={ showModal }
    >
      <View style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <View style={ s.modalWrapper }>
            <View style={ s.modalHeadingWrapper }>
              <View style={ s.modalHeading }>
                <Text style={ s.modalHeadingTitle }>Set New Timer</Text>
              </View>
            </View>

            <Spacer size={ 20 } />

            <View style={ s.content }>
              <Text style={ s.contentTitle }>Duration</Text>

              <View style={ s.timerWheel }>
                <View style={ s.timerSection }>
                  <WheelPicker
                    visibleRest={ 1 }
                    selectedIndex={ hour }
                    options={ timeOptions( 24 ) }
                    onChange={ ( index: number ) => setHour( index ) }
                    itemTextStyle={ s.timerHeading }
                    scaleFunction={ () => 0.5 }
                  />

                  <Text style={ s.sub }>hrs</Text>
                </View>

                <View style={ s.timerSection }>
                  <WheelPicker
                    visibleRest={ 1 }
                    selectedIndex={ min }
                    options={ timeOptions( 60 ) }
                    onChange={ ( index: number ) => setMin( index ) }
                    itemTextStyle={ s.timerHeading }
                    scaleFunction={ () => 0.5 }
                  />

                  <Text style={ s.sub }>mins</Text>
                </View>

                <View style={ s.timerSection }>
                  <WheelPicker
                    visibleRest={ 1 }
                    selectedIndex={ sec }
                    options={ timeOptions( 60 ) }
                    onChange={ ( index: number ) => setSec( index ) }
                    itemTextStyle={ s.timerHeading }
                    scaleFunction={ () => 0.5 }
                  />
                  <Text style={ s.sub }>secs</Text>
                </View>
              </View>
            </View>

            <Spacer size={ 30 } />

            <ScrollView
              showsVerticalScrollIndicator={ false }
              contentContainerStyle={{ padding: 20 }}
              style={{ marginVertical: -10, marginHorizontal: -20, flex: 1 }}
            >
              <View style={ s.content }>
                <Text style={ s.contentTitle }>Purposes</Text>

                <View style={ s.list }>
                  {
                    options.map(( data: any, index: number ) => (
                      <TouchableOpacity 
                        key={ index } 
                        activeOpacity={ 0.5 }
                        onPress={ () => {
                          setPurpose( data.purpose )
                          setActive( index )
                        }}
                        style={[ s.box, active === index ? { backgroundColor: LightMode.green } : { backgroundColor: LightMode.white } ]}
                      >
                        { data.purpose !== "Others" ?
                          <Image 
                            resizeMode="contain"
                            source={ data.icon }
                            style={ s.image }
                          />
                          :
                          <IconMA 
                            name="more-horiz"
                            size={ 20 }
                            color={ LightMode.black }
                          />
                        }
                      
                        <Text style={ s.boxText }>{ data.purpose }</Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
                
                <Spacer size={ 5 } />

                {
                  active === options.length - 1 &&
                  <LinedTextField 
                    name="notes" 
                    text={ purpose }
                    placeholder="What's the timer for?" 
                    setText={ ( text: string ) => setPurpose( text ) }                
                  />
                }
              </View>
            </ScrollView>

            <Spacer size={ 30 } />

            <View style={ s.buttonContainer }>
              <RoundedBorderButton 
                onPress={ () => {
                  addTimer( purpose, hour, min, sec )
                  showModal()
                }}
                text="Add Timer"
                color={ LightMode.yellow }
                textColor={ LightMode.white }
                borderRadius={ 10 }
              />

              <TouchableOpacity
                activeOpacity={ 0.5 }
                onPress={ showModal }
                style={ s.button }
              >
                <Text style={ s.textButton }>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> 
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  "modalContainer": {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
    margin: 0, 
    flex: 0.85, 
    borderRadius: 10,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 10,
  },
  "modalWrapper": {
    justifyContent: "space-between",
    alignItems: "center"
  },
  "modalHeadingWrapper": {
    flexDirection: "row"
  },
  "modalHeading": {
    flex: 1,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: LightMode.darkGrey, 
  },
  "modalHeadingTitle": {
    textAlign: "center",
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black,
  },
  "content": {
    flex: 1,
    gap: 10,
  },
  "contentTitle": {
    fontFamily: "fjalla",
    fontSize: 18,
    color: LightMode.black,
  },
  "timerWheel": {
    width: "100%",
    gap: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: LightMode.white,
    borderRadius: 10,
    borderColor: LightMode.black,
    borderWidth: 1,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "timerSection": {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  "timerHeading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.blue
  },
  "sub": {
    marginTop: 15,
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black,
  },
  "image": {
    height: 20,
    width: 20,
  },
  "list": {
    flexWrap: "wrap",
    flexDirection: "row", 
    gap: 10,
  },
  "box": {
    paddingVertical: 7.5,
    paddingHorizontal: 12.5,
    height: 35,
    borderRadius: 100,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "boxText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black,
  },
  "textButton": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.yellow
  },
  "buttonContainer": {
    marginHorizontal: "auto",
  },
  "button": {
    marginHorizontal: "auto",
    marginTop: 20,
  }
})

AddTimerModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  loadTimers: PropTypes.any.isRequired,
  hour: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  purpose: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
  setHour: PropTypes.func.isRequired,
  setMin: PropTypes.func.isRequired,
  setSec: PropTypes.func.isRequired,
  setPurpose: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
}