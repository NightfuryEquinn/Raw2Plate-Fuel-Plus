import { LightMode } from 'assets/colors/LightMode'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function HoriCardWithCTA( { changeOrAdd, onPress, data }: any ) {
  return (
    <View style={ s.container }>
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
          <Text style={[ s.sub, s.yellow ]}>By</Text>
          <Text numberOfLines={ 1 } style={[ s.sub, { flex: 1 } ]}>{ data.author }</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={ 0.5 }
        onPress={ onPress }
        style={ s.ctaIcon }
      >
        { changeOrAdd === "change" ?
          <IconMA 
            name="check"
            color={ LightMode.white }
            size={ 24 }
          />
          : changeOrAdd === "add" ?
          <IconMA 
            name="add"
            color={ LightMode.white }
            size={ 24 }
          />
          : 
          <IconMA 
            name="chevron-right"
            color={ LightMode.white }
            size={ 24 }
          />
        }
        
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  "container": {
    height: 100,
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
    flexDirection: "row",
    gap: 5
  },
  "sub": {
    fontFamily: "cantarell",
    fontSize: 12
  },
  "yellow": {
    color: LightMode.yellow
  },
  "image": {
    width: 90,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  "ctaIcon": {
    marginRight: 15, 
    padding: 5,
    borderRadius: 10,
    backgroundColor: LightMode.black,
    shadowColor: LightMode.black,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.375,
    shadowRadius: 6,
    elevation: 10,
    alignSelf: "center",
  }
})

HoriCardWithCTA.propTypes = {
  changeOrAdd: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
}

HoriCardWithCTA.defaultProps = {
  changeOrAdd: ""
}