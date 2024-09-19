import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from 'components/TopBar'
import Spacer from 'components/Spacer'
import { LightMode } from 'assets/colors/LightMode'
import OrderCard from 'components/OrderCard'
import dayjs from 'dayjs'
import CalendarModal from 'components/CalendarModal'
import { AppDispatch, RootState } from 'redux/reducers/store'
import { useDispatch, useSelector } from 'react-redux'
import Loading from 'app/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchOrderHistory, fetchOrderItems } from 'redux/actions/groceryAction'
import EmptyContent from 'components/EmptyContent'

export default function HistoryOrder() {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ modal, setModal ] = useState( false )
  const [ modalDate, setModalDate ] = useState( dayjs() )
  const [ refreshing, setRefreshing ] = useState( false )

  const filteredOrders = data[ 0 ]?.pastOrders?.filter(( data: any ) => (
    dayjs( data.deliveredTime ).isSame( modalDate, 'day' )
  ))

  const HistoryOrderItem = ( { item, index }: any ) => {
    return (
      <OrderCard
        key={ index }
        orderData={ item }
        title={ "" }
      />
    )
  }

  const showModal = () => {
    setModal( !modal )
  }

  // Refresh twice to see result, redux state issues
  const onRefresh = async () => {
    setRefreshing( true )

    if ( userSession ) {
      dispatch( fetchOrderHistory( userSession.userId ) )
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
      dispatch( fetchOrderHistory( userSession.userId ) )
    }
  }, [ userSession, modalDate ])

  return (
    loading ? <Loading /> :
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

        <FlatList 
          refreshing={ refreshing }
          onRefresh={ onRefresh }
          style={{ margin: -20 }}
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ filteredOrders }
          renderItem={ HistoryOrderItem }
          keyExtractor={ data => data.orderId.toString() }
          ItemSeparatorComponent={ () => <Spacer size={ 20 } /> }
          ListEmptyComponent={ () => (
            <EmptyContent 
              message="No order found..."
            />
          )}
        />
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

