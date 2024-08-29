import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import OrderCard from 'components/OrderCard'

export default function HistoryOrder() {
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
})

