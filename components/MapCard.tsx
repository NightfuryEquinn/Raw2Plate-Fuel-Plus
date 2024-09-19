import { GOOGLE_API_KEY } from '@env'
import { LightMode } from 'assets/colors/LightMode'
import axios from 'axios'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { LatLng, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

export default function MapCard( { storeAddress, receiverAddress }: any ) {
  const mapRef = useRef<MapView>(null)
  
  const driverLocation = { latitude: 3.056069, longitude: 101.700466 }

  const [ originLat, setOriginLat ] = useState( 0 )
  const [ originLng, setOriginLng ] = useState( 0 )
  const [ destLat, setDestLat ] = useState( 0 )
  const [ destLng, setDestLng ] = useState( 0 )

  const origin: LatLng = { latitude: originLat!, longitude: originLng! }
  const dest: LatLng = { latitude: destLat!, longitude: destLng! }

  // Get the store coordinates and receiver address
  const fetchCoordinates = async ( address: string, originOrDest: string ) => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ GOOGLE_API_KEY }`
      )

      if ( res.data.status === "OK" ) {
        const { lat, lng } = res.data.results[ 0 ].geometry.location
        
        if ( originOrDest === "origin" ) {
          setOriginLat( lat )
          setOriginLng( lng )
        } else {
          setDestLat( lat )
          setDestLng( lng )
        }
      }
    } catch ( error: any ) {
      console.log( error.message )
    }
  }

  const refreshMap = () => {
    if ( mapRef.current ) {
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000 )
    }
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded || originLat === null || originLng === null || destLat === null || destLng === null ) {
    return null
  }

  useEffect(() => {
    if ( storeAddress ) {
      fetchCoordinates( storeAddress, "origin" )
    }

    if ( receiverAddress ) {
      fetchCoordinates( receiverAddress, "dest" )
    }

    refreshMap()
  }, [ storeAddress, receiverAddress ])
  
  return (
    <View style={ s.container }>
      <MapView 
        ref={ mapRef }
        style={ s.map }
        initialRegion={{
          latitude: ( originLat! + destLat! ) / 2,
          longitude: ( originLng! + destLng! ) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker 
          coordinate={ origin }
          title="Origin"
          description="Store"
          pinColor={ LightMode.green }
        />

        <Marker
          coordinate={ driverLocation }
          title="Delivery Driver"
          description="Driver's Current Location"
          pinColor={ LightMode.blue }
        />

        <Marker
          coordinate={ dest }
          title="Destination"
          description="Your House"
          pinColor={ LightMode.red }
          
        />

        <MapViewDirections 
          origin={ driverLocation }
          destination={ dest }
          apikey={ GOOGLE_API_KEY }
          strokeColor={ LightMode.grabGreen }
          strokeWidth={ 6 }
          optimizeWaypoints={ true }
          onError={ ( error: any ) => console.log( "Error getting direction: ", error ) }
        />

        <MapViewDirections
          origin={ origin }
          destination={ driverLocation }
          apikey={ GOOGLE_API_KEY }
          strokeColor={ LightMode.halfGrabGreen }
          strokeWidth={ 6 }
          optimizeWaypoints={ true }
          onError={ ( error: any ) => console.log( "Error getting direction: ", error ) }
        />
      </MapView>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    overflow: "hidden",
    height: 275,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LightMode.black,
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
  "map": {
    ...StyleSheet.absoluteFillObject
  }
})

MapCard.propTypes = {
  storeAddress: PropTypes.string.isRequired,
  receiverAddress: PropTypes.string.isRequired
}