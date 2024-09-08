import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import EmptyContent from 'components/EmptyContent'
import HoriStoreCardWithCTA from 'components/HoriStoreCardWithCTA'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStore } from 'redux/actions/groceryAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function BrowseStore( { navigation }: any ) {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ search, setSearch ] = useState( "" )

  const filteredStores = data[ 0 ]?.stores?.filter(( data: any ) => 
    data.name.toLowerCase().includes( search.toLowerCase())
  ).sort(( a: any, b: any ) => a.distance - b.distance )

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

  useEffect(() => {
    if ( !data[ 0 ].stores ) {
      dispatch( fetchStore() )
    }
  }, [])
  
  return (
    loading ? <Loading /> :
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

        {
          data && data.length > 0 && data[ 0 ].stores ?
            <FlatList
              style={ s.flatList }
              contentContainerStyle={{ padding: 20 }}
              showsVerticalScrollIndicator={ false }
              data={ filteredStores }
              renderItem={ StoreItem }
              keyExtractor={ data => data.store }
              ItemSeparatorComponent={ () => <Spacer size={ 10 } /> }
              ListEmptyComponent={ () => (
                <EmptyContent 
                  message="No stores found..."
                />
              )}
            />
          :
            <EmptyContent 
              message="Unable to fetch API..."
            />
        }
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
  "flatList": {
    flex: 1,
    marginHorizontal: -20,
    marginTop: -7.5,
    marginBottom: -20
  }
})