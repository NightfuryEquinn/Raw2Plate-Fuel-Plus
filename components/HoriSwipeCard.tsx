import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import IconMA from 'react-native-vector-icons/MaterialIcons'; 
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

export default function HoriSwipeCard( { onPress, onBookmark, onDelete, data }: any ) {
  const swipeRef = useRef<Swipeable>( null )

  const leftAction = () => (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={() => {
        swipeRef.current?.close()
        onBookmark()
      }}
    >
      <View style={[ s.swipeButton, { marginRight: 20 } ]}>
        <IconMA 
          name="bookmark"
          color={ LightMode.green }
          size={ 32 }
        />
      </View>
    </TouchableOpacity>
  )

  const rightAction = () => (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={() => {
        swipeRef.current?.close()
        onDelete()
      }}
    >
      <View style={[ s.swipeButton, { marginLeft: 20 } ]}>
        <IconMA 
          name="delete"
          color={ LightMode.red }
          size={ 32 }
        />
      </View>
    </TouchableOpacity>
  )
  
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={ swipeRef }
        renderLeftActions={ leftAction }
        renderRightActions={ rightAction }
      >
        <TouchableOpacity
          activeOpacity={ 0.5 }
          onPress={ onPress }
          style={ s.container }
        >
          <Image 
            resizeMode="cover"
            style={ s.image }
            source={ data.image }
          />

          <View style={ s.detailContainer }>
            <View style={ s.detailHeadingWrapper }>
              <Text numberOfLines={ 2 } style={ s.detailHeading }>{ data.heading }</Text>
            </View>
            
            <View style={ s.detailWrapper }>
              <Text style={ s.sub }>{ data.sub }</Text>
              <Text style={[ s.sub, s.yellow ]}>{ data.desc }</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

const s = StyleSheet.create({
  "container": {
    height: 110,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: LightMode.darkGrey,
  },
  "detailContainer": {
    flex: 1,
    padding: 10,
    justifyContent: "space-between"
  },
  "detailHeadingWrapper": {
    flexDirection: "row",
  },
  "detailHeading": {
    fontFamily: "cantarell",
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap"
  },
  "detailWrapper": {
    gap: 1
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12
  },
  "yellow": {
    color: LightMode.yellow
  },
  "image": {
    width: 100,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "swipeButton": {
    margin: "auto",
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: LightMode.lightBlack,
    justifyContent: "center",
    alignItems: "center"
  },
})

HoriSwipeCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
}