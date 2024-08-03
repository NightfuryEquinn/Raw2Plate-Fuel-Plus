import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function HoriSwipeCard( { onPress, onBookmark, onDelete, data, first }: any ) {
  const swipeRef = useRef<Swipeable>( null )

  const leftAction = () => (
    <TouchableOpacity
      activeOpacity={ 0.5 }
      onPress={() => {
        swipeRef.current?.close()
        onBookmark()
      }}
    >
      <View style={[ s.swipeButton, { marginHorizontal: 15 } ]}>
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
      <View style={[ s.swipeButton, { marginHorizontal: 15 } ]}>
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
          style={[ s.container, !first && { marginTop: 5 } ]}
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
    margin: 15,
    marginBottom: 17.5,
    height: 110,
    flexDirection: "row",
    borderRadius: 10,
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
    marginTop: 35,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: LightMode.white,
    justifyContent: "center",
    alignItems: "center",
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

HoriSwipeCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  first: PropTypes.bool.isRequired,
}

HoriSwipeCard.defaultProps = {
  first: false
}