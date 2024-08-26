import { LightMode } from 'assets/colors/LightMode'
import AbsoluteIcon from 'components/AbsoluteIcon'
import LinedTextField from 'components/LinedTextField'
import Spacer from 'components/Spacer'
import TopBar from 'components/TopBar'
import { useFontFromContext } from 'context/FontProvider'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconMA from 'react-native-vector-icons/MaterialIcons'

const IMG_HEIGHT = 200

export default function InStore( { navigation, route }: any ) {
  const { storeData } = route.params

  const [ search, setSearch ] = useState( "" )
  const [ modal, setModal ] = useState( false )

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset( scrollRef )

  const showModal = () => {
    setModal( !modal )
  }

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [ -IMG_HEIGHT, 0, IMG_HEIGHT ],
            [ -IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75 ]
          )
        },
        { scale: interpolate(
            scrollOffset.value,
            [ -IMG_HEIGHT, 0, IMG_HEIGHT ],
            [ 2, 1, 1 ],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollOffset.value,
        [ 0, IMG_HEIGHT / 0.5 ],
        [ 0, 35 ],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(
        scrollOffset.value,
        [ 0, IMG_HEIGHT / 0.25 ],
        [ 0, 1 ]
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [ 0, IMG_HEIGHT / 0.5 ],
            [ -35, 0 ],
            Extrapolation.CLAMP
          )
        }
      ]
    }
  })

  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
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

          <Animated.View style={ headerAnimatedStyle }>
            <Text style={ s.heading }>{ storeData.store }</Text>
          </Animated.View>

          <Spacer size={ 10 } />

          <Animated.ScrollView
            ref={ scrollRef }
            scrollEventThrottle={ 16 }
            showsVerticalScrollIndicator={ false }
          >
            <Animated.Image 
              resizeMode="cover"
              source={ storeData.image }
              style={[ s.image, imageAnimatedStyle ]}
            />

            <View style={{ height: 2000 }}>

            </View>
          </Animated.ScrollView>
        </View>
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
  "parallaxContainer": {
    flex: 1,
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
})