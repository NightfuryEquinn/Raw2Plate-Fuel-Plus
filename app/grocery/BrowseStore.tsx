import { LightMode } from 'assets/colors/LightMode'
import AbsoluteIcon from 'components/AbsoluteIcon'
import HoriStoreCardWithCTA from 'components/HoriStoreCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { browseStoreCategories } from 'data/browseStoreCategory'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BrowseStore( { navigation }: any ) {
  const [ search, setSearch ] = useState( "" )

  const filteredStores = browseStoreCategories.filter( data => 
    data.store.toLowerCase().includes( search.toLowerCase())
  ).sort(( a, b ) => a.distance - b.distance )

  const StoreItem = ( { item, index }: any ) => (
    <HoriStoreCardWithCTA 
      key={ index }
      onPress={ () => navigation.navigate( "InStore", { storeData: item } ) }
      data={ item }
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

        <Text style={ s.heading }>Browse Store</Text>

        <Spacer size={ 10 } />

        <LinedTextField 
          name="search"
          placeholder="Search Stores..."
          text={ search }
          setText={ setSearch }
        />

        <Spacer size={ 10 } />

        <FlatList
          style={ s.flatList }
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={ false }
          data={ filteredStores }
          renderItem={ StoreItem }
          keyExtractor={ data => data.store }
          ItemSeparatorComponent={ () => <Spacer size={ 10 } />}
        />
      </View>

      <AbsoluteIcon 
        name="shopping-cart"
        onPress={ () => navigation.navigate( "InCart" ) }
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
  "flatList": {
    flex: 1,
    marginHorizontal: -20,
    marginTop: -7.5,
    marginBottom: -20
  }
})