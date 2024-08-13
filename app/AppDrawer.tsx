import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { LightMode } from 'assets/colors/LightMode'
import { dykDataArr } from 'data/dykData'
import { useFontFromContext } from 'context/FontProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppDrawer( props: any ) {
  const [ randomText, setRandomText ] = useState( "" )

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  useEffect(() => {
    const randomIndex = Math.floor( Math.random() * dykDataArr.length )
    setRandomText( dykDataArr[ randomIndex ] )
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LightMode.white }}>
      <View style={ s.container }>
        <Image 
          resizeMode="cover"
          source={ require( "../assets/images/white_text.png" ) }
          style={ s.image }
        />
      </View>

      <DrawerContentScrollView 
        { ...props }
        contentContainerStyle={{ paddingTop: 0, marginHorizontal: 10 }}
        showsVerticalScrollIndicator={ false }
      >
        <DrawerItemList { ...props } />
      </DrawerContentScrollView>

      <View style={ s.hint }>
        <Text style={ s.hintHeading }>Did you know?</Text>
        <Text style={ s.hintText }>{ randomText }</Text>
      </View>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  "container": {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  "image": {
    marginVertical: 10,
    width: 150,
    height: 150
  },
  "heading": {
    fontFamily: "fjalla",
    fontSize: 32,
    color: LightMode.black
  },
  "hint": {
    padding: 20,
    gap: 10,
  },
  "hintHeading": {
    fontFamily: "fjalla",
    fontSize: 16,
    color: LightMode.black,
    textTransform: "uppercase"
  },
  "hintText": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.black
  }
})