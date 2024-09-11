import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import OrderCard from 'components/OrderCard'
import dayjs from 'dayjs'
import CalendarModal from 'components/CalendarModal'

export default function HistoryOrder() {
  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )

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

        <Text style={ s.heading }>Past Orders</Text>

        <Spacer size={ 10 } />

        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ showModal }
          style={ s.changeDate }
        >
          <Text style={ s.dateText }>{ dayjs( modalDate ).format( "DD-MM-YYYY" ) }</Text>
        </TouchableOpacity>

        <Spacer size={ 30 } />

        {/* Change to FlatList when data is available */}
        <ScrollView
          style={{ margin: -20 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={ false }
        >
          <OrderCard 
            title="15 August 2024"            
          />

          <Spacer size={ 20 } />

          <OrderCard 
            title="13 August 2024"            
          />

          <Spacer size={ 20 } />

          <OrderCard 
            title="10 August 2024"            
          />
        </ScrollView>
      </View>

      <CalendarModal 
        modal={ modal }
        showModal={ showModal }
        modalDate={ modalDate }
        setModalDate={ setModalDate }
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
  "changeDate": {
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 40,
    backgroundColor: LightMode.white,
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
    borderRadius: 10,
    justifyContent: "center"
  },
  "dateText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black,
    textAlign: "center"
  },
})

