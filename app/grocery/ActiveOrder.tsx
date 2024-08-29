import { LightMode } from 'assets/colors/LightMode'
import ConfirmationModal from 'components/ConfirmationModal'
import MapCard from 'components/MapCard'
import OrderCard from 'components/OrderCard'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ActiveOrder() {
  const [ modal, setModal ] = useState( false )

  const showModal = () => {
    setModal( !modal )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Active Order</Text>

        <Spacer size={ 10 } />

        <MapCard />

        <Spacer size={ 5 } />

        <Text style={ s.hint }>Last updated at { dayjs().format( "YYYY-MM-DD h:mm:ss a" ) }</Text>

        <Spacer size={ 30 } />

        <ScrollView
          style={{ margin: -20 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={ false }
        >
          <View style={ s.infoContainer }>
            <View style={[ s.infoWrapper, { flex: 0.6 } ]}>
              <Text style={[ s.info, s.black ]}>Order Time</Text>

              <Text style={ s.info }>{ dayjs().format( "h:mm a" ) }</Text>
            </View>

            <View style={[ s.infoWrapper, { flex: 0.4 } ]}>
              <Text style={[ s.info, s.black ]}>ETA</Text>

              <Text style={ s.info }>25 <Text style={[ s.black, s.cantarell ]}>mins</Text></Text>
            </View>
          </View>

          <Spacer size={ 15 } />

          <OrderCard 
            title="Order Review"            
          />
        </ScrollView>

        <Spacer size={ 30 } />

        <View style={ s.hintContainer }>
          <Text style={[ s.hint, { textAlign: "left" } ]}>NOTE: You can only cancel order if the driver has not pick up your grocery from the store.</Text>
        
          <RoundedBorderButton 
            onPress={ showModal }
            text="Cancel Order"
            color={ LightMode.red }
            textColor={ LightMode.white }
            borderRadius={ 10 }
            marginHori={ 0 }
          />
        </View>
      </View>

      <ConfirmationModal 
        modal={ modal }
        showModal={ showModal }
        message="Cancel this order? This cannot be undone."
        onCancel={ () => {
          showModal()
        }}
        onConfirm={ () => {
          showModal()
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
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "hintContainer": {
    gap: 10
  },
  "hint": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "right"
  },
  "infoContainer": {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center"
  },
  "infoWrapper": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7.5,
    paddingHorizontal: 12.5,
    borderRadius: 20,
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
  "info": {
    fontFamily: "fjalla",
    fontSize: 18,
    color: LightMode.blue
  },
  "black": {
    color: LightMode.black,
  },
  "cantarell": {
    fontFamily: "cantarell",
    fontSize: 12,
  },
})