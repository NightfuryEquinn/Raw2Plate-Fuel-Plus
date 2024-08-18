import { LightMode } from 'assets/colors/LightMode';
import { useFontFromContext } from 'context/FontProvider';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconMA from 'react-native-vector-icons/MaterialIcons';

export default function TimerHoriCard( { heading, timeInSec, isRunning }: any ) {
  const defaultImage: any = {
    baking: require( "../assets/images/icons/baking.png" ),
    boiling: require( "../assets/images/icons/boiling.png" ),
    simmering: require( "../assets/images/icons/simmering.png" ),
    marinating: require( "../assets/images/icons/marinating.png" ),
    proofing: require( "../assets/images/icons/proofing.png" ),
    resting: require( "../assets/images/icons/resting.png" )
  }

  const [ remain, setRemain ] = useState( timeInSec )

  const convertSecondsToHMS = ( seconds: number ) => {
    const hours = Math.floor( seconds / 3600 )
    const mins = Math.floor( ( seconds % 3600 ) / 60 )
    const secs = seconds % 60

    return `${ dayjs().hour( hours ).minute( mins ).second( secs ).format( "HH:mm:ss" ) }`
  }

  const triggerAlarm = () => {
    Alert.alert( "Timer reminder:", `${ heading }` )
    // TODO: Add notification reminder with sound
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    let interval: number | undefined

    if ( isRunning && remain > 0 ) {
      interval = setInterval(() => {
        setRemain( ( prev: number ) => prev - 1 )
      }, 1000)
    } else if ( remain === 0 ) {
      clearInterval( interval )
      triggerAlarm()
    }

    return () => clearInterval( interval )
  }, [ isRunning, remain ])
  
  return (
    <View style={ s.container }>
      <View style={ s.wrapper }>
        <View style={ s.iconWrapper }>
          <Image
            resizeMode="cover"
            source={ defaultImage[ heading.toLowerCase() ] || require( "../assets/images/icons/timer.png" ) }
            style={ s.image }
          />
        </View>

        <View style={ s.left }>
          <Text style={ s.time }>{ convertSecondsToHMS( remain ) }</Text>

          <Text style={ s.heading }>{ heading }</Text>
        </View>

        <View style={ s.iconWrapper }>
          <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ () => console.log( "Delete Timer" ) }
            style={ s.icon }
          >
            <IconMA 
              name="delete"
              color={ LightMode.red }
              size={ 32 }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    padding: 15,
    borderRadius: 10,
    backgroundColor: LightMode.white,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "image": {
    width: 44,
    height: 44,
  },
  "wrapper": {
    flexDirection: "row",
    gap: 20,
  },
  "left": {
    flex: 1,
    gap: 5
  },
  "time": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.yellow
  },
  "heading": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black
  },
  "iconWrapper": {
    justifyContent: "center",
    alignItems: "center"
  },
  "icon": {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: LightMode.white,
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
  }
})

TimerHoriCard.propTypes = {
  heading: PropTypes.string.isRequired,
  timeInSec: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired
}