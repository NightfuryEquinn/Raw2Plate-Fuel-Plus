import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from 'app/Loading'
import { LightMode } from 'assets/colors/LightMode'
import AddGroceryListItemCard from 'components/AddGroceryListItemCard'
import AddGroceryListItemModal from 'components/AddGroceryListItemModal'
import GroceryListItem from 'components/GroceryListItem'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { addGroceryList, checkAddGroceryList, deleteGroceryList, fetchGroceryList, updateGroceryList } from 'redux/actions/groceryAction'
import { AppDispatch, RootState } from 'redux/reducers/store'

export default function GroceryList() {
  const [ userSession, setUserSession ] = useState<any>( null )

  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector(( state: RootState ) => state.grocery )

  const [ modal, setModal ] = useState( false )
  const [ name, setName ] = useState( "" )
  const [ refreshing, setRefreshing ] = useState( false )

  const ListItem = ( { item, index }: any ) => (
    <GroceryListItem 
      key={ index }
      data={ item }
      onChecked={ () => {
        dispatch( updateGroceryList(
          {
            ...item,
            isCompleted: !item.isCompleted
          }
        ))
      }}
      onDelete={ () => {
        dispatch( deleteGroceryList( item.groceryItemId ) )
      }}
    />
  )

  const showModal = () => {
    setModal( !modal )
  }

  // Refresh twice to see result, redux state issues
  const onRefresh = async () => {
    setRefreshing( true )

    if ( userSession ) {
      dispatch( fetchGroceryList( userSession.userId ) )

      dispatch( checkAddGroceryList(
        {
          groceryListId: 0,
          userId: userSession.userId
        }
      ))
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
      dispatch( fetchGroceryList( userSession.userId ) )

      dispatch( checkAddGroceryList(
        {
          groceryListId: 0,
          userId: userSession.userId
        }
      ))
    }
  }, [ userSession ])
  
  return (
    loading ? <Loading /> :
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Grocery List</Text>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>A wise once said: "To avoid overspending, list down your spending..."</Text>
      
        <Spacer size={ 20 } />

        <FlatList 
          refreshing={ refreshing }
          onRefresh={ onRefresh }
          style={ s.flatList }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ data[ 0 ]?.groceryItems }
          renderItem={ ListItem }
          keyExtractor={ data => data.groceryItemId.toString() }
          ItemSeparatorComponent={ () => <Spacer size={ 15 } /> }
          ListHeaderComponent={ () => (
            <AddGroceryListItemCard 
              onPress={ showModal }
            />
          )}
        />
      </View>

      <AddGroceryListItemModal 
        modal={ modal }
        showModal={ showModal }
        name={ name }
        setName={ setName }
        onCancel={ () => {
          showModal()
        }}
        onConfirm={ () => {
          if ( name ) {
            dispatch( addGroceryList(
              {
                groceryItemId: 0,
                name: name,
                isCompleted: false,
                groceryListId: data[ 0 ].groceryList.groceryListId
              }
            ))
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
  "sub": {
    fontFamily: "fira",
    fontSize: 12,
    color: LightMode.black
  },
  "flatList": {
    margin: -20,
    marginVertical: 0,
  }
})