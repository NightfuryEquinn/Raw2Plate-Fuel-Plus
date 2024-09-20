import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import AbsoluteIcon from 'components/AbsoluteIcon'
import EmptyContent from 'components/EmptyContent'
import FilterGroceryCategoryModal from 'components/FilterGroceryCategoryModal'
import GroceryCard from 'components/GroceryCard'
import LinedTextField from 'components/LinedTextField'
import SingleGroceryCardModal from 'components/SingleGroceryCardModal'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStoreItem } from 'redux/actions/groceryAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

const IMG_HEIGHT = 200

export default function InStore( { navigation, route }: any ) {
  const { storeData } = route.params

  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ search, setSearch ] = useState( "" )
  const [ category, setCategory ] = useState( "" )
  const [ quantity, setQuantity ] = useState( 1 )

  const [ modal, setModal ] = useState( false )

  const [ singleData, setSingleData ] = useState( [] )
  const [ singleModal, setSingleModal ] = useState( false )

  const filteredItems = data[ 0 ]?.storeItems?.filter(( data: any ) => 
    data.name.toLowerCase().includes( search.toLowerCase() )
  ).filter(( data: any ) => 
    category === "" || data.category.toLowerCase() === category.toLowerCase()
  )

  const showModal = () => {
    setModal( !modal )
  }

  const showCategory = ( theCategory: string ) => {
    setCategory( theCategory )
  }

  const showSingleModal = ( theSingleData: any ) => {
    setSingleModal( !singleModal )
    setSingleData( theSingleData )
  }

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }

  useEffect(() => {
    const getUserSession = async () => {
      const theUserSession = await AsyncStorage.getItem( "@user_session" )

      if ( theUserSession !== null ) {
        const parsed = JSON.parse( theUserSession )

        setUserSession( parsed )
      }
    } 

    getUserSession()
    
    if ( !data[ 0 ].storeItems || ( data[ 0 ].storeItems[ 0 ].storeId !== storeData.storeId ) ) {
      dispatch( fetchStoreItem( storeData.storeId ) )
    }
  }, [])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <View style={ s.parallaxContainer }>
          <View style={ s.searchContainer }>
            <View style={ s.searchWrapper }>
              <LinedTextField 
                name="search"
                placeholder="Search in Store..."
                text={ search }
                setText={ setSearch }
              />
            </View>
            
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={ s.icon }
            >
              <IconMA 
                name="filter-alt"
                size={ 24 }
                color={ LightMode.white }
              />
            </TouchableOpacity>
          </View>

          <Spacer size={ 10 } />

          <View>
            <Text style={ s.heading }>{ storeData.name }</Text>
          </View>

          <Spacer size={ 10 } />

          <ScrollView
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={{ paddingHorizontal: 20 }}
            style={ s.scroll }
          >
            <Image 
              resizeMode="cover"
              source={{ uri: storeData.image }}
              style={ s.image }
            />

            <View style={ s.itemContainer }>
              { 
                filteredItems && filteredItems.length !== 0 ? (
                  filteredItems.map(( data: any, index: number ) => (
                    <GroceryCard
                      key={ index }
                      data={ data }
                      onPress={ () => showSingleModal( data ) }
                    />
                  ))
                )  
                :
                <EmptyContent 
                  message="No products of this category available in this store..."
                />
              }
            </View>
          </ScrollView>
        </View>
      </View>

      <AbsoluteIcon 
        name="shopping-cart"
        onPress={ () => navigation.navigate( "InCart", { storeId: storeData.storeId } ) }
      />

      <FilterGroceryCategoryModal 
        modal={ modal }
        showModal={ showModal }
        category={ category }
        showCategory={ showCategory }
      />

      <SingleGroceryCardModal
        userId={ userSession?.userId }
        data={ singleData }
        modal={ singleModal }
        showModal={ () => {
          showSingleModal( singleData )
          setQuantity( 1 )
        }}
        quantity={ quantity }
        setQuantity={ setQuantity }
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
  "parallaxContainer": {
    flex: 1,
  },
  "scroll": {
    marginHorizontal: -20,
  },
  "image": {
    width: "auto",
    height: IMG_HEIGHT,
    borderRadius: 10,
  },
  "searchContainer": {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  "searchWrapper": {
    flex: 1,
  },
  "icon": {
    padding: 10,
    backgroundColor: LightMode.black,
    borderRadius: 10,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
  },
  "itemContainer": {
    paddingTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 30,
    rowGap: 20,
    backgroundColor: LightMode.white
  },
  "emptyContainer": {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: LightMode.darkGrey,
    borderRadius: 10
  },
  "emptyIcon": {
    height: 44,
    width: 44
  },
  "emptyText": {
    paddingHorizontal: 20,
    fontFamily: "fira",
    fontSize: 16,
    color: LightMode.black,
    textAlign: "center"
  }
})