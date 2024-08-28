import { LightMode } from 'assets/colors/LightMode'
import AddGroceryListItemCard from 'components/AddGroceryListItemCard'
import AddGroceryListItemModal from 'components/AddGroceryListItemModal'
import GroceryListItem from 'components/GroceryListItem'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import { forGroceryList } from 'data/dummyData'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GroceryList() {
  const [ modal, setModal ] = useState( false )
  const [ name, setName ] = useState( "" )

  const ListItem = ( { item, index }: any ) => (
    <GroceryListItem 
      key={ index }
      data={ item }
      onChecked={ () => console.log( "Toggle Checked" ) }
      onDelete={ () => console.log( "Delete" ) }
    />
  )

  const showModal = () => {
    setModal( !modal )
  }
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  } 
  
  return (
    <SafeAreaView style={ s.container }>        
      <View style={{ flex: 1 }}>
        <TopBar />

        <Spacer size={ 20 } />
        
        <Text style={ s.heading }>Grocery List</Text>

        <Spacer size={ 5 } />

        <Text style={ s.sub }>A wise once said: "To avoid overspending, list down your spending..."</Text>
      
        <Spacer size={ 20 } />

        <FlatList 
          style={ s.flatList }
          showsVerticalScrollIndicator={ false }
          contentContainerStyle={{ padding: 20 }}
          data={ forGroceryList }
          renderItem={ ListItem }
          keyExtractor={ data => data.id.toString() }
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
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  },
  "flatList": {
    margin: -20,
    marginVertical: 0,
  }
})