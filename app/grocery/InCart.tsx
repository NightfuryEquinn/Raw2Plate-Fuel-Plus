import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import ConfirmationModal from 'components/ConfirmationModal'
import EmptyContent from 'components/EmptyContent'
import InCartHoriCard from 'components/InCartHoriCard'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { Fragment, useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemCart, fetchInCart, fetchOneStore } from 'redux/actions/groceryAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function InCart( { navigation, route }: any ) {
  const { storeId } = route.params

  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ modal, setModal ] = useState( false )
  const [ refreshing, setRefreshing ] = useState( false )
  const [ selected, setSelected ] = useState<any>( null )

  const total = data[ 0 ]?.cartItems?.reduce(( total: any, currentItem: any ) => {
    return total + ( currentItem.price * currentItem.quantity )
  }, 0)

  const CartItem = ( { item, index }: any ) => (
    <InCartHoriCard
      key={ index }
      userId={ userSession?.userId }
      data={ item }
      onDelete={ () => showModal( item.cartId ) }
    />
  )

  const showModal = ( theCartId?: number ) => {
    setModal( !modal )

    if ( theCartId ) {
      setSelected( theCartId )
    } else {
      setSelected( null )
    }
  }

  // Refresh twice to see result, redux state issues
  const onRefresh = async () => {
    setRefreshing( true )

    if ( userSession ) {
      await dispatch( fetchInCart( userSession.userId, storeId ) )
    }

    setRefreshing( false )
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
  }, [])

  useEffect(() => {
    if ( userSession ) {
      dispatch( fetchInCart( userSession.userId, storeId ) )
      dispatch( fetchOneStore( storeId ) )
    }
  }, [ userSession ])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>In Cart</Text>

        <Spacer size={ 20 } />

        {
          ( data && data[ 0 ].oneStore && data[ 0 ].oneStore.image ) &&
          <Image 
            resizeMode="cover"
            source={{ uri: data[ 0 ].oneStore.image }}
            style={ s.image }
          />
        }

        <Spacer size={ 15 } />

        <Text style={ s.text }>Deliver directly from <Text style={ s.yellow }>{ data[ 0 ]?.oneStore?.name }</Text></Text>
        
        <Spacer size={ 5 } />
      
        <Text style={ s.text }>Estimated delivery time <Text style={ s.black }>{ Math.floor( Math.random() * ( 85 - 25 + 1 ) ) + 25 } minutes</Text></Text>

        <Spacer size={ 30 } />

        {
          data && data.length > 0 && data[ 0 ].cartItems ?
            <FlatList 
              refreshing={ refreshing }
              onRefresh={ onRefresh }
              style={ s.flatList }
              showsVerticalScrollIndicator={ false }
              contentContainerStyle={{ padding: 20 }}
              data={ data[ 0 ].cartItems }
              renderItem={ CartItem }
              keyExtractor={ data => data.cartId.toString() }
              ItemSeparatorComponent={ () => <Spacer size={ 15 } /> }
              ListEmptyComponent={ () => (
                <EmptyContent 
                  message="No items found... Try to refresh again..."
                />
              )}
            />
          :
            <EmptyContent 
              message="Unable to fetch API..."
            />
        }

        {
          total !== 0 &&
          <Fragment>
            <Spacer size={ 30 } />

            <Text style={[ s.hint, { textAlign: "left" } ]}>NOTE: Please refresh to update and view your cart after making any changes.</Text>

            <Spacer size={ 10 } />

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ () => navigation.navigate( "Payment", { total: total } ) }
              style={ s.paymentContainer }
            >
              <Text style={ s.payment }>Proceed to Payment</Text>

              <Text style={ s.total }>RM { total?.toFixed( 2 ) }</Text>
            </TouchableOpacity>
          </Fragment>
        }
      </View>

      <ConfirmationModal 
        modal={ modal }
        showModal={ showModal }
        message="Confirm to remove this item?"
        onCancel={ () => {
          showModal()
        }}
        onConfirm={ () => {
          if ( selected ) {
            dispatch( deleteItemCart( selected ) )
          }
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
  "image": {
    width: "auto",
    height: 100,
    borderRadius: 10,
  },
  "text": {
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.halfBlack
  },
  "yellow": {
    color: LightMode.yellow
  },
  "black": {
    color: LightMode.black
  },
  "flatList": {
    margin: -20
  },
  "paymentContainer": {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LightMode.green,
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
  "payment": {
    fontFamily: "fjalla",
    fontSize: 20,
    color: LightMode.black
  },
  "total": {
    borderRadius: 10,
    paddingHorizontal: 7.5,
    paddingVertical: 2.5,
    backgroundColor: LightMode.white,
    fontFamily: "cantarell",
    fontSize: 16,
    color: LightMode.black
  },
  "hint": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "right"
  },
})