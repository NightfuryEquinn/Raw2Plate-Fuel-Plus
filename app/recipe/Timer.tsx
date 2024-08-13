import { LightMode } from 'assets/colors/LightMode'
import AddTimerHoriCard from 'components/AddTimerHoriCard'
import Spacer from 'components/Spacer'
import TimerHoriCard from 'components/TimerHoriCard'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forTimer } from 'data/dummyData'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Timer() {
  const TimerItem = ( { item, index }: any ) => (
    <TimerHoriCard 
      heading={ item.heading }
      timeInSec={ item.timeInSec }
      isRunning={ item.isRunning }
    />
  )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Timers</Text>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>A wise once said: "Please don't burn the kitchen..."</Text>
      
        <Spacer size={ 20 } />

        <FlatList 
          style={ s.flatList }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ forTimer }
          renderItem={ TimerItem }
          keyExtractor={ data => data.id.toString() }
          ItemSeparatorComponent={ () => <Spacer size={ 15 } /> }
          ListHeaderComponent={
            <AddTimerHoriCard 
            
            />
          }
        />
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
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "flatList": {
    margin: -20,
    marginVertical: 0,
  }
})