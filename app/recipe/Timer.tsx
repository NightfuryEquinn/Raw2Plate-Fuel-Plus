import AsyncStorage from '@react-native-async-storage/async-storage'
import { LightMode } from 'assets/colors/LightMode'
import AddTimerHoriCard from 'components/AddTimerHoriCard'
import AddTimerModal from 'components/AddTimerModal'
import Spacer from 'components/Spacer'
import TimerHoriCard from 'components/TimerHoriCard'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Timer() {
  const [ modal, setModal ] = useState( false )
  const [ timers, setTimers ] = useState( [] )
  const [ refreshing, setRefreshing ] = useState( false )

  const [ hour, setHour ] = useState( 0 )
  const [ min, setMin ] = useState( 0 )
  const [ sec, setSec ] = useState( 0 )
  const [ purpose, setPurpose ] = useState( "Baking" )
  const [ active, setActive ] = useState( 0 )
  
  const TimerItem = ( { item, index }: any ) => (
    <TimerHoriCard
      key={ index }
      timer={ item }
      heading={ item.purpose }
      timeInSec={ item.duration / 1000 }
      isRunning={ true }
    />
  )

  const loadTimers = async () => {
    try { 
      const currentTime = dayjs()
      const savedTimers = await AsyncStorage.getItem( "@timers" )

      if ( savedTimers ) {
        const parsedTimers = JSON.parse( savedTimers ) 

        // Filter expired timers and trigger notifications
        const activeTimers = parsedTimers.filter(( timer: any ) => {
          if ( currentTime >= timer.endTime ) {
            return false
          }

          return true
        })

        setTimers( activeTimers )
      }
    } catch ( error ) {
      console.error( "Error getting saved timers: ", error )
    }
  }

  const showModal = () => {
    setModal( !modal )
  }

  const onRefresh = () => {
    setRefreshing( true )

    loadTimers()

    setRefreshing( false )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 

  useEffect(() => {
    loadTimers()
  }, [])
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Timers</Text>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>A wise once said: "Refresh to see your timers..."</Text>
      
        <Spacer size={ 20 } />

        <FlatList 
          refreshing={ refreshing }
          onRefresh={ onRefresh }
          style={ s.flatList }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ timers }
          renderItem={ TimerItem }
          keyExtractor={ ( _, index ) => index.toString() }
          ItemSeparatorComponent={ () => <Spacer size={ 15 } /> }
          ListHeaderComponent={
            <AddTimerHoriCard 
              onPress={ showModal }
            />
          }
        />
      </View>

      <AddTimerModal 
        modal={ modal }
        showModal={ showModal }
        loadTimers={ setTimers }
        hour={ hour }
        min={ min }
        sec={ sec }
        purpose={ purpose }
        active={ active }
        setHour={ setHour }
        setMin={ setMin }
        setSec={ setSec }
        setPurpose={ setPurpose }
        setActive={ setActive }
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