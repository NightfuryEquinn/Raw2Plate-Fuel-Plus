import { MAPS_API_KEY } from '@env'
import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

export default function MapCard( {}: any ) {
  const origin = { latitude: 3.139003, longitude: 101.686852 }
  const driverLocation = { latitude: 3.151697, longitude: 101.694304 }
  const destination = { latitude: 3.157758, longitude: 101.712546 }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <View style={ s.container }>
      <MapView 
        style={ s.map }
        initialRegion={{
          latitude: ( origin.latitude + destination.latitude ) / 2,
          longitude: ( origin.longitude + destination.longitude ) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker 
          coordinate={ origin }
          title="Origin"
          description="Store"
          pinColor={ LightMode.red }
        />

        <Marker
          coordinate={ driverLocation }
          title="Delivery Driver"
          description="Driver's Current Location"
          pinColor={ LightMode.blue }
        />

        <Marker
          coordinate={ destination }
          title="Destination"
          description="Your House"
          pinColor={ LightMode.green }
        />

        <Polyline 
          coordinates={[ origin, driverLocation, destination ]}
          strokeColor={ LightMode.halfBlack }
          strokeWidth={ 4 }
        />

        <MapViewDirections 
          origin={ driverLocation }
          destination={ destination }
          apikey={ MAPS_API_KEY }
          strokeColor={ LightMode.black }
          strokeWidth={ 4 }
          optimizeWaypoints={ true }
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
  
}