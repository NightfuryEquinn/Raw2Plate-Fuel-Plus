import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import ConfirmationModal from 'components/ConfirmationModal'
import EmptyContent from 'components/EmptyContent'
import MapCard from 'components/MapCard'
import OrderCard from 'components/OrderCard'
import RoundedBorderButton from 'components/RoundedBorderButton'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrder, fetchFirstActiveOrder, fetchOrderItems } from 'redux/actions/groceryAction'
import { Status } from 'redux/models/Order'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function ActiveOrder() {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ activeOrder, setActiveOrder ] = useState( data[ 0 ]?.activeOrder )
  const [ modal, setModal ] = useState( false )
  const [ refreshing, setRefreshing ] = useState( false )

  const showModal = () => {
    setModal( !modal )
  }

  // Refresh twice to see result, redux state issues
  const onRefresh = async () => {
    setRefreshing( true )

    if ( userSession ) {
      dispatch( fetchFirstActiveOrder( userSession.userId ) )
      dispatch( fetchOrderItems( activeOrder?.orderId ) )
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
      dispatch( fetchFirstActiveOrder( userSession.userId ) )
    }
  }, [ userSession ])

  useEffect(() => {
    if ( userSession && activeOrder && !data[ 0 ]?.orderItems ) {
      dispatch( fetchOrderItems( activeOrder.orderId ) )
    }
  }, [ activeOrder ])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />

        <Text style={ s.heading }>Active Order</Text>

        {
          !activeOrder ?
            null
          :
            <Fragment>
              <Spacer size={ 10 } />

              <MapCard
                storeAddress={ activeOrder.storeName }
                receiverAddress={ activeOrder.address }
              />

              <Spacer size={ 5 } />

              <Text style={ s.hint }>Last updated at { dayjs().format( "YYYY-MM-DD h:mm:ss a" ) }</Text>  
            </Fragment>
        }

        <Spacer size={ 30 } />

        <ScrollView
          style={{ margin: -20 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={ false }
          refreshControl={
            <RefreshControl 
              refreshing={ refreshing } 
              onRefresh={ onRefresh } 
            />
          }
        >
          {
            !activeOrder ?
              <EmptyContent 
                message="You haven't place an order yet..."
              />
            :
              <Fragment>
                <View style={ s.infoContainer }>
                  <View style={[ s.infoWrapper, { flex: 0.6 } ]}>
                    <Text style={[ s.info, s.black ]}>Order Time</Text>

                    <Text style={ s.info }>{ dayjs( activeOrder.orderTime.slice( 0, -3 ) ).format( "h:mm a" ) }</Text>
                  </View>

                  <View style={[ s.infoWrapper, { flex: 0.4 } ]}>
                    <Text style={[ s.info, s.black ]}>ETA</Text>

                    <Text style={ s.info }>{ Math.floor( Math.random() * ( 85 - 25 + 1 ) ) + 25 } <Text style={[ s.black, s.cantarell ]}>mins</Text></Text>
                  </View>
                </View>

                <Spacer size={ 15 } />

                <OrderCard 
                  orderData={ activeOrder }
                  title={ `Order Review | Status: ${ activeOrder.status }` }            
                />
              </Fragment>
          }
        </ScrollView>

        <Spacer size={ 30 } />

        <View style={ s.hintContainer }>
          <Text style={[ s.hint, { textAlign: "left" } ]}>NOTE: You can only cancel order if the driver is not delivering your grocery from the store.</Text>

          <RoundedBorderButton 
            onPress={ showModal }
            text="Cancel Order"
            color={ LightMode.red }
            textColor={ LightMode.white }
            borderRadius={ 10 }
            marginHori={ 0 }
            disabled={activeOrder?.status !== "Pending" }
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
          dispatch( cancelOrder(
            {
              ...activeOrder,
              status: Status.cancel,
              deliveredTime: dayjs().format( "YYYY-MM-DD HH:mm:ss" ).toString()
            }
          ))
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
    fontFamily: "fira",
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
  "fira": {
    fontFamily: "fira",
    fontSize: 12,
  },
})